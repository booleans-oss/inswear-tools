import * as Label from "@radix-ui/react-label";
import { clsx } from "clsx";
import { forwardRef } from "react";

type TextInputProps<T extends string> = {
  label: T;
  placeholder: string;
  optional?: boolean;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps<string>>(
  (
    {
      label,
      optional = false,
      className = "",
      ...props
    }: TextInputProps<string>,
    ref
  ): JSX.Element => {
    return (
      <div className={className + " flex flex-col gap-2"}>
        <Label.Root
          className="text-[13px] font-semibold"
          htmlFor={label.toLocaleLowerCase()}
        >
          {label}
          {optional ? <span className="italic"> (optionnel)</span> : ""}
        </Label.Root>
        <input
          type="text"
          {...props}
          ref={ref}
          className={clsx(
            "rounded-md border border-gray-200 px-4 py-3 text-sm font-light outline-none duration-200 ease-in-out focus:border-black",
            { "cursor-not-allowed": props.disabled }
          )}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
