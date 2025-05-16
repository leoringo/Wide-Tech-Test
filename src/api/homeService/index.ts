import { http } from "../baseUrl";

export const axiosGetAllJson = () => http.get("/todos");
