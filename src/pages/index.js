import React from "react";
import Layout from "../components/layout";
import Board from "../components/board";
import GameAgent from "../components/gameAgent";

const IndexPage = () => {
  return (
    <Layout>
      <section className="flex flex-wrap w-full max-w-xl relative">
        <GameAgent>
          <Board />
        </GameAgent>
      </section>
    </Layout>
  );
};

export default IndexPage;
