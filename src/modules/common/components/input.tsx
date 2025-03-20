import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { placeholder, label, errorMessage, ...rest }: InputProps,
  ref
) {
  return (
    <label className="w-full">
      {label ? <span className="text-sm whitespace-pre">{label}</span> : null}
      <input
        {...rest}
        placeholder={placeholder}
        ref={ref}
        //use color scheme dark to change input datetime calendar icon to white
        className="block border w-full bg-inherit p-3 rounded [color-scheme:dark]"
      />
      {errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : null}
    </label>
  );
});

export default Input;

interface SocialInputProps extends InputProps {
  icon: ReactNode;
}

export const SocialInput = forwardRef<HTMLInputElement, SocialInputProps>(
  function Input({ placeholder, label, icon, ...rest }: SocialInputProps, ref) {
    return (
      <label className="w-full ">
        {label ? <span className="text-sm whitespace-pre">{label}</span> : null}
        <div className="flex items-center">
          <span className="px-3 py-2 border-t border-l border-b rounded-tl rounded-bl">
            {icon}
          </span>
          <input
            {...rest}
            placeholder={placeholder}
            ref={ref}
            className="block border w-full bg-inherit px-3 py-2 rounded-tr rounded-br text-white"
          />
        </div>
      </label>
    );
  }
);
