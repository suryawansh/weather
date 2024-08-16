import "./App.css";
import WeatherApp from "./components/weather";

function App() {
  return (
    <div className="flex-col items-center mt-[40px] ml-[500px] ">
      <div bg-slate-800>
        <h1 className="text-3xl font-bold ml-[200px]">Weather Application</h1>
      </div>
      <div className="rounded-xl border border-black m-3  bg-gray-200 w-[800px]">
        <WeatherApp />
      </div>
    </div>
  );
}

export default App;
