import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import LoadingScreen from "./LoadingScreen";
import { useLanguage } from "../Contexts/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/favoritesSlice";


export default function Movies() {
  const { language, t } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {

      setShowLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=55f4b2316c4b8c8fa71e776cab7e4a69&page=${currentPage}&language=${language}`
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {

        setTimeout(() => {
          setShowLoading(false);
        }, 300);
      }
    };

    fetchMovies();
  }, [currentPage, language]);


  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchQuery(term);

    if (term.trim() === "") {
      setFilteredMovies(movies);
    } else {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=55f4b2316c4b8c8fa71e776cab7e4a69&query=${term}&language=${language}`
          );
          setFilteredMovies(response.data.results);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchSearchResults();
    }
  };

  const handleAddToFavorites = (movie) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    if (!isAlreadyFavorite) {

      dispatch(addToFavorites(movie));
    }
  };

  const handleRemoveFromFavorites = (movieId) => {
    dispatch(removeFromFavorites(movieId));
  };

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mt-5 flex-grow-1 mb-5">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder={t("search_placeholder")}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="row">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="col-lg-3 col-md-6 mb-4 cursor-pointer" key={movie.id}>
              <Cards
                id={movie.id}
                path={`/show/${movie.id}`}
                title={movie.title}
                overview={movie.overview}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                genres={[{ id: 1, name: "Action" }, { id: 2, name: "Drama" }]}
                mediaType="movie"
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
              />
            </div>
          ))
        ) : (
          <p className="text-center">{t("no_movies")}</p>
        )}
      </div>

      <div className="pagination mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t("previous")}
        </button>
        <span className="mx-3">
          {t("page")} {currentPage} {t("of")} {totalPages}
        </span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
