import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ ...rest }: ButtonProps) {
  return (
    <button
      className="w-full flex mt-4 h-12 font-medium bg-purple-700 items-center justify-center cursor-pointer rounded-lg text-white hover:bg-purple-800 duration-200 disabled:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed  "
      {...rest}
    />
  );
}
