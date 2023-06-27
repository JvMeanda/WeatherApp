import { BsSearch } from "react-icons/bs";
import { useState } from "react";

const Search = ({ setLocation }) => {
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      setLocation(inputValue);
      setInputValue("");
    }

    if (inputValue === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
  };

  const enterKey = (e) => {
    if(e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <div className="flex justify-center w-full relative">
      <label
        className={`relative block w-full max-w-[450px] border-solid border-2 rounded-[32px] border-slate-600 shadow-lg ${
          animate ? "animate-shake" : "animate-none"
        }`}
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <BsSearch
            className="text-[20px] cursor-pointer ml-1"
            onClick={handleSubmit}
          />
        </span>
        <input
          className="w-[92%] p-[6px] ml-9 text-[18px] rounded-[32px] placeholder:text-slate-950 border-slate-600 outline-none bg-transparent"
          placeholder="Buscar cidade ou país"
          type="text"
          name="search"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={enterKey}
        />
      </label>
    </div>
  );
};

export default Search;
