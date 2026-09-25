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
      <section className="w-[100%] h-[20%]  bg-red-500">
        <img className="w-[20%]" src="https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/960px-International_Pok%C3%A9mon_logo.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"/>

        <p className="mt-3 text-blue-100">
          Explore Pokémon, their abilities, stats, types and moves.
        </p>

        <input
                    type="text"
                    placeholder="Search Pokémon by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[50vw] rounded-xl border border-gray-200 bg-white px-5 py-4 text-gray-800 shadow-md outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
      
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
          <div className="d-flex">
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