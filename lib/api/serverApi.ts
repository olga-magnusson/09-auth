import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";
import type { Note, NoteTag } from "@/types/note";
import { AxiosResponse } from "axios";

interface FetchNotesOptions {
  page: number;
  perPage: number;
  tag?: NoteTag;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNotes = async ({
  page,
  perPage,
  tag,
  search,
}: FetchNotesOptions): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (tag) params.tag = tag;
  if (search) params.search = search;

  const res = await api.get("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params,
  });

  return res.data; 
};

export const checkSession = async (): Promise<AxiosResponse<{
  accessToken: string;
  refreshToken: string;
}>> => {
  const cookieStore = await cookies();

  const res = await api.get<{accessToken: string; refreshToken: string}>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};