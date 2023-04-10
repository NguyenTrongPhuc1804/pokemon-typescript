import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import { Detail, Pokemon } from "./interface";
import PokemonColection from "./components/PokemonColection";
interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  let [num, setNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=40&offset=0`
      );

      data.results.forEach(async (item: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${item.name}`
        );
        setPokemon((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    setNum((num += 40));
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${num}`
    );
    data.results.forEach(async (item: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );
      setPokemon((p) => [...p, poke.data]);
      setLoading(false);
    });
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header text-5xl text-red-800">
          Pokemon
        </header>
        <PokemonColection
          pokemons={pokemon}
          viewDetail={viewDetail}
          setDetail={setViewDetail}
        />
        {!viewDetail.isOpen && (
          <div className="btn">
            <button
              className=""
              onClick={() => {
                loadMore();
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
