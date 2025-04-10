import os
print("Files in this directory:", os.listdir())

import pandas as pd
import numpy as np
import ast
import nltk
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Ensure NLTK is ready
nltk.download('punkt')

# === 1. Load & Merge Data ===
# Get the current directory where the script is located
base_dir = os.path.dirname(__file__)
movies_path = os.path.join(base_dir, "tmdb_5000_movies.csv")
credits_path = os.path.join(base_dir, "tmdb_5000_credits.csv")

movies = pd.read_csv(movies_path)
credits = pd.read_csv(credits_path)

movies = movies.merge(credits, on='title')
movies = movies[['id', 'title', 'overview', 'genres', 'keywords', 'cast', 'crew']]
movies.dropna(inplace=True)

# === 2. Helper Functions for Preprocessing ===
def convert(obj):
    return [i['name'] for i in ast.literal_eval(obj)]

def convert_cast(obj):
    return [i['name'] for i in ast.literal_eval(obj)[:3]]

def get_director(obj):
    for i in ast.literal_eval(obj):
        if i["job"] == "Director":
            return [i['name']]
    return []

ps = PorterStemmer()

def stem(text):
    return " ".join([ps.stem(i) for i in text.split()])

def remove_space(x):
    return [i.replace(" ", "") for i in x]

# === 3. Apply Transformations ===
movies['genres'] = movies['genres'].apply(convert)
movies['keywords'] = movies['keywords'].apply(convert)
movies['cast'] = movies['cast'].apply(convert_cast)
movies['crew'] = movies['crew'].apply(get_director)
movies['overview'] = movies['overview'].apply(lambda x: x.split())

for feature in ['genres', 'keywords', 'cast', 'crew']:
    movies[feature] = movies[feature].apply(remove_space)

movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['crew']
new_df = movies[['id', 'title', 'tags']]
new_df.loc[:, 'tags'] = new_df['tags'].apply(lambda x: " ".join(x)).str.lower()
new_df.loc[:, 'tags'] = new_df['tags'].apply(stem)

# === 4. Vectorization ===
cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(new_df['tags']).toarray()

# === 5. Similarity Matrix ===
similarity = cosine_similarity(vectors)

# === 6. Recommend Function ===
def recommend(movie_title):
    movie_title = movie_title.lower()
    if movie_title not in new_df['title'].str.lower().values:
        return ["Movie not found in dataset."]
    
    movie_index = new_df[new_df['title'].str.lower() == movie_title].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    return [new_df.iloc[i[0]].title for i in movies_list]

import pickle

pickle.dump(new_df, open('movies_dict.pkl', 'wb'))
pickle.dump(similarity, open('similarity.pkl', 'wb'))
