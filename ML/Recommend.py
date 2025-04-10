import sys
import pickle
import json
import os

try:
    # Ensure correct working directory and absolute file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    movies_path = os.path.join(current_dir, 'movies_dict.pkl')
    sim_path = os.path.join(current_dir, 'similarity.pkl')

    # Load data
    movies = pickle.load(open(movies_path, 'rb'))
    similarity = pickle.load(open(sim_path, 'rb'))

except Exception as e:
    # Print error to stderr and JSON error to stdout
    print(f"Error loading files: {str(e)}", file=sys.stderr)
    print(json.dumps(["Error loading model files."]), flush=True)
    sys.exit(1)

def recommend(movie):
    movie = movie.lower()
    titles = [str(m).lower() for m in movies['title']]

    if movie not in titles:
        return ["Movie not found."]

    index = next(i for i, t in enumerate(movies['title']) if t.lower() == movie)
    distances = similarity[index]
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

    return [movies['title'][i[0]] for i in movie_list]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps(["No movie provided."]), flush=True)
        sys.exit(1)

    movie_name = sys.argv[1]
    recommendations = recommend(movie_name)

    # ✅ This is the only line that sends output to Node
    print(json.dumps(recommendations), flush=True)
