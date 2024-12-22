import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(location.state?.results || []);
  const [loading, setLoading] = useState(!results.length);
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!results.length && query) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${encodeURIComponent(
              query
            )}&page=1`
          );
          const data = await response.json();
          setResults(data.results);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query, results.length]);
  function handleNavigate(id) {
    navigate(`/${id}`);
  }

  if (loading) return <p>Loading...</p>;
  if (!results.length) return <p>No results found</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light text-center">
        Search Results for "{query}"
      </h2>
      <div className="row">
        {results.map((movie) => (
          <div
            className="col-6 col-md-4 col-lg-3 mb-4"
            key={movie.id}
            onClick={() => handleNavigate(movie.id)}
          >
            <Card
              poster_path={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
