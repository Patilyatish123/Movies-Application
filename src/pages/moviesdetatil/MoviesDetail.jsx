import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Pagination from "../../components/pagination/Pagination";
import "./MoviesDetail.css";
import CastCard from "../../components/castCard/CastCard";
export default function MoviesDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        setCast(response.data.cast.filter(member => member.profile_path));
      } catch (error) {
        console.error("Error fetching cast data:", error);
      }
    };
    fetchCast();
    fetchMovie();
  }, [id]);

  //logic for Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCast = cast.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cast.length / itemsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {data ? (
        <div>
          <div className="px-5 pt-5 pb-3">
            <div className="d-flex justify-content-center  bg-primary-subtle  rounded-2 flex-column-md">
              <div className="box1 pt-3">
                <div className="d-flex gap-2 flex-column-responsive ">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${data.poster_path}`}
                    alt=""
                    style={{ height: "180px", width: "120px" }}
                  />
                  <div className="movieinfo">
                    <h1 className="text-light">{data.title}</h1>
                    <p className="  movieinfo rating">
                      Rating : {Math.round(data.vote_average * 10) / 10}
                    </p>
                    <div className="moviedetails d-flex gap-3 p-0 m-0">
                    <p className="text-white m-0 text-center  rounded px-2 py-1  bg-info ">
                    {data.runtime ? `${data.runtime} min` : "Runtime not available"}
                    
                    </p>
                    <p className="text-light-emphasis m-0 text-center   px-2 py-1 h-100">{Array.isArray(data.genres) ? data.genres.map((genre) => genre.name).join(", ") : "Genres not available"}</p>
                    </div>
                    
                    <p className="text-light-emphasis pt-3 m-0  ">
                    Release Date: {new Date(data.release_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="overview">
                <h1 className="text-light ">Overview</h1>
                <p className="text-light-emphasis paragraph">{data.overview}</p>
                </div>
              </div>

              <div className="box2">
                <img
                  className="backdropimg"
                  src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="cast">
            <div className="row m-0 mt-4">
              <h1 className="text-light text-center fs-2 text-secondary">Cast</h1>
              {currentCast.map((member) => (
                <div
                  className="custom-col-lg-6  mb-4"
                  key={member.cast_id || member.id}
                >
                  <CastCard
                    name={member.name}
                    character={member.character}
                    profilePath={member.profile_path}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
         ) : (
          <p>Loading...</p>
      )}
    </>
  );
}
