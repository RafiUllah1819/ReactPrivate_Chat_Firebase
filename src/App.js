import "./App.css";
import { Routs } from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { ContextState } from "./Pages/ChatHome";

function App() {
  return (
    <div className="App">
      <ContextState>
        <Routs />
      </ContextState>
    </div>
  );
}

export default App;
