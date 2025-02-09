
import { Routes , Route } from "react-router-dom";
import Authpage from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authpage />}>
      </Route>
    </Routes>
  );
}

export default App;
