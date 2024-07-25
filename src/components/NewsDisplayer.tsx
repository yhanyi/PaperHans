import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Tooltip,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

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
  const [sortBy, setSortBy] = useState<string>("publishedAt");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://paperhans.vercel.app/api/news");
      console.log("News data:", response.data);
      if (response.status === 429) {
        setError("Rate limit exceeded. Please try again later.");
        setErrorModalOpen(true);
      } else {
        setNews(response.data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Error fetching news");
      setErrorModalOpen(true);
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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSortBy((prevSortBy) => {
      if (prevSortBy === selectedSort) {
        if (selectedSort === "sentiment") {
          const reversedNews = [...news].reverse();
          setNews(reversedNews);
        }
        if (selectedSort === "publishedAt") {
          fetchNews();
        }
      } else {
        setSortBy(selectedSort);
      }
      return selectedSort;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleErrorModalClose = () => {
    setErrorModalOpen(false);
  };

  const filteredNews = news
    .filter(
      (item) =>
        item.title?.toLowerCase().includes(searchTerm?.toLowerCase() ?? "") ||
        item.info?.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
    )
    .sort((a: NewsItem, b: NewsItem) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "sentiment") {
        const sentimentOrder: { [key: string]: number } = {
          Positive: 1,
          Neutral: 2,
          Negative: 3,
          Error: 4,
        };
        return sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment];
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Crypto News Scraper
          <Tooltip
            className="dark:text-white text-black"
            title="Collects cryptocurrency news from NewsAPI, with general market sentiments predicted using a pretrained LLM model (More LLM options soon!). Type something you want to search for, or sort the news!"
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </h1>
        <button
          onClick={handleRefresh}
          className="refresh-button p-2 bg-blue-500 text-white rounded-md"
        >
          Refresh
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input p-2 border rounded-md w-full text-black"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="ml-4 p-2 border rounded-md text-black"
        >
          <option value="publishedAt">Published Date</option>
          <option value="sentiment">Sentiment</option>
          <option value="title">Title</option>
        </select>
      </div>
      {error && (
        <Modal open={errorModalOpen} onClose={handleErrorModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
            }}
          >
            <p>{error}</p>
            <p>Please check again in a bit!</p>
            <button
              onClick={handleErrorModalClose}
              className="close-modal-button p-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </Box>
        </Modal>
      )}
      <ul>
        {filteredNews.map((item, index) => (
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
