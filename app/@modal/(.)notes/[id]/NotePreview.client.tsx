"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
import Modal from "../../../../components/Modal/Modal";

interface NotePreviewProps {
  noteId: string;
  onClose: () => void;
}

export default function NotePreview({ noteId, onClose }: NotePreviewProps) {

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note.</p>;

  return (
    <Modal onClose={onClose}>
      <div style={{ padding: "24px" }}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>
          <strong>Tag:</strong> {note.tag}
        </p>
      </div>
    </Modal>
  );
}