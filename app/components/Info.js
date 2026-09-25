export default function Info({ title, value }) {
    return (
        <div className="rounded-[0_30px_30px_0_] bg-green-400  p-4">
            <p className="text-sm text-black-500 capitalize">{title}</p>
            <p className="mt-1 text-lg font-bold text-gray-800">
                {value}
            </p>
        </div>
    );
}