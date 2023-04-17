import type {
  Customization,
  CustomizationMethod,
  CustomizationPlace,
  CustomizationType,
} from "@/utils/types";
import * as Popover from "@radix-ui/react-popover";
import { type FC, useState, forwardRef } from "react";
import { FaPlus } from "react-icons/fa";
import ListBox from "../primitives/ListBox";
import { BsTrash3 } from "react-icons/bs";

type CustomizationsGridProps = {
  customizations: Array<Customization>;
  onChange: (customisations: () => Array<Customization>) => void;
};

const customizationTypes: Array<CustomizationType> = [
  "image",
  "texte",
  "logo",
  "autre",
];

const customizationMethods: Array<CustomizationMethod> = [
  "sérigraphie",
  "broderie",
  "flocage",
  "couture",
  "autre",
];

const customizationPlaces: Array<CustomizationPlace> = [
  "torse",
  "épaule droite",
  "épaule gauche",
  "haut du dos",
  "bas du dos",
  "dos entier",
  "autre",
];

const CustomizationsGrid = forwardRef<HTMLDivElement, CustomizationsGridProps>(
  ({ customizations, onChange }, ref) => {
    const [, setTriggerReRender] = useState<boolean>(false);

    return (
      <div className="grid grid-cols-3 gap-2" ref={ref}>
        <div
          className="flex cursor-pointer items-center gap-3 rounded-md border border-black bg-black p-4 text-xs text-white hover:bg-gray-700"
          onClick={() => {
            const customization: Customization = {
              place: "torse",
              method: "sérigraphie",
              type: "image",
            };
            onChange(() => [...customizations, customization]);
            setTriggerReRender((prev) => !prev);
          }}
        >
          <FaPlus />
          Nouvelle customisation
        </div>
        {customizations.map((customization, index) => (
          <CustomizationCard
            key={index}
            customization={customization}
            index={index}
            onChange={(newCustomization) => {
              const newCustomizations = customizations;
              newCustomizations[index] = newCustomization;
              onChange(() => newCustomizations);
              setTriggerReRender((prev) => !prev);
            }}
            deleteCustomization={() => {
              onChange(() => {
                const newCustomizations = customizations;
                newCustomizations.splice(index, 1);
                return newCustomizations;
              });
              setTriggerReRender((prev) => !prev);
            }}
          />
        ))}
      </div>
    );
  }
);

CustomizationsGrid.displayName = "CustomizationsGrid";

type CustomizationCardProps = {
  customization: Customization;
  index: number;
  onChange: (customization: Customization) => void;
  deleteCustomization: () => void;
};

const CustomizationCard: FC<CustomizationCardProps> = ({
  customization,
  deleteCustomization,
  onChange,
  index,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 p-4 text-xs hover:bg-gray-100">
          <FaPlus />
          Customization #{index + 1}
        </div>
      </Popover.Trigger>
      <CustomizationPopover
        customization={customization}
        onChange={onChange}
        delete={deleteCustomization}
      />
    </Popover.Root>
  );
};

type CustomizationPopoverProps = {
  customization: Customization;
  onChange: (customization: Customization) => void;
  delete: () => void;
};

const CustomizationPopover: FC<CustomizationPopoverProps> = ({
  customization,
  onChange,
  delete: deleteCustomization,
}) => {
  const [customizationType, setCustomizationType] = useState<CustomizationType>(
    customization.type
  );
  const [customizationMethod, setCustomizationMethod] =
    useState<CustomizationMethod>(customization.method);
  const [customizationPlace, setCustomizationPlace] =
    useState<CustomizationPlace>(customization.place);

  return (
    <Popover.Portal>
      <Popover.Content
        className="z-10 w-[260px] rounded-md border border-gray-200 bg-white p-5 shadow-2xl data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
        sideOffset={5}
        side="top"
      >
        <p className="text-mauve12 mb-2.5 text-[15px] font-medium leading-[19px]">
          Customisation
        </p>
        <div className="flex flex-wrap gap-4">
          <fieldset className="flex w-full items-center gap-4">
            <label className="text-[13px]" htmlFor="customizationType">
              Type
            </label>
            <ListBox
              items={customizationTypes}
              value={customizationType}
              onChange={(val) => {
                setCustomizationType(val as CustomizationType);
                onChange({ ...customization, type: val as CustomizationType });
              }}
            />
          </fieldset>
          <fieldset className="flex w-full items-center gap-4">
            <label className="text-[13px]" htmlFor="customizationPlace">
              Place
            </label>
            <ListBox
              items={customizationPlaces}
              value={customizationPlace}
              onChange={(val) => {
                setCustomizationPlace(val as CustomizationPlace);
                onChange({
                  ...customization,
                  place: val as CustomizationPlace,
                });
              }}
            />
          </fieldset>
          <fieldset className="flex w-full items-center gap-4">
            <label className="text-[13px]" htmlFor="customizationMethod">
              Method
            </label>
            <ListBox
              items={customizationMethods}
              value={customizationMethod}
              onChange={(val) => {
                setCustomizationMethod(val as CustomizationMethod);
                onChange({
                  ...customization,
                  method: val as CustomizationMethod,
                });
              }}
            />
          </fieldset>
        </div>

        <Popover.Close
          className="absolute right-[10px] top-[5px]  mt-4 flex h-[25px]  w-[25px]  cursor-pointer items-center justify-center gap-2 rounded-md border border-red-500 p-1 py-1 text-xs font-bold text-red-500 outline-none hover:bg-red-200"
          aria-label="Delete"
          onClick={deleteCustomization}
        >
          <BsTrash3 />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  );
};

export default CustomizationsGrid;
