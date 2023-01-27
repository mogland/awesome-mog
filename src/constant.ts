export const MOG_THEME_APP_COMMUNITY = "[MOG_THEME_APP_COMMUNITY]"
export const MOG_THEME_COMMUNITY = "[MOG_THEME_COMMUNITY]"
export const MOG_THEME_COMPONENT_COMMUNITY = "[MOG_THEME_COMPONENT_COMMUNITY]"

export const COMMENTS = Object.freeze({
  MogThemeAppCommunity: MOG_THEME_APP_COMMUNITY,
  MogThemeCommunity: MOG_THEME_COMMUNITY,
  MogThemeComponentCommunity: MOG_THEME_COMPONENT_COMMUNITY,
  MogThemeAppOfficial: `${MOG_THEME_APP_COMMUNITY}[OFFICIAL]`,
  MogThemeOfficial: `${MOG_THEME_COMMUNITY}[OFFICIAL]`,
  MogThemeComponentOfficial: `${MOG_THEME_COMPONENT_COMMUNITY}[OFFICIAL]`,
})

export const MOG_LIST_PATH = Object.freeze({
  MogThemeAppCommunity: "./awesome-list/theme_apps.json",
  MogThemeCommunity: "./awesome-list/themes.json",
  MogThemeComponentCommunity: "./awesome-list/theme_components.json",
})
export const MOG_LIST_PRODUCTION_PATH = Object.freeze({
  MogThemeAppCommunity: "./production-awesome-list/theme_apps.json",
  MogThemeCommunity: "./production-awesome-list/themes.json",
  MogThemeComponentCommunity: "./production-awesome-list/theme_components.json",
})


export const FETCH_TAGS = Object.freeze({
  MogThemeAppCommunity: "mog-theme-app",
  MogThemeCommunity: "mog-theme",
  MogThemeComponentCommunity: "mog-theme-component",
})

export const FETCH_EXCLUDE_TAGS = Object.freeze({
  MogThemeAppCommunity: "mog-theme-app-official",
  MogThemeCommunity: "mog-theme-official",
  MogThemeComponentCommunity: "mog-theme-component-official",
})
export const FETCH_OFFICIAL_TAGS = FETCH_EXCLUDE_TAGS