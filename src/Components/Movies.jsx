import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import LoadingScreen from "./LoadingScreen";
import SearchBar from "./SearchBar"; // Import the new SearchBar component
import { useLanguage } from "../Contexts/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/favoritesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

 
  useEffect(() => {
    const fetchMovies = async () => {
      // setShowLoading(true);
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
        // setTimeout(() => {
        //   setShowLoading(false);
        // }, 300);
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
    <div className="flex-grow-1 mb-5">

      {movies.length > 0 && (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}

          className="hero-slider"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1000}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {movies.slice(0, 5).map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "80vh",
                  position: "relative",
                }}
              >

                <div className="overlay"></div>


                <div className="hero-content text-center">
                  <h1 className="fw-bold">{movie.title}</h1>
                  <p className="lead">{movie.overview.substring(0, 200)}...</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}


      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        placeholder={t("search_placeholder")}
      />


      <div className="container mt-4">
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


        <div className="pagination mb-3 d-flex justify-content-center">
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


      <style>
        {`
          .hero-slide {
            position: relative;
          }

          .hero-slide .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 2;
          }

          .hero-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            color: white;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
            max-width: 80%;
          }
            /* Change Swiper Navigation Arrows Color */
.swiper-button-prev,
.swiper-button-next {
  color: rgb(255, 139, 24) !important; /* Change this to your desired color */
}


}


}

        `}
      </style>
    </div>
  );
}
