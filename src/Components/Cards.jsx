import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { FaHeart } from 'react-icons/fa';
import Loadingscreen from './LoadingScreen';

export default function Cards({
    id,
    title,
    overview,
    posterPath,
    releaseDate,
    rating,
    genres,
    mediaType,
    isFavorite,
    onAddToFavorites,
    onRemoveFromFavorites,
}) {
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 

    const toggleFavorite = (e) => {
        e.stopPropagation(); 
        if (isFavorite) {
            onRemoveFromFavorites(id); 
        } else {
            const movie = {
                id,
                title,
                overview,
                posterPath,
                releaseDate,
                rating,
                genres,
            };
            onAddToFavorites(movie); 
        }
    };

    const handleCardClick = () => {
        setLoading(true); 
        setTimeout(() => {
            navigate(`/show/${id}`); 
        }, 500); 
    };

    return (
        <>
            {loading && <Loadingscreen />}
            
            <div
                className="card border-0 rounded-4 shadow-lg overflow-hidden mb-4"
                style={{ backgroundColor: '#1e1e1e', color: '#f5f5f5' }}
                onClick={handleCardClick} 
            >
                <div className="position-relative">
                    
                    <img
                        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                        className="card-img-top"
                        alt={title}
                        style={{
                            height: '300px',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                   
                    {mediaType && (
                        <span
                            className="badge position-absolute top-0 start-0 m-2"
                            style={{
                                backgroundColor: mediaType === 'movie' ? '#007bff' : '#6c757d',
                                color: '#fff',
                            }}
                        >
                            {mediaType === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                    )}
                </div>

                {/* Card Content */}
                <div className="card-body" onClick={(e) => e.stopPropagation()}>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-truncate" title={overview} style={{ color: '#aaa' }}>
                        {overview}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        {/* Rating */}
                        <span
                            className="badge"
                            style={{
                                backgroundColor:
                                    rating >= 8
                                        ? '#28a745'
                                        : rating >= 5
                                        ? '#ffc107' 
                                        : '#dc3545', 
                                color: '#1e1e1e', 
                            }}
                        >
                            ⭐ {rating.toFixed(1)}
                        </span>
                        
                        <small style={{ color: '#aaa' }}>
                            {new Date(releaseDate).toLocaleDateString()}
                        </small>
                    </div>
                   
                    {genres && (
                        <div className="mt-2">
                            {genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="badge me-1"
                                    style={{
                                        backgroundColor: '#444', 
                                        color: '#f5f5f5', 
                                    }}
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div
                        className="d-flex justify-content-end mt-3"
                        style={{
                            cursor: 'pointer',
                            color: isFavorite ? '#e91e63' : '#ffffff', 
                        }}
                        onClick={toggleFavorite} 
                    >
                        <FaHeart style={{ fontSize: '24px' }} />
                    </div>
                </div>
            </div>
        </>
    );
}
