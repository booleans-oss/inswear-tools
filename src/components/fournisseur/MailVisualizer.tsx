import type { FournisseurItem } from "@/utils/types";
import { generateCustomization } from "@/utils/utils";
import { type FC } from "react";
import { FiMail } from "react-icons/fi";

type MailVisualizerProps = {
  items: FournisseurItem[];
};

const MailVisualizer: FC<MailVisualizerProps> = ({ items }) => {
  return (
    <div className="flex h-[calc(100vh_-_20rem)] flex-col rounded-md border border-gray-200">
      <div className="flex h-10 w-full justify-between rounded-t-md px-4 pt-2">
        <div className="flex flex-row items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="p flex w-[400px] items-center justify-center gap-2 rounded border border-white bg-gray-200/50 text-sm tracking-wide text-gray-500">
          <FiMail />
          Nouveau mail
        </div>
        <div />
      </div>
      <div className="flex h-full flex-col gap-10 p-10">
        <div className="flex flex-col gap-2">
          <div className="gap flex">
            <div className="w-[100px]">De: </div>
            <div className="w-full border-b border-gray-200">
              INSWEAR Contact -
              <a href="mailto:contact@inswear.fr" className="text-gray-500">
                contact@inswear.fr
              </a>
            </div>
          </div>
          <div className="gap flex">
            <div className="w-[100px]">À: </div>
            <div className="flex w-full justify-between border-b border-gray-200">
              <div>
                Alchimistes Contact -
                <a
                  href="mailto:contact@alchimistes.fr"
                  className="text-gray-500"
                >
                  contact@alchimistes.fr
                </a>
              </div>
              <div className="flex gap-2 text-sm font-light text-gray-500">
                <div>Cc</div>
                <div>Bcc</div>
              </div>
            </div>
          </div>
          <div className="gap flex">
            <div className="w-[100px]">Object: </div>
            <div className="flex w-full justify-between border-b border-gray-200">
              <div className="font-semibold">
                Demande de devis - INS&apos;WEAR
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between gap-2 text-sm pb-10">
          <div>
            <p>Bonjour Alchimistes,</p>
            <p>Nous souhaitons avoir un devis pour la commande suivante:</p>
            <p className="ml-10">
              {items.map((item, index) => (
                <div key={index}>
                  {item.quantity} x{" "}
                  <a href={item.url} className="underline">
                    {item.name} ({item.reference})
                  </a>{" "}
                  - {item.color} - Taille {item.size} -{" "}
                  {generateCustomization(item)}
                </div>
              ))}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p>Vous remerciant par avance de votre réponse,</p>
            <br/>
            <p>Cordialement,</p>
            <p>INS&apos;WEAR Association</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailVisualizer;
