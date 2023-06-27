import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloud,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsWater,
  BsThermometer,
  BsWind,
  BsPlusSlashMinus,
} from "react-icons/bs";

import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";

import { useState, useEffect } from "react";
import ChangeTemp from "./ChangeTemp";
import { fetchWeatherApi } from "../api/Api";

const BoxWeather = ({ location }) => {
  const [data, setData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchWeatherApi(location)
      .then((response) => {
        setData(response);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location]);

  let icon;
  let iconName;

  console.log(data);

  if (data && data.weather && data.weather.length > 0) {
    switch (data.weather[0].main) {
      case "Clouds":
        icon = <IoMdCloud />;
        iconName = "Nublado";
        break;
      case "Clear":
        icon = <IoMdSunny />;
        iconName = "Ensolarado";
        break;
      case "Haze":
        icon = <BsCloudHaze2Fill />;
        iconName = "Neblina";
        break;
      case "Drizzle":
        icon = <BsCloudDrizzleFill />;
        iconName = "Chuvisco";
        break;
      case "Snow":
        icon = <IoMdSnow />;
        iconName = "Neve";
        break;
      case "Thunderstorm":
        icon = <IoMdThunderstorm />;
        iconName = "Tempestade";
        break;
      case "Rain":
        icon = <IoMdRainy />;
        iconName = "Chuvoso";
        break;
      default:
        icon = null;
        iconName = "";
    }
  } else {
    icon = null;
    iconName = "";
  }

  const convertToFahrenheit = (Celsius) => {
    return Math.round((Celsius * 9) / 5 + 32);
  };

  let humidity = "";
  let windSpeed = "";
  let thermalSensation = "";
  let min = "";
  let max = "";

  if (data && data.main && data.main.feels_like) {
    let kelvin = data.main.feels_like;
    let Celsius = kelvin - 273.15;
    thermalSensation = isCelsius
      ? Math.floor(Celsius)
      : convertToFahrenheit(Math.floor(Celsius));
  }

  if (data && data.main && data.main.temp_min) {
    let kelvinMin = data.main.temp_min;
    let CelsiusMin = kelvinMin - 273.15;
    min = isCelsius
      ? Math.floor(CelsiusMin)
      : Math.floor(convertToFahrenheit(CelsiusMin));
  }

  if (data && data.main && data.main.temp_max) {
    let kelvinMax = data.main.temp_max;
    let CelsiusMax = kelvinMax - 273.15;
    max = isCelsius
      ? Math.floor(CelsiusMax)
      : Math.floor(convertToFahrenheit(CelsiusMax));
  }

  if (data && data.main && data.main.humidity) {
    humidity = data.main.humidity;
  }

  if (data && data.wind && data.wind.speed) {
    windSpeed = Math.round(data.wind.speed * 3.6);
  }

  const toggleTemperature = () => {
    setIsCelsius((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center mt-[32px]">
      <div
        className="w-full max-w-[450px] min-h-[490px] flex flex-col items-center 
      border-solid border-2 rounded-[32px] border-slate-600 shadow-lg"
      >
        {isLoading ? (
          <div className="flex items-center justify-center flex-1 pb-[40px]">
            <span className="loader"></span>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center flex-1 pb-[40px]">
            <span className="text-[22px] font-semibold">
              Serviço fora do ar!
            </span>
          </div>
        ) : !data.name ? (
          <div className="flex items-center justify-center flex-1 pb-[40px]">
            <span className="text-[22px] font-semibold">
              Localização não encontrada.
            </span>
          </div>
        ) : (
          <>
            {data && (
              <div className="flex flex-col items-center mt-8">
                <span className="text-[28px] font-semibold">
                  {data.name} - {data.sys.country}
                </span>
                <div className="flex items-center justify-center text-[82px] my-1">
                  <div>{icon}</div>
                  <div className="text-[64px] flex items-center ml-2">
                    <ChangeTemp
                      isCelsius={isCelsius}
                      toggleTemperature={toggleTemperature}
                      location={location}
                    />
                  </div>
                </div>
                <span
                  className="flex items-center justify-center font-semibold text-[28px] 
         w-full pb-4 border-b-2 border-slate-950"
                >
                  {iconName}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <div className="my-8">
                <p className="flex text-[20px] pb-4">
                  <BsPlusSlashMinus className="text-[22px] mt-[4px] mr-2" />
                  Min e Max:
                  <span className="flex ml-1 items-center">
                    {min}{" "}
                    {isCelsius ? (
                      <TbTemperatureCelsius />
                    ) : (
                      <TbTemperatureFahrenheit />
                    )}
                    /{max}{" "}
                    {isCelsius ? (
                      <TbTemperatureCelsius />
                    ) : (
                      <TbTemperatureFahrenheit />
                    )}
                  </span>
                </p>
                <p className="flex text-[20px]">
                  <BsThermometer className="text-[30px] mr-1" />
                  Sensação Térmica:
                  <span className="ml-1 flex items-center">
                    {thermalSensation}{" "}
                    {isCelsius ? (
                      <TbTemperatureCelsius />
                    ) : (
                      <TbTemperatureFahrenheit />
                    )}
                  </span>
                </p>
              </div>
              <div className="ml-2">
                <p className="flex text-[20px] pb-3">
                  <BsWater className="text-[30px] mr-2" />
                  Umidade:
                  <span className="ml-1">{humidity}%</span>
                </p>
                <p className="flex text-[20px]">
                  <BsWind className="text-[30px] mr-2" />
                  Vento:
                  <span className="ml-1">{windSpeed} km/h</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BoxWeather;
