import ListBox from "@/components/primitives/ListBox";
import { api } from "@/utils/api";
import type {
  Customization,
  FournisseurItem,
  Size,
  FournisseurStatus,
} from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, useState, useEffect } from "react";
import MailVisualizer from "@/components/fournisseur/MailVisualizer";
import Head from "next/head";

const DevisView: FC = () => {
  const router = useRouter();

  const { mutateAsync } = api.fournisseurDevis.updateStatus.useMutation();

  const { id } = router.query;

  const { data, isLoading } = api.fournisseurDevis.findOne.useQuery({
    id: id as string,
  });

  const [status, setStatus] = useState<FournisseurStatus>(
    (data?.status as FournisseurStatus) ?? "généré"
  );

  const onStatusChange = async (newStatus: FournisseurStatus) => {
    try {
      await mutateAsync({ id: id as string, status: newStatus });
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(newStatus);
    }
  };

  const items = data?.items.map<FournisseurItem>((item) => ({
    ...item,
    size: item.size as Size,
    customizations: JSON.parse(item.customization) as Customization[],
  }));

  useEffect(() => {
    setStatus((data?.status as FournisseurStatus) ?? "généré");
  }, [data]);

  return (
    <>
      <Head>
        <title>Devis Fournisseur #{id}</title>
        <meta
          name="description"
          content={`Devis fournisseur pour ${data?.customer ?? ""}. ${items?.length ?? ""} items.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh_-_5rem)] flex-col px-40 py-16 text-black">
        <div className="flex flex-col gap-4">
          <div className="w-1/2 text-left">
            <nav aria-label="breadcrumb" className="w-max">
              <ol className="bg-blue-gray-50 flex w-full flex-wrap items-center rounded-md bg-opacity-60 py-2 pr-4">
                <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-gray-900/60 antialiased transition-colors duration-300 hover:text-black">
                  <Link href="/" className="flex items-center gap-2">
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
                <Link href="/devis/fournisseur" passHref>
                  <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-gray-900/60 antialiased transition-colors duration-300 hover:text-black">
                    Fournisseur
                    <span className="text-blue-gray-500 pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal antialiased">
                      /
                    </span>
                  </li>
                </Link>
                <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-black antialiased transition-colors duration-300 hover:text-gray-500">
                  #{id}
                </li>
              </ol>
            </nav>
          </div>
          {isLoading || !data ? (
            <h1 className="text-center text-3xl font-bold uppercase">
              Loading...
            </h1>
          ) : (
            <>
              <div className="flex justify-between">
                <div className="w-[200px]">
                  <ListBox
                    items={["Généré", "Envoyé", "Repondu"]}
                    value={status}
                    onChange={(value) => {
                      onStatusChange(value as FournisseurStatus).catch(
                        (error) => console.error(error)
                      );
                    }}
                  />
                </div>
                <h1 className="text-center text-3xl font-bold uppercase">
                  Devis #{id}
                </h1>
                <a
                  href="mailto:contact@inswear.fr"
                  className="rounded border bg-black px-4 py-2 text-sm font-bold uppercase text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
                >
                  Envoyer
                </a>
              </div>
              <MailVisualizer items={items ?? []} />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default DevisView;
