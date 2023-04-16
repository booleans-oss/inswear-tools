import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import type { FC } from "react";

type SizeRadioProps = {
  items: string[];
  value: string;
  onChange: (value: string) => void;
};

const SizeRadio: FC<SizeRadioProps> = ({ value, items, onChange }) => {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="flex w-full gap-4"
    >
      {items.map((item) => (
        <RadioGroup.Option
          key={item}
          value={item}
          className={clsx(
            "cursor-pointer rounded border border-gray-200 py-3 w-14 items-center justify-center text-center hover:border-black",
            {
              "border-black bg-black text-white": value === item,
            }
          )}
        >
          {item.toUpperCase()}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

export default SizeRadio;
