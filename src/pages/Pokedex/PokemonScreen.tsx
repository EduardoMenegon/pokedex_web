import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import MainContent from '../../components/MainContent';
import Footer from '../../components/Footer';
import PokemonCard from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  url: string;
}

const PokemonScreen: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterName, setFilterName] = useState('');

  const fetchPokemons = async (limit: number, offset: number) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
        params: {
          limit: limit,
          offset: offset,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchPokemonDetails = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const loadPokemons = async (newOffset: number) => {
    if (isLoading || isEndReached) return;
  
    setIsLoading(true);
    const pokemonList = await fetchPokemons(20, newOffset);
    const pokemonDetailsPromises = pokemonList.map((pokemon: Pokemon) =>
      fetchPokemonDetails(pokemon.url)
    );
  
    const newPokemons = await Promise.all(pokemonDetailsPromises);
    const filteredPokemons = newPokemons.filter((pokemon: Pokemon) => {
      const matchesType = filterType ? pokemon.types.some(t => t.type.name === filterType) : true;
      const matchesName = filterName ? pokemon.name.includes(filterName.toLowerCase()) : true;
      return matchesType && matchesName;
    });
  
    if (filteredPokemons.length === 0) setIsEndReached(true);
    setPokemons(prevPokemons => [...prevPokemons, ...filteredPokemons]); // Concatenates new and existing pokemons
    setOffset(newOffset + 20);
    setIsLoading(false);
  };
  

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'filterType') setFilterType(value);
    if (name === 'filterName') setFilterName(value);
  };

  useEffect(() => {
    setPokemons([]);
    setOffset(0);
    setIsEndReached(false);
    loadPokemons(0);
  }, [filterType, filterName]);
  

  return (
    <div className="pokemon-screen p-0">
      <Header className="">
        <h1 className="text-xl font-bold">Pokedex</h1>
      </Header>
      <MainContent className="mt-16 mb-4">
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            name="filterName"
            value={filterName}
            onChange={handleFilterChange}
            placeholder="Filter by name"
            className="mr-2 p-2 border rounded"
          />
          <select
            name="filterType"
            value={filterType}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="normal">Normal</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="ice">Ice</option>
            <option value="fighting">Fighting</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="flying">Flying</option>
            <option value="psychic">Psychic</option>
            <option value="bug">Bug</option>
            <option value="rock">Rock</option>
            <option value="ghost">Ghost</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="steel">Steel</option>
            <option value="fairy">Fairy</option>
          </select>
          <button
            className="px-4 py-2 bg-yellow-300 text-blue-500 rounded hover:bg-yellow-600 ml-2"
            onClick={() => loadPokemons(offset)}
            disabled={isLoading || isEndReached}
          >
            {isLoading ? 'Loading...' : isEndReached ? 'No more Pokémon' : 'Refresh'}
          </button>
        </div>
        {pokemons.length === 0 ? (
          <div className="flex justify-center items-center">
            <p>No Pokémon found</p>
          </div>
        ) : (
          <PokemonCard pokemons={pokemons} />
        )}
      </MainContent>
      <Footer>
        <button
          className="px-4 py-2 bg-yellow-300 text-blue-500 rounded hover:bg-yellow-600"
          onClick={() => loadPokemons(offset)}
          disabled={isLoading || isEndReached}
        >
          {isLoading ? 'Loading...' : isEndReached ? 'No more Pokémon' : 'Load More'}
        </button>
      </Footer>
    </div>
  );
};

export default PokemonScreen;

