# Chat Application

## Overview
This is a real-time chat application built with Node.js and Express. It features a backend server that handles message storage and retrieval, with a clean client-side interface.

## Project Status
- **Created:** November 4, 2025
- **Node.js Version:** v20.19.3 (LTS)
- **Status:** Running and operational
- **Server:** Running on http://0.0.0.0:5000

## Project Structure
```
/
├── ClientSide/
│   ├── Chat.html        # Main chat interface
│   ├── Chat.css         # Chat-specific styles
│   ├── Chat.js          # Client-side chat logic
│   └── Universal.css    # Shared styles
├── ServerSide/
│   ├── server.js        # Express server with API endpoints
│   ├── Chat.json        # Message storage
│   └── ChatInternal.js  # Internal chat logic
├── package.json         # Project dependencies and scripts
├── .gitignore           # Git ignore configuration
└── replit.md            # This documentation file
```

## Configuration
- **Runtime:** Node.js 20 (LTS)
- **Framework:** Express 5.1.0
- **Port:** 5000 (bound to 0.0.0.0 for external access)
- **Entry Point:** ServerSide/server.js

## Dependencies
- **express** (5.1.0) - Web server framework
- **cors** (2.8.5) - Cross-origin resource sharing
- **live-server** (1.2.2) - Development server

## Available Scripts
- `npm start` - Starts the chat server on port 5000
- `npm test` - Placeholder for tests

## API Endpoints
- `GET /api/messages` - Retrieves all chat messages from Chat.json
- `POST /api/messages` - Saves a new chat message to Chat.json

## Recent Changes
- **2025-11-04:** Chat application fixes
  - Fixed missing "start" script in package.json
  - Fixed file path references in server.js (Chat.json location)
  - Fixed static file serving to point to ClientSide folder
  - Installed all required dependencies (express, cors, live-server)
  - Configured workflow for web preview on port 5000
  - Server is running successfully

## User Preferences
None specified yet.

## Project Architecture
Full-stack chat application with:
- **Backend**: Express.js REST API handling message CRUD operations
- **Frontend**: Vanilla JavaScript SPA for chat interface
- **Storage**: File-based JSON storage (Chat.json)
- **Server Config**: Bound to 0.0.0.0:5000 for external accessibility
