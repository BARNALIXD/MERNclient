import CommonForm from "@/components/common-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { AlertCircle, CircleCheck, GraduationCap } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    alert,
    setAlert,
    alertMsg,
    setAlertMsg,
    success,
    setSuccess,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log("ALERT", alert);
  }, [alert]);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  console.log(signInFormData);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
          <Link to={"/"} className="flex items-center justify-center">
            <GraduationCap className="h-8 w-8 mr-4" />
            <span className="font-extrabold text-xl">LMS LEARN</span>
          </Link>
        </header>
        <div className="flex items-center justify-center min-h-screen bg-background">
          <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={handleTabChange}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>Sign in to your account</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signInFormControls}
                    buttonText={"Sign In"}
                    formData={signInFormData}
                    setFormData={setSignInFormData}
                    isButtonDisabled={!checkIfSignInFormIsValid()}
                    handleSubmit={handleLoginUser}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>Create a new account</CardTitle>
                  <CardDescription>
                    Enter your details to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signUpFormControls}
                    buttonText={"Sign Up"}
                    formData={signUpFormData}
                    setFormData={setSignUpFormData}
                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                    handleSubmit={handleRegisterUser}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {alert && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
          <Alert variant={success ? "default" : "destructive"}>
            {!success ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CircleCheck className="h-4 w-4"></CircleCheck>
            )}
            <AlertTitle>{success ? "SUCCESS" : "ERROR"}</AlertTitle>
            <AlertDescription>{alertMsg}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}

export default AuthPage;
