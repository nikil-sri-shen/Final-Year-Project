import React from "react";
import { useState, useEffect } from "react";
import { MdUpdate } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import wikichain from "../wikichain";
import web3 from "../web3.js";

function Navbar() {
  const [account, setAccount] = useState("Not Connected");
  const [score, setScore] = useState("");
  const [error, setError] = useState(null);
  const [shortendAccount, setShortendAccount] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0] || "Not Connected";

        setAccount(currentAccount);
        const user = await wikichain.methods.users(currentAccount).call();
        setScore(user.performanceScore);
        setName(user.username);
        console.log(user.performanceScore);
        console.log(account);
        console.log(error);

        // You should check if the account is not "Not Connected" before slicing
        if (currentAccount !== "Not Connected") {
          const short = currentAccount.slice(0, 12);
          setShortendAccount(short);
        } else {
          setShortendAccount("");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching account:", error.message);
      }
    };

    checkUserRegistration();
  }, []);
  return (
    <div className="fixed p-3 top-0 left-0 right-0 z-100 backdrop-blur-md bg-opacity-30 navbar">
      <ul className="flex">
        <li className="mr-20  text-3xl">
          <a href="/">
            WikiChain.<span className="text-sm">org</span>
          </a>
        </li>
        <li className="mr-10  text-xl flex">
          <a href="/registration" className="flex">
            <MdLogin size={28} className="mr-2" />
            User Registration
          </a>
        </li>
        <li className="mr-10  text-xl flex">
          <a href="/publish" className="flex">
            <IoMdCreate size={24} className="mr-2" />
            Publish Article
          </a>
        </li>
        <li className="mr-6  text-xl flex">
          <a href="/search" className="flex">
            <FaSearch size={24} className="mr-2" />
            Search Article
          </a>
        </li>
        <li className="mr-6  text-xl flex">
          <a href="/update" className="flex">
            <MdUpdate size={28} className="mr-2" />
            Update Articles
          </a>
        </li>
        <li className="mr-6  text-xl flex">
          <a href="/" className="flex">
            <FaUser size={24} className="mr-2" />
            <span className="truncate">{shortendAccount}...</span>
          </a>
        </li>
        <li className="mr-6  text-xl flex">
          <a href="/" className="flex">
            <FaStar size={24} className="mr-2" />
            Your Score {score}
          </a>
        </li>
      </ul>
      <p className="text-2xl text-center font-bold mt-2 text-primary">
        Welcome, {name}...
      </p>
    </div>
  );
}

export default Navbar;
