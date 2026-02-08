# Simple ERP Diary

A cross-platform hybrid web app built with React and TypeScript.

## Project Structure

```
├── web/           # React web application (Vite)
├── mobile/        # React Native mobile app (Expo)
├── shared/        # Shared libraries and utilities
└── package.json   # Root workspace configuration
```

## Features

- **Web Application**: Modern React app built with Vite
- **Mobile Application**: React Native app with Expo support
- **Shared Library**: Common utilities and types shared across platforms
- **TypeScript**: Full type safety across all packages
- **Monorepo**: Yarn/npm workspaces for efficient development

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn (with workspace support)

### Installation

```bash
# Install dependencies
npm install

# Or with yarn
yarn install
```

### Development

**Web Application:**
```bash
npm run dev:web
```

**Mobile Application:**
```bash
npm run dev:mobile
```

### Building

**Build Web:**
```bash
npm run build:web
```

**Build Mobile:**
```bash
npm run build:mobile
```

**Build All:**
```bash
npm run build
```

## Project Setup Checklist

- [x] Verify copilot-instructions.md created
- [x] Scaffold the React + TypeScript project
- [ ] Customize for cross-platform support
- [ ] Install required extensions (if any)
- [ ] Compile and test the project
- [ ] Create run/debug tasks
- [ ] Update final documentation

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (web), Expo (mobile)
- **Mobile**: React Native + Expo
- **Shared Code**: Shared npm package
- **Package Manager**: npm/yarn workspaces

## License

MIT
