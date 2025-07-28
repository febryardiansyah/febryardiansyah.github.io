# Personal Website

A personal website built with Next.js, featuring a Strava integration to display recent activities.

## Features

- Modern UI with Tailwind CSS
- Strava API integration
- Responsive design

## Getting Started

### Prerequisites

- Node.js
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Copy the `.env.example` file to `.env.local` and fill in your Strava API credentials:
   ```bash
   cp .env.example .env.local
   ```

### Environment Variables

To use the Strava integration, you need to set up the following environment variables in your `.env.local` file:

- `STRAVA_API_URL`: The Strava API base URL (default: https://www.strava.com/api/v3)
- `STRAVA_TOKEN_URL`: The Strava OAuth token URL (default: https://www.strava.com/oauth/token)
- `STRAVA_CLIENT_ID`: Your Strava API client ID
- `STRAVA_CLIENT_SECRET`: Your Strava API client secret
- `STRAVA_REFRESH_TOKEN`: Your Strava API refresh token

### Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

```bash
npm run build
# or
pnpm build
```