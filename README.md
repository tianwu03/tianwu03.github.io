# tianwu03 的个人主页

一个可直接部署到 GitHub Pages 的静态个人主页。

## 本地预览

使用任意静态文件服务器启动，例如：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 创建名为 `tianwu03.github.io` 的公开仓库。
2. 将本目录内容推送到仓库的默认分支。
3. 在仓库的 `Settings > Pages` 中选择从默认分支部署。

项目区域会通过 GitHub API 自动显示 `tianwu03` 最近更新的公开仓库。
