/* eslint-disable react-refresh/only-export-components */
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

import * as apiClient from '../services/api-client';
import Spinner from '../components/Spinner';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

type AppContextType = {
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

const AppContext = createContext<AppContextType | null>(null);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

function AppContextProvider(props: { children: ReactNode }) {
  const { isError, isLoading } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  if (isLoading)
    return (
      <AppContext.Provider value={{ isLoggedIn: !isError, stripePromise }}>
        <div className='min-h-[80vh] flex items-center justify-center'>
          <Spinner />
        </div>
      </AppContext.Provider>
    );

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError, stripePromise }}>
      {props.children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error('useAppContext must be used within AppContextProvider');

  return ctx;
};

export default AppContextProvider;
