// import { useContext } from "react";
// import { Route, Routes } from "react-router-dom";
// import RouteGaurd from "./components/route-gaurd";
// import StudentViewCommonLayout from "./components/student-view/common-layout";
// import { AuthContext } from "./context/auth-context";
// import Authpage from "./pages/auth";
// import InstructorDashboardpage from "./pages/instructor";
// import AddNewCoursePage from "./pages/instructor/add-new-course";
// import NotFoundPage from "./pages/not-found";
// import StudentHomePage from "./pages/student/home";
// import StudentViewCoursesPage from "./pages/student/courses";
// import StudentViewCourseDetailsPage from "./pages/student/course-details";
// import PaypalPaymentReturnPage from "./pages/student/payment-return";
// import StudentCoursesPage from "./pages/student/student-courses";
// import StudentViewCourseProgressPage from "./pages/student/course-progress";

// function App() {
//   const { auth } = useContext(AuthContext);

//   return (
//     <Routes>
//       <Route
//         path="/auth"
//         element={
//           <RouteGaurd
//             element={<Authpage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor"
//         element={
//           <RouteGaurd
//             element={<InstructorDashboardpage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor/create-new-course"
//         element={
//           <RouteGaurd
//             element={<AddNewCoursePage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor/edit-course/:courseId"
//         element={
//           <RouteGaurd
//             element={<AddNewCoursePage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/"
//         element={
//           <RouteGaurd
//             element={<StudentViewCommonLayout />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       >
//         <Route path="" element={<StudentHomePage />} />
//         <Route path="home" element={<StudentHomePage />} />
//         <Route path="courses" element={<StudentViewCoursesPage />} />
//         <Route
//           path="course/details/:id"
//           element={<StudentViewCourseDetailsPage />}
//         />
//         <Route path="payment return" element={<PaypalPaymentReturnPage />} />
//         <Route path="student-courses" element={<StudentCoursesPage/>}/>
//         <Route path="course-progress" element={<StudentViewCourseProgressPage/>}/>
//       </Route>
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// }

// export default App;



import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
// import RouteGuard from "./components/route-guard";
import RouteGuard from "./components/route-gaurd";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import { AuthContext } from "./context/auth-context";
import AuthPage from "./pages/auth";
import InstructorDashboardpage from "./pages/instructor";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import NotFoundPage from "./pages/not-found";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentHomePage from "./pages/student/home";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route
          path="course/details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
