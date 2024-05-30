import React from "react";

export default function Profile(props) {
  return (
    <article className="bg-gradient-to-r from-white to-gray-100 p-5 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center">
        <img
          src={props.owner.avatar_url}
          alt={props.owner.login}
          className="w-16 h-16 shadow-xl rounded-full border-4 border-indigo-500"
        />
        <div className="ml-5">
          <h2 className="font-bold text-xl text-indigo-600">{props.owner.login}</h2>
          <p className="text-gray-800">{props.name}</p>
          {props.private ? (
            <p className="bg-red-600 py-1 px-2 rounded-lg shadow text-white text-xs inline-block opacity-75">
              Private
            </p>
          ) : (
            <p className="bg-green-600 py-1 px-2 rounded-lg shadow text-white text-xs inline-block opacity-75">
              Public
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <a
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow"
            href={props.html_url}
            target="_blank"
            rel="noreferrer"
          >
            Ver Repositorio
          </a>
          {props.homepage && (
            <a
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300 shadow"
              href={props.homepage}
              target="_blank"
              rel="noreferrer"
            >
              Ver en Vercel
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <div className="overflow-x-auto w-full">
          <ul className="text-xs flex items-center justify-center space-x-2">
            <li className="py-1 px-2 text-white bg-green-600 opacity-75 rounded-lg shadow inline-block">
              {props.language}
            </li>
            {props.topics &&
              props.topics.map((topic, index) => (
                <li
                  key={index}
                  className="py-1 px-2 text-white bg-green-600 opacity-75 rounded-lg shadow inline-block"
                >
                  {topic}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
