import React from "react";

function Footer() {
  return (
    <footer className="bg-white pt-8 bg-opacity-5">
      <div className="container mx-auto flex flex-col items-center grid grid-cols-2 grid-rows-1">
        {/* <div className="p-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">Guided by</h2>
          <p className="font-bold text-xl">Dr J Chandra Priya [AP],</p>
          <p>Department of Computer Science and Engineering,</p>
          <p>Mepco Schlenk Engineering College.</p>
        </div> */}
        <div className="p-10">
          <h2 className="text-3xl text-primary font-bold mb-4">
            Team Member 1
          </h2>
          <p className="font-bold text-xl">R Nikil Sri Shen</p>
          <p>Department of Computer Science and Engineering,</p>
          <p>Mepco Schlenk Engineering College.</p>
        </div>
        <div className="p-10">
          <h2 className="text-3xl text-primary font-bold mb-4">
            Team Member 2
          </h2>
          <p className="font-bold text-xl">M Madhavan</p>
          <p>Department of Computer Science and Engineering,</p>
          <p>Mepco Schlenk Engineering College.</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white text-xl text-black p-0">
        <p>©️ Nikil Sri Shen 2023 💖.</p>
        <img src="/bmc.png" className="h-6 w-20" alt="Buy Me a Coffee"></img>
      </div>
    </footer>
  );
}

export default Footer;
