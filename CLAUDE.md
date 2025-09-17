# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CodeSmash is a real-time 1v1 coding platform built with Next.js 15, TypeScript, and Tailwind CSS. Players compete by solving coding problems in real-time duels with live code synchronization and Monaco Editor integration.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm install` - Install dependencies

## TypeScript Guidelines

- **Strict TypeScript**: Always use proper TypeScript types, never use `any`
- **Type Safety**: Prefer explicit typing over type inference where clarity is needed
- **Interfaces**: Use interfaces for object shapes and component props
- **Generics**: Utilize generics for reusable components and functions
- **Type Guards**: Implement proper type checking for runtime safety

## Architecture

### Core Application Structure

- **App Router**: Uses Next.js 15 App Router with strict TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React Context with properly typed providers
- **Real-time**: WebSocket connections for live duels and code sync

### Directory Structure

#### `app/` - Next.js App Router
- **Purpose**: Contains all route pages and layouts using App Router convention
- **Key Files**:
  - `layout.tsx` - Root layout with theme provider and fonts
  - `page.tsx` - Landing page
  - `duel/page.tsx` - Main duel interface
  - `lobby/page.tsx` - Matchmaking and lobby
  - `live-battles/page.tsx` - Active battles overview
  - `open-challenges/page.tsx` - Available challenges

#### `components/` - React Components
- **Purpose**: Organized component library split by feature domains

- **`ui/`** - Base UI Components
  - Reusable design system components (Button, Dialog, Card, etc.)
  - Built on Radix UI primitives with Tailwind styling
  - Type-safe prop interfaces for all components

- **`duel/`** - Duel-Specific Components
  - `monaco-editor.tsx` - Monaco Editor wrapper with custom theme
  - `code-editor.tsx` - High-level editor component
  - `problem-panel.tsx` - Problem statement display
  - `output-terminal.tsx` - Code execution results
  - `duel-controls.tsx` - Submit/run/forfeit controls
  - `battle-navbar.tsx` - Duel session navigation

- **`lobby/`** - Lobby & Matchmaking Components
  - `matchmaking-dialog.tsx` - Queue management interface
  - `challenge-dialog.tsx` - Create challenge modal
  - `live-battles.tsx` - Active duels display
  - `open-challenges.tsx` - Available challenges list

#### `context/` - React Context Providers
- **Purpose**: Global state management with properly typed contexts
- **`duel-context.tsx`** - Combines duel session and code sync state
- Provides typed hooks for consuming context data

#### `hooks/` - Custom React Hooks
- **Purpose**: Business logic and side effects management
- **`use-duel-session.ts`** - Duel lifecycle, player status, timer management
- **`use-code-sync.ts`** - Real-time code synchronization between players
- **`use-websocket.ts`** - WebSocket connection management
- **Monaco Editor theme integration** - Moved to `monaco-editor.tsx` component

#### `lib/` - Utility Functions
- **Purpose**: Shared utilities and helper functions
- **`utils.ts`** - Common utility functions with proper typing

### Real-time System Architecture

The application uses WebSocket connections for real-time features with strict typing:

- **DuelContext**: Manages duel state and code synchronization with typed interfaces
- **WebSocket Integration**: Type-safe message handling for real-time communication
- **State Synchronization**: Ensures consistent state across connected clients
- **Player Management**: Tracks connection status, typing indicators, and game state

### Code Editor Integration

Monaco Editor integration with comprehensive TypeScript support:

- Custom "codeDuelDark" theme with GitHub-inspired styling
- Real-time collaborative editing with proper conflict resolution
- Language support with syntax highlighting and IntelliSense
- Read-only opponent view with visual differentiation

### UI System & Design

- **Design System**: Built on Radix UI with Tailwind CSS
- **Theme System**: Light/dark mode with `next-themes` integration
- **Typography**: Geist Sans (UI) and Geist Mono (code) font families
- **Component Architecture**: Consistent patterns following shadcn/ui conventions
- **Responsive Design**: Mobile-first approach with breakpoint consistency

## Development Notes

- **Package Manager**: Use `pnpm` for all dependency management
- **Build System**: Turbopack for fast development and production builds
- **WebSocket Server**: Expected at `ws://localhost:3001` for local development
- **Client-Side Rendering**: Monaco Editor and WebSocket connections require CSR
- **Animation**: Framer Motion for smooth transitions and interactions
- **Analytics**: Vercel Analytics integrated for production usage tracking
- **Type Checking**: Run TypeScript compiler checks before commits

## Proper TypeScript Usage

### TypeScript Check after doing the work
- After completing your work, You must **only** run TypeScript compilation using the exact command:

```bash
npx tsc
```
- Do **not** add any extra flags (e.g., `--noEmit`, `--watch`, `--incremental`, etc.).  
- Do **not** run or suggest running any dev servers (e.g., `npm run dev`, `yarn dev`, `pnpm dev`, `next dev`, etc.)

### Absolute TypeScript Rule: No `any` Allowed

You must **NEVER** use `any` in TypeScript.  
This includes, but is not limited to:

## ❌ Disallowed Usages
Direct type annotations:  
  ```ts
  let x: any
```

Function parameters or return types:

  ```ts
  function foo(bar: any): any {}
  ```
Type assertions:

  ```ts
  value as any
  ```
Mapped or indexed types:

  ```ts
  Record<string, any>
  { [key: string]: any }
  ```
Generic defaults:

  ```ts
  <T = any>
  ```
* Utility types involving `any`.
* Higher-order functions (`.map()`, `.forEach()`, `.reduce()`, `.filter()`, etc.):

  ```ts
  array.map((item: any) => ...)
  array.forEach((el: any) => ...)
  ```

## ✅ Correct Alternatives

* If the type is unknown → use `unknown`.
* If you know the structure → define an explicit `interface` or `type`.
* If TypeScript can infer it → omit the type and let inference work.

  ```ts
  array.map(item => ...) // inferred
  ```
* For generic placeholders → write a generic properly:

  ```ts
  function identity<T>(arg: T): T { return arg }
  ```

## ⚠️ Enforcement

* `any` in **any form** is forbidden.
* You must **not** use `(item: any)` in array methods or callbacks.
* You must **not** fall back to `any` even temporarily.

Your output must be **100% free of `any`** in all situations.
