import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFilm, FaLanguage, FaCalendarAlt, FaStar } from "react-icons/fa";


export default function Showdetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {

        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=55f4b2316c4b8c8fa71e776cab7e4a69`)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
                setLoading(false);
            });


        axios
            .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=55f4b2316c4b8c8fa71e776cab7e4a69`)
            .then((response) => {
                const trailerVideo = response.data.results.find(video => video.type === "Trailer");
                if (trailerVideo) {
                    setTrailer(trailerVideo.key); 
                }
            })
            .catch((error) => {
                console.error("Error fetching trailer:", error);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="min-vh-100 bg-black text-white d-flex flex-wrap">
           
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-4">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt="Movie Poster"
                    className="img-fluid rounded shadow-lg"
                />
            </div>

            
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-5">
                <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
                {movie.tagline && <p className="fst-italic text-muted mb-4">"{movie.tagline}"</p>}

                <p className="text-secondary fs-5 mb-4">{movie.overview}</p>

                <div className="mb-3">
                    <h3 className="h5 fw-semibold d-flex align-items-center">
                        <FaFilm className="me-2 genre-icon" /> Genres:
                    </h3>
                    <p className="text-secondary">
                        {movie.genres?.map((genre) => genre.name).join(", ") || "N/A"}
                    </p>
                </div>

                <div className="mb-3">
                    <h3 className="h5 fw-semibold d-flex align-items-center">
                        <FaLanguage className="me-2 language-icon" /> Original Language:
                    </h3>
                    <p className="text-secondary">{movie.original_language?.toUpperCase() || "N/A"}</p>
                </div>

                <div className="mb-3">
                    <h3 className="h5 fw-semibold d-flex align-items-center">
                        <FaCalendarAlt className="me-2 date-icon" /> Release Date:
                    </h3>
                    <p className="text-secondary">{movie.release_date || "N/A"}</p>
                </div>

                <div>
                    <h3 className="h5 fw-semibold d-flex align-items-center">
                        <FaStar className="me-2 rating-icon" /> Rating:
                    </h3>
                    <p className="text-secondary">{movie.vote_average ? `${movie.vote_average}/10` : "N/A"}</p>
                </div>

                
                {trailer && (
                    <div className="mt-4">
                        <h3 className="h5 fw-semibold">Watch Trailer:</h3>
                        <a
                            href={`https://www.youtube.com/watch?v=${trailer}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-danger"
                        >
                            Watch on YouTube
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

