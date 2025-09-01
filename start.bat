@echo off
echo Starting Todo Application

echo Starting Go backend server...
start cmd /k "cd backend && go run main.go"

echo Starting React frontend...
start cmd /k "cd frontend && npm start"

echo Todo Application started!
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
