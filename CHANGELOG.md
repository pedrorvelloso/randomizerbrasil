# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.12.1] - 2026-02-05

### Added

- `Footnote` component for styled inline notes with left border accent
- `SocialButton` component for platform-specific buttons (Discord, Twitch) with link and button modes

### Changed

- Button component now has `cursor-pointer` by default and removed all box shadows
- Refactored About page to use `Footnote` and `SocialButton` components
- `ConnectButton` refactored to use `SocialButton` component

## [0.12.0] - 2026-02-04

### Added

- `/discord` redirect to RBR Discord server invite
- `/bot` redirect for Discord bot OAuth invite
- Bot invite link in footer navigation with external link icon on hover
- "Leve a RBR para seu servidor Discord" section in About page with bot features explanation
- Reusable `Logo` component for consistent branding across header and footer

### Changed

- Header and footer now use shared `Logo` component with consistent `font-syne` styling
- Discord social link now uses internal `/discord` redirect instead of direct URL
- Header subtitle now uses `font-mono` to match footer styling

## [0.11.1] - 2026-02-03

### Added

- `source_id` field to `/api/runners` response (shows Discord ID for DB entries, undefined for static list)

## [0.11.0] - 2026-02-01

### Added

- API endpoint `/api/runners` to list streamers with source attribution (db/static)
- `getRunnersWithSource()` function that combines database and static runners with deduplication
- Database entries take priority over static list for duplicate names

## [0.10.1] - 2026-01-31

### Fixed
- Layout shift between skeleton loading and empty state in streamer section
- Inconsistent vertical padding between home and about pages (unified to `py-16`)
- Skeleton now shows responsive number of cards (1 on mobile, 2 on sm, 3 on lg, 4 on xl) to match actual content layout
- Reserved minimum height for streamer section to prevent content jumping during load

## [0.10.0] - 2026-01-31

### Changed
- Replaced stale-while-revalidate caching with hard expiry using `s-maxage` HTTP headers
- Streamer data now fetches from internal API route with CDN-level caching
- Cache expires after 60 seconds (no stale data served after long gaps)

### Added
- `getBaseUrl()` utility function for centralized URL generation across environments
- Automatic Vercel environment variable support (production, preview, local)

### Removed
- `getCachedStreamers` from cached module (no longer needed)
- `unstable_cache` wrapper from streamers API route

## [0.9.5] - 2026-01-30

### Fixed
- Home page now uses dynamic rendering to always show fresh streamer data
- Eliminated stale-while-revalidate issue requiring double page reload

## [0.9.4] - 2026-01-30

### Added
- Public API endpoint `/api/streamers` for Discord bot integration
- Cached streamer data with synchronized timestamps (60s revalidation)
- JSON response with success/error states and metadata

## [0.9.3] - 2026-01-30

### Fixed
- Accordion controlled/uncontrolled state warning when navigating with hash links

## [0.9.2] - 2026-01-28

### Added
- Twitch model classes (`Streamer`, `Vod`) to centralize API mapping logic
- `date-fns` dependency for server-side duration formatting

### Fixed
- Live duration is now precomputed server-side to avoid hydration mismatches

## [0.9.1] - 2026-01-27

### Changed
- Auto-refresh toggle now only appears on desktop (hidden on mobile)

## [0.9.0] - 2026-01-27

### Added
- Auto-refresh toggle for live streamers list with 60-second polling interval
- User-controlled pause/resume functionality for list updates
- localStorage persistence for auto-refresh preference
- Visibility API integration to pause updates when tab is hidden
- Tooltip component with site-consistent styling
- Visual state indicator (green border/icon) for active auto-refresh

### Changed
- Streamers list now supports client-side auto-refresh with manual control
- API endpoint uses getCachedStreamers() for efficient data fetching

## [0.8.0] - 2026-01-26

### Added
- Shareable accordion links with URL hash support (e.g., `/about#aparecer-na-lista`)
- Auto-expand and scroll to accordion section when visiting with hash
- Empty streamer state hint linking to registration guide
- Hash change listener for dynamic navigation to accordion sections

### Changed
- About page converted to client component to support hash-based navigation
- Improved user onboarding flow with direct link to "How to appear on stream list" section

## [0.7.0] - 2026-01-26

### Added
- Page loading progress indicator with brand cyan color
- Slim top bar with glow effect for navigation transitions

## [0.6.0] - 2026-01-26

### Added
- Vercel Web Analytics for visitor tracking
- Vercel Speed Insights for performance monitoring

## [0.5.0] - 2026-01-25

### Added
- Custom error pages with neo-brutalist design
  - 404 Not Found page with glitchy text effect
  - 500 Internal Server Error page
  - Reusable ErrorPage component for consistent error UI
- Visual effects: animated grid background, scanlines, glowing orbs

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

[Unreleased]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.12.0...HEAD
[0.12.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.9.5...v0.10.0
[0.9.5]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.9.4...v0.9.5
[0.9.4]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.9.3...v0.9.4
[0.9.3]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.9.2...v0.9.3
[0.9.2]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pedrorvelloso/randomizerbrasil/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pedrorvelloso/randomizerbrasil/releases/tag/v0.1.0
