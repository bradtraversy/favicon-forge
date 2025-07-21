# 🖼️ FaviconForge

> Instantly generate beautiful, multi-size favicons from any image (PNG, JPG, SVG, WEBP, etc.) with live preview and download

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://faviconforge.io)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with](https://img.shields.io/badge/made%20with-next.js-blue)](https://nextjs.org/)

## ✨ Features

- **Universal Upload** – Drag & drop or click to upload PNG, JPG, SVG, WEBP, and more
- **Live Preview** – See your favicon in multiple sizes and a browser tab mockup
- **Transparent Background** – Checkerboard preview for transparency
- **Download as PNG** – Download any size instantly
- **Download as ICO** – Generate a multi-size `.ico` file (16x16, 32x32, 48x48, 64x64)
- **Download All as ZIP** – Get all PNG sizes in one click
- **Modern UI** – Responsive, glassmorphism design with animated icons
- **No Account Needed** – 100% free and private

## 🚀 Live Demo

**[Try FaviconForge →](https://faviconforge.io)**

![FaviconForge Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=FaviconForge+Screenshot)

## 🖼️ Favicon Sizes

| Size      | Usage                        |
| --------- | ---------------------------- |
| **16x16** | Browser tab, bookmarks       |
| **32x32** | Windows taskbar, retina tabs |
| **48x48** | Windows desktop icon         |
| **64x64** | High-res displays            |

## 🛠️ Technology Stack

- **Frontend**: Next.js 13+ (App Router), React, Tailwind CSS
- **Icons**: Heroicons
- **Image Processing**: sharp (serverless API), to-ico
- **ZIP Creation**: JSZip

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/bradtraversy/favicon-forge.git

# Navigate to project directory
cd favicon-forge

# Install dependencies
npm install

# Run the development server
npm run dev

# Open in your browser
http://localhost:3000
```

## 🧩 API & ICO Generation

- **ICO files** are generated server-side using a Next.js API route (`/api/generate-ico`) with `sharp` and `to-ico`.
- **PNG downloads** are generated client-side using the Canvas API.

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 90+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. **Code Style**: Use consistent formatting and meaningful variable names
2. **Performance**: Keep UI snappy and avoid unnecessary re-renders
3. **Accessibility**: Ensure keyboard navigation and screen reader compatibility
4. **Mobile-First**: Test on mobile devices and small screens

### Feature Ideas

- [ ] Add more favicon sizes (128x128, 256x256)
- [ ] Export as SVG
- [ ] Add PWA manifest generator
- [ ] Drag-to-reorder preview sizes
- [ ] Theme customization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [sharp](https://sharp.pixelplumbing.com/) for image processing
- [to-ico](https://www.npmjs.com/package/to-ico) for ICO generation
- [Heroicons](https://heroicons.com/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for rapid UI development
- Inspiration from [favicon.io](https://favicon.io/) and [realfavicongenerator.net](https://realfavicongenerator.net/)

## 📊 Project Stats

- **Lines of Code**: ~700
- **Bundle Size**: <100KB client, <10MB serverless
- **Load Time**: <1 second
- **Lighthouse Score**: 100/100

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

[Website](https://faviconforge.io) • [Issues](https://github.com/bradtraversy/favicon-forge/issues) • [Feature Requests](https://github.com/bradtraversy/favicon-forge/discussions)
