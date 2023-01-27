# 提交指南

## WARNING

1. 本项目使用 GitHub Actions 自动更新 Awesome List，所以请不要直接修改 `README.md` 等文件，否则我们将无法接受您的 Pull Request。
2. 请不要修改 `awesome-list` 文件中其他人的项目，否则我们将无法接受您的 Pull Request。
3. 项目配置 Topic 时禁止使用带有 `mog-*-official` 的 Topic，否则我们将无法接受您的 Pull Request 并永久排除您的项目进入主题市场。


## 提交新主题

### 推荐方案

1. 在你的项目中配置 Topic: `mog-theme`
2. 正常情况下最多在 3 小时后，你的项目将能出现在 Awesome List 和 Mog 主题市场中

### 备用方案

1. Fork 本项目
2. 在 `awesome-list/themes.json` 中添加您的新主题
3. 提交 Pull Request

```json
[{
  "repo": "mogland/mog-theme-tiny",
  "description": "一个简单、纯净、最小化的主题，适用于 Mog",
}]
```

## 提交新组件

### 推荐方案

1. 在你的项目中配置 Topic: `mog-theme-component`
2. 正常情况下最多在 3 小时后，你的项目将能出现在 Awesome List 和 Mog 主题市场中

### 备用方案

1. Fork 本项目
2. 在 `awesome-list/theme_components.json` 中添加您的新组件
3. 提交 Pull Request

```json
[{
  "repo": "example/mog-comments",
  "description": "一个简单的评论组件",
}]
```

## 提交新前端程序

### 推荐方案

1. 在你的项目中配置 Topic: `mog-theme-app`
2. 正常情况下最多在 3 小时后，你的项目将能出现在 Awesome List 和 Mog 主题市场中

### 备用方案

1. Fork 本项目
2. 在 `awesome-list/theme_apps.json` 中添加您的前端程序
3. 提交 Pull Request

```json
[{
  "repo": "example/mog-theme-app",
  "description": "一个简单的前端主题程序",
}]
```