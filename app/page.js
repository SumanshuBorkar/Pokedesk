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
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        if (!response.ok) {
          throw new Error("Failed to get any Pokemon");
        }

        const data = await response.json();

        const pokemonData = data.results.map((item, index) => ({
          id: "ind" + index,
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
    <main className="w-[100vw] h-[100vh] bg-white">
      {/* Header */}
      <section className="w-[100%] h-[20%]  bg-red-500">
        <h1 className="text-black-100">
          Pokémon Explorer
        </h1>

        <p className="mt-3 text-blue-100">
          Explore Pokémon, their abilities, stats, types and moves.
        </p>
      </section>

      <section>


        
            <div className="mb-6 flex items-center justify-between">

              <p className="text-red-500">
                {filteredPokemon.length} found
              </p>
            </div>

            {filteredPokemon.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center shadow">
                <p className="text-lg text-gray-500">
                  No Pokémon found.
                </p>
              </div>
            ) : (
              <div className="d-flex flex-wrap w-[100]">
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