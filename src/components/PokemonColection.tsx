import React from "react";
import { Detail, Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpen) {
      setDetail({
        id: id,
        isOpen: true,
      });
    }
  };
  return (
    <>
      <section
        className={
          viewDetail.isOpen
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpen ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((item, idx) => {
          return (
            <div
              onClick={() => {
                selectPokemon(item.id);
              }}
              className=""
              key={item.id}
            >
              <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                name={item.name}
                id={item.id}
                img={item.sprites.front_default}
                abilities={item.abilities}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonColection;
