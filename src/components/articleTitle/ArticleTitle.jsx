import React, { useState, useEffect } from "react";
import wikichain from "../../wikichain";

const ArticleTitle = () => {
  const [articleCIDs, setArticleCIDs] = useState([]);
  const [articleTitles, setArticleTitles] = useState([]);

  useEffect(() => {
    const fetchArticleCIDs = async () => {
      try {
        // Assuming `getAllArticleCIDs` is a method in your contract
        const cids = await wikichain.methods.getAllArticleCIDs().call();
        setArticleCIDs(cids);
      } catch (error) {
        console.error("Error fetching article CIDs:", error);
      }
    };

    fetchArticleCIDs();
  });

  useEffect(() => {
    const fetchArticleTitles = async () => {
      try {
        const titles = await Promise.all(
          articleCIDs.map(async (cid) => {
            // Assuming `articlesByCid` is a method in your contract
            const article = await wikichain.methods.articlesByCid(cid).call();
            return article.title;
          })
        );

        setArticleTitles(titles);
      } catch (error) {
        console.error("Error fetching article titles:", error);
      }
    };

    if (articleCIDs.length > 0) {
      fetchArticleTitles();
    }
  }, [articleCIDs]);

  return (
    <div>
      <br />
      <br />
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full p-6 shadow-4xl rounded-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Article Available
          </h2>
          <ul
            className={
              articleTitles.length > 5 ? "overflow-y-auto max-h-40" : ""
            }
          >
            {articleTitles.map((title, index) => (
              <li key={index} className="mb-2 text-lg">
                {title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleTitle;
