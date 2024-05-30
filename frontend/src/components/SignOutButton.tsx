import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../services/api-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: () => {
      toast.success("Sign out successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
}
