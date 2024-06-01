import { Link } from "react-router-dom";

export default function MyHotels() {
  return (
    <div>
      <span className="space-y-5">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotels"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotels
        </Link>
      </span>
    </div>
  );
}
