import "./App.css";

import { usePreference } from "./contexts/PrefernceContext";
import Nav from "./components/Nav";
import Genres from "./components/Genres";
import TypeOfContent from "./components/TypeOfContent";

function App() {
  const { preferences } = usePreference();
  console.log(preferences);

  return (
    <div className="App">
      <Nav />
      <TypeOfContent />
      <Genres />
    </div>
  );
}

export default App;
