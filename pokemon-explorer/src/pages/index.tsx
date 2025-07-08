import { useEffect, useState } from "react";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      const resultsWithId = data.results.map((pokemon: Pokemon, index: number) => ({
        ...pokemon,
        id: index + 1,
      }));
      setPokemonList(resultsWithId);
    }

    fetchPokemon();
  }, []);

  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  // updated
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 py-8 px-4 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Pokémon Explorer</h1>

        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 mx-auto block mb-8 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {filtered.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer hover:scale-105 transform">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-20 h-20 mx-auto"
                />
                <p className="mt-2 capitalize font-semibold">{pokemon.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
