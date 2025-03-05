import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
    >
      {text}
    </button>
  );
}
