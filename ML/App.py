from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model and data
movies = pickle.load(open('movies_dict.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))


def recommend(movie):
    movie = movie.lower()
    if movie.lower() not in [str(m).lower() for m in movies['title']]:

        return ["Movie not found."]
    
    index = next(i for i, t in enumerate(movies['title']) if t.lower() == movie)
    distances = similarity[index]
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    return [movies.iloc[i[0]].title for i in movie_list]

@app.route('/recommend', methods=['POST'])
def recommend_route():
    data = request.get_json()
    movie_name = data.get('movie')
    recommended = recommend(movie_name)
    return jsonify({'recommendations': recommended})

if __name__ == '__main__':
    app.run(debug=True)
print(type(movies))  # should say <class 'pandas.core.frame.DataFrame'>
print(movies.head())  # just to visually confirm
