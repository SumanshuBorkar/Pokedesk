import Link from "next/link";
import Info from "@/app/components/Info";

async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
        return null;
    }
    return response.json();
}

export default async function Details({ params }) {
    const { id } = await params;

    const pokemon = await getPokemon(id);

    if (!pokemon) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Pokemon Not Found
                    </h1>

                    <Link
                        href="/"
                        className="mt-5 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-700"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    const imageUrl = [
        pokemon.sprites.front_default,
        pokemon.sprites.back_default,
        pokemon.sprites.front_shiny,
        pokemon.sprites.back_shiny
    ]

    return (
        <main className="min-h-screen bg-yellow-400 px-4 py-6 sm:px-6 md:py-10">

            <div className="mx-5 mb-6 max-w-5xl">
                <Link
                    href="/"
                    className="inline-block rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                    Back
                </Link>
            </div>

            <div className="max-w-5xl overflow-hidden rounded-[60px_0_0_0] border-4 border-black bg-red-700 shadow-2xl mx-auto">

                <div className="grid md:grid-cols-2">

                    <div className="border-b-4 border-black p-5 sm:p-8 md:border-b-0 md:border-r-4">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-white">
                                <div className="h-11 w-11 rounded-full border-2 border-black bg-blue-400 transition-colors bg-blue-600">
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="h-5 w-5 rounded-full border-2 border-black bg-red-400" />
                                <div className="h-5 w-5 rounded-full border-2 border-black bg-yellow-300" />
                                <div className="h-5 w-5 rounded-full border-2 border-black bg-green-400" />
                            </div>

                        </div>

                        <div className="rounded-2xl border-4 border-black bg-red-500 p-4 shadow-inner">

                            <div className="mb-3 flex justify-center gap-4">
                                <div className="h-4 w-4 rounded-full bg-red-500" />
                                <div className="h-4 w-4 rounded-full bg-red-500" />
                            </div>

                            <div className="flex items-center justify-center rounded-xl border-4 border-black bg-green-200">
                                <img
                                    src={imageUrl[0]}
                                    alt={pokemon.name}
                                    className="h-4/5 w-4/5 object-contain"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="h-4 w-4 rounded-full border-2 border-black bg-red-500" />
                                <div className="flex gap-1">
                                    <div className="h-1 w-5 bg-black" />
                                    <div className="h-1 w-5 bg-black" />
                                    <div className="h-1 w-5 bg-black" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="h-10 w-10 rounded-full border-4 border-black bg-gray-700" />
                            <div className="flex gap-4">
                                <div className="h-3 w-12 rounded-full border-2 border-black bg-red-700" />
                                <div className="h-3 w-12 rounded-full border-2 border-black bg-blue-400" />
                            </div>
                        </div>

                        <div className="mt-5 flex justify-center">
                            <div className="rounded-md border-4 border-black bg-green-400 px-5 py-3">
                                <p className="font-mono text-sm font-bold uppercase">
                                    {pokemon.name}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="bg-red-700 p-5 sm:p-8">
                        <div className="mb-6 rounded-[0_50px_0_0] border-4 border-black bg-green-200 p-5">
                            <p className="mb-2 font-mono text-sm text-gray-700">
                                #{String(pokemon.id).padStart(3, "0")}
                            </p>
                            <h1 className="text-3xl font-extrabold capitalize text-gray-900">
                                {pokemon.name}
                            </h1>
                        </div>

                        <div className="mt-6 mb-6">
                            <h2 className="mb-3 text-xl font-bold">
                                Type
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {pokemon.types.map((type) => (
                                    <span
                                        key={type.type.name}
                                        className="rounded-md border-2 border-black bg-blue-300 px-4 py-2 font-bold capitalize"
                                    >
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Info
                                title="Height"
                                value={`${pokemon.height / 10} m`}
                            />
                            <Info
                                title="Weight"
                                value={`${pokemon.weight / 10} kg`}
                            />
                        </div>

                        <div className="mt-6">

                            <h2 className="mb-3 text-xl  font-bold">
                                Abilities
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {pokemon.abilities.map((ability) => (
                                    <span
                                        key={ability.ability.name}
                                        className="rounded-md border-2 border-black bg-blue-300 px-3 py-2 text-sm font-semibold capitalize"
                                    >
                                        {ability.ability.name.replace("-", " ")}
                                    </span>
                                ))}
                            </div>

                        </div>

                        <div className="mt-8 grid grid-cols-5 gap-2">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-7 rounded-sm border-2 border-black bg-blue-400"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <section className="border-t-4 border-black bg-red-800 p-5 sm:p-8">
                    <h2 className="mb-6 text-2xl font-bold">
                        Stats
                    </h2>
                    <div className="space-y-4">
                        {pokemon.stats.map((stat, index) => (
                            <Info key={index} title={stat.stat.name} value={stat.base_stat} />
                        ))}
                    </div>
                </section>

                <section className="border-t-4 border-black bg-red-700 p-5 sm:p-8">
                    <h2 className="mb-6 text-2xl font-bold">
                        Moves
                    </h2>
                    <div className="flex max-h-60 flex-wrap gap-2 overflow-y-auto">
                        {pokemon.moves.slice(0, 20).map((move) => (
                            <span
                                key={move.move.name}
                                className="rounded-md border-2 border-black bg-blue-400 px-3 py-2 text-sm font-semibold capitalize"
                            >
                                {move.move.name.replace("-", " ")}
                            </span>
                        ))}
                    </div>

                </section>
            </div>
        </main>
    );

}
