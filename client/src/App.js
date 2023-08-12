import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/User/HomePage";
import TestEnv from "./pages/TestEnv";
import './App.css'
function App() {

  return (
    <div className="App">
  <Router>
<Routes>
<Route path="/UserHome" element={<HomePage/>}/>
</Routes>


<Routes>
<Route path="/test" element={<TestEnv/>}/>
</Routes>







  </Router>
    </div>
  );
}

export default App;
