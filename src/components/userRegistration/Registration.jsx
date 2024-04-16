import React from "react";
import { useState, useEffect } from "react";
import { MdLogin } from "react-icons/md";
import web3 from "../../web3.js";
import wikichain from "../../wikichain.js";
import Loading from "../Loading.jsx";

function Registration() {
  const [userName, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [domain, setDomain] = useState("");
  const [account, setAccount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleRegistration = async (e) => {
    e.preventDefault();
    const account = await web3.eth.getAccounts();
    setAccount(account);
    console.log(account);
    console.log(userName, passwd, domain);

    try {
      const user = await wikichain.methods.users(account[0]).call();
      if (!user.isRegistered) {
        // Call the registerUser method with the entered username
        const transaction = await wikichain.methods
          .registerUser(userName, passwd, domain)
          .send({ from: account[0], gas: 3000000 });
        console.log(transaction);

        setTransactionStatus("Transaction successful! ");

        // Optionally, you can add code here to handle success, e.g., show a success message
        console.log(`User ${userName} registered successfully!`);
      } else {
        setIsUserRegistered(user.isRegistered);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error registering user:", error);
      setTransactionStatus("Sorry !!! Transaction failed!");
    }
  };
  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <form
            onSubmit={handleRegistration}
            className="text-center p-32 shadow-4xl m-40 text-primary"
          >
            {transactionStatus && <p>{transactionStatus}</p>}
            {isUserRegistered ? (
              <div>
                <p className="text-primary text-5xl">
                  ✅ You are a registered user!!!
                </p>
              </div>
            ) : (
              <div>
                <label className="text-3xl">
                  <span className="text-4xl font-bold">Registration Desk</span>
                  <br></br>
                  <br></br>
                  <p>Name</p>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="text-black border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 mt-4"
                    placeholder="enter your name"
                  />
                  <br></br>
                  <p>PassPhrase</p>
                  <input
                    type="password"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                    className="text-black border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 mt-4"
                    placeholder="enter your passwd"
                  />
                  <br />
                  <p className="text-3xl">Domain</p>
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
                    <option value="Distributed Systems">
                      Distributed Systems
                    </option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Networking">Networking</option>
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Software Engineering">
                      Software Engineering
                    </option>
                  </select>
                </label>
                <br></br>
                <button
                  type="submit"
                  className="m-5 bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded"
                >
                  <span className="flex">
                    <MdLogin size={28} className="mr-2" />
                    Register
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Registration;
