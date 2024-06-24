import { useEffect, useState } from "react";
import axios from "axios";

type NewsItem = {
  title: string;
  url: string;
  sentiment: string;
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/news");
        console.log("News data:", response.data); // Log the fetched data
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Error fetching news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
      <h1 className="text-2xl font-bold mb-4">Crypto News</h1>
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
                  item.sentiment === "positive"
                    ? "bg-green-200"
                    : item.sentiment === "negative"
                    ? "bg-red-200"
                    : "bg-yellow-200"
                }`}
              >
                {item.sentiment}
              </span>
            </div>
            {expanded === index && (
              <div className="p-4 border-t">
                <p className="mb-2">Detailed summary or synopsis here...</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Read more
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
