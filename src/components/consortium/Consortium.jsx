import React from "react";
import { useState, useEffect } from "react";
import web3 from "../../web3.js";
import wikichain from "../../wikichain.js";
import Loading from "../Loading.jsx";

function Consortium() {
  const [account, setAccount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConsortium, setIsConsortium] = useState(true);
  const [owner, setOwner] = useState("");
  const [error, setError] = useState("");
  const [allArticleCIDs, setAllArticleCIDs] = useState([]);
  const [missingCIDs, setMissingCIDs] = useState([]);
  const [trans1, setTrans1] = useState("");
  const [trans2, setTrans2] = useState("");
  useEffect(() => {
    const checkUserRegistration = async () => {
      const account = await web3.eth.getAccounts();
      setAccount(account[0]);
      try {
        // Assuming `wiki` is your contract instance
        // console.log(account);
        const user = await wikichain.methods.users(account[0]).call();
        const owner = await wikichain.methods.owner().call();
        // Check if the user is registered based on your contract logic
        const userIsRegistered = user && user.isRegistered;
        // Update state accordingly
        setOwner(owner);
        setIsConsortium(user.isConsortium);
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

  const handleConsortium = async (e) => {
    e.preventDefault();
    const account = await web3.eth.getAccounts();
    setAccount(account);
    // console.log(account);

    try {
      const user = await wikichain.methods.users(account[0]).call();
      if (account[0] === owner || user.isConsortium) {
        const transaction1 = await wikichain.methods
          .getTopPerformersForEachDomain()
          .send({ from: account[0], gas: 3000000 });
        console.log(transaction1);
        setTrans1(
          "Top performers from each domain has been selected...Proceed to form consortium"
        );
        const transaction2 = await wikichain.methods
          .addConsortium()
          .send({ from: account[0], gas: 3000000 });
        console.log(transaction2);
        setTrans2("Consortium formed successfully! ");
        setTransactionStatus("Consortium formed successfully! ");
      } else {
        setIsUserRegistered(user.isRegistered);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error registering user:", error.message);
      setTransactionStatus("Sorry !!! Transaction failed!");
    }
  };
  const handleCids = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cids = await wikichain.methods.getAllArticleCIDs().call();
      setAllArticleCIDs(cids);
      console.log(cids);

      // const response = await fetch("http://localhost:5000/checkAvailability", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ cids }),
      // });

      // if (!response.ok) {
      //   throw new Error("Error fetching missing CIDs");
      // }

      // const data = await response.json();
      // setMissingCIDs(data.missingCids);
      // console.log(data.missingCids);
    } catch (error) {
      console.error("Error fetching or checking CIDs:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          {isUserRegistered ? (
            <div>
              <div>
                {isConsortium || owner === account ? (
                  <div>
                    <div className="text-center p-32 shadow-4xl m-40 text-primary">
                      <div>
                        <p className="text-center text-3xl text-black">
                          {trans1}
                        </p>
                        <p className="text-center text-3xl text-black">
                          {trans2}
                        </p>
                        <br />
                        <br />
                        <p className="text-3xl">
                          You are a Validator, You can change the consortium
                          Members using the below algorithm "Dynamic Consortium
                          Membership Designation (DCMD)".
                        </p>
                        <button
                          className="m-5 bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded"
                          onClick={handleConsortium}
                        >
                          DCMD
                        </button>
                      </div>
                      <div>
                        <p className="text-3xl">
                          You are a Validator, You can check whether the
                          articles present using the below algorithm
                          "Proof-of-Existence(POE)".
                        </p>
                        <button
                          className="m-5 bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded"
                          onClick={handleCids}
                        >
                          POE
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center text-5xl p-32 shadow-4xl m-40 text-primary">
                      <p>⚠️ You are not a Validator, Entry is restricted!</p>
                    </div>
                  </div>
                )}
              </div>
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

export default Consortium;
