import { capitalize } from "@/utils/utils";
import { Listbox as HeadlessListBox, Transition } from "@headlessui/react";
import { type FC, Fragment } from "react";
import { FaCheck, FaChevronUp } from "react-icons/fa";
import { RiArrowUpDownLine } from "react-icons/ri";

type ListBoxProps = {
  value: string;
  onChange: (value: string) => void;
  items: Array<string>;
};

const ListBox: FC<ListBoxProps> = ({ items, value, onChange }) => {
  return (
    <HeadlessListBox value={value} onChange={onChange}>
      <div className="relative w-full">
        <HeadlessListBox.Button className="relative w-full cursor-pointer rounded-lg bg-white border border-gray-200 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
          <span className="block truncate">{capitalize(value)}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <RiArrowUpDownLine className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </HeadlessListBox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HeadlessListBox.Options className="z-10 absolute w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map((item) => (
              <HeadlessListBox.Option
                key={item}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.split(" ").map(capitalize).join(" ")}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                        <FaCheck className="h-3 w-3" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </HeadlessListBox.Option>
            ))}
          </HeadlessListBox.Options>
        </Transition>
      </div>
    </HeadlessListBox>
  );
};

export default ListBox;
