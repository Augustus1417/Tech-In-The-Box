#!/bin/bash
# Copy .env files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Build and start containers
docker compose up --build
