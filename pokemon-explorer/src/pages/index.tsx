import { useEffect, useState } from "react";
import Link from "next/link";

interface PokemonEntry {
  name: string;
  url: string;
  id: number;
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<PokemonEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();

        const withId = data.results.map((item: PokemonEntry, index: number) => ({
          ...item,
          id: index + 1,
        }));

        setPokemons(withId);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    };

    getPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 py-10 px-4 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-8 text-center tracking-tight text-indigo-700">
          Pokémon Explorer
        </h1>

        <input
          type="text"
          placeholder="Search your favorite Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 mx-auto block mb-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {filteredPokemons.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center cursor-pointer hover:scale-105 transform">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={`Image of ${pokemon.name}`}
                  className="w-20 h-20 mx-auto mb-2"
                  loading="lazy"
                />
                <p className="capitalize font-semibold text-gray-800">{pokemon.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>🔍 Created by Anish Patnaik | Built with Next.js, TailwindCSS & PokeAPI</p>
        </div>
      </div>
    </div>
  );
}
