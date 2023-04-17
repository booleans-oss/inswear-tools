import clsx from "clsx";
import { forwardRef } from "react";

type NumberInputProps<T extends string> = {
  label: T;
  placeholder: string;
  optional?: boolean;
  className?: string;
  defaultValue?: number;
  value?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
};

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps<string>>(
  (
    {
      label,
      optional = false,
      className = "",
      value,
      ...rest
    }: NumberInputProps<string>,
    ref
  ): JSX.Element => {
    return (
      <div className={className + " flex flex-col gap-2"}>
        <label
          className="text-[13px] font-semibold"
          htmlFor={label.toLocaleLowerCase()}
        >
          {label}
          {optional ? <span className="italic"> (optionnel)</span> : ""}
        </label>
        <div className="flex w-full flex-row">
          <button
            type="button"
            className="w-1/5 rounded-l-md border hover:bg-gray-200"
            onClick={() => {
              rest.onChange((parseInt(value ?? "0")) - 1);
            }}
          >
            -
          </button>
          <input
            type="text"
            className={clsx(
              "border-y border-gray-200 px-4 py-3 text-center text-sm font-light outline-none duration-200 ease-in-out ",
              { "cursor-not-allowed": rest.disabled }
            )}
            value={value && isNaN(parseInt(value)) ? "" : value}
            ref={ref}
            {...rest}
            onChange={(e) => rest.onChange(parseInt(e.target.value))}
          />
          <button
            type="button"
            className="w-1/5 rounded-r-md border hover:bg-gray-200"
            onClick={() => {
              rest.onChange((parseInt(value ?? "0")) + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
