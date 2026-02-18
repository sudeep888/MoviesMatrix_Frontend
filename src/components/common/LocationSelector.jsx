import { useState } from "react";

export default function LocationSelector() {
  const [city, setCity] = useState(
    localStorage.getItem("location") ||
      "Mumbai"
  );

  const cities = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Chennai",
  ];

  /* CHANGE CITY */
  const changeCity = (selected) => {
    setCity(selected);

    /* SAVE */
    localStorage.setItem(
      "location",
      selected
    );

    /* 🔥 BROADCAST EVENT */
    window.dispatchEvent(
      new Event("locationChanged")
    );
  };

  return (
    <select
      value={city}
      onChange={(e) =>
        changeCity(e.target.value)
      }
      className="bg-black/40 border border-white/20 px-3 py-2 rounded-lg text-white"
    >
      {cities.map((c) => (
        <option
          key={c}
          value={c}
          className="text-black"
        >
          {c}
        </option>
      ))}
    </select>
  );
}
