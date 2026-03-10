import { cookies } from "next/headers";
import axios from "axios";
import { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const serverApi = axios.create({
  baseURL,
});

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await serverApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};