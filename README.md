<div align="center">

# Landing Page Website Template

**A modern, cinematic React landing page template with smooth scroll animations. Built for hotels, studios and hospitality brands, and easy to adapt to any business.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-FF6A1A?style=for-the-badge)](https://prominnolabs.github.io/landing-page-website-template/)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**[View Live Demo →](https://prominnolabs.github.io/landing-page-website-template/)**

</div>

<!-- Add a screenshot of the live demo: save it as docs/screenshot.png, then uncomment the line below.
![Landing page preview](docs/screenshot.png)
-->

---

## ✨ Features

- **Editorial, cinematic design** with a cream canvas, ivy and clay accents, and serif headlines
- **Fully responsive** layout for mobile, tablet and desktop
- **Scroll-driven animations:** hero expansion, reveal-on-scroll, parallax, stacked cards and highlighted text
- **Animated page loader** and auto-hiding header with a mobile menu sheet
- **Draggable photo gallery**, animated counters and a live clock widget
- **Floating booking dock** (UI only, with no backend)
- **Zero animation dependencies.** All interactions use plain JavaScript in one small file
- **One-push deployment** to GitHub Pages with the included workflow

## 📄 Sections Included

| Section | Description |
| --- | --- |
| Header | Floating navigation with mobile menu |
| Hero | Large headline with an expanding image on scroll |
| About | Manifesto text that lights up word by word |
| A Day Here | Time-of-day storytelling section |
| Rooms | Room cards with images and details |
| Amenities | Bento-style feature grid |
| Gallery | Draggable image gallery |
| Find Us | Location and directions |
| Reviews | Guest ratings and booking partner logos |
| Call to action | Closing section with a booking prompt |
| Footer | Links and contact details |

## 🛠️ Tech Stack

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- Plain CSS with custom properties (no CSS framework)
- Vanilla JavaScript for animations

## 🚀 Getting Started

**Requirements:** [Node.js](https://nodejs.org/) 20 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/ProminnoLabs/landing-page-website-template.git
cd landing-page-website-template

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the local URL that Vite prints (usually `http://localhost:5173`).

### Available Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## 📁 Project Structure

```text
landing-page-website-template/
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── public/
│   ├── assets/
│   │   ├── global/                # Icon fonts and CSS (Font Awesome, Line Awesome)
│   │   └── images/                # Photos, room images and partner logos
│   └── home-v3.js                 # Scroll animations and interactions
├── src/
│   ├── main.jsx                   # React entry point
│   ├── page.html                  # Page markup (all sections and text)
│   └── home-v3.css                # All styles
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Customization

**Change the content.** Edit `src/page.html`. All headings, paragraphs, room details and links live there.

**Change the colors and fonts.** Open `src/home-v3.css` and edit the variables at the top:

```css
:root {
  --cream: #f3eee5;   /* page background */
  --ink:   #141613;   /* main text */
  --ivy:   #234b33;   /* primary accent */
  --clay:  #c66a3d;   /* secondary accent */
  --serif: "Instrument Serif", serif;
  --sans:  "Inter Tight", system-ui, sans-serif;
}
```

To use different fonts, update the Google Fonts link in `index.html` and the two font variables above.

**Replace the images.** Put your files in `public/assets/images/` using the same names, or update the paths in `src/page.html`. WebP images keep the page fast.

**Adjust animations.** Edit `public/home-v3.js`. Each effect (loader, reveals, gallery, dock, parallax) is a clearly labelled block.

## 🌐 Deploy to GitHub Pages

This repo deploys automatically on every push to `main`.

1. Open **Settings → Pages**.
2. Under **Source**, choose **GitHub Actions**.
3. Push to `main` and watch the run in the **Actions** tab.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

> **Important:** The `base` option in `vite.config.js` must match your repository name exactly.
>
> ```js
> export default defineConfig({
>   plugins: [react()],
>   base: '/landing-page-website-template/', // change to '/your-repo-name/'
> });
> ```
>
> If you deploy to a custom domain or the root of a user site, set `base: '/'`.

Paths in `src/page.html` that start with `/` (for example `/assets/images/...`) are prefixed with the base automatically in `src/main.jsx`.

## ⚠️ Notes

- This is a **design-only** template. Booking buttons and forms are not connected to any backend.
- The sample photos, hotel name and text are placeholders. **Replace them with your own** before using the template for a real business.
- Booking-partner logos (Agoda, MakeMyTrip, Goibibo, Yatra and others) are trademarks of their respective owners and are shown for demonstration only.

## 🤝 Contributing

Contributions, issues and ideas are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feat/my-improvement`
3. Commit your changes: `git commit -m "feat: add my improvement"`
4. Push the branch and open a pull request

## 📜 License

Released under the [MIT License](LICENSE).

## 💬 Contact

Built by **[Prominno Labs](https://prominno.com/)**

- 🌐 Website: [prominno.com](https://prominno.com/)
- ✉️ Email: [info@prominno.com](mailto:info@prominno.com)
- 💼 LinkedIn: [Prominno Labs](https://www.linkedin.com/company/prominno-labs-private-limited/)
- 🐦 X: [@Prominno_pvt](https://x.com/Prominno_pvt)

If this template helps you, please ⭐ star the repo.
