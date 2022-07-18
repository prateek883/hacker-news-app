import { useState, useEffect } from "react";

import { format } from "date-fns";

export default function FetchNews() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true); // loading state

  useEffect(() => {
    setIsLoading(true);

    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=test${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.hits);
    };

    fetchNews();
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      console.log("Input is empty");
    } else {
      setQuery(text);
      setText("");
      console.log(text);
      console.log(query);
    }
  };

  return (
    <>
      <main>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
          <h3 className="font-bold text-center text-black text-xl mb-10">
                    Hacker Search App
                </h3>
            <form
              onSubmit={handleSubmit}
              className="flex place-items-center container mx-auto lg:max-w-4xl mt-10 px-5"
            >
                
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Search for something..."
                autoComplete="off"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full py-2 px-4 rounded bg-transparent border border-gray-700 focus:border-gray-600 transition-all duration-150 outline-none text-gray-700 placeholder-gray-700 text-xl lg:text-4xl lg:pb-4 mr-5"
              />
              <button
                type="Submit"
                onClick={handleSubmit}
                className="bg-white border border-gray-700 text-xl lg:text-4xl py-2 px-6 rounded lg:pb-4 text-gray-700 hover:bg-transparent transition-all duration-150"
              >
                Search
              </button>
            </form>
            <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 container mx-auto lg:max-w-4xl">
              {items.map((item) => {
                const { author, created_at, objectID, title, url, points } = item;

                return (
                  <article
                    key={objectID}
                    className="bg-gray-800 rounded p-3 transition-all duration-150"
                  >
                    <h3 className="font-bold text-center text-white text-lg mb-10">
                      {title}
                    </h3>
                    <article className="flex items-center justify-between">
                      <p className="text-gray-600">
                        Author: <em>{author}</em>
                      </p>
                      <p className="text-gray-600">
                        Points: <em>{points}</em>
                      </p>
                    </article>
                    <a
                        href={url}
                        className="text-gray-400 mt-5 text-right text-white"
                      >
                        Read More
                      </a>
                    <p className="text-gray-400 mt-5 text-left text-white">
                      Date: {format(new Date(created_at), "dd MMM yyyy")}
                    </p>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>
    </>
  );
}
