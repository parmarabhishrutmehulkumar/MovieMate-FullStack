const ML_SERVICE = process.env.ML_SERVICE_URL || "http://localhost:5000";
const TMDB_KEY = process.env.TMDB_API_KEY || "d147107f102b8d03e41507c2503fa69e";

export async function getRecommendations(req, res) {
  try {
    const { movieName } = req.body;
    if (!movieName) return res.status(400).json({ error: "movieName required" });

    // call ML service (uses global fetch available in Node 18+)
    const mlResp = await fetch(`${ML_SERVICE.replace(/\/$/, "")}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_name: movieName }),
    });
    const mlData = await mlResp.json();
    console.log("ML data:", mlData);

    const ids = Array.isArray(mlData.recommendations)
      ? mlData.recommendations
      : Array.isArray(mlData)
      ? mlData
      : [];

    // fetch TMDB details for ids (if ML returned titles instead of ids, adapt here)
    const moviePromises = ids.slice(0, 10).map(async (idOrTitle) => {
      // if id is numeric, fetch by id; otherwise search by title
      if (typeof idOrTitle === "number" || /^\d+$/.test(String(idOrTitle))) {
        const r = await fetch(`https://api.themoviedb.org/3/movie/${idOrTitle}?api_key=${TMDB_KEY}`);
        return r.ok ? r.json() : null;
      } else {
        const r = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(
            String(idOrTitle)
          )}`
        );
        const data = await r.json();
        return data.results && data.results[0] ? data.results[0] : null;
      }
    });

    const movies = (await Promise.all(moviePromises)).filter(Boolean);
    return res.json({ recommendations: movies });
  } catch (err) {
    console.error("recommendController error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}