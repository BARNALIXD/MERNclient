import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RouteGaurd from "./components/route-gaurd";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import { AuthContext } from "./context/auth-context";
import Authpage from "./pages/auth";
import InstructorDashboardpage from "./pages/instructor";
import StudentHomePage from "./pages/student/home";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGaurd
            element={<Authpage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGaurd
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGaurd
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
