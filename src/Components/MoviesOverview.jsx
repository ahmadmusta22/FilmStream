import React from "react";
import { Link } from "react-router-dom";

export default function Overview({ img, desc, about, path = "#" }) {
  return (
    <div className="rounded-2xl bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
      <Link to={path} style={{ textDecoration: "none" }}>
        <img
          src={img}
          alt="Movie poster"
          className="rounded-t-2xl w-full h-60 object-cover"
        />
        <div className="p-4">
          <h5 className="text-xl font-bold text-white truncate">{desc}</h5>
          <p className="text-sm text-gray-400 mt-2 line-clamp-3">{about}</p>
        </div>
      </Link>
    </div>
  );
}
