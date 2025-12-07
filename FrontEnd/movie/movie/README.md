# MovieMate - Netflix-Style Movie Recommendation System

A production-level movie recommendation web application with a sleek Netflix-inspired UI.

## Features

- 🎬 **Netflix-Style UI** - Modern, responsive design with smooth animations
- 🔍 **Smart Search** - Search movies with expandable search bar
- 🤖 **AI Recommendations** - ML-powered movie recommendations
- 🎯 **Genre Categories** - Browse by Action, Comedy, Horror, and more
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Smooth Animations** - Framer Motion powered transitions
- 🎥 **Movie Details** - Detailed modal with cast, crew, and ratings
- 🔄 **Auto-Rotating Hero** - Featured movies carousel

## Tech Stack

### Frontend
- React 18
- Framer Motion (animations)
- React Router DOM
- Material-UI
- React Icons
- React Modal

### Backend
- Node.js + Express
- MongoDB (User management)
- JWT Authentication
- CORS enabled

### ML Service
- Python Flask
- Scikit-learn
- Pandas
- TMDB API integration

## Installation

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB

### Frontend Setup
```bash
cd "FrontEnd/movie/movie"
npm install
npm start
```

### Backend Setup
```bash
cd BackEnd
npm install
npm run dev
```

### ML Service Setup
```bash
cd ML
pip install flask flask-cors pandas scikit-learn
python App.py
```

## Environment Variables

### Backend (.env)
```
PORT=4000
JWT_SECRET_KEY=your_secret_key
MONGODB_URI=your_mongodb_uri
TMDB_API_KEY=d147107f102b8d03e41507c2503fa69e
ML_SERVICE_URL=http://localhost:5000
```

## API Endpoints

### Backend
- POST `/register` - User registration
- POST `/login` - User login
- POST `/api1/recommend` - Get movie recommendations

### ML Service
- POST `/recommend` - Get recommendations by movie name
- POST `/predict` - Get predictions

## Features Breakdown

### Hero Section
- Auto-rotating featured movies
- Gradient overlays
- Play and Info buttons
- Mute/Unmute toggle

### Movie Rows
- Horizontal scrolling
- Hover effects with scale
- Navigation arrows
- Lazy loading

### Movie Cards
- Netflix-style hover overlay
- Action buttons (Play, Add, Like, Info)
- Rating and year display
- Smooth animations

### Movie Modal
- Full movie details
- Cast and crew information
- Trailer support (if available)
- Responsive design

### Search Bar
- Expandable animation
- Real-time search
- Recommendation trigger
- Clean UI

## Performance Optimizations

- Lazy loading images
- Skeleton loaders
- Debounced search
- Optimized re-renders
- Code splitting ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Credits

- TMDB API for movie data
- Netflix for UI inspiration
