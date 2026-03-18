#!/bin/bash

echo "Installing OpenClaw AI Company System..."

echo "Updating system..."
sudo apt update

echo "Installing Node.js if missing..."

if ! command -v node &> /dev/null
then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

echo "Installing dashboard dependencies..."

cd dashboard
npm install
cd ..

echo "Preparing folders..."

mkdir -p logs
mkdir -p tasks
mkdir -p memory

echo "Starting system..."

bash openclaw/start.sh

echo "Installation complete."