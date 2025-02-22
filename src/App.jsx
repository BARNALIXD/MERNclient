import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RouteGaurd from "./components/route-gaurd";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import { AuthContext } from "./context/auth-context";
import Authpage from "./pages/auth";
import InstructorDashboardpage from "./pages/instructor";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import NotFoundPage from "./pages/not-found";
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
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGaurd
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
        <Route
        path="/instructor/create-new-course"
        element={
          <RouteGaurd
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
          <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGaurd
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGaurd
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
