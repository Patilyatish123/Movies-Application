import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card/Card";
import Pagination from "../../components/pagination/Pagination";
import "./TopRated.css";
import { useNavigate } from "react-router-dom";
const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1"
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };
    fetchMovies();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  function handleNavigate(id) {
    navigate(`/top-rated/${id}`);
  }
  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <div className=" pt-5 px-5  home ">
            <div className=" toprated row text-start   gy-5">
              {loading ? (
                <p>Loading...</p>
              ) : (
                currentMovies.map((element, index) => (
                  <div
                    className="col-12 col-sm-6  col-md-4 col-lg-3 d-flex  justify-content-center mb-4 cust-col"
                    key={index}
                    onClick={() => handleNavigate(element.id)}
                  >
                    <Card
                      poster_path={element.poster_path}
                      title={element.title}
                      rating={element.rating}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TopRated;
