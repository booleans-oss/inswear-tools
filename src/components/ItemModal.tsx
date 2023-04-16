import type { Item, Size } from "@/utils/types";
import { Dialog, Transition } from "@headlessui/react";
import { type FC, Fragment, useMemo, useEffect } from "react";
import TextInput from "./TextInput";
import { type SubmitHandler, useForm } from "react-hook-form";
import { capitalize } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberInput from "./NumberInput";
import * as Label from "@radix-ui/react-label";
import CustomizationsGrid from "./CustomizationsGrid";
import { ItemSchema } from "@/schemas/Item";
import SizeRadio from "./SizeRadio";

type ItemModalProps = {
  item: Item | undefined;
  onClose: () => void;
  isOpen: boolean;
  margin: number;
  onSave: (item: Item) => void;
  onDelete: () => void;
};

const getName = (url?: string) => {
  if (!url) return "";
  const host = url.split("/").pop();
  if (!host) return "";

  const name = host.split("-").slice(1, -1);
  return name.map(capitalize).join(" ");
};

const getReference = (url?: string) => {
  if (!url) return "";
  const host = url.split("/").pop();
  if (!host) return "";

  const reference = host.split("-").slice(-1).join(" ").split(".")?.[0];
  return reference?.toUpperCase();
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const ItemModal: FC<ItemModalProps> = ({
  isOpen,
  onClose,
  item,
  margin,
  onSave,
  onDelete,
}) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Item>({
    mode: "onChange",
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      url: item?.url,
      name: getName(item?.url),
      reference: getReference(item?.url),
      quantity: item?.quantity,
      color: item?.color,
      supplierPrice: item?.supplierPrice,
      price: item?.price,
      size: item?.size,
      customizations: item?.customizations ?? [],
    },
  });
  useEffect(() => {
    if (item) {
      setValue("url", item.url);
      setValue("name", getName(item.url));
      setValue("reference", getReference(item.url) ?? "");
      setValue("quantity", item.quantity);
      setValue("color", item.color);
      setValue("supplierPrice", item.supplierPrice);
      setValue("price", item.price);
      setValue("size", item.size);
      setValue("customizations", item.customizations ?? []);
    } else {
      reset();
    }
  }, [item, reset, setValue]);
  const [color, url, supplierPrice, size, customizations, quantity] = watch([
    "color",
    "url",
    "supplierPrice",
    "size",
    "customizations",
    "quantity",
  ]);
  const name = useMemo(() => {
    const computedName = getName(url);
    setValue("name", computedName);
    return computedName;
  }, [setValue, url]);
  const reference = useMemo(() => {
    const computedReference = getReference(url);
    setValue("reference", computedReference ?? "");
    return computedReference;
  }, [setValue, url]);

  const finalPrice = useMemo(() => {
    if (!supplierPrice || !margin) return 0;
    const price =
      parseFloat(supplierPrice) + (parseFloat(supplierPrice) * margin) / 100;
    setValue("price", price);
    return price;
  }, [supplierPrice, margin, setValue]);

  const onSubmit: SubmitHandler<Item> = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Nouvel item
                </Dialog.Title>
                <div id="item-create-form" className="mt-2">
                  <div>
                    <div className="flex flex-col gap-4">
                      <TextInput
                        label="Lien"
                        value={url}
                        placeholder="Lien de l'article (https://alchimistes.fr/...)"
                        {...register("url")}
                        onChange={(e) => {
                          setValue("url", e.target.value);
                        }}
                      />
                      <div className="flex w-full gap-4">
                        <TextInput
                          label="Nom"
                          placeholder="Nom de l'article"
                          value={name}
                          className="w-4/5"
                          {...register("name")}
                          disabled
                        />
                        <TextInput
                          label="Reference"
                          className="w-1/5"
                          placeholder="Reference de l'article"
                          value={reference}
                          {...register("reference")}
                          disabled
                        />
                      </div>
                      <hr className="my-5" />
                      <div>
                        <Label.Root
                          className="text-[13px] font-semibold"
                          htmlFor="size"
                        >
                          Size
                        </Label.Root>
                        <SizeRadio
                          items={sizes}
                          value={size}
                          onChange={(e) => setValue("size", e as Size)}
                        />
                      </div>
                      <div className="flex w-full flex-row gap-4">
                        <NumberInput
                          className="w-1/2"
                          label="Quantité"
                          value={quantity?.toString() ?? "0"}
                          placeholder="Quantité"
                          {...register("quantity")}
                          onChange={(val) => {
                            if (isNaN(val)) setValue("quantity", 0);
                            else setValue("quantity", val);
                          }}
                        />
                        <TextInput
                          className="w-1/2"
                          label="Couleur"
                          placeholder="Couleur"
                          value={color}
                          {...register("color")}
                          onChange={(e) => {
                            setValue("color", e.target.value);
                          }}
                        />
                      </div>
                      <hr className="my-5" />
                      <div className="flex w-full flex-row gap-4">
                        <TextInput
                          className="w-1/2"
                          label="Prix du fournisseur"
                          placeholder="Prix du fournisseur"
                          value={supplierPrice?.toString()}
                          {...register("supplierPrice")}
                          onChange={(e) => {
                            setValue("supplierPrice", e.target.value);
                          }}
                        />
                        <TextInput
                          className="w-1/2"
                          label="Prix de vente"
                          placeholder="Prix de vente"
                          value={finalPrice.toString()}
                          disabled
                          {...register("price")}
                          onChange={(e) => {
                            if (isNaN(parseInt(e.target.value)))
                              setValue("price", 0);
                            else setValue("price", parseInt(e.target.value));
                          }}
                        />
                      </div>
                      <hr className="my-5" />
                      <Label.Root
                        className="text-[13px] font-semibold"
                        htmlFor="customisations"
                      >
                        Customisations
                      </Label.Root>
                      <CustomizationsGrid
                        {...register("customizations")}
                        customizations={customizations}
                        onChange={(customizations) => {
                          setValue("customizations", customizations());
                        }}
                      />
                    </div>
                  </div>
                  <div className="float-right mt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={onDelete}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Delete
                    </button>
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      type="button"
                      onClick={(e) => {
                        handleSubmit(onSubmit)(e).catch((e) => console.log(e));
                      }}
                    >
                      Valider
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ItemModal;
