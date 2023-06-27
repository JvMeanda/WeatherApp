import { useState } from "react";
import BoxWeather from "./Components/BoxWeather";
import Search from "./Components/Search";

function App() {
  const [location, setLocation] = useState('Brasília');

  return (
    <div className="flex flex-col justify-center pb-6 w-full h-screen bg-gradient-to-t from-slate-100 to-slate-200">
      <Search setLocation={setLocation} />
      <BoxWeather location={location} />
    </div>
  );
}

export default App;
