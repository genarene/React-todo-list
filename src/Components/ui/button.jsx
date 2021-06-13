import React from "react";

function Button({ handler, text, padding, margin, color, bgcolor }) {
  return (
    <button
      onClick={handler}
      className={`bg-purple-400 text-white hover:bg-purple-500
           font-bold py-2 px-4 rounded-md text-xl shadow-lg ${padding} ${margin} ${color} ${bgcolor} `}
      style={{ outline: "none" }}
    >
      {text}
    </button>
  );
}

export default Button;
