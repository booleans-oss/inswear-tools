import CreateView from "@/components/client/CreateView";
import MainView from "@/components/client/MainView";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const DevisClientPage: NextPage = () => {
  const [pageStatus, setPageStatus] = useState<"main" | "create">(
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

export default DevisClientPage;
