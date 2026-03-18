#!/bin/bash

echo "Installing OpenClaw AI Company System..."

echo "Creating required folders..."
mkdir -p logs
mkdir -p tasks
mkdir -p memory

echo "Installing dashboard dependencies..."

cd dashboard

if [ -f package.json ]; then
    npm install
fi

cd ..

echo "System installation complete."