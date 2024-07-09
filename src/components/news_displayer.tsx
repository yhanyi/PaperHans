import { useEffect, useState } from "react";
import axios from "axios";

type NewsItem = {
  title: string;
  info: string;
  url: string;
  sentiment: string;
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/news");
      console.log("News data:", response.data);
      setNews(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Error fetching news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    fetchNews();
  };

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Crypto News</h1>
        <button
          onClick={handleRefresh}
          className="refresh-button p-2 bg-blue-500 text-white rounded-md"
        >
          Refresh
        </button>
      </div>
      <ul>
        {news.map((item, index) => (
          <li key={index} className="mb-4">
            <div
              className="flex justify-between items-center p-4 border rounded cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <span>{item.title}</span>
              <span
                className={`ml-2 px-2 py-1 rounded ${
                  item.sentiment === "Positive"
                    ? "bg-green-200 dark:bg-green-600"
                    : item.sentiment === "Negative"
                    ? "bg-red-200 dark:bg-red-600"
                    : "bg-yellow-200 dark:bg-yellow-600"
                }`}
              >
                {item.sentiment}
              </span>
            </div>
            {expanded === index && (
              <div className="p-4 border-t">
                <p className="mb-2">{item.info}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Click for details.
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
