import { useState } from "react";

export const RatingInput = ({ value = 0, onChange, max = 5, size = "text-2xl" }) =>{
  const [hover, setHover] = useState(0);
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Rating"
    >
      {stars.map((n) => {
        const active = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange?.(n)}
            className={`transition-transform ${size} leading-none ${active ? "scale-110" : "opacity-40"}`}
            title={`${n} star${n > 1 ? "s" : ""}`}
          >
            {/* star icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-6 h-6 ${active ? "text-blue-500" : "text-gray-400"}`}
            >
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.164L12 18.896l-7.335 3.864 1.401-8.164L.132 9.21l8.2-1.192L12 .587z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
