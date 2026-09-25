import Link from "next/link";

export default function Card({ pokemon }) {
  const imageUrl = `https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/960px-International_Pok%C3%A9mon_logo.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail`;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="w-[20%] cursor-pointer rounded-2xl bg-white p-5 shadow-md">
        <div className="flex justify-center rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 p-4">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="h-44 w-44 object-contain transition duration-300 group-hover:scale-110"
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-400">
            #{String(pokemon.id).padStart(3, "0")}
          </p>

          <h3 className="mt-1 text-xl font-bold capitalize text-gray-800">
            {pokemon.name}
          </h3>

          <p className="mt-2 text-sm font-medium text-blue-600">
            View Details →
          </p>
        </div>
      </div>
    </Link>
  );
}