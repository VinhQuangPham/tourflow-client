import { useEffect, useState } from "react";
import "../styles/NewDestination.css";

interface Country {
  id: number;
  country: string;
}

const NewDestination = () => {
  const countriesGETUrl = "http://localhost:5175/api/country/";
  const [listCountries, setListCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );
  const [newCountryInput, setNewCountryInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");

  const fetchAllCountries = async () => {
    try {
      const response = await fetch(countriesGETUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const countries = await response.json();
      setListCountries(countries);
    } catch (error) {
      console.log("Got an error: ", error);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const handleSetSelectedCountry = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value
      ? parseInt(event.target.value, 10)
      : null;
    setSelectedCountryId(selectedId);
    // setNewCountryInput("");
  };

  const handleNewCountryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCountryInput(event.target.value);
    // setSelectedCountryId(null);
  };

  const handleCityInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCityInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedCountryId && cityInput.trim() !== "") {
      console.log({
        id: selectedCountryId,
        city: cityInput.trim(),
      });
    } else {
      console.log("Please select a country and enter a city.");
    }
  };

  return (
    <div>
      <div id="destination_header">
        <h3>Add new Destination</h3>
      </div>
      <div id="destination_container">
        <div id="country_container">
          <h4>Add new Country</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="inputField"
              value={newCountryInput}
              onChange={handleNewCountryInputChange}
              placeholder="New Country..."
            />
          </form>
        </div>

        <div id="city_container">
          <h4>Add new City</h4>
          <div className="dropdown-container">
            <label htmlFor="dropdown">Country</label>
            <select
              id="dropdown"
              value={selectedCountryId ?? ""}
              onChange={handleSetSelectedCountry}
            >
              <option value="" disabled>
                Select an option
              </option>
              {listCountries.map((option: Country) => (
                <option key={option.id} value={option.id}>
                  {option.country}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="inputField"
              value={cityInput}
              onChange={handleCityInputChange}
              placeholder="City..."
              required
            />
            <button id="submit_btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewDestination;
