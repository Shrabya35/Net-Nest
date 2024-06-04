import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./Components/Events";
import Standings from "./Components/Standings";
import TeamInfo from "./Components/TeamInfo";
import Stats from "./Components/Stats";
import LiveEvents from "./Components/LiveEvents";

function App() {
  return (
    <Router basename="/Net-Nest">
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/livescore" element={<LiveEvents />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/team/:teamId" element={<TeamInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
