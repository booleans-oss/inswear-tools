import { inter } from "@/utils/fonts";
import { type FC, type SetStateAction, type Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import ItemsInput from "./ItemsInput";
import type { FournisseurItem } from "@/utils/types";
import { type Devis, DevisSchema } from "@/schemas/FournisseurDevis";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

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
  const { user } = useUser();
  const { handleSubmit, setValue } = useForm<Devis>({
    mode: "onChange",
    resolver: zodResolver(DevisSchema),
    defaultValues: {
      items,
    },
  });

  const { mutateAsync } = api.fournisseurDevis.create.useMutation();

  useEffect(() => {
    if (items) {
      setValue("items", items);
    }
  }, [items, setValue]);

  const onSubmit = async (data: Devis) => {
    if (!user) return console.log("No user");
    try {
      const devis = await mutateAsync({
        ...data,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? "",
      });
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
        Créer le mail
      </button>
    </form>
  );
};

export default CreateForm;
