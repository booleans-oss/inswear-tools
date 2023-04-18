import { inter } from "@/utils/fonts";
import { type FC, useState } from "react";
import PDFVisualizer from "./PDFVisualizer";
import CreateForm from "./CreateForm";
import type { Item } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

type CreateViewProps = {
  closeView: () => void;
};

const CreateView: FC<CreateViewProps> = ({ closeView }) => {
  const { user } = useUser();
  const [, setTriggerRender] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [customer, setCustomer] = useState<string>("");

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="w-1/2 text-left">
        <nav aria-label="breadcrumb" className="w-max">
          <ol className="bg-blue-gray-50 flex w-full flex-wrap items-center rounded-md bg-opacity-60 px-4 py-2">
            <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-gray-900/60 antialiased transition-colors duration-300 hover:text-black">
              <Link
                href="/"
                onClick={closeView}
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Accueil
              </Link>
              <span className="text-blue-gray-500 pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal antialiased">
                /
              </span>
            </li>
            <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-gray-900/60 antialiased transition-colors duration-300 hover:text-black">
              Devis
              <span className="text-blue-gray-500 pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal antialiased">
                /
              </span>
            </li>
            <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-gray-900/60 antialiased transition-colors duration-300 hover:text-black" onClick={closeView}>
              Client
              <span className="text-blue-gray-500 pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal antialiased">
                /
              </span>
            </li>
            <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-black antialiased transition-colors duration-300 hover:text-gray-500">
              Créer
            </li>
          </ol>
        </nav>
      </div>
      <h1 className={inter.className + " text-3xl font-medium text-black/80"}>
        Créer un devis
      </h1>

      <div className="flex h-full flex-row justify-between gap-20">
        <div className="flex w-[40%] flex-col">
          <CreateForm
            items={items}
            setItems={setItems}
            customer={customer}
            setCustomer={setCustomer}
            triggerRender={() => setTriggerRender((prev) => !prev)}
          />
        </div>
        <div className="-mt-20 flex h-full w-full flex-col bg-blue-500">
          <PDFVisualizer
            items={items}
            author={user?.fullName}
            customer={customer}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateView;
