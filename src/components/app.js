import React, { useState, useRef, useEffect } from "react";
import { fetchWeather } from "../api/fetchWeather";
import {
  MainWrapper as Wrapper,
  Celcius,
  Country,
  Description,
  Image,
  Input,
  Location,
  Name,
  Search,
  Temperature,
  Text,
  Weather,
} from "./app.styles";

const App = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({});
  const queryRef = useRef(null);

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query).catch((err) => {
        console.log(err);
        setError(`${err}`);
      });

      if (data) {
        setWeather(data);
        setError(null);
      }

      setQuery("");
    }
  };

  useEffect(() => {
    queryRef.current.focus();
  }, []);

  return (
    <Wrapper>
      <Search>
        <Input
          ref={queryRef}
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </Search>
      {error && <p>{error}</p>}
      {weather?.main && (
        <Weather>
          <Location>
            <Name>{weather.name}</Name>
            <Country>{weather.sys.country}</Country>
          </Location>
          <Temperature>
            {Math.round(weather.main.temp)}
            <Celcius>&deg;C</Celcius>
          </Temperature>
          <Description>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <Text>{weather.weather[0].description}</Text>
          </Description>
        </Weather>
      )}
    </Wrapper>
  );
};

export default App;
