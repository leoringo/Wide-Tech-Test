import moment from "moment";
import type { IRegisterRequest } from "../api/loginService/requestModel";

export const dateFormatter = (date: Date) =>
  moment(date).format("DD-MM-YYYY HH:mm");

export const isValidEmail = (email: string) => {
  if (!email.includes("@")) return false;

  const [localPart, domainPart] = email.split("@");

  if (!localPart || !domainPart) return false;
  if (!domainPart.includes(".")) return false;

  return true;
};

export const getUsersList = (): IRegisterRequest[] => {
  return JSON.parse(localStorage.getItem("usersList") || "[]");
};

export const getLocalStorage = (key: string): any => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return item;
  }
};

export const setLocalStorage = (key: string, value: unknown) =>
  localStorage.setItem(key, JSON.stringify(value));
