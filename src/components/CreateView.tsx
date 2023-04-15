import { inter } from "@/utils/fonts";
import type { FC } from "react";
import PDFVisualizer from "./PDFVisualizer";
import CreateForm from "./CreateForm";

type CreateViewProps = {
  closeView: () => void;
};

const CreateView: FC<CreateViewProps> = ({ closeView }) => {
  return (
    <div className="flex h-full flex-col gap-10">
      <h1
        className={inter.className + " text-3xl font-medium text-black/80"}
        onClick={closeView}
      >
        Créer un devis
      </h1>

      <div className="flex h-full flex-row justify-between gap-20">
        <div className="flex w-[40%] flex-col">
          <CreateForm />
        </div>
        <div className="flex h-full w-full flex-col bg-blue-500">
          <PDFVisualizer />
        </div>
      </div>
    </div>
  );
};

export default CreateView;
