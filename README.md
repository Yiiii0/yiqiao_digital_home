# Yiqiao Zhou's Personal Website

My personal website built with Astro and Tailwind CSS.

🌐 **Live Site**: [yiqiaoz.me](https://yiqiaoz.me)

## Features

- 🌐 **Bilingual Support** (EN/中文) - Full internationalization with language switcher
- 📝 **Rambling System** - Snippets and blog posts with tag filtering
- 🎨 **Modern Design** - Clean, minimalist interface with smooth animations
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Static site generation for optimal performance

## Tech Stack

- **[Astro](https://astro.build/)** - Static site generator
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Styling
- **TypeScript** - Type-safe configuration

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Adding Content

### Personal Information

Edit `src/config.ts` to update your personal info, experience, education, etc.

### Adding Rambling Content

```bash
# Add a snippet
npm run add-rambling snippet "Your content EN" "你的内容 ZH" "tag" [date]

# Add a blog post
# 1. Create markdown files in src/content/blogs/
# 2. Run: npm run add-rambling blog "Title EN" "标题 ZH" "Summary EN" "摘要 ZH" "filename.md" "tag" [date]
```

## Deployment

This site is deployed on GitHub Pages with a custom domain. For deployment details, see `.claudedev_notes.md`.

## License

MIT

## Credits

This website is built upon the [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) template by [Ryan Fitzgerald](https://github.com/RyanFitzgerald). Thank you for creating such an elegant and well-structured template!

The original template has been extensively customized with:
- Bilingual (EN/中文) support
- Custom Rambling system for snippets and blogs
- Modified styling and components
- Custom domain configuration

---

Built with ❤️ by Yiqiao Zhou
