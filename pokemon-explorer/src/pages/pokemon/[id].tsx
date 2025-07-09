import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();

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
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  return {
    props: {
      pokemonInfo: data,
    },
  };
};

export default function PokemonDetailPage({ pokemonInfo }: { pokemonInfo: any }) {
  const { name, sprites, types, abilities, stats, moves, id } = pokemonInfo;

  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const imageSrc = sprites?.front_default || "/no-image.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-6 text-gray-900">
      <div className="max-w-4xl mx-auto">

        <Link href="/" className="text-indigo-700 hover:underline text-sm font-medium">
          ← Go Back to Home
        </Link>

        <div className="bg-white shadow-2xl rounded-3xl mt-6 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src={imageSrc}
            alt={name}
            className="w-52 h-52 mx-auto drop-shadow-xl hover:scale-105 transition-transform"
          />

          <div>
            <h1 className="text-4xl font-bold text-indigo-800 mb-4">
              #{id} {formattedName}
            </h1>

            <p className="mb-2">
              <strong>Type:</strong>{" "}
              {types.map((t: any) => (
                <span
                  key={t.type.name}
                  className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2"
                >
                  {t.type.name}
                </span>
              ))}
            </p>

            <p className="mb-2">
              <strong>Abilities:</strong>{" "}
              {abilities.map((a: any) => a.ability.name).join(", ")}
            </p>

            <div className="mb-4">
              <h2 className="font-semibold mb-1">Base Stats:</h2>
              <ul className="space-y-1 text-sm">
                {stats.map((s: any) => (
                  <li key={s.stat.name}>
                    <span className="capitalize">{s.stat.name}</span>:{" "}
                    <span className="font-medium">{s.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <strong>Top Moves:</strong>{" "}
              {moves.slice(0, 5).map((m: any) => m.move.name).join(", ")}
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-10">
          <p>⚡ Project crafted by Anish Patnaik</p>
          <p>Powered by Next.js + TailwindCSS + PokeAPI</p>
        </div>
      </div>
    </div>
  );
}
