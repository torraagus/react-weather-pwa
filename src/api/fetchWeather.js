import Axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "fcae7e2bb5a302ba98579155d04535c4";

export const fetchWeather = async (query) => {
  const { data } = await Axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: apiKey,
    },
  }).catch(() => {
    throw new Error("Cannot find the location!");
  });
  return data;
};
