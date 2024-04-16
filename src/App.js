import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Publish from "./components/publishArticle/Publish";
import Search from "./components/searchArticle/Search";
import Update from "./components/updateArticle/Update";
import Registration from "./components/userRegistration/Registration";
import Error from "./components/Error";
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";
import Consortium from "./components/consortium/Consortium";

function App() {
  return (
    <div className="text-quaternary">
      <Navbar />
      <br />
      <br />
      <br />
      <Main>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/publish" element={<Publish />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route exact path="/update" element={<Update />}></Route>
          <Route exact path="/registration" element={<Registration />}></Route>
          <Route exact path="/consortium" element={<Consortium />}></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
