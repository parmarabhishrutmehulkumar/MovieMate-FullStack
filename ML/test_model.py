from Model import recommend

# Test your function with a movie title from the dataset
results = recommend("Avatar")
print("Recommendations for 'Avatar':")
for r in results:
    print(r)
