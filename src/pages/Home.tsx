import { useHistory } from "react-router-dom";

import { useAuth } from "hook/useAuth";
import illustrationImg from "../assets/images/illustration.svg";
import logoImage from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

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
          <form>
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
              className="h-11 w-full rounded-lg px-4 bg-white border-gray-500 border"
              placeholder="Digite o código da sala"
              type="text"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
