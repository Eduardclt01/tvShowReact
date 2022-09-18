import React, { useEffect, useState } from "react";
import EmptyStateImage from "../../assets/images/illustration-empty-state.png";
import MovieItem from "./MovieItem";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [movieError, setMovieError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getSearchResults() {
    setLoading(true);

    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovieList(data.Search);
          setMovieError(false);
        } else {
          setMovieList([]);
          setMovieError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSeachChange = (event) => {
    setSearchValue(event.target.value);
  };

  function clearMovieError() {
    if (searchValue.trim() === "") {
      setMovieError(false);
    }
  }

  // Only search when user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.trim() !== "") {
        getSearchResults();
      }else{
        setMovieList([])
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  useEffect(() => {
    clearMovieError();
  }, [searchValue]);

  return (
    <div className="home-container">
      <div className="home-view">
        <input
          type="text"
          id="header-search"
          placeholder="Search movies..."
          value={searchValue}
          onChange={handleSeachChange}
          className="search-input"
        />
        {loading && <h1>Loading...</h1>}
        {!loading && movieList.length > 0 && (
          <div className="home-view__movie-list">
            {movieList.map((movie) => {
              return (
                <MovieItem
                  image={movie.Poster}
                  title={movie.Title}
                  year={movie.Year}
                  imdbID={movie.imdbID}
                />
              );
            })}
          </div>
        )}

        {!loading && movieList.length === 0 && (
          <div>
            <img src={EmptyStateImage} alt="Logo" />
            {movieError && <p>No result found...</p>}
            {!movieError && (
              <>
                <h1>Don't know what to search?</h1>
                <p>Here's an offer you can't refuse</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
