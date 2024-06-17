import React, { useState } from "react";
import Modal from "./Modal";

interface Pokemon {
  types: any;
  id: number;
  name: string;
  sprites: {
    front_default: string;
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

interface PokemonCardProps {
  pokemons: Pokemon[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const openPokemonDetails = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closePokemonDetails = () => {
    setSelectedPokemon(null);
  };

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className={`p-4 ${getLightenColorByType(pokemon.types[0].type.name)} shadow-md rounded-md cursor-pointer`}
          onClick={() => openPokemonDetails(pokemon)}
        >
          <div className="flex justify-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-36 h-36"
            />
          </div>
          <p className="text-lg font-semibold text-center mt-2 uppercase">
            {pokemon.name}
          </p>
          <div className="flex flex-wrap justify-center">
            {pokemon.types.map((typeInfo, index) => (
              <div
                key={index}
                className={`items-center ${getColorByType(
                  typeInfo.type.name
                )} rounded-2xl px-2 py-1 mr-2 mt-2 border-slate-800 border`}
              >
                <p className="uppercase text-xs text-white">
                  {typeInfo.type.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedPokemon && (
        <Modal pokemon={selectedPokemon} onClose={closePokemonDetails} />
      )}
    </div>
  );
};

export default PokemonCard;
