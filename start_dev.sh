#!/bin/bash

# MARRVEL Startup Script
# This script starts both the Backend (Express) and Frontend (Angular)

# Default ports
BACKEND_PORT=8783
FRONTEND_PORT=8782

echo "🚀 Starting MARRVEL..."

# Function to handle cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down MARRVEL..."
    #kill $BACKEND_PID $FRONTEND_PID
    kill $FRONTEND_PID
    exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# # 1. Start Backend
# echo "📦 Starting Backend on port $BACKEND_PORT..."
# cd server
# PORT=$BACKEND_PORT npm start &
# BACKEND_PID=$!
# cd ..

# 2. Start Frontend
echo "🎨 Starting Frontend on port $FRONTEND_PORT..."
cd client
npm start -- --port $FRONTEND_PORT &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ MARRVEL is starting up!"
#echo "🔗 Backend: http://localhost:$BACKEND_PORT"
echo "🔗 Frontend: http://localhost:$FRONTEND_PORT"
echo "Press Ctrl+C to stop both servers."

# Wait for background processes
wait
