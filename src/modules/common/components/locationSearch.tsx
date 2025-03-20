import { useState, ChangeEvent } from "react";
import Input from "./input";

interface Location {
  address: string;
  lat: number;
  lon: number;
}

interface Suggestion {
  properties: { label: string };
  geometry: { coordinates: [number, number] }; // [longitude, latitude]
}

interface LocationSearchProps {
  placeholder: string;
  onSelect: (location: Location) => void;
}

export default function LocationSearch({
  placeholder,
  onSelect,
}: LocationSearchProps) {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = async (input: string) => {
    if (!input) return setSuggestions([]);

    const apiKey = import.meta.env.VITE_OPENROUTESERVICE_API_KEY;
    const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(
      input
    )}&boundary.country=US`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSelect = (place: Suggestion) => {
    setQuery(place.properties.label);
    setSuggestions([]);
    onSelect({
      address: place.properties.label,
      lat: place.geometry.coordinates[1], // Latitude
      lon: place.geometry.coordinates[0], // Longitude
    });
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="border p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="z-10 absolute bg-white border w-full mt-1 shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {place.properties.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
