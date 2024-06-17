import React from "react";

interface Pokemon {
  types: any;
  id: number;
  name: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  base_experience: number;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

interface ModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ pokemon, onClose }) => {
  const getColorByType = (type: any[]) => {
    switch (type) {
      case "normal":
        return "bg-yellow-600";
      case "fire":
        return "bg-red-600";
      case "water":
        return "bg-blue-600";
      case "electric":
        return "bg-yellow-400";
      case "grass":
        return "bg-green-500";
      case "ice":
        return "bg-blue-300";
      case "fighting":
        return "bg-red-800";
      case "poison":
        return "bg-purple-700";
      case "ground":
        return "bg-yellow-800";
      case "flying":
        return "bg-blue-400";
      case "psychic":
        return "bg-pink-500";
      case "bug":
        return "bg-green-800";
      case "rock":
        return "bg-gray-600";
      case "ghost":
        return "bg-indigo-800";
      case "dragon":
        return "bg-indigo-600";
      case "dark":
        return "bg-gray-800";
      case "steel":
        return "bg-gray-400";
      case "fairy":
        return "bg-pink-300";
      default:
        return "bg-slate-300";
    }
  };

  const getLightenColorByType = (type: any[]) => {
    switch (type) {
      case "normal":
        return "bg-amber-300";
      case "fire":
        return "bg-red-300";
      case "water":
        return "bg-blue-300";
      case "electric":
        return "bg-yellow-200";
      case "grass":
        return "bg-green-200";
      case "ice":
        return "bg-blue-200";
      case "fighting":
        return "bg-red-500";
      case "poison":
        return "bg-purple-500";
      case "ground":
        return "bg-yellow-600";
      case "flying":
        return "bg-blue-400";
      case "psychic":
        return "bg-pink-300";
      case "bug":
        return "bg-green-500";
      case "rock":
        return "bg-gray-400";
      case "ghost":
        return "bg-indigo-500";
      case "dragon":
        return "bg-indigo-600";
      case "dark":
        return "bg-gray-800";
      case "steel":
        return "bg-gray-400";
      case "fairy":
        return "bg-pink-100";
      default:
        return "bg-slate-300";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className={`${getLightenColorByType(
          pokemon.types[0].type.name
        )} rounded-lg shadow-lg overflow-hidden max-w-md w-full `}
      >
        <div className="p-4"
        >
          <div>
            <div className="flex-row justify-between mt-4 mx-4 flex">
              <p className="text-[24px] font-extrabold text-slate-800 uppercase">
                {pokemon.name}
              </p>
              <p className="text-[20px] text-slate-600">#{pokemon.id}</p>
            </div>
            <div className="flex-row p-3 items-center flex gap-2">
              {pokemon.types.map((typeInfo, index) => (
                <div
                  key={index}
                  className={`items-center ${getColorByType(
                    typeInfo.type.name
                  )} rounded-2xl px-2 py-1 flex-1 border-slate-800 border mb-2`}
                >
                  <p className="uppercase text-[12px] text-white text-center ">
                    {typeInfo.type.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="items-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: 150, height: 150 }}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-4 mx-4">
          <div className="gap-2 mb-4">
            <div className="border-b border-slate-400">
              <p className="text-[18px] font-extrabold text-slate-800">Sobre</p>
            </div>
            <div className="flex-row justify-between w-1/2 flex">
              <p className="text-[16px] text-slate-400">Experiência Base</p>
              <p className="text-[16px] font-bold text-slate-800">
                {pokemon.base_experience}
              </p>
            </div>
            <div className="flex-row justify-between w-1/2 flex">
              <p className="text-[16px] text-slate-400">Altura</p>
              <p className="text-[16px] font-bold text-slate-800">
                {pokemon.height}
              </p>
            </div>
            <div className="flex-row justify-between w-1/2 flex">
              <p className="text-[16px] text-slate-400">Peso</p>
              <p className="text-[16px] font-bold text-slate-800">
                {pokemon.weight}
              </p>
            </div>
          </div>

          <div className="gap-2 mb-2">
            <div className="border-b border-slate-400">
              <p className="text-[18px] font-extrabold text-slate-800">
                Abilities
              </p>
            </div>
            <div>
              {pokemon.abilities.map((ability, index) => (
                <p
                  key={index}
                  className="text-[16px] text-slate-800 font-bold uppercase"
                >
                  {ability.ability.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        <button
          className="block mx-auto mt-4 px-4 py-2 bg-yellow-300 mb-2 text-blue-500 rounded hover:bg-yellow-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
