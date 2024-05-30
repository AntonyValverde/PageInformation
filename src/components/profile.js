import React from "react";

export default function Profile(props) {
  return (
    <article className="bg-white p-5 rounded shadow-lg transform transition-transform hover:scale-105">
      <div className="flex items-center">
        <img
          src={props.owner.avatar_url}
          alt={props.owner.login}
          className="w-16 h-16 shadow rounded-full"
        />
        <ul className="ml-5">
          <li>
            <h2 className="font-bold text-xl">{props.owner.login}</h2>
          </li>
          <div>
            <p className="mr-2">{props.name}</p>
            {props.private ? (
              <p className="bg-red-700 py-1 px-2 rounded-lg shadow text-white text-xs inline-block opacity-75">
                Private
              </p>
            ) : (
              <p className="bg-green-700 py-1 px-2 rounded-lg shadow text-white text-xs inline-block opacity-75 mr-2">
                Public
              </p>
            )}
          </div>
        </ul>
      </div>
      <div className="mt-5 flex items-center justify-between text-right">
        <a
          className="underline text-sm text-blue-600"
          href={props.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View Repo
        </a>
        <ul>
          <li>{props.stargazers_count.toLocaleString()} stars</li>
          <li>{props.watchers_count.toLocaleString()} Watchers</li>
        </ul>
      </div>
      <div className="flex items-center justify-between flex-wrap mt-5">
        <ul className="text-xs flex items-center justify-start">
          <li className="py-1 px-2 text-white bg-green-700 opacity-75 rounded-lg shadow inline-block mr-2">
            {props.language}
          </li>
          {props.topics &&
            props.topics.map((topic, index) => (
              <React.Fragment key={index}>
                <li className="py-1 px-2 text-white bg-green-700 opacity-75 rounded-lg shadow inline-block mr-2">
                  {topic}
                </li>
              </React.Fragment>
            ))}
        </ul>
        <p>{props.open_issues} issues</p>
      </div>
    </article>
  );
}
