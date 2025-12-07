# MovieMate - Production Deployment Guide

## Quick Start (Development)

### 1. Start MongoDB
Ensure MongoDB is running locally or use MongoDB Atlas

### 2. Start ML Service
```bash
cd ML
python App.py
# Runs on http://localhost:5000
```

### 3. Start Backend
```bash
cd BackEnd
npm install
npm run dev
# Runs on http://localhost:4000
```

### 4. Start Frontend
```bash
cd "FrontEnd/movie/movie"
npm install
npm start
# Runs on http://localhost:3000
```

## Production Deployment

### Frontend (Vercel/Netlify)

1. Build the app:
```bash
cd "FrontEnd/movie/movie"
npm run build
```

2. Deploy to Vercel:
```bash
npm i -g vercel
vercel --prod
```

3. Update API URLs in code to production endpoints

### Backend (Render/Railway/Heroku)

1. Create `Procfile`:
```
web: node Server.js
```

2. Set environment variables:
- PORT
- JWT_SECRET_KEY
- MONGODB_URI
- TMDB_API_KEY
- ML_SERVICE_URL

3. Deploy to Render:
- Connect GitHub repo
- Set build command: `npm install`
- Set start command: `node Server.js`

### ML Service (Render/Railway)

1. Create `Procfile`:
```
web: python App.py
```

2. Ensure `requirements.txt` exists

3. Deploy to Render:
- Connect GitHub repo
- Set build command: `pip install -r requirements.txt`
- Set start command: `python App.py`

### Database (MongoDB Atlas)

1. Create cluster at mongodb.com
2. Whitelist all IPs (0.0.0.0/0) for production
3. Get connection string
4. Update MONGODB_URI in backend

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.com
REACT_APP_ML_URL=https://your-ml-service.com
```

### Backend (.env)
```
PORT=4000
JWT_SECRET_KEY=your_strong_secret_key
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/moviemate
TMDB_API_KEY=d147107f102b8d03e41507c2503fa69e
ML_SERVICE_URL=https://your-ml-service.com
NODE_ENV=production
```

### ML Service (.env)
```
PORT=5000
FLASK_ENV=production
```

## Performance Optimizations

### Frontend
- Enable lazy loading for images
- Use React.memo for expensive components
- Implement code splitting
- Enable service workers for PWA
- Compress images

### Backend
- Enable compression middleware
- Implement rate limiting
- Use Redis for caching
- Enable CORS properly
- Use helmet for security

### ML Service
- Cache model predictions
- Use gunicorn for production
- Implement request queuing
- Optimize pickle file loading

## Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS only
- [ ] Implement rate limiting
- [ ] Sanitize user inputs
- [ ] Use helmet.js
- [ ] Enable CORS properly
- [ ] Hide error stack traces
- [ ] Use environment variables
- [ ] Regular dependency updates

## Monitoring

### Recommended Tools
- Frontend: Vercel Analytics, Google Analytics
- Backend: PM2, New Relic, DataDog
- Database: MongoDB Atlas monitoring
- Errors: Sentry

## Scaling

### Horizontal Scaling
- Use load balancers
- Deploy multiple backend instances
- Use CDN for static assets
- Implement caching layer

### Database Scaling
- Use MongoDB replica sets
- Implement read replicas
- Use indexes properly
- Regular backups

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor error logs
- Check performance metrics
- Backup database weekly
- Review security patches

## Troubleshooting

### Common Issues

**CORS Errors**
- Check backend CORS configuration
- Verify frontend API URLs

**ML Service Timeout**
- Increase timeout limits
- Optimize model loading
- Use caching

**Database Connection**
- Check MongoDB Atlas whitelist
- Verify connection string
- Check network connectivity

## Cost Optimization

### Free Tier Options
- Frontend: Vercel (Free)
- Backend: Render (Free tier)
- ML: Render (Free tier)
- Database: MongoDB Atlas (512MB free)

### Estimated Monthly Costs (Paid)
- Frontend: $0-20
- Backend: $7-25
- ML Service: $7-25
- Database: $9-57
- Total: ~$25-130/month

## Support

For issues, contact: support@moviemate.com
