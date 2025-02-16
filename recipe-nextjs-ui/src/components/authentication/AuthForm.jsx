import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Card, Input, Button } from "@/components/common";
import { useDispatch } from "react-redux";
import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from "@/validations/authValidation";
import { login, signup } from "@/services/auth.service";
import { showAlert } from "@/store/alertSlice";
import { ALERT_TYPE } from "@/constants/alert.constant";
import { login as loginAction } from "@/store/authSlice";
import { message } from "@/constants/message.constant";

function AuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [islogin, setIsLogin] = React.useState(true);
  const [error, setError] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset, // Get the reset function
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setError("");
    if (islogin) {
      try {
        const response = await login(data.email, data.password);
        dispatch(loginAction(response.data.data));
        dispatch(
          showAlert({
            message: response.data?.message || message.LOGIN_SUCCESS,
            type: ALERT_TYPE.SUCCESS,
          }),
        );
        router.push("/home");
      } catch (error) {
        dispatch(
          showAlert({
            message: error.response.data?.message || message.LOGIN_FAILED,
            type: ALERT_TYPE.ERROR,
          }),
        );
      }
    } else {
      try {
        const response = await signup(data.name, data.email, data.password);
        dispatch(
          showAlert({
            message: response.data?.message || message.SIGNUP_SUCCESS,
            type: ALERT_TYPE.SUCCESS,
          }),
        );
        setIsLogin(true);
        reset();
      } catch (error) {
        dispatch(
          showAlert({
            message: error.response.data?.message || message.SIGNUP_FAILED,
            type: ALERT_TYPE.ERROR,
          }),
        );
      }
    }
  }

  return (
    <Card className="w-[90%] md:w-[400px]">
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold leading-none text-foreground tracking-tight">
            {islogin ? "Login" : "Sign Up"}
          </h1>
          <h2 className="text-sm text-muted-foreground">
            {islogin ? "Welcome back" : "Create an account"}
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col space-y-4">
            {!islogin && (
              <Input
                name="name"
                control={control}
                label="Name"
                placeholder="Enter your name"
                type="text"
                rules={nameValidation}
              />
            )}
            <Input
              name="email"
              control={control}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              rules={emailValidation}
            />
            <Input
              name="password"
              control={control}
              label="Password"
              placeholder="Enter your password"
              type="password"
              rules={passwordValidation}
            />
          </div>

          <div className="flex flex-col space-y-2 mt-6">
            <Button type="submit">{islogin ? "Login" : "Sign Up"}</Button>
            <p className="text-sm text-foreground">
              {islogin
                ? message.DONT_HAVE_ACCOUNT
                : message.ALREADY_HAVE_ACCOUNT}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(!islogin)}
              >
                {islogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AuthForm;
