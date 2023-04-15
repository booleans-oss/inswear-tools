import { inter } from "@/utils/fonts";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { format } from "date-fns";
import ItemsInput from "./ItemsInput";

const CreateForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form
      className={inter.className + " flex flex-col gap-4"}
      onSubmit={() => handleSubmit(onSubmit)}
    >
      <TextInput
        label="Customer"
        placeholder="INS'WEAR"
        {...register("customer")}
      />
      <TextInput
        label="Deadline"
        placeholder={format(new Date(), "dd/MM/yyyy")}
        optional
        {...register("deadline")}
      />
      <ItemsInput />
    </form>
  );
};

export default CreateForm;
