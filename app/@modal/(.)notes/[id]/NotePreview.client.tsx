"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
import Modal from "../../../../components/Modal/Modal";
import { useRouter } from "next/navigation";

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back(); 
  };

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note.</p>;

  return (
    <Modal onClose={handleClose}>
      <div style={{ padding: "24px", position: "relative" }}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
        >
          Close
        </button>

        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>
          <strong>Tag:</strong> {note.tag}
        </p>
      </div>
    </Modal>
  );
}