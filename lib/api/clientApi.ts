import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

interface AuthRequest {
  email: string;
  password: string;
}

interface CreateNoteRequest {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes");
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: CreateNoteRequest): Promise<Note> => {
  const res = await api.post("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

export const register = async (data: AuthRequest): Promise<User> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: AuthRequest): Promise<User> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get("/auth/session");
  return res.data || null;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const res = await api.patch("/users/me", data);
  return res.data;
};