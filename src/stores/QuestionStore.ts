import { useState } from "react";
import { database } from "services/firebase";

interface IQuestionObject {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

export function useQuestions() {
  const [questions, setQuestions] = useState<IQuestionObject[]>();
  const [roomTitle, setRoomTitle] = useState("");

  function fetchQuestions(id: string) {
    const roomRef = database.ref(`rooms/${id}`);

    roomRef.once("value", room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        };
      });
      setRoomTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }

  return {
    roomTitle,
    questions,
    fetchQuestions,
  };
}
