import { DevisSchema, type Devis } from "@/schemas/FournisseurDevis";
import { api } from "@/utils/api";
import { inter } from "@/utils/fonts";
import type { FournisseurItem } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../form/TextInput";
import ItemsInput from "./ItemsInput";

type CreateFormProps = {
  items: FournisseurItem[];
  setItems: Dispatch<SetStateAction<FournisseurItem[]>>;
  triggerRender: () => void;
};

const CreateForm: FC<CreateFormProps> = ({
  items,
  setItems,
  triggerRender,
}) => {
  const router = useRouter();
  const { handleSubmit, setValue, register } = useForm<Devis>({
    mode: "onChange",
    resolver: zodResolver(DevisSchema),
    defaultValues: {
      items,
    },
  });

  const { mutateAsync, isLoading } = api.fournisseurDevis.create.useMutation();

  useEffect(() => {
    if (items) {
      setValue("items", items);
    }
  }, [items, setValue]);

  const onSubmit = async (data: Devis) => {
    try {
      const devis = await mutateAsync(data);
      await router.push(`/devis/fournisseur/${devis.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      id="devis-create-form"
      name="devis-create-form"
      className={inter.className + " flex flex-col gap-4"}
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e).catch((e) => console.log(e));
      }}
    >
      <TextInput
        label="Client"
        placeholder="INS'WEAR"
        {...register("customer")}
      />
      <ItemsInput
        margin={0}
        items={items}
        setItems={setItems}
        triggerRender={triggerRender}
      />
      <button
        type="submit"
        className="float-right mt-10 w-fit rounded-md border border-gray-200 bg-black px-6 py-2 text-sm font-semibold text-white hover:border-gray-700 hover:bg-gray-700"
        form="devis-create-form"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Création du mail...
          </div>
        ) : (
          "Créer le devis"
        )}
      </button>
    </form>
  );
};

export default CreateForm;
