import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...rest }: ButtonProps) {
  return (
    <button
      className={`${
        className || ""
      } flex h-12 font-medium py-0 px-8 bg-purple-600 items-center justify-center cursor-pointer rounded-lg text-white hover:bg-purple-800 duration-200 disabled:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed  `}
      {...rest}
    />
  );
}
