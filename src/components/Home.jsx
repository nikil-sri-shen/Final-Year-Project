import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Loading from "./Loading.jsx";
import web3 from "../web3.js";
import wikichain from "../wikichain.js";
// import Web3 from "web3";

function Home() {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    const callOwner = async () => {
      const owner = await wikichain.methods.owner().call();
      const account = await web3.eth.getAccounts();
      setAccount(account[0]);
      setOwner(owner);
    };
    // Simulate an API call or any asynchronous operation
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timeout to prevent memory leaks
    return () => {
      clearTimeout(delay);
      callOwner();
    };
  }, []);

  const connectToMetaMask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setConnectedAccount(accounts[0].slice(0, 12));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-20">
          <div className="max-w-6xl mx-auto mt-10 p-6 shadow-4xl rounded text-justify flex flex-col items-center">
            <h2 className="text-7xl mb-4 text-black text-center font-poppins">
              W<span className="text-5xl">ikiChai</span>N
            </h2>
            <img src="wikilogo.png" alt="Wikichain Logo" className="my-4" />
            <div className="flex p-10">
              <input
                className="text-2xl font-poppins text-black border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                size={22}
                value={" The Free Encyclopaedia... "}
                disabled
              ></input>
              <button className="ml-3 bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded-md text-lg">
                <span className="flex">
                  <FaSearch size={24} className="mr-2" />
                  Search
                </span>
              </button>
            </div>
            <p className="mb-4 text-xl">
              WikiChain represents a revolutionary shift in knowledge-sharing
              platforms, embracing decentralization on the Ethereum blockchain
              and IPFS. This departure from centralization ensures censorship
              resistance, transparency, and inclusivity in collaborative
              knowledge creation. Unlike centralized models, WikiChain isn't
              controlled by a single entity, making it immune to censorship by
              governments or corporations. It combines a secure blockchain
              foundation for content storage and transactions, a user-friendly
              DApp for content management and participation, and a resilient
              consensus mechanism to maintain information integrity. WikiChain
              embodies the ideals of decentralization, empowering global
              contributors to shape a transparent and democratic repository of
              knowledge accessible to all.
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-10 p-6 shadow-4xl rounded text-justify">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Services provided by WikiChain
            </h2>
            <br />
            <p className="mb-4">
              <div className="grid grid-cols-5 gap-4 text-center">
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/publish">Publish Articles</a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/search">Search Articles</a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/search">Vote Articles</a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/search">Verify Articles</a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/update">Update Articles</a>
                </div>
              </div>
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-10 p-6 shadow-4xl rounded text-justify">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Technologies used in WikiChain
            </h2>
            <br />
            <p className="mb-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded shadow-4xl hover:shadow-md text-xl">
                  Ethereum Blockchain (Sepolia)
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md text-xl">
                  React JS
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md text-xl">
                  IPFS (helia)
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md text-xl">
                  TailwindCSS
                </div>
              </div>
            </p>
          </div>
          <div className="fixed left-0 bottom-0 text-center p-4">
            {connectedAccount ? (
              <p className="bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded">
                Connected account: {connectedAccount}...
              </p>
            ) : (
              <button
                onClick={connectToMetaMask}
                className="flex bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                Connect to MetaMask
              </button>
            )}
          </div>
          {owner === account ? (
            <a href="/consortium">
              <div className="fixed right-0 bottom-0 text-center p-4">
                <button
                  onClick={connectToMetaMask}
                  className="flex bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded"
                >
                  Manage Consortium
                </button>
              </div>
            </a>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
