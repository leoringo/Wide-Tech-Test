import { useState } from "react";
import type { IRegisterRequest } from "../../../api/loginService/requestModel";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { executeRegister, selectLoginState, switchPage } from "../loginSlice";
import { isValidEmail } from "../../../utils/helpers";

export const useRegisterHooks = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectLoginState);
  const initialPayloadConstant: IRegisterRequest = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // !! -- useStates --
  const [payload, setPayload] = useState<IRegisterRequest>(
    initialPayloadConstant
  );
  const [errors, setErrors] = useState<IRegisterRequest>(
    initialPayloadConstant
  );
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({ password: false, confirmPassword: false });

  // !! -- functions --
  const togglePasswordVisibility = (type: "password" | "confirm") => {
    if (type === "password") {
      setShowPassword((prev) => ({ ...prev, password: !prev.password }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        confirmPassword: !prev.confirmPassword,
      }));
    }
  };

  const onClickSwitchPage = () => {
    dispatch(switchPage("login"));
    setPayload(initialPayloadConstant);
    setErrors(initialPayloadConstant);
    setShowPassword({ password: false, confirmPassword: false });
  };

  const validate = () => {
    const newErrors: IRegisterRequest = initialPayloadConstant;
    const { email, password, name, confirmPassword } = payload;

    if (!name) {
      newErrors.name = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(error => !error);

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(executeRegister(payload));
    }
  };

  return {
    handleSubmit,
    payload,
    setPayload,
    errors,
    showPassword,
    togglePasswordVisibility,
    onClickSwitchPage,
    dispatch,
    status,
  };
};
