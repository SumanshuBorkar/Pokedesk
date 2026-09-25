"use client";

import { useEffect, useState } from "react";
import Card from "./components/Card"


export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );

        if (!response.ok) {
          throw new Error("Failed to get any Pokemon");
        }

        const data = await response.json();

        const pokemonData = data.results.map((item, index) => ({
          id: index + 1,
          name: item.name,
          url: item.url,
        }));

        setPokemon(pokemonData);
      } catch (error) {
        setError("Failed to load Pokemon. Please try again.");
      }
    }

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="w-full h-full overflow-hidden bg-white">
      <section className="flex w-full items-center justify-between gap-4 bg-red-500 px-4 py-3 sm:px-6 md:px-10 sticky top-0">
        <img
          className="h-auto w-1/4 shrink-0 sm:w-40 md:w-48"
          src="https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/960px-International_Pok%C3%A9mon_logo.svg.png"
          alt="Pokemon Logo"
        />

        <input
          type="text"
          placeholder="Search Pokemon by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-md outline-none sm:px-5 sm:py-3 sm:text-base"
        />
      </section>

      <section className="w-full px-4 py-4 sm:px-6 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-center text-base sm:text-lg">
          <h3 className="text-gray-700">
            Our Pokedesk has
          </h3>

          <p className="font-bold text-red-500">
            found {filteredPokemon.length}
          </p>

          <h3 className="text-gray-700">
            Pokemons
          </h3>
        </div>

        {filteredPokemon.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-xl bg-white p-8 text-center shadow-md sm:p-10">
            <p className="text-base text-gray-500 sm:text-lg">
              No Pokemon found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredPokemon.map((pokemon) => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}