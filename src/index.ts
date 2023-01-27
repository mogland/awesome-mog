import { readFile, rm, writeFile } from "fs/promises"
import { ofetch } from "ofetch"
import { COMMENTS, FETCH_EXCLUDE_TAGS, FETCH_OFFICIAL_TAGS, FETCH_TAGS, MOG_LIST_PATH, MOG_LIST_PRODUCTION_PATH } from './constant';

const githubAPIEndPoint = 'https://api.github.com'
const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'

const fetch = ofetch.create({
  baseURL: githubAPIEndPoint,
  headers: {
    'User-Agent': userAgent,
  },
})

async function fetchGitHubReposWithTags(key: keyof typeof FETCH_TAGS | keyof typeof FETCH_OFFICIAL_TAGS, isOfficial?: boolean) {
  const tags = isOfficial ? [FETCH_OFFICIAL_TAGS[key]] : [FETCH_TAGS[key]]
  const excludeTags = isOfficial ? [] : [FETCH_EXCLUDE_TAGS[key]]
  const query = tags.map((tag) => `topic:${tag}`).join('+')
  const excludeQuery = excludeTags.map((tag) => `-topic:${tag}`).join('+')
  const url = `/search/repositories?q=${query}+${excludeQuery}&sort=stars&order=desc&per_page=100`
  console.log(url)
  const res = await fetch(url).then((res) => res.items.map((item: { full_name: string; description: string; }) => ({
    repo: item.full_name,
    description: item.description
  })))
  return res
}

function generateListItem(name: string, description?: string) {
  return `<li><a href="https://github.com/${name}">${name}</a> - ${description}</li>`
}

function generateList(items: any[]) {
  return `<ul>${items.map((item) => generateListItem(item.repo, item.description)).join('')}</ul>`
}

function rp(token: keyof typeof COMMENTS) {
  return `<!-- ${COMMENTS[token]} -->`
}

function removeDuplicateKey(arr: any[], key: string) {
// 在 arr 里面去除掉 repo 重复的对象，保留第一个
  const newArr = arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
  newArr.sort((a, b) => {
    return a[key].localeCompare(b[key])
  })
  newArr.forEach((item, index) => {
    if (item[key] === newArr[index + 1]?.[key]) {
      newArr.splice(index, 1)
    }
  });
  return newArr
}

function mergeArray(arr1: any[], arr2: any[]) {
  let arr = arr1.concat(arr2)
  arr = removeDuplicateKey(arr, 'repo')
  const newArr = arr.filter((item, index) => {
    return arr.indexOf(item) === index // 去重
  })
  newArr.sort((a, b) => {
    return a.repo.localeCompare(b.repo)
  })
  return newArr
}

async function main() {
  const template = await readFile("./README.template.md", "utf-8")
  let newContent = template;

  // ===Community===
  const getThemeDetails = await Promise.all([
    await readFile(MOG_LIST_PATH.MogThemeCommunity, "utf-8"),
    fetchGitHubReposWithTags("MogThemeCommunity")
  ])
  let themes = mergeArray(JSON.parse(getThemeDetails[0]), getThemeDetails[1])
  newContent = newContent.replace(
    rp("MogThemeCommunity"),
    generateList(themes)
  )

  const getThemeAppDetails = await Promise.all([
    await readFile(MOG_LIST_PATH.MogThemeAppCommunity, "utf-8"),
    fetchGitHubReposWithTags("MogThemeAppCommunity")
  ])

  let themeApps = mergeArray(JSON.parse(getThemeAppDetails[0]), getThemeAppDetails[1])  
  newContent = newContent.replace(
    rp("MogThemeAppCommunity"),
    generateList(themeApps)
  )

  const getThemeComponentDetails = await Promise.all([
    await readFile(MOG_LIST_PATH.MogThemeComponentCommunity, "utf-8"),
    fetchGitHubReposWithTags("MogThemeComponentCommunity")
  ])
  
  let themeComponents = mergeArray(JSON.parse(getThemeComponentDetails[0]), getThemeComponentDetails[1])
  newContent = newContent.replace(
    rp("MogThemeComponentCommunity"),
    generateList(themeComponents)
  )

  // ===Official===
  const getThemeDetailsOfficial = await Promise.all([
    fetchGitHubReposWithTags("MogThemeCommunity", true)
  ])
  themes = mergeArray(themes, getThemeDetailsOfficial[0])
  newContent = newContent.replace(
    rp("MogThemeOfficial"),
    generateList(getThemeDetailsOfficial[0])
  )

  const getThemeAppDetailsOfficial = await Promise.all([
    fetchGitHubReposWithTags("MogThemeAppCommunity", true)
  ])
  themeApps = mergeArray(themeApps, getThemeAppDetailsOfficial[0])
  newContent = newContent.replace(
    rp("MogThemeAppOfficial"),
    generateList(getThemeAppDetailsOfficial[0])
  )
    
  const getThemeComponentDetailsOfficial = await Promise.all([
    fetchGitHubReposWithTags("MogThemeComponentCommunity", true)
  ])
  themeComponents = mergeArray(themeComponents, getThemeComponentDetailsOfficial[0])
  newContent = newContent.replace(
    rp("MogThemeComponentOfficial"),
    generateList(getThemeComponentDetailsOfficial[0])
  )

  await rm("./README.md", { force: true })
  await writeFile("./README.md", newContent, "utf-8")
  
  await rm(MOG_LIST_PRODUCTION_PATH.MogThemeCommunity, { force: true })
  await writeFile(MOG_LIST_PRODUCTION_PATH.MogThemeCommunity, JSON.stringify(themes), "utf-8")
  await rm(MOG_LIST_PRODUCTION_PATH.MogThemeAppCommunity, { force: true })
  await writeFile(MOG_LIST_PRODUCTION_PATH.MogThemeAppCommunity, JSON.stringify(themeApps), "utf-8")
  await rm(MOG_LIST_PRODUCTION_PATH.MogThemeComponentCommunity, { force: true })
  await writeFile(MOG_LIST_PRODUCTION_PATH.MogThemeComponentCommunity, JSON.stringify(themeComponents), "utf-8")
}

main().then(() => {
  console.log("Awesome Mog List updated!")
})