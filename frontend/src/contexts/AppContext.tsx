/* eslint-disable react-refresh/only-export-components */
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';
import toast from 'react-hot-toast';
import * as apiClient from '../services/api-client';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
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

function AppContextProvider(props: { children: ReactNode }) {
  const { isError } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  return (
    <AppContext.Provider value={{ showToast, isLoggedIn: !isError }}>
      {props.children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export default AppContextProvider;
