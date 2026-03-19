import React from "react";

function Loading({ className = "", size = "w-8 h-8", color = "border-blue-500" }) {
  return (
    <div className={`flex justify-center py-20 ${className}`}>
      <div className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}

export default Loading;
