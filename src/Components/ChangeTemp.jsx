import { useState, useEffect } from "react";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { fetchWeatherApi } from "../api/Api";

const ChangeTemp = ({ isCelsius, toggleTemperature, location }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWeatherApi(location).then((response) => {
      setData(response);
    });
  }, [location]);

  const convertToFahrenheit = (Celsius) => {
    return Math.round(Celsius * 9 / 5 + 32);
  };

  const renderTemperature = () => {
    if (!data) {
      return null;
    }

    const temperatureCelsius = Math.round(data.main.temp - 273.15);
    const temperatureFahrenheit = convertToFahrenheit(temperatureCelsius);

    if (isCelsius) {
      return (
        <div className="flex items-center">
          <div>{temperatureCelsius}</div>
          <button>
          <TbTemperatureCelsius onClick={toggleTemperature} className="cursor-pointer" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <div>{temperatureFahrenheit}</div>
          <button>
          <TbTemperatureFahrenheit onClick={toggleTemperature} className="cursor-pointer" />
          </button>
        </div>
      );
    }
  };

  return <div>{renderTemperature()}</div>;
};

export default ChangeTemp;