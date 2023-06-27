export const fetchWeatherApi = async (location) => {
  const ApiKey = "47f8e53061d65bd82384567d785b21b0";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${ApiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};
