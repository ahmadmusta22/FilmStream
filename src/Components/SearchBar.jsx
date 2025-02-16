import React from "react";

export default function SearchBar({ searchQuery, handleSearch, placeholder }) {
  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}
