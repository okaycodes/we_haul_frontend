import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  onClick?: VoidFunction;
  isLoading?: boolean;
  variant?: "BASE" | "LARGE";
  children: ReactNode;
}
function Button({
  href,
  children,
  onClick,
  variant = "BASE",
  isLoading = false,
  ...rest
}: ButtonProps) {
  let buttonStyle =
    "cursor-pointer flex justify-center items-center  border-none bg-primary  text-white rounded-lg hover:opacity-90 ";

  if (variant === "BASE") {
    buttonStyle += " px-8 py-3";
  }

  if (variant === "LARGE") {
    buttonStyle += " px-16 py-5";
  }

  if (href) {
    return (
      <a href={href} className={buttonStyle}>
        {isLoading ? <Spinner /> : children}
      </a>
    );
  }

  return (
    <button {...rest} className={buttonStyle} onClick={onClick}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

export default Button;
