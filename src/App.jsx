import React from "react";
import Hero from "./components/Hero";
import { heroapi } from "./data/Data.js";

const App = () => {
  return (
    <>
      <main>
        <Hero heroapi={heroapi} />
      </main>
    </>
  );
};

export default App;