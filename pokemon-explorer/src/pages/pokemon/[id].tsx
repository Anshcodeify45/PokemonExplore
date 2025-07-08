import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const paths = data.results.map((_: any, index: number) => ({
    params: { id: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await res.json();
  return {
    props: { pokemon },
  };
};

export default function PokemonDetail({ pokemon }: { pokemon: any }) {
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6 text-gray-900">
      <div className="max-w-4xl mx-auto">
      <Link
          href="/"
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          ← Back to list
        </Link>


        <div className="bg-white shadow-xl rounded-2xl mt-6 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto drop-shadow-md transition-transform hover:scale-105"
          />

          <div>
            <h1 className="text-4xl font-bold text-indigo-700 mb-4">
              #{pokemon.id} {capitalizedName}
            </h1>

            <p className="mb-2">
              <span className="font-semibold">Type:</span>{" "}
              {pokemon.types.map((t: any) => (
                <span
                  key={t.type.name}
                  className="inline-block px-2 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2"
                >
                  {t.type.name}
                </span>
              ))}
            </p>

            <p className="mb-2">
              <span className="font-semibold">Abilities:</span>{" "}
              {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
            </p>

            <div className="mb-4">
              <h2 className="font-semibold mb-1">Stats:</h2>
              <ul className="space-y-1 text-sm">
                {pokemon.stats.map((s: any) => (
                  <li key={s.stat.name}>
                    <span className="capitalize">{s.stat.name}</span>:{" "}
                    <span className="font-medium">{s.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <span className="font-semibold">Moves (first 5):</span>{" "}
              {pokemon.moves
                .slice(0, 5)
                .map((m: any) => m.move.name)
                .join(", ")}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-10">
          Built with ❤️ using Next.js, TailwindCSS, and PokeAPI
        </p>
      </div>
    </div>
  );
}
