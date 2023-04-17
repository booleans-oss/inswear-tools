import { type FournisseurItem } from "@/utils/types";
import * as Label from "@radix-ui/react-label";
import { type FC, useState, type Dispatch, type SetStateAction } from "react";
import { FaPlus } from "react-icons/fa";
import ItemModal from "./ItemModal";

type ItemsInputProps = {
  margin: number;
  items: FournisseurItem[];
  setItems: Dispatch<SetStateAction<FournisseurItem[]>>;
  triggerRender: () => void;
};

const ItemsInput: FC<ItemsInputProps> = ({
  margin,
  items,
  setItems,
  triggerRender,
}) => {
  const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<FournisseurItem>();

  const selectItem = (item: FournisseurItem) => {
    setCurrentItem(item);
    setIsItemModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label.Root className="text-[13px] font-semibold" htmlFor="items">
          Items
        </Label.Root>
        <div className="flex flex-col gap-1">
          <div
            className="flex cursor-pointer flex-row items-center justify-between rounded-md border border-gray-200 bg-black p-4 text-white duration-200 ease-in-out hover:bg-gray-700"
            onClick={() => {
              setCurrentItem(undefined);
              setIsItemModalOpen(true);
            }}
          >
            <div className="flex flex-row items-center gap-2 text-sm font-semibold">
              <FaPlus /> Ajouter un item
            </div>
          </div>
          {items.map((item, index) => (
            <Item key={index} item={item} onClick={() => selectItem(item)} />
          ))}
        </div>
      </div>
      <ItemModal
        item={currentItem}
        onClose={() => setIsItemModalOpen(false)}
        isOpen={isItemModalOpen}
        margin={margin}
        onSave={(item) => {
          if (currentItem) {
            const newItems = items;
            newItems[
              items.findIndex((i) =>
                Object.entries(currentItem).every(
                  ([key, val]) => i[key as keyof FournisseurItem] === val
                )
              )
            ] = item;
            setItems(newItems);
          } else {
            setItems((prev) => [...prev, item]);
          }
          triggerRender();
        }}
        onDelete={() => {
          if (currentItem) {
            setItems((prev) => {
              const newItems = prev;
              newItems.splice(items.indexOf(currentItem), 1);
              return newItems;
            });
          }
          triggerRender();

          setIsItemModalOpen(false);
        }}
      />
    </>
  );
};

const Separator = () => {
  return <p className="text-gray-200">|</p>;
};

type ItemProps = {
  item: FournisseurItem;
  onClick: () => void;
};

const Item: FC<ItemProps> = ({ onClick, item }) => {
  return (
    <div
      className="flex cursor-pointer flex-row items-center justify-between rounded-md border border-gray-200 p-4 px-2 duration-200 ease-in-out hover:border-black"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-items-center gap-2">
        <p className="text-center text-sm font-bold text-black">{item.name}</p>
        <Separator />
        <p className="text-center text-sm font-light">{item.color}</p>
        <Separator />
        <p className="text-lg">{item.size}</p>
      </div>
      <div className="flex flex-row items-baseline gap-2">
        <p className="text-sm font-bold italic text-black/70">
          x{item.quantity}
        </p>
      </div>
    </div>
  );
};

export default ItemsInput;
