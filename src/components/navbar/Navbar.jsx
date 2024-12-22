import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = ({ onSearchResults }) => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      try {
        const [homeResponse, topRatedResponse, upcomingResponse] =
          await Promise.all([
            axios.get(`https://api.themoviedb.org/3/search/movie`, {
              params: {
                api_key: API_KEY,
                language: "en-US",
                query: search.trim(),
                page: 1,
              },
            }),
            axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: 1,
              },
            }),
            axios.get(`https://api.themoviedb.org/3/movie/upcoming`, {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: 1,
              },
            }),
          ]);
        const homeResults = homeResponse.data.results;
        const topRatedResults = topRatedResponse.data.results.filter((movie) =>
          movie.title.toLowerCase().includes(search.trim().toLowerCase())
        );
        const upcomingResults = upcomingResponse.data.results.filter((movie) =>
          movie.title.toLowerCase().includes(search.trim().toLowerCase())
        );
        const combinedResults = [
          ...homeResults,
          ...topRatedResults,
          ...upcomingResults,
        ];
        const uniqueResults = Array.from(
          new Set(combinedResults.map((movie) => movie.id))
        ).map((id) => combinedResults.find((movie) => movie.id === id));
        navigate(`/search?query=${encodeURIComponent(search.trim())}`, {
          state: { results: uniqueResults },
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top mb-6">
        <div className="container">
          <a className="navbar-brand text-white" href="#">
            MovieDb
          </a>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Section */}
          <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto mb-3  mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/top-rated">
                  Top Rated
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navbar-active" to="/upcoming">
                  Upcoming
                </NavLink>
              </li>
            </ul>

            {/* Search Form */}
            <form
              className="d-flex "
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Movie Name"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <button
                className="btn btn-secondary"
                type="submit"
                results={onSearchResults}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
