import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {!isLoggedIn ? (
            <Link
              to="/sign-in"
              className="flex rounded items-center text-blue-600 font-bold px-3 transition duration-300 hover:bg-gray-300 hover:text-blue-700 bg-gray-100"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                className="flex rounded items-center text-white px-3 font-bold transition duration-300 hover:bg-blue-600"
                to="/my-bookings"
              >
                My bookings
              </Link>
              <Link
                className="flex rounded items-center text-white px-3 font-bold transition duration-300 hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          )}
        </span>
      </div>
    </div>
  );
}
