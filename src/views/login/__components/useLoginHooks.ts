import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { executeLogin, selectLoginState, switchPage } from "../loginSlice";
import { useEffect, useState } from "react";
import { isValidEmail } from "../../../utils/helpers";

export const useLoginHooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector(selectLoginState);

  // !! -- useStates --
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // !! -- functions --
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onClickSwitchPage = () => {
    dispatch(switchPage("register"));
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
    setShowPassword(false);
  };

  const validate = () => {
    const newErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(executeLogin({ email, password }));
    }
  };

  // !! -- useEffects --
  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [status]);

  return {
    handleSubmit,
    email,
    setEmail,
    errors,
    showPassword,
    password,
    setPassword,
    togglePasswordVisibility,
    onClickSwitchPage,
  };
};
