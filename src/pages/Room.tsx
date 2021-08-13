import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/Button";
import { RoomCode } from "components/RoomCode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { database } from "services/firebase";
import { useStores } from "stores";
import * as yup from "yup";
import logoImg from "../assets/images/logo.svg";

type RoomParams = {
  id: string;
};
interface createQuestion {
  newQuestion: string;
}

const schema = yup.object().shape({
  newQuestion: yup.string().required("Precisa escrever algo para enviar como pergunta"),
});

export function Room() {
  const {
    authStore: { user },
    questionsStore: { questions, fetchQuestions, roomTitle },
  } = useStores();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<createQuestion>({
    resolver: yupResolver(schema),
  });
  const { id } = useParams<RoomParams>();

  useEffect(() => {
    fetchQuestions(id);
  }, [id, isSubmitSuccessful]);

  const handleCreateQuestion = async ({ newQuestion }: createQuestion) => {
    try {
      if (!user) {
        toast.error("Você precisa estar logado para postar uma pergunta");
        return;
      }
      const question = {
        content: newQuestion,
        author: {
          name: user?.name,
          avatar: user.avatar,
        },
        isHighlighted: false,
        isAnswered: false,
      };

      await database.ref(`rooms/${id}/questions`).push(question);
      reset();
      toast.success("Pergunta enviada com sucesso!!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <header className="p-6 border-b border-gray-300">
        <div className="max-w-6xl mx-auto my-0 flex justify-between items-center">
          <img src={logoImg} className="max-h-11" alt="Letmeask" />
          <RoomCode code={id} />
        </div>
      </header>
      <main className="max-w-3xl mx-auto my-0">
        <div className="mt-8 -mx-0 mb-6 flex items-center">
          <h1 className="font-poppin text-2xl text-gray-800">Sala {roomTitle}</h1>
          {questions && questions?.length > 0 && (
            <span className="ml-4 bg-pink-500 rounded-full py-2 px-4 text-white font-medium text-sm">
              {questions?.length} Pergunta(s)
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit(handleCreateQuestion)}>
          <textarea
            {...register("newQuestion")}
            className="w-full border-none p-4 bg-gray-50 shadow-default rounded-lg resize-none min-h-full"
            placeholder="O que você quer perguntar?"
          />
          {errors.newQuestion && <span className="text-red-600 mt-1 block text-sm">{errors.newQuestion.message}</span>}
          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center">
                <img className="rounded-full w-8 h-8" src={user.avatar} alt={user.name} />
                <span className="ml-2 text-gray-700 font-medium text-sm">{user.name}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500 font-medium">
                Para enviar uma pergunta,
                <button className="text-purple-500 underline text-sm font-medium">faça seu login.</button>
              </span>
            )}
            <Button disabled={!user || Boolean(errors.newQuestion)} type="submit">
              Enviar pergunta
            </Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  );
}
