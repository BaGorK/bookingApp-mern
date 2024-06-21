import { ReactNode, createContext, useContext } from 'react';

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

type Props = {
  children: ReactNode;
};
export const SearchContextProvider = ({ children }: Props) => {
  return <SearchContext.Provider value={{}}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => useContext(SearchContext)