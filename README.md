# livieee.github.io

Olivia Xiao 的个人主页 / 作品集网站。

线上地址：https://livieee.github.io

## 技术栈

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Motion](https://motion.dev/) 动画

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
```

## 构建

```bash
npm run build    # 输出到 dist/
npm run preview  # 本地预览构建产物
```

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages（见 `.github/workflows/deploy.yml`）。
