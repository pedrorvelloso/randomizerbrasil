# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-01-25

### Added
- Supabase integration for dynamic runners/streamers management
  - Database table `runners` for storing streamer data
  - Supabase client with graceful fallback when not configured
  - Deduplicated runners list merging database with static list
- Environment variables example file (`.env.example`)

### Changed
- Twitch API now fetches runners from Supabase + static list (deduped)
- Supabase environment variables are server-only (not exposed to client)

## [0.3.1] - 2026-01-25

### Fixed
- Navigation active state not highlighting on initial page load for root route

## [0.3.0] - 2026-01-25

### Added
- Footer component with social links, navigation, and branding
- Custom social icons from Simple Icons (Twitch, Discord, X, YouTube, Instagram)
- Social links in mobile menu

### Changed
- Moved social links from header to footer (cleaner header design)
- Updated social media URLs to official accounts
- Replaced deprecated lucide-react brand icons with custom SVG components

## [0.2.0] - 2026-01-25

### Added
- Comprehensive SEO configuration
  - OpenGraph meta tags with social image (1200x630)
  - Twitter card support (summary_large_image)
  - Page-specific metadata for About page
  - Keywords and author metadata
  - metadataBase for absolute URLs
- Social share image (`public/images/social-rbr.png`)
- Grey indicator ball when no streamers are online

### Changed
- Updated About page intro text to better reflect accordion content
- HTML lang attribute from "en" to "pt-BR"
- Improved description texts in Portuguese
- Empty streamers state now has fixed min-height (300px) to prevent layout shift

### Fixed
- ESLint warning: escaped apostrophe in "Majora's Mask"

## [0.1.0] - 2026-01-25

### Added
- Initial release of Randomizer Brasil platform
- Next.js 16.1.4 with TypeScript and App Router
- Twitch API integration for live stream data
  - Real-time streamer listings with auto-refresh (60s cache)
  - Highlight videos from Rando Brasil channel (5min cache)
  - Viewer count display on stream cards
  - Live duration tracking for streams
- Responsive UI with Tailwind CSS v4
  - Custom cyan (#00D9FF) brand theme
  - Dark mode design with navy background
  - Neo-brutalist inspired design elements
- shadcn/ui component library integration
  - Button, Sheet, Accordion components
  - Custom visually-hidden accessibility component
- Performance optimizations following Vercel best practices
  - Set-based game ID lookups (O(1) vs O(n))
  - Dynamic imports for mobile menu (code-splitting)
  - Hoisted style objects to prevent re-renders
  - React Suspense boundaries for streaming content
  - Server-side caching with Next.js unstable_cache
- Header with responsive navigation
  - Desktop navigation with hover effects
  - Mobile menu with animated sidebar
  - Full-height navigation links
- Stream cards with thumbnail previews
  - Eye icon with viewer count
  - Live duration display
  - Game name and stream title
- VOD cards for highlight videos
  - View count display
  - Video duration
  - Thumbnail with hover effects
- About page with project information
- Custom font stack
  - Syne for headings
  - DM Sans for body text
  - JetBrains Mono for monospace elements
- Background effects with gradient mesh and grain texture

### Changed
- N/A (initial release)

### Deprecated
- N/A

### Removed
- Mock data (replaced with live Twitch API)
- LIVE badge from stream cards (section header already indicates "AO VIVO")

### Fixed
- N/A (initial release)

### Security
- Environment variables for sensitive Twitch API credentials
- Proper .gitignore to exclude .env files

[Unreleased]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pedrorvelloso/randomizerbrasil/releases/tag/v0.1.0
