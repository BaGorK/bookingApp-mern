import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../services/api-client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SignOutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      toast.success('Sign out successful');
      navigate('/');
      await queryClient.invalidateQueries({
        queryKey: ['validateToken'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className='text-blue-600 px-3 py-2 rounded font-bold bg-white hover:bg-gray-100'
    >
      {isPending ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
