import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [city, setCity] = useState(
    localStorage.getItem("location") || "Bangalore"
  );

  const changeCity = (newCity) => {
    localStorage.setItem("location", newCity);
    setCity(newCity);
  };

  return (
    <LocationContext.Provider
      value={{ city, changeCity }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationCity = () =>
  useContext(LocationContext);