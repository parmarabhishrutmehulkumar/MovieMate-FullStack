import os
print("Current working directory:", os.getcwd())
print("App.py directory:", os.path.dirname(os.path.abspath(__file__)))
print("Files in current dir:", os.listdir(os.path.dirname(os.path.abspath(__file__))))

import os, pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def safe_load(filename):
    path = os.path.join(BASE_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Missing file: {path}")
    with open(path, "rb") as f:
        return pickle.load(f)

raw_movies = safe_load("movies_dict.pkl")
similarity = safe_load("similarity.pkl")

import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
CORS()

app = Flask(__name__)

# Load pickles (must exist in same folder)
try:
    raw_movies = pickle.load(open("movies_dict.pkl", "rb"))
except Exception as e:
    raw_movies = None
    print("Failed loading movies_dict.pkl:", e)

try:
    similarity = pickle.load(open("similarity.pkl", "rb"))
except Exception as e:
    similarity = None
    print("Failed loading similarity.pkl:", e)

# Normalize movies into a DataFrame with a 'title' column
if raw_movies is None:
    movies_df = pd.DataFrame(columns=["title"])
else:
    if isinstance(raw_movies, dict):
        # dict probably contains columns -> DataFrame
        try:
            movies_df = pd.DataFrame(raw_movies)
        except Exception:
            # fallback: try keys/values
            movies_df = pd.DataFrame([raw_movies])
    elif isinstance(raw_movies, pd.DataFrame):
        movies_df = raw_movies
    else:
        # try to convert to DataFrame
        try:
            movies_df = pd.DataFrame(raw_movies)
        except Exception:
            movies_df = pd.DataFrame(columns=["title"])

# Ensure 'title' column exists
if "title" not in movies_df.columns:
    # try common alternatives
    for col in ["name", "movie_title"]:
        if col in movies_df.columns:
            movies_df = movies_df.rename(columns={col: "title"})
            break
    if "title" not in movies_df.columns:
        movies_df["title"] = ""

# Helper: recommend by title (returns list of titles)
def recommend_titles(movie_name, top_k=5):
    if similarity is None or movies_df.empty:
        return []
    if not movie_name:
        return []
    lower_titles = movies_df["title"].astype(str).str.lower()
    target = str(movie_name).strip().lower()
    matches = lower_titles[lower_titles == target]
    if matches.empty:
        matches = lower_titles[lower_titles.str.contains(target, na=False)]
    if matches.empty:
        return []
    idx = matches.index[0]
    distances = similarity[idx]
    ranked = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)
    top = [movies_df.iloc[i[0]]["title"] for i in ranked if i[0] != idx][:top_k]
    return [str(t) for t in top]

@app.route("/recommend", methods=["POST"])
def recommend_route():
    data = request.get_json() or {}
    movie_name = data.get("movie") or data.get("movie_name") or data.get("movieName")
    recs = recommend_titles(movie_name, top_k=5)
    return jsonify({"recommendations": recs})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}
    movie_name = data.get("movie_name") or data.get("movie")
    if not movie_name:
        return jsonify({"error": "movie_name required"}), 400
    recs = recommend_titles(movie_name, top_k=10)
    return jsonify({"recommendations": recs})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
