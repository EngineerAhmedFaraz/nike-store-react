import React from "react";
import { Hero, Sales, FlexContent } from "./components";
import {
  heroapi,
  popularsales,
  toprateslaes,
  highlight,
  sneaker,
} from "./data/Data.js";

const App = () => {
  return (
    <>git 
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        <Sales endpoint={popularsales} ifExists />
        <FlexContent endpoint={highlight} />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={sneaker} />
      </main>
    </>
  );
};

export default App;
