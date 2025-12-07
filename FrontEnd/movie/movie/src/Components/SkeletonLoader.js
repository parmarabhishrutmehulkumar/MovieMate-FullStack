import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="skeleton-row">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
