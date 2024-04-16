import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import web3 from "../../web3";
import wikichain from "../../wikichain";
import Loading from "../Loading.jsx";
import ArticleTitle from "../articleTitle/ArticleTitle.jsx";

function Update() {
  const [title, setTitle] = useState("");
  const [account, setAccount] = useState("");
  const [query, setQuery] = useState("");
  const [isQueried, setIsQuried] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [author, setAuthor] = useState("");
  const [cid, setCID] = useState("");
  const [content, setContent] = useState("");
  const [version, setVersion] = useState(100);
  const [time, setTime] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onUpdate, setOnUpdate] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkUserRegistration = async () => {
      const account = await web3.eth.getAccounts();
      setAccount(account);
      try {
        // Assuming `wiki` is your contract instance
        // console.log(account);
        const user = await wikichain.methods.users(account[0]).call();

        // Check if the user is registered based on your contract logic
        const userIsRegistered = user && user.isRegistered;
        // Update state accordingly
        setUser(user);
        setIsUserRegistered(userIsRegistered);
        setIsLoading(false);
      } catch (error) {
        // Handle errors, e.g., log them or show an error message
        console.error("Error checking user registration:", error);
        setIsLoading(false);
      }
    };

    // Call the function to check user registration
    checkUserRegistration();
  }, [account]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const account = await web3.eth.getAccounts();
    setAccount(account);

    try {
      const user = await wikichain.methods.users(account[0]).call();
      if (user.isRegistered) {
        // Call the queryArticle method with the entered title
        const transaction = await wikichain.methods
          .queryArticle(title, 100)
          .call();
        console.log(transaction);
        setAuthor(transaction[0]); //author
        setTitle(transaction[1]); //title
        setCID(transaction[2]); //cid
        setTime(transaction[3]); //timestamp
        // setVote(transaction[4]); //votes
        setIsVerified(transaction[5]); //isVerfied
        setVersion(parseInt(transaction[6])); //versionNo
        setQuery(transaction);
        setIsQuried(true);
        setErrorMessage("");
        console.log(cid);
        const response = await fetch(
          `http://localhost:5000/retrieve/${transaction[2]}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const textData = await response.text();
        setContent(textData);
      } else {
        setIsUserRegistered(!user.isRegistered);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      if (error.message.includes("reverted")) {
        setIsQuried(false);
        setQuery("");
        setErrorMessage("⚠️ Sorry, Article not found...!");
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      console.log(cid);
      console.log(content);
      setOnUpdate(true);
      const response = await fetch("http://localhost:5000/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const id = await response.json();
      setCID(id.cid);
      console.log(id.cid);
      console.log(cid);
      // Call the updateArticle method
      const updateTransaction = await wikichain.methods
        .updateArticle(title, id.cid)
        .send({ from: account[0], gas: 3000000 });
      console.log(updateTransaction);

      // Update local state to reflect that the article has been verified
      const transaction = await wikichain.methods
        .queryArticle(title, 100)
        .call();
      setAuthor(transaction[0]); //author
      setTitle(transaction[1]); //title
      setCID(transaction[2]); //cid
      setTime(transaction[3]); //timestamp
      // setVote(transaction[4]); //votes
      // setIsVerified(transaction[5]); //isVerfied
      setVersion(parseInt(transaction[6])); //versionNo
      setQuery(transaction);
      setIsQuried(true);
      setErrorMessage("");
      const response2 = await fetch(
        `http://localhost:5000/retrieve/${transaction[2]}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const textData = await response2.text();
      setContent(textData);

      // You can perform additional actions after a successful verification if needed
      // console.log(transaction);
      setOnUpdate(false);
      setTransactionStatus("Updation successful!!!");
      console.log("Update successful!");
    } catch (error) {
      // Handle errors, such as transaction rejection or failure
      if (error.message.includes("reverted")) {
        setIsQuried(false);
        setQuery("");
        setErrorMessage("⚠️ Sorry, An error occured in updation...!");
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
      console.error("Error verifying article:", error.message);
    }
    console.log("Updated...");
  };
  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <ArticleTitle />
          <form onSubmit={handleSearch}>
            <div className="text-center p-20">
              {isUserRegistered ? (
                <div className="shadow-4xl mx-48 py-20">
                  <p className="text-5xl">{errorMsg}</p>
                  <p>{transactionStatus}</p>
                  <br />
                  <label className="text-3xl text-primary font-bold">
                    Title
                  </label>
                  <br></br>
                  <br></br>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-black  text-3xl  border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="enter the title"
                  />
                  <br></br>
                  <button
                    type="submit"
                    className="m-5 bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded-md"
                  >
                    <span className="flex">
                      <FaSearch size={24} className="mr-2" />
                      Search
                    </span>
                  </button>
                  {isQueried ? (
                    <div>
                      {isVerified || user.isConsortiumMember ? (
                        <div>
                          <div>
                            <div className="bg-white text-black border-t-2 border-b-2 border-x-2 border-gray-600 m-10 rounded-md">
                              <span className="text-5xl text-primary font-bold">
                                {query[1]}
                              </span>
                              <br />
                              <div className="flex flex-col justify-between m-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-bold">
                                    <a href="/">WikiChain.org</a>
                                  </span>
                                  <span className="text-sm">
                                    Published by: {author.slice(0, 12)}...
                                  </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                  <span className="text-sm">
                                    Timestamp: {time}
                                  </span>
                                  <span className="text-sm">
                                    Version: {version}
                                  </span>
                                </div>
                              </div>
                              <hr className="bg-black border-t-2 border-gray-600"></hr>
                            </div>
                            {onUpdate ? (
                              <div>Article is being updated...Please Wait!</div>
                            ) : (
                              <div className="text-3xl m-6 overflow-hidden whitespace-pre-wrap">
                                <textarea
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                  className="text-black border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-3xl w-full"
                                  rows={15}
                                  placeholder="enter the content"
                                >
                                  {content}
                                </textarea>
                                <div className="flex items-center justify-between m-10">
                                  <button
                                    onClick={handleUpdate}
                                    className="bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded-md flex items-center text-base mx-auto"
                                  >
                                    <IoMdCreate size={24} className="mr-2" />
                                    Update
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-primary text-5xl">
                          ⚠️ Article is under Verification!!!
                        </div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div className="py-48 text-center justify-center hover:shadow-4xl">
                  <p className="text-primary text-5xl">
                    ⚠️ You are not a registered User!!!
                  </p>
                  <br></br>
                  <p className="text-3xl text-quaternary">
                    Please Register here 👇🏼:
                  </p>
                  <br></br>
                  <a href="/registration" className="text-3xl text-quaternary">
                    Click Here
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Update;
