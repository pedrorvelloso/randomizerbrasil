# Randomizer Brasil

> Hub da Comunidade Brasileira de Randomizers

A modern, high-performance web platform showcasing live streams and highlights from the Brazilian randomizer gaming community. Built with Next.js 16, TypeScript, and Tailwind CSS, featuring real-time Twitch API integration.

## ✨ Features

- **🎮 Live Streams** - Real-time display of active randomizer streams with viewer counts
- **📺 Highlights** - Curated highlight videos from the Rando Brasil Twitch channel
- **⚡ Performance Optimized** - Following Vercel's React best practices
  - Set-based lookups (O(1) performance)
  - Dynamic imports with code-splitting
  - Server-side caching with automatic revalidation
  - React Suspense boundaries for streaming content
- **🎨 Modern Design** - Neo-brutalist inspired UI with cyan accent theme
- **📱 Fully Responsive** - Mobile-first design with adaptive navigation
- **♿ Accessible** - WCAG compliant with proper ARIA labels

## 🚀 Tech Stack

- **Framework:** [Next.js 16.1.4](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API:** [Twitch Helix API](https://dev.twitch.tv/docs/api/)
- **Fonts:** Syne, DM Sans, JetBrains Mono (via next/font/google)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Twitch Developer Account with Client ID and Secret

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:pedrorvelloso/randomizerbrasil.git
   cd randomizerbrasil
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   TWITCH_CLIENT_ID=your_client_id_here
   TWITCH_CLIENT_SECRET=your_client_secret_here
   ```

   Get your credentials from [Twitch Developer Console](https://dev.twitch.tv/console).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
rbr/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── features/            # Feature-specific components
│   │   ├── highlights/      # VOD/highlight components
│   │   └── streamers/       # Live stream components
│   ├── layout/              # Layout components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utility functions
│   └── twitch/              # Twitch API integration
│       ├── api.ts           # API functions
│       ├── cached.ts        # Cached wrappers
│       └── types.ts         # TypeScript types
├── data/                    # Static data
│   └── data.ts              # Game IDs and streamer list
└── public/                  # Static assets

```

## 🎯 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## ⚙️ Configuration

### Twitch API

The app monitors specific streamers and game IDs defined in `data/data.ts`:

```typescript
export const users = ["randobrasil", "xx_soket_xx", ...];
export const games = new Set(["5635", "9435", ...]); // Minish Cap, ALttP, OoT, etc.
```

### Cache Settings

- **Streamers:** 60 seconds (live data)
- **Highlights:** 5 minutes (less volatile)

Adjust in `lib/twitch/cached.ts`:

```typescript
export const getCachedStreamers = unstable_cache(
  async () => getOnlineStreamers(),
  ['twitch-streamers'],
  { revalidate: 60 }
)
```

## 🎨 Design System

### Colors

- **Brand Cyan:** `#00D9FF`
- **Background:** `#0A0E27` (dark navy)
- **Foreground:** `#FFFFFF`
- **Accent:** `#00FFB3`

### Typography

- **Headings:** Syne (bold, uppercase)
- **Body:** DM Sans
- **Monospace:** JetBrains Mono

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pedrorvelloso/randomizerbrasil)

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform supporting Node.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

## 🔧 Performance Optimizations

This project implements Vercel's React best practices:

- **Set-based lookups** - Game ID filtering uses `Set.has()` for O(1) performance
- **Dynamic imports** - Mobile menu loads on-demand to reduce initial bundle
- **Hoisted style objects** - Prevents unnecessary re-renders
- **React Suspense** - Streaming server-rendered content
- **Image optimization** - Next.js Image component with priority loading

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Pedro Velloso - [@pedrorvelloso](https://github.com/pedrorvelloso)

Project Link: [https://github.com/pedrorvelloso/randomizerbrasil](https://github.com/pedrorvelloso/randomizerbrasil)

---

**Built with ❤️ for the Brazilian Randomizer Community**
