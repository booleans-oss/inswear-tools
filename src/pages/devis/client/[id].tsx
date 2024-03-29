import PDFVisualizer, { PDFDocument } from "@/components/client/PDFVisualizer";
import ListBox from "@/components/primitives/ListBox";
import { api } from "@/utils/api";
import type { ClientStatus, Customization, Item, Size } from "@/utils/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, type FC } from "react";

const DevisView: FC = () => {
  const router = useRouter();

  const { mutateAsync } = api.clientDevis.updateStatus.useMutation();

  const { id } = router.query;

  const { data, isLoading } = api.clientDevis.findOne.useQuery({
    id: id as string,
  });

  const [status, setStatus] = useState<ClientStatus>(
    (data?.status as ClientStatus) ?? "généré"
  );

  const onStatusChange = async (newStatus: ClientStatus) => {
    try {
      await mutateAsync({ id: id as string, status: newStatus });
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(newStatus);
    }
  };

  const items = data?.items.map<Item>((item) => ({
    ...item,
    size: item.size as Size,
    supplierPrice: String(item.supplierPrice),
    customizations: JSON.parse(item.customization) as Customization[],
  }));

  useEffect(() => {
    setStatus((data?.status as ClientStatus) ?? "généré");
  }, [data]);

  return (
    <>
      <Head>
        <title>Devis Client #{id}</title>
        <meta
          name="description"
          content={`Devis fournisseur pour ${data?.customer ?? ""}. ${data?.items.length ?? ""} items.`}
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
                <Link href="/devis/client" passHref>
                  <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-gray-900/60 antialiased transition-colors duration-300 hover:text-black">
                    Client
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
                    items={["Généré", "Envoyé", "Accepté", "Refusé"]}
                    value={status}
                    onChange={(value) => {
                      onStatusChange(value as ClientStatus).catch((error) =>
                        console.error(error)
                      );
                    }}
                  />
                </div>
                <h1 className="text-center text-3xl font-bold uppercase">
                  Devis #{id}
                </h1>
                <PDFDownloadLink
                  document={
                    <PDFDocument
                      items={items ?? []}
                      id={data.id}
                      customer={data.customer}
                    />
                  }
                  fileName={`devis-${data.id}-${data.customer}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      "Loading document..."
                    ) : (
                      <button className="rounded border bg-black px-4 py-2 text-sm font-bold uppercase text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black">
                        Télécharger
                      </button>
                    )
                  }
                </PDFDownloadLink>
              </div>
              <PDFVisualizer
                items={items ?? []}
                id={data.id}
                customer={data.customer}
                createdAt={data.createdAt}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default DevisView;
