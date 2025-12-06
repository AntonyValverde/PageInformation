import React from "react";
import { FaExternalLinkAlt, FaGlobe } from "react-icons/fa";

export default function Profile(props) {
  const { owner, name, private: isPrivate, html_url, homepage, language, topics } = props;

  return (
    <article
      className="
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-2xl
        p-6
        shadow-md dark:shadow-none
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-xl
        animate-fade-in
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={owner.avatar_url}
          alt={owner.login}
          className="
            w-16 h-16 rounded-full 
            border-2 border-indigo-500 
            shadow-md
          "
        />

        <div>
          <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100">
            {owner.login}
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {name}
          </p>

          <span
            className={`
              inline-block mt-2 text-xs px-2 py-1 rounded-md
              ${isPrivate
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"}
            `}
          >
            {isPrivate ? "Private" : "Public"}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4 justify-center">
        <a
          href={html_url}
          target="_blank"
          rel="noreferrer"
          className="
            flex items-center gap-2
            bg-gray-100 dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-800 dark:text-gray-200
            px-4 py-2 rounded-xl
            transition-all duration-300
            hover:scale-105 hover:shadow-md
          "
        >
          Ver Repositorio <FaExternalLinkAlt size={14} />
        </a>

        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            className="
              flex items-center gap-2
              bg-indigo-600 dark:bg-indigo-500 
              text-white px-4 py-2 rounded-xl
              transition-all duration-300
              hover:bg-indigo-700 dark:hover:bg-indigo-400
              hover:scale-105 hover:shadow-md
            "
          >
            Ver Demo <FaGlobe size={14} />
          </a>
        )}
      </div>

      {/* Topics */}
      <div className="mt-6">
        <ul className="flex flex-wrap gap-2 justify-center text-xs">
          {language && (
            <li className="px-3 py-1 bg-indigo-600 text-white rounded-full">
              {language}
            </li>
          )}

          {topics?.map((topic, i) => (
            <li
              key={i}
              className="
                px-3 py-1 rounded-full 
                bg-gray-200 dark:bg-gray-700 
                text-gray-800 dark:text-gray-200
              "
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
