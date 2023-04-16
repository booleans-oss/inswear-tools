import { inter } from "@/utils/fonts";
import {
  type FC,
  useState,
  type SetStateAction,
  type Dispatch,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { format } from "date-fns";
import ItemsInput from "./ItemsInput";
import MarginInput from "./MarginInput";
import type { Item } from "@/utils/types";
import { type Devis, DevisSchema } from "@/schemas/Devis";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

type CreateFormProps = {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  triggerRender: () => void;
  customer: string;
  setCustomer: Dispatch<SetStateAction<string>>;
};

const CreateForm: FC<CreateFormProps> = ({
  items,
  setItems,
  triggerRender,
  customer,
  setCustomer,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Devis>({
    mode: "onChange",
    resolver: zodResolver(DevisSchema),
    defaultValues: {
      margin: 6.5,
      items,
    },
  });

  const { mutateAsync } = api.devis.create.useMutation();

  useEffect(() => {
    if (items) {
      setValue("items", items);
    }
  }, [items, setValue]);

  useEffect(() => {
    if (customer) {
      setValue("customer", customer);
    }
  }, [customer, setValue]);

  const [marginValue, setMarginValue] = useState<number>(6.5);
  const [customerValue, setCustomerValue] = useState<string>("");

  const debouncedMarginValue = useDebounce(marginValue, 500);
  const debouncedCustomerValue = useDebounce(customerValue, 500);

  useEffect(() => {
    const newPrices = items.map((item) => {
      return {
        ...item,
        price:
          parseFloat(item.supplierPrice) * (1 + debouncedMarginValue / 100),
      };
    });
    setItems(newPrices);
    triggerRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMarginValue]);

  useEffect(() => {
    setValue("customer", debouncedCustomerValue);
    setCustomer(debouncedCustomerValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCustomerValue]);

  const onSubmit = async (data: Devis) => {
    if (!user) return console.log("No user");
    try {
      const devis = await mutateAsync({
        ...data,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? "",
      });
      await router.push(`/devis/${devis.id}`);
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
        value={customerValue}
        placeholder="INS'WEAR"
        {...register("customer")}
        onChange={(e) => {
          setValue("customer", e.target.value);
          setCustomerValue(e.target.value);
        }}
      />
      <TextInput
        label="Deadline"
        placeholder={format(new Date(), "dd/MM/yyyy")}
        optional
        {...register("deadline")}
      />
      <MarginInput value={marginValue} onChange={setMarginValue} />
      <ItemsInput
        margin={marginValue}
        items={items}
        setItems={setItems}
        triggerRender={triggerRender}
      />
      <button
        type="submit"
        className="float-right mt-10 w-fit rounded-md border border-gray-200 bg-black px-6 py-2 text-sm font-semibold text-white hover:border-gray-700 hover:bg-gray-700"
        form="devis-create-form"
      >
        Créer le devis
      </button>
    </form>
  );
};

function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default CreateForm;
