# 🚀 Quick Deploy Guide (5 Minutes)

## Prerequisites
- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (free)

---

## Step 1: MongoDB Atlas (2 minutes)

1. Go to https://mongodb.com/cloud/atlas
2. Sign up → Create FREE cluster
3. Database Access → Add User (save password!)
4. Network Access → Allow 0.0.0.0/0
5. Copy connection string

---

## Step 2: Deploy ML Service (1 minute)

1. Go to https://render.com
2. New → Web Service → Connect GitHub
3. Settings:
   - Name: `moviemate-ml`
   - Environment: `Python 3`
   - Build: `pip install -r requirements.txt`
   - Start: `python App.py`
4. Deploy (wait 5 min)
5. Copy URL

---

## Step 3: Deploy Backend (1 minute)

1. Render → New Web Service
2. Settings:
   - Name: `moviemate-backend`
   - Environment: `Node`
   - Build: `npm install`
   - Start: `node Server.js`
3. Add Environment Variables:
   ```
   PORT=4000
   JWT_SECRET_KEY=change_this_secret_key
   MONGODB_URI=your_mongodb_connection_string
   TMDB_API_KEY=d147107f102b8d03e41507c2503fa69e
   ML_SERVICE_URL=your_ml_service_url
   ```
4. Deploy (wait 5 min)
5. Copy URL

---

## Step 4: Deploy Frontend (1 minute)

1. Update `src/Pages/Login.js`, `Register.js`, `Home.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.onrender.com';
   ```

2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Deploy:
   ```bash
   cd "FrontEnd/movie/movie"
   vercel --prod
   ```

4. Follow prompts → Done!

---

## Step 5: Update CORS

In `BackEnd/Server.js`:
```javascript
const corsOptions = {
  origin: ["https://your-vercel-url.vercel.app"],
  credentials: true
};
```

Push to GitHub → Auto-deploys!

---

## ✅ Done!

Your app is live at: `https://your-app.vercel.app`

**Test:**
- Register account
- Login
- Browse movies
- Like/Watchlist
- Search & Filter

---

## 🐛 Issues?

**Movies not loading?**
- Check TMDB API key

**Login fails?**
- Check MongoDB connection
- Verify CORS settings

**Recommendations not working?**
- ML service might be sleeping (free tier)
- Wait 30 seconds and retry

---

## 💡 Tips

- Free tier services sleep after 15 min
- First request takes 30s to wake up
- Upgrade to paid for always-on
- Use custom domain for professional look

---

**That's it! You're deployed! 🎉**
