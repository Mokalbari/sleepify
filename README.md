# Sleepify App
Sleepify is a Spotify-inspired music streaming app with a unique twist:
it embraces a 90s' aesthetic with a neobrutalist design.

Dive in the nostalgia while enjoying 2024 Next Features.

## Table of content
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation) 
4. [Project Structure](#project-structure)
5. [Core Feature Description](#core-feature-description)
   - [useSleepifyState](#useSleepifyState)
   - [useSleepifyAudio](#useSleepifyAudio) 
   - [useSleepifyPlayer](#useSleepifyPlayer) 
   - [useSleepify](#useSleepify) 
5. [Roadmap](#roadmap)
   - [Authentification](#authentification)
   - [useOptimistic](#useOptimistic) 
6. [Contributing](#contributing)

## Features
With Sleepify, you can:
- Play, pause, skip back and forth a playlist.
- Get to your favorite part of the song with a built-in time seeker.
- Adjust the volume so your neighbor can enjoy your music better.
- Add tracks to a favorite playlist and listen to your favorite playlist in one go.
- View the app from mobile (from ~320px) to desktop.
- Sing the lyrics while listening to the music like the start you're meant to be.

## Tech Stack
With app was built using **NextJS15** and **React 19**.
The main ingredients here are (but not limited to):
- TypeScript
- TailwindCSS
- Vercel Postgres
- Lucide-React
- Hosting: **Vercel**.

You can find the whole description out in package.json.
Take some time to skim through it before initialising the project.
Keep in mind this is a POC.
The tools used here are minimal to keep this app as lightweight as possible.

## Getting Started
### Prerequisites
Before you start, make sure you meet the following requirement:
- Node.js 18.18+
- pnpm 9+

### Installation
1. `git clone git@github.com:Mokalbari/sleepify.git`
2. `cd sleepify`
3. `pnpm install`

The database is hosted on vercel.
So first time you fireup this project **it won't work**.
Contact : `rahoarau@gmail.com` to get your database credentials.

When you are approved :
4. Replace the `.env.sample` to `.env` and fill the fields with your credentials.
5. `pnpm dev` and visit : `http://localhost:3000`

## Project Structure
This app uses NextJS 15 App Router with src directory.

src
.
├── app                         # Everything a user can interact with
│   └── (main)                  # (main) route grouping
│       ├── api                 # API Layer for data fetching
│       │   └── likes           
│       ├── _components         # UI components related to the main page "/"
│       └── likes               # page "/likes"
│           └── _components     # UI components related to the page "/likes"
├── assets                      # SVG, images
├── components                  # Reusable components shared accross all pages
│   └── ui                      # Atoms of UI, part of a greater component
├── context                     # Global state management
│   ├── full-player             
│   ├── likes
│   ├── lyrics
│   ├── playlist
│   └── sleepify
├── hooks                       # Custom React Hooks
│   └── use-sleepify            # **App Core Feature**
├── lib                         # Collection of data and types definitions
│   └── types
├── seed                        # DB interaction for testing phase.
├── server                      # Server actions that happen accross multiples pages
├── styles                      # Globals.css and animations
└── utils                       # General toolbox
    ├── functions               # Reusable functions
    └── helpers                 

## Core Feature Description
Sleepify runs on three separate hooks (`@/hooks/use-sleepify`)
- A state manager : useSleepifyState
- An event and lifecycle manager : useSleepifyAudio
- A hook supervisor and toolbox provider : useSleepifyPlayer

Those files are thoroughly commented, so feel free to read them out in this order.
But here's a quick head's up of what you can find:

### useSleepifyState
useSleepifyState relies under the hood on several useState.
It keeps tracks of many things like the current track, the current playlist
or the playing state, the duration the volume...

useSleepifyState provides several methods attached to it to interact with a track.
It allows you to set a track, skip a song, or retrieve the duration of the track.

### useSleepifyAudio
useSleepifyAudio takes as a parameter a full copy of the state.
This hook binds the event listeners to the states defined above.
It ensures everything is in sync.

### useSleepifyPlayer
This hooks initializes the state and the event listeners and provides a bunch of
low-level interaction to the music. It acts as the main interface.
It returns a full copy of the state and a toolbox.

### useSleepify
Leaving `@/hooks/use-sleepify` to `@/context/sleepify`
Here the useSleepifyHook is initialized and the audioRef.
Everything is passed down to the context that handles the distribution to the app.

## Roadmap
So what's up next?

As mentioned above, Sleepify is at its early stage.
To get it through its baby phase (and if I had two more days):

### Authentification
- The test `USER_ID` is hardcoded everywhere.
- We can use NextAuth as it provides a simple and modern auth options

### useOptimistic
- Right now, the likes counter and like feature solely rely on the client. The state might fall out of sync with the server and there's no failsafe to handle it.
To prevent this, we can use NextJS with React useOptimistic hook to rely on server.

## Contributing
All contributions and feedbacks are welcome.
Fork this repo and make your changes. Submit a Pull Request.
Please follow conventionnal commits as much as possible.

thsnks. Appreciate.