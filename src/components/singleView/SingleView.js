import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./singleView.sass";
import imdbLogo from "../../assets/logos/logo-imdb.svg";
import rottenTom from "../../assets/logos/logo-rotten-tomatoes.svg";

export default function SingleView() {
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id");

  function getMovie(movieId) {
    setLoading(true);

    fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function navigateToHomePage() {
    navigate("/");
  }

  const handleBackClick = () => {
    navigateToHomePage();
  };

  useEffect(() => {
    getMovie(movieId);
  }, []);

  if (!loading) {
    return (
      <div className="container">
        <div className="movieView">
          <div className="movieView__details">
            <p onClick={handleBackClick} className="backButton">
              Back
            </p>
            <div className="heading">
              <p>{movie.Runtime}</p>
              <p>&nbsp;•&nbsp;</p>
              <p>{movie.Released}</p>
              <p>&nbsp;•&nbsp;</p>
              <p>{movie.Rated}</p>
            </div>

            <h1>{movie.Title}</h1>

            <div className="ratings">
              <div className="rating-item">
                <div className="rating-logo-imdb">
                  <img src={imdbLogo} alt="IMDB logo" />
                </div>
                <span className="rating-text">{movie.imdbRating}</span>
              </div>
              <div className="rating-item">
                <div className="rating-logo-rotten-tom">
                  <img src={rottenTom} alt="Rotten tomatoe logo" />
                </div>
                <span className="rating-text">{movie.Metascore}</span>
              </div>
            </div>

            <div className="plot">
              <p className="section-header">Plot</p>
              {movie.Plot}
            </div>

            <div className="movieView__footer">
              <div className="footer-item cast">
                <p className="section-header">Cast</p>
                {movie.Actors}
              </div>

              <div className="footer-item genre">
                <p className="section-header">Genres</p>
                {movie.Genre}
              </div>

              <div className="footer-item director">
                <p className="section-header">Director</p>
                {movie.Director}
              </div>
            </div>
          </div>

          <div className="movieView__poster">
            <img
              src={movie.Poster}
              alt="Movie poster"
              className="poster-image"
            />
          </div>
        </div>
      </div>
    );
  }

  return <h1>Loading</h1>;
}
