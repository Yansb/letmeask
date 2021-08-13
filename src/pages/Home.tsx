import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { database } from "services/firebase";
import { useStores } from "stores";
import illustrationImg from "../assets/images/illustration.svg";
import logoImage from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";

interface IHomeForm {
  roomCode: string;
}

const schema = yup.object({
  roomCode: yup.string().required("O código da sala precisa ser informado!"),
});

export function Home() {
  const history = useHistory();
  const {
    authStore: { signInWithGoogle, user },
  } = useStores();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<IHomeForm>({ resolver: yupResolver(schema) });

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  const handleJoinRoom = async ({ roomCode }: IHomeForm) => {
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      setError("roomCode", { type: "validate", message: "Sala não existe!" });
    }

    history.push(`rooms/${roomCode}`);
  };

  return (
    <div className="flex items-stretch  h-screen">
      <aside className="justify-center flex-1 bg-purple-500 text-white flex-col flex px-32 py-20 ">
        <img src={illustrationImg} className="max-w-xs" alt="Ilustração simbolizando perguntas e respostas" />
        <strong className="font-poppin font-bold text-3xl mt-4">Crie salas de Q&amp;A ao-vivo</strong>
        <p className="text-xl mt-4 text-gray-50">Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className="flex-1 px-8 flex items-center justify-center">
        <div className="flex-col w-full max-w-xs items-stretch text-center">
          <img src={logoImage} alt="Letmeask" className="self-center" />
          <form onSubmit={handleSubmit(handleJoinRoom)}>
            <button
              type="button"
              onClick={handleCreateRoom}
              className="w-full flex mt-16 h-12 font-medium bg-red-600 items-center justify-center cursor-pointer rounded-lg text-white hover:bg-red-700 duration-200  "
            >
              <img src={googleIconImage} className="m-2" alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
            <div className="text-sm text-gray-400 my-8 items-center separator">ou entre em uma sala</div>
            <input
              {...register("roomCode")}
              className="h-11 w-full rounded-lg px-4 bg-white border-gray-500 border"
              placeholder="Digite o código da sala"
              type="text"
            />
            {errors.roomCode && <span className="text-red-600 mt-1 block">{errors.roomCode.message}</span>}
            <Button type="submit" className="mt-4 w-full">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
