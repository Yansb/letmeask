import { Button } from "components/Button";
import { Link } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImage from "../assets/images/logo.svg";

import "../styles/auth.scss";

export function NewRoom() {
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
            <h2 className="text-sm mt-16 mb-6 font-poppin">Criar uma nova sala</h2>
            <div className="text-sm text-gray-400 my-8 items-center separator">ou entre em uma sala</div>
            <input
              className="h-11 w-full rounded-lg px-4 bg-white border-gray-500 border"
              placeholder="Nome da sala"
              type="text"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p className="text-sm text-gray-500 mt-4 ">
            Quer entrar em uma sala existente?
            <Link to="/" className="text-pink-500">
              Clique Aqui!
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
