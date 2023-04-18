import { api } from "@/utils/api";
import { inter } from "@/utils/fonts";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import type { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { fr } from "date-fns/locale";
import type { Status } from "@/utils/types";
import { capitalize } from "@/utils/utils";
import LoadingState from "./primitives/LoadingState";

type MainViewProps = {
  createDevis: () => void;
};

const StatusBadge = ({ status }: { status: Status }) => {
  const color: Record<Lowercase<Status>, string> = {
    généré: "bg-blue-100 text-blue-500 border-blue-500",
    envoyé: "bg-yellow-100 text-yellow-500 border-yellow-500",
    accepté: "bg-green-100 text-green-500 border-green-500",
    refusé: "bg-red-100 text-red-500 border-red-500",
  };

  return (
    <div
      className={`w-fit rounded-sm border px-3 py-1 text-xs font-semibold ${color[status]}`}
    >
      {capitalize(status)}
    </div>
  );
};

const MainView: FC<MainViewProps> = ({ createDevis }) => {
  const { data: activeDevis, isLoading: areActiveDevisLoading } =
    api.clientDevis.getActiveOnes.useQuery();
  const { data: validatedDevis, isLoading: areValidatedDevisLoading } =
    api.clientDevis.getValidatedOnes.useQuery();
  const { data: refusedDevis, isLoading: areRefusedDevisLoading } =
    api.clientDevis.getRefusedOnes.useQuery();
  return (
    <div className="flex flex-col gap-10">
      <h1 className={inter.className + " text-3xl font-medium text-black/80"}>
        Devis actifs
      </h1>
      <div className="flex flex-row flex-wrap gap-8">
        <Link href="/devis/client" passHref>
          <div
            className="flex h-[364px] w-[292px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-transparent"
            onClick={createDevis}
          >
            <div className="rounded-full border-2 border-gray-200 p-2">
              <FaPlus />
            </div>
            <div className="text-md font-bold">Créer un devis</div>
          </div>
        </Link>
        {areActiveDevisLoading || !activeDevis
          ? Array.from({ length: 3 }).map((_, i) => (
              <LoadingState key={Number("1" + String(i))} />
            ))
          : activeDevis.map((devis) => (
              <Link href={`/devis/${devis.id}`} key={devis.id} passHref>
                <div
                  key={devis.id}
                  className="flex h-[364px] w-[292px] flex-col rounded-xl border border-gray-300 bg-transparent"
                >
                  <div
                    className={`flex h-[164px] w-full items-center justify-center rounded-t-xl text-white`}
                    style={{
                      backgroundColor: devis.color,
                    }}
                  >
                    {devis.customer}
                  </div>
                  <div className="flex flex-col gap-2 px-6 py-4 text-sm">
                    <div>
                      <p className="font-semibold">{devis.customer}</p>
                      <p className="font-semibold text-black/70">#{devis.id}</p>
                    </div>
                    <div className="text-[13px]">
                      <p className="font-light text-gray-500">
                        Dernière mise à jour{" "}
                        {formatDistanceToNow(new Date(devis.updatedAt), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </p>
                      <p className="font-light text-black">
                        Créé par {devis.author.name}
                      </p>
                    </div>
                    <div>
                      <p>
                        {devis.items.length} item
                        {devis.items.length > 1 ? "s" : ""}{" "}
                        <span className="text-gray-500">|</span>{" "}
                        {devis.items
                          .reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                        €
                      </p>
                    </div>
                    <div className="mt-4">
                      <StatusBadge
                        status={devis.status.toLowerCase() as Status}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
      <hr />
      <h1 className={inter.className + " text-3xl font-medium text-black/80"}>
        Devis acceptés
      </h1>
      <div className="flex flex-row flex-wrap gap-8">
        {areValidatedDevisLoading || !validatedDevis ? (
          <div>Loading...</div>
        ) : (
          validatedDevis.map((devis) => (
            <Link href={`/devis/${devis.id}`} key={devis.id} passHref>
              <div
                key={devis.id}
                className="flex h-[364px] w-[292px] flex-col rounded-xl border border-gray-300 bg-transparent"
              >
                <div
                  className={`flex h-[164px] w-full items-center justify-center rounded-t-xl text-white`}
                  style={{
                    backgroundColor: devis.color,
                  }}
                >
                  {devis.customer}
                </div>
                <div className="flex flex-col gap-2 px-6 py-4 text-sm">
                  <div>
                    <p className="font-semibold">{devis.customer}</p>
                    <p className="font-semibold text-black/70">#{devis.id}</p>
                  </div>
                  <div className="text-[13px]">
                    <p className="font-light text-gray-500">
                      Dernière mise à jour{" "}
                      {formatDistanceToNow(new Date(devis.updatedAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                    <p className="font-light text-black">
                      Créé par {devis.author.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      {devis.items.length} item
                      {devis.items.length > 1 ? "s" : ""}{" "}
                      <span className="text-gray-500">|</span>{" "}
                      {devis.items
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                      €
                    </p>
                  </div>
                  <div className="mt-4">
                    <StatusBadge
                      status={devis.status.toLowerCase() as Status}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <hr />
      <h1 className={inter.className + " text-3xl font-medium text-black/80"}>
        Devis refusés
      </h1>
      <div className="flex flex-row flex-wrap gap-8">
        {areRefusedDevisLoading || !refusedDevis ? (
          <div>Loading...</div>
        ) : (
          refusedDevis.map((devis) => (
            <Link href={`/devis/${devis.id}`} key={devis.id} passHref>
              <div
                key={devis.id}
                className="flex h-[364px] w-[292px] flex-col rounded-xl border border-gray-300 bg-transparent"
              >
                <div
                  className={`flex h-[164px] w-full items-center justify-center rounded-t-xl text-white`}
                  style={{
                    backgroundColor: devis.color,
                  }}
                >
                  {devis.customer}
                </div>
                <div className="flex flex-col gap-2 px-6 py-4 text-sm">
                  <div>
                    <p className="font-semibold">{devis.customer}</p>
                    <p className="font-semibold text-black/70">#{devis.id}</p>
                  </div>
                  <div className="text-[13px]">
                    <p className="font-light text-gray-500">
                      Dernière mise à jour{" "}
                      {formatDistanceToNow(new Date(devis.updatedAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                    <p className="font-light text-black">
                      Créé par {devis.author.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      {devis.items.length} item
                      {devis.items.length > 1 ? "s" : ""}{" "}
                      <span className="text-gray-500">|</span>{" "}
                      {devis.items
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                      €
                    </p>
                  </div>
                  <div className="mt-4">
                    <StatusBadge
                      status={devis.status.toLowerCase() as Status}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MainView;
