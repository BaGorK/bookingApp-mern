/* eslint-disable react-refresh/only-export-components */
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';
import toast from 'react-hot-toast';
import { loadStripe, Stripe } from '@stripe/stripe-js';

import * as apiClient from '../services/api-client';
import Spinner from '../components/Spinner';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

const showToast = (toastMessage: ToastMessage) => {
  const { message, type } = toastMessage;

  if (type === 'SUCCESS') {
    toast.success(message);
  }

  if (type === 'ERROR') {
    toast.error(message);
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

function AppContextProvider(props: { children: ReactNode }) {
  const { isError, isLoading } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  if (isLoading)
    return (
      <AppContext.Provider
        value={{ showToast, isLoggedIn: !isError, stripePromise }}
      >
        <Spinner />
      </AppContext.Provider>
    );

  return (
    <AppContext.Provider
      value={{ showToast, isLoggedIn: !isError, stripePromise }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export default AppContextProvider;
