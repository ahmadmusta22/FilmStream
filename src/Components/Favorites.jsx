import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeFavorites, removeFromFavorites } from '../redux/favoritesSlice';
import { FaHeart } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

export default function App() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);

    useEffect(() => {
        dispatch(initializeFavorites()); 
    }, [dispatch]);

    const handleRemoveFavorite = (id) => {
        dispatch(removeFromFavorites(id));
    };

    return (
        <div className="container mt-4 flex-grow-1 mb-5">
            <h2 className="mb-4">Your Favorite Movies</h2>
            <div className="row">
                {favorites.length === 0 ? (
                    <div className="text-center">
                        <h2>No Favorites Yet</h2>
                    </div>
                ) : (
                    favorites.map((movie) => (
                        <div key={movie.id} className="col-md-3 mb-4">
                            <div
                                className="card border-0 rounded-4 shadow-lg overflow-hidden mb-4"
                                style={{ backgroundColor: '#1e1e1e', color: '#f5f5f5' }}
                            >
                                <Link to={`/show/${movie.id}`} className="position-relative">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                        className="card-img-top"
                                        alt={movie.title}
                                        style={{
                                            height: '300px',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text text-truncate" title={movie.overview} style={{ color: '#aaa' }}>
                                        {movie.overview}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span
                                            className="badge"
                                            style={{
                                                backgroundColor:
                                                    movie.rating >= 8 ? '#28a745' :
                                                    movie.rating >= 5 ? '#ffc107' : '#dc3545',
                                                color: '#1e1e1e',
                                            }}
                                        >
                                            ⭐ {movie.rating.toFixed(1)}
                                        </span>
                                        <small style={{ color: '#aaa' }}>
                                            {new Date(movie.releaseDate).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <div
                                        className="d-flex justify-content-end mt-3"
                                        style={{ cursor: 'pointer', color: '#ffffff' }}
                                        onClick={() => handleRemoveFavorite(movie.id)}
                                    >
                                        <FaHeart style={{ fontSize: '24px', color: '#e91e63' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
