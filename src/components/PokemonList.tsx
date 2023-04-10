import React, { useEffect, useState } from "react";
import { Detail } from "../interface";
interface Props {
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  name: string;
  id: number;
  img: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
}

const PokemonList: React.FC<Props> = (props) => {
  const { id, name, img, abilities, viewDetail, setDetail } = props;
  const [selected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);
  return (
    <div>
      {selected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p
              className="detail-close"
              onClick={() => {
                setDetail({
                  id: 0,
                  isOpen: false,
                });
              }}
            >
              X
            </p>
            <div className="detail-info">
              <img src={img} alt="pokemon" className="detaul-img" />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability">Abilities:</p>
              {abilities?.map((ab: any) => {
                return <div className="">{ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name ">{name}</p>
          <img src={img} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
