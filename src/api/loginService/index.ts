import { store } from "../../store/store";
import { getUsersList, setLocalStorage } from "../../utils/helpers";
import { showError } from "../../views/globalError/globalErrorSlice";
import { setLoading } from "../../views/loading/loadingSlice";

import type { ILoginRequest, IRegisterRequest } from "./requestModel";
import type { ILoginResponse, IRegisterResponse } from "./responseModel";

export const axiosLogin = (
  payload: ILoginRequest
): Promise<{ data: ILoginResponse }> => {
  return new Promise((resolve, reject) => {
    store.dispatch(setLoading(true));
    setTimeout(() => {
      const usersList = getUsersList() as IRegisterRequest[];
      const { email, password } = payload;

      const matchedUser = usersList.find((user) => user.email === email);

      if (!matchedUser) {
        const message = "Email is not registered yet";
        store.dispatch(showError(message));
        return reject({
          response: {
            data: { message },
            status: 404,
          },
        });
      }

      if (matchedUser.password !== password) {
        const message = "Wrong Password";
        store.dispatch(showError(message));
        return reject({
          response: {
            data: { message },
            status: 400,
          },
        });
      }

      const token = "meatloverspizza"; // Simulated token
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      return resolve({
        data: {
          email,
          token,
        },
      });
    }, 1000);
    store.dispatch(setLoading(false));
  });
};

export const axiosRegister = (
  payload: IRegisterRequest
): Promise<{ data: IRegisterResponse }> => {
  return new Promise((resolve, reject) => {
    store.dispatch(setLoading(true));
    setTimeout(() => {
      const usersList = getUsersList();

      // !! Check for duplicate email
      const isEmailTaken = usersList.some(
        (user: IRegisterRequest) => user.email === payload.email
      );

      if (isEmailTaken) {
        const message = "Email already registered";

        store.dispatch(showError(message));

        reject({
          response: {
            data: { message },
            status: 409,
          },
        });
      } else {
        const newUser = {
          ...payload,
          id: new Date().getTime(),
        };

        const updatedUsers = [...usersList, newUser];
        setLocalStorage("usersList", updatedUsers);

        resolve({
          data: {
            message: "Registration successful",
          },
        });
      }
      store.dispatch(setLoading(false));
    }, 1000);
  });
};
