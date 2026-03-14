# Animal-Sighting-Tracker

Full-Stack PERN Project: Animal Sighting Tracker Week 10

# Animal-Sighting-Tracker

A full‑stack wildlife tracking application built with React, Express, Node.js, and PostgreSQL.
This app allows users to record wildlife sightings, browse individuals and species, and filter sightings by date range. It demonstrates relational data modeling, REST API design, and a clean React frontend.

# Features

Species Management

- Add new species through a dedicated form
- View all species stored in the database

Individuals (Animals)

- Individuals represent the animals being tracked
- Each individual has: Nickname, Scientific name, and Species
- Individuals are stored in the database and referenced by sightings
- (Individuals are created via backend or seed data — no UI form)

Sightings

- Add new sightings with: Date/time, Location, Health status, Observer email, and Individual ID
- View all sightings with joined individual data
  Delete or update sightings

Date‑Range Search

- Filter sightings between two dates
- Frontend validation prevents invalid ranges
- Backend returns all matching sightings sorted by date

# Database Structure

# Backend (Express + Node.js)

The backend exposes a REST API with three routers:

/species

- GET /species – list all species
- POST /species – add a new species

/individuals

- GET /individuals – list all individuals
- POST /individuals – backend supports adding individuals (no UI form)

/sightings

- GET /sightings – list all sightings with individual data
- POST /sightings – create a new sighting
- PUT /sightings/:id – update a sighting
- DELETE /sightings/:id – delete a sighting

Date‑Range Search Route

- GET /sightings/search?start=YYYY-MM-DD&end=YYYY-MM-DD
- Important:  
  /search must be defined before /:id to avoid Express treating “search” as an ID.

# Frontend

Species Form

- Add new species
- Sends POST request to /species

New Sighting Form

- Add a new sighting
- Dropdown or input for individual ID
- Sends POST request to /sightings

Sightings List

- Displays all sightings
- Shows nickname + sighting details
- Supports delete/update actions

Date‑Range Search

- Two date inputs
- Validates start ≤ end
- Fetches from /sightings/search
- Updates the sightings list dynamically

# Tech Stack

Frontend

- React
- Vite
- Fetch API
- CSS

Backend

- Node.js
- Express
- pg‑promise

Database

- PostgreSQL

# How to Run the Project

Backend

- cd server
- npm install
- node server.js

Frontend

- cd client
- npm install
- npm run dev
