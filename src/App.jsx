import { useState } from 'react'
import './App.css'
import usePasswordGenerator from './hooks/usePasswordGenerator';
import PasswordStrengthIndicator from './components/StrengthChecker';
import Button from "./components/Button";

function App() {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [checkBoxData, setCheckBoxData] = useState([
    {
      title: "Include Uppercase Letters",
      state: false
    },
    {
      title: "Include Lower Letters",
      state: false
    },
    {
      title: "Include Numbers",
      state: false
    },
    {
      title: "Include Symbols",
      state: false
    },
  ]);

  const handleCheckboxChange = (i) => {
    const updatedCheckBoxData = [...checkBoxData]
    updatedCheckBoxData[i].state = !updatedCheckBoxData[i].state;
    setCheckBoxData(updatedCheckBoxData);
  }

  const handleCopy = () => { 
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <div className="p-6 m-2 bg-[#24232b] w-1/2">
        {password && (
          <div className="text-white flex justify-between font-bold	text-xl">
            <div className="pb-5">{password}</div>
            <Button
              onClick={handleCopy}
              customClass={"p-3 rounded-md bg-[#2a8b8b] h-10 text-xs uppercase"}
              text={copied ? "Copied" : "Copy"}
            />
          </div>
        )}

        <div className="text-white flex flex-col text-xl font-bold pb-6">
          <span className="w-full flex justify-between pb-6">
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="text-white grid grid-cols-2 w-auto font-bold text-base">
          {checkBoxData.map((data, index) => {
            return (
              <div className="flex gap-1.5 pb-6" key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={data.state}
                />
                <label>{data.title}</label>
              </div>
            );
          })}
        </div>

        <PasswordStrengthIndicator password={password} />

        {errorMessage && (
          <div className="w-full text-lg p-5 text-red-600">{errorMessage}</div>
        )}

        <Button
          onClick={() => generatePassword(checkBoxData, length)}
          customClass={
            "p-3 rounded-md bg-[#2a8b8b] text-white w-full font-bold text-xl uppercase"
          }
          text={"Generate Password"}
        />
      </div>
    </div>
  );
}

export default App;
 
