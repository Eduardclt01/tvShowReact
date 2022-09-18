import React from "react";
import "./home.sass";
import NoImage from "../../assets/images/noimage.jpg";
import { useNavigate } from "react-router-dom";

export default function MovieItem(props) {
  const { image, title, year, imdbID } = props;
  const navigate = useNavigate();

  const imageBanner = image === "N/A" ? NoImage : image;

  function navigateToMoviePage() {
    navigate(`/show?id=${imdbID}`)
  }

  const handleMovieItemClick = () => {
    navigateToMoviePage();
  }

  return (
    <div className="movie-item" onClick={handleMovieItemClick}>
      <img src={imageBanner} alt="Movie poster" className="cover" />
      <div className="movie-item__overlay">
        <div class="text">
          <p>{title}</p>
          <p>{year}</p>
        </div>
      </div>
    </div>
  );
}
