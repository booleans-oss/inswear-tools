import CreateView from "@/components/fournisseur/CreateView";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import MainView from "@/components/fournisseur/MainView";

const DevisFournisseurPage: NextPage = () => {
  const [pageStatus, setPageStatus] = useState<"main" | "create" | "view">(
    "main"
  );
  return (
    <>
      <Head>
        <title>INS&apos;WEAR</title>
        <meta name="description" content="Outils pour l'association INS'WEAR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[calc(100vh_-_5rem)] flex-col px-40 py-16 text-black">
        {pageStatus === "main" && (
          <MainView createDevis={() => setPageStatus("create")} />
        )}
        {pageStatus === "create" && (
          <CreateView closeView={() => setPageStatus("main")} />
        )}
      </main>
    </>
  );
};

export default DevisFournisseurPage;
