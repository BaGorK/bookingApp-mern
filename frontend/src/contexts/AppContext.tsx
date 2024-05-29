/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from 'react';
import toast from 'react-hot-toast';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
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
  return (
    <AppContext.Provider value={{ showToast }}>
      {props.children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export default AppContextProvider;
