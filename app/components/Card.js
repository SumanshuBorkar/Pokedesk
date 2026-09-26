import Link from "next/link";

export default function Card({ pokemon }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="pokemon-card">

        <div className="red">
          <div className="shine"></div>
        </div>

        <div className="white">
          <h3 className="pokemon-name">
            {pokemon.name}
          </h3>
        </div>



        <div className="inside"></div>

        <img
          src={imageUrl}
          alt={pokemon.name}
          className="pokemon-image"
        />

      </div>
    </Link>
  );
}
