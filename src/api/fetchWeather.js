import Axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (query) => {
  const { data } = await Axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: process.env.WEATHER_API_KEY,
    },
  }).catch(() => {
    throw new Error("Cannot find the location!");
  });
  return data;
};
