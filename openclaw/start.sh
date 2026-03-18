#!/bin/bash

echo "Starting OpenClaw AI Company System..."

echo "Preparing system folders..."

mkdir -p logs
mkdir -p tasks
mkdir -p memory

echo "Starting dashboard..."

cd dashboard
npm start &
cd ..

echo "System started."