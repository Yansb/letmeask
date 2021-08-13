import copyImg from "assets/images/copy.svg";

interface IRoomCode {
  code: string;
}

export function RoomCode({ code }: IRoomCode) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button
      onClick={copyRoomCodeToClipboard}
      className="h-10 rounded-lg overflow-hidden bg-white border border-purple-500 flex"
    >
      <div className="bg-purple-500 py-0 px-3 flex justify-center items-center">
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span className="block self-center flex-1 pl-3 pr-4 w-56 text-sm font-medium">Sala {code}</span>
    </button>
  );
}
