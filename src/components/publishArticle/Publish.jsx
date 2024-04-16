import React from "react";
import { useState, useEffect } from "react";
import web3 from "../../web3.js";
import wikichain from "../../wikichain.js";
import { IoMdCreate } from "react-icons/io";
import Loading from "../Loading.jsx";

function Publish() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [account, setAccount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrorMessage] = useState("");
  const [owner, setOwner] = useState("");
  const [cid, setCID] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkUserRegistration = async () => {
      const account = await web3.eth.getAccounts();
      const owner = await wikichain.methods.owner().call();
      // console.log(account);
      setAccount(account[0]);
      setOwner(owner);
      try {
        // Assuming `wiki` is your contract instance
        // console.log(account);
        // const owner = await wikichain.methods.owner().call();
        // console.log(owner);
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

  const handlePublish = async () => {
    try {
      // Get the current Ethereum account
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
      const account = await web3.eth.getAccounts();

      // Call the publishArticle function in the smart contract
      console.log(title, id.cid, domain);

      const transaction = await wikichain.methods
        .publishArticle(title, id.cid, domain)
        .send({
          from: account[0],
          gas: 3000000,
        });
      // console.log(id.cid);
      console.log(transaction);
      setTransactionStatus("Transaction successful!!!");
      console.log("Article published successfully!");
      // setTransactionStatus("");
    } catch (error) {
      // Handle errors, e.g., show an error message
      if (error.message.includes("reverted")) {
        console.log(error.message);
        setErrorMessage("⚠️ Sorry, Article already exist...!");
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="text-center p-6 text-quaternary">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="shadow-4xl m-28">
          {errMsg && <p className="text-5xl p-10">{errMsg}</p>}
          {transactionStatus && <p>{transactionStatus}</p>}
          {isUserRegistered ? (
            <div>
              <h2 className="text-4xl font-bold text-primary pt-4">
                Publish Article
              </h2>
              <br></br>
              <label className="text-2xl font-bold text-primary">Title</label>
              <br></br>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-2xl mt-4"
                placeholder="enter the title"
              ></input>
              <br></br>
              <br />
              <label className="text-2xl font-bold text-primary">Domain</label>
              <br></br>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="p-2 mt-4 border rounded text-lg font-bold"
              >
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Blockchain">Blockchain</option>
                <option value="Data Science">Data Science</option>
                <option value="Distributed Systems">Distributed Systems</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Networking">Networking</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Robotics">Robotics</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
              </select>
              <br></br>
              <br />
              <label className="text-2xl font-bold text-primary">Content</label>
              <br></br>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="text-black border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-2xl mt-4"
                cols={50}
                rows={15}
                placeholder="enter the content"
              />
              <br></br>
              <button
                onClick={handlePublish}
                className="m-5 bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                <span className="flex">
                  <IoMdCreate size={24} className="mr-2" />
                  Publish
                </span>
              </button>
              {owner === account || user.isConsortiumMember ? (
                <a href="/consortium">
                  <div className="fixed right-0 bottom-0 text-center p-4">
                    <button className="flex bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded">
                      Manage Consortium
                    </button>
                  </div>
                </a>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div className="py-48 text-center justify-center">
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
      )}
    </div>
  );
}

export default Publish;
