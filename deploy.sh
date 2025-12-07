#!/bin/bash

echo "🚀 MovieMate Deployment Script"
echo "================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Frontend deployment
echo -e "${BLUE}Deploying Frontend...${NC}"
cd "FrontEnd/movie/movie"
npm install
npm run build
vercel --prod

echo -e "${GREEN}✅ Frontend deployed!${NC}"

# Instructions for backend
echo ""
echo -e "${BLUE}Backend Deployment:${NC}"
echo "1. Go to https://render.com"
echo "2. New → Web Service"
echo "3. Connect your GitHub repo (BackEnd folder)"
echo "4. Add environment variables from .env.example"
echo "5. Deploy!"

# Instructions for ML
echo ""
echo -e "${BLUE}ML Service Deployment:${NC}"
echo "1. Go to https://render.com"
echo "2. New → Web Service"
echo "3. Connect your GitHub repo (ML folder)"
echo "4. Deploy!"

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo "Don't forget to update CORS in backend with your Vercel URL"
