  import React from "react";
  import "./Home.css";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import Card from "../../components/card/Card";
  import Pagination from "../../components/pagination/Pagination";

  export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchMovies = async (page) => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
          );
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
        setLoading(false);
      };
      fetchMovies(currentPage);
    }, [currentPage]);

    const handleNavigate = (id) => {
      navigate(`/${id}`);
    };

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <>
        <div className="page-container">
          <div className="content-wrap">
            <div className=" pt-5 px-5 home">
              <div className="home row text-center gy-5">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  movies.map((element, index) => (
                    <div
                      key={index}
                      className="col-6 col-sm-6 col-md-3  d-flex justify-content-center mb-4 custom-col"
                      onClick={() => handleNavigate(element.id)}
                    >
                      <Card
                        poster_path={element.poster_path}
                        title={element.title}
                        rating={Math.round(element.vote_average * 10) / 10}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <Pagination
            className="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  }
