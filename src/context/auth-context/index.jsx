import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegisterUser(event) {
    event.preventDefault();

    try {
      const data = await registerService(signUpFormData);
      // console.log("data");
      // const data = await response.json()
      // console.log("data", data);
      if (data?.success) {
        setSuccess(true);
        setAlert(true);
        setAlertMsg(data.message);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else if (data?.response?.data?.success === false) {
        setAlert(true);
        setAlertMsg(data.response.data.message);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
      // if (data?.response?.data?.success === false) {
      //   setAlert(true);
      //   setAlertMsg(data.response.data.message);
      //   setTimeout(() => {
      //     setAlert(false);
      //   }, 4000);
      // } else if (data?.response?.data?.success === true) {
      //   setAlert(true);
      //   console.log("Data", data?.response?.data?.message);
      //   setAlertMsg(data.response.data.message);
      //   setSuccess(true);
      //   setTimeout(() => {
      //     setAlert(false);
      //   }, 4000);
    } catch (err) {
      console.error("Request failed:", err);
      setAlert(true);
      setSuccess(false);
      setAlertMsg("Something went wrong. Please try again.");
      setTimeout(() => {
        setAlert(false);
      }, 4000);

      // const data = await registerService(signUpFormData);
      // if (data?.response?.data?.success === false) {
      //   setAlert(true);
      //   setAlertMsg(data.response.data.message);
      //   setTimeout(() => {
      //     setAlert(false);
      //   }, 4000);
      // } else if (data.response.data.success === true) {
      //   setAlert(true);
      //   console.log("Data" , data?.response?.data?.message);
      //   // setAlertMsg(data.response.data.message);
      //   setSuccess(true);
      //   setTimeout(() => {
      //     setAlert(false);
      //     setSuccess(false);
      //   }, 4000);
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);

    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  //check auth user
  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        alert,
        setAlert,
        alertMsg,
        setAlertMsg,
        success,
        setSuccess,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}

// fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50
