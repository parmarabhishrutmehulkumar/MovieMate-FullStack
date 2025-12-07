# MovieMate - Complete Deployment Guide

## 🚀 Quick Deploy (Recommended)

### Option 1: Free Deployment (Vercel + Render + MongoDB Atlas)

**Total Time: 15-20 minutes**
**Cost: FREE**

---

## 📦 Step 1: Prepare Your Code

### 1.1 Update Frontend API URLs

Create `.env` file in `FrontEnd/movie/movie/`:

```env
REACT_APP_API_URL=https://your-backend.onrender.com
REACT_APP_ML_URL=https://your-ml-service.onrender.com
```

Update API calls in `src/Pages/Home.js` and `src/Pages/Login.js`:

```javascript
// Replace http://localhost:4000 with
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Use it like:
fetch(`${API_URL}/login`, ...)
```

### 1.2 Update Backend CORS

In `BackEnd/Server.js`, update CORS:

```javascript
const corsOptions = {
  origin: ["http://localhost:3000", "https://your-frontend.vercel.app"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};
```

---

## 🗄️ Step 2: Deploy Database (MongoDB Atlas)

### 2.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (FREE)
3. Create a FREE cluster (M0)
4. Choose AWS, region closest to you
5. Cluster name: `MovieMate`

### 2.2 Setup Database Access
1. Database Access → Add New User
2. Username: `moviemate`
3. Password: Generate secure password (save it!)
4. Role: `Read and write to any database`

### 2.3 Setup Network Access
1. Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Confirm

### 2.4 Get Connection String
1. Clusters → Connect → Connect your application
2. Copy connection string
3. Replace `<password>` with your password
4. Save this for later!

**Example:**
```
mongodb+srv://moviemate:YOUR_PASSWORD@moviemate.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 🐍 Step 3: Deploy ML Service (Render)

### 3.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (FREE)

### 3.2 Push ML Code to GitHub
```bash
cd ML
git init
git add .
git commit -m "ML service"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moviemate-ml.git
git push -u origin main
```

### 3.3 Deploy on Render
1. Dashboard → New → Web Service
2. Connect GitHub repository
3. Settings:
   - **Name:** `moviemate-ml`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python App.py`
   - **Plan:** Free
4. Click "Create Web Service"
5. Wait 5-10 minutes for deployment
6. Copy the URL: `https://moviemate-ml.onrender.com`

---

## 🔧 Step 4: Deploy Backend (Render)

### 4.1 Push Backend to GitHub
```bash
cd BackEnd
git init
git add .
git commit -m "Backend service"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moviemate-backend.git
git push -u origin main
```

### 4.2 Deploy on Render
1. Dashboard → New → Web Service
2. Connect GitHub repository
3. Settings:
   - **Name:** `moviemate-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node Server.js`
   - **Plan:** Free

### 4.3 Add Environment Variables
Click "Environment" tab, add:

```
PORT=4000
JWT_SECRET_KEY=your_super_secret_key_here_change_this
MONGODB_URI=mongodb+srv://moviemate:YOUR_PASSWORD@moviemate.xxxxx.mongodb.net/moviemate?retryWrites=true&w=majority
TMDB_API_KEY=d147107f102b8d03e41507c2503fa69e
ML_SERVICE_URL=https://moviemate-ml.onrender.com
NODE_ENV=production
```

4. Click "Create Web Service"
5. Wait 5-10 minutes
6. Copy URL: `https://moviemate-backend.onrender.com`

---

## 🎨 Step 5: Deploy Frontend (Vercel)

### 5.1 Update Environment Variables

Create `.env.production` in `FrontEnd/movie/movie/`:

```env
REACT_APP_API_URL=https://moviemate-backend.onrender.com
REACT_APP_ML_URL=https://moviemate-ml.onrender.com
```

### 5.2 Update API Calls

In `src/Pages/Login.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
// Use: axios.post(`${API_URL}/login`, ...)
```

In `src/Pages/Register.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
// Use: axios.post(`${API_URL}/register`, ...)
```

In `src/Pages/Home.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
// Use: fetch(`${API_URL}/api1/recommend`, ...)
```

### 5.3 Build and Test Locally
```bash
cd "FrontEnd/movie/movie"
npm run build
```

### 5.4 Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Follow prompts:
- Project name: `moviemate`
- Framework: `Create React App`
- Build command: `npm run build`
- Output directory: `build`

**Your app is now live!** 🎉

URL: `https://moviemate-xxxxx.vercel.app`

---

## 🔄 Alternative: Deploy All on Render

### Frontend on Render
1. New → Static Site
2. Connect GitHub
3. Build: `npm run build`
4. Publish: `build`

---

## ⚙️ Step 6: Update CORS in Backend

After deployment, update `BackEnd/Server.js`:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://moviemate-xxxxx.vercel.app", // Your Vercel URL
    "https://your-custom-domain.com"
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};
```

Redeploy backend:
```bash
git add .
git commit -m "Update CORS"
git push
```

---

## 🎯 Step 7: Test Your Deployment

1. Visit your Vercel URL
2. Register a new account
3. Login
4. Browse movies
5. Like/add to watchlist
6. Search and filter
7. Get recommendations

---

## 🐛 Troubleshooting

### Issue: "Network Error" on Login
**Fix:** Check CORS settings in backend

### Issue: "Cannot connect to database"
**Fix:** Verify MongoDB connection string and IP whitelist

### Issue: ML recommendations not working
**Fix:** Check ML service is running on Render

### Issue: Movies not loading
**Fix:** Verify TMDB API key is correct

### Issue: Render services sleeping
**Fix:** Free tier sleeps after 15 min inactivity. First request takes 30s to wake up.

---

## 💰 Cost Breakdown

### FREE Tier (Recommended for Testing)
- **Frontend (Vercel):** FREE
- **Backend (Render):** FREE (sleeps after 15 min)
- **ML Service (Render):** FREE (sleeps after 15 min)
- **Database (MongoDB Atlas):** FREE (512MB)
- **Total:** $0/month

### Paid Tier (Production Ready)
- **Frontend (Vercel Pro):** $20/month
- **Backend (Render Starter):** $7/month
- **ML Service (Render Starter):** $7/month
- **Database (MongoDB M10):** $9/month
- **Total:** $43/month

---

## 🚀 Quick Commands Reference

### Frontend
```bash
cd "FrontEnd/movie/movie"
npm install
npm start          # Development
npm run build      # Production build
vercel --prod      # Deploy
```

### Backend
```bash
cd BackEnd
npm install
npm run dev        # Development
node Server.js     # Production
```

### ML Service
```bash
cd ML
pip install -r requirements.txt
python App.py      # Run service
```

---

## 📝 Post-Deployment Checklist

- [ ] All services are running
- [ ] Database connection works
- [ ] User registration works
- [ ] User login works
- [ ] Movies load correctly
- [ ] Search works
- [ ] Recommendations work
- [ ] Like/Watchlist works
- [ ] Profile page works
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Environment variables set

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET_KEY
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS only
- [ ] Restrict CORS origins
- [ ] Don't commit .env files
- [ ] Use environment variables
- [ ] Enable rate limiting
- [ ] Sanitize user inputs

---

## 📞 Support

If you face issues:
1. Check Render logs: Dashboard → Service → Logs
2. Check Vercel logs: Dashboard → Deployments → Logs
3. Check browser console for errors
4. Verify all environment variables

---

## 🎉 You're Done!

Your MovieMate app is now live and accessible worldwide!

Share your URL: `https://moviemate-xxxxx.vercel.app`

---

## 🔄 Future Updates

To update your app:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel auto-deploys on push
# Render auto-deploys on push
```

---

## 🌟 Optional: Custom Domain

### Add Custom Domain to Vercel
1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain: `moviemate.com`
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

### Update Backend CORS
Add your custom domain to CORS origins.

---

**Congratulations! Your Netflix-style movie app is now live! 🎬🍿**
