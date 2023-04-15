import * as Label from "@radix-ui/react-label";
import type { UseFormRegisterReturn } from "react-hook-form";

type TextInputProps<T extends string> = {
  label: T;
  placeholder: string;
  optional?: boolean;
} & UseFormRegisterReturn<Lowercase<T>>;

function TextInput<T extends string>({
  label,
  optional = false,
  ...props
}: TextInputProps<T>): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <Label.Root
        className="text-[13px] font-semibold"
        htmlFor={label.toLocaleLowerCase()}
      >
        {label}
        {optional ? <span className="italic">{" "}(optionnel)</span> : ""}
      </Label.Root>
      <input
        {...props}
        className="rounded-md border border-gray-200 px-4 py-3 text-sm font-light outline-none duration-200 ease-in-out focus:border-black"
      />
    </div>
  );
}

export default TextInput;
