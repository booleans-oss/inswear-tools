import Link from "next/link";

export default function CommentFairePage() {
  return (
    <main className="flex w-full flex-1 flex-col gap-4 px-40 pt-10">
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
            <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-black antialiased transition-colors duration-300 hover:text-gray-500">
              Comment faire?
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex flex-col gap-4 pb-10">
        <h1 className="text-5xl font-bold">Comment faire ?</h1>
        <p>
          Quand quelqu&apos;un passe une commande vous devez suivre les étapes
          suivantes :
        </p>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            1
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Valider que vous ayez toutes les informations nécessaires pour
              passer la commande chez notre fournisseur (Alchimistes).
            </p>
            <div>
              <p>Les informations sont les suivantes:</p>
              <ol className="ml-10 list-decimal">
                <li>Le nom du produit (Sweatshirt, gilet, etc...)</li>
                <li>Les tailles (XS, S, etc...)</li>
                <li>
                  La quantité <strong>POUR CHAQUE TAILLE</strong>
                </li>
                <li>La couleur</li>
                <li>Les modifications:</li>
                <ol className="ml-10 list-decimal">
                  <li>Type (flocage, broderie, etc...)</li>
                  <li>Contenu (Texte, image, logo, etc...)</li>
                  <li>Position (devant, dos, etc...)</li>
                </ol>
              </ol>
            </div>
            <p>
              Une fois que vous êtes sûrs d&apos;avoir toutes les informations
              nécessaires vous pouvez passer à l&apos;étape suivante.
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            2
          </div>
          <div className="flex w-3/4 flex-col gap-2 whitespace-pre-wrap break-words">
            <p>
              Avec les informations que vous avez, vous pouvez créer le devis
              electroniquement en allant à la page:
              <Link className="underline" href="/fournisseur" passHref>
                {" "}
                https://inswear-tools.vercel.app/fournisseur
              </Link>
              .
            </p>
            <p>
              Vous avez juste à remplir les informations que vous avez déjà.
            </p>
            <p>
              Cependant, vous devez connaitre le lien de l&apos;article demandé.
              Pour cela vous n&apos;avez qu&apos;à aller sur le site des
              Alchimistes (
              <a className="underline" href="https://alchimistes.fr/">
                https://alchimistes.fr/
              </a>
              ) et cherchez le produit qui correspond au mieux aux attentes de
              nos clients.
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            3
          </div>
          <div className="flex w-3/4 flex-col gap-2 whitespace-pre-wrap break-words">
            <p>
              Une fois l&apos;email généré vous n&apos;avez qu&apos;à
              l&apos;envoyer à notre fournisseur en cliquant sur le bouton{" "}
              <span className="font-bold">Envoyer</span>.
            </p>
            <p>
              Vous devez aussi changer le status de la commande en cliquant sur
              le bouton <span className="font-bold">Envoyé</span>.
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            4
          </div>
          <div className="flex w-3/4 flex-col gap-2 whitespace-pre-wrap break-words">
            <p>
              Quand vous avez une réponse du fournisseur, vous pouvez maintenant
              créer le devis pour les clients.
            </p>
            <p>
              Pour cela, vous devez vous rediriger vers{" "}
              <Link className="underline" href="/devis/client" passHref>
                https://inswear-tools.vercel.app/client
              </Link>
              .
            </p>
            <p>
              Comme pour le devis pour le fournisseur, vous devez remplir les
              informations que vous connaissez et que le fournisseur a confirmé
              avec son devis qu&apos;il vous a fourni.
            </p>
            <p>
              Cependant, vous devez maintenant inclure le{" "}
              <strong>prix unitaire</strong> de l&apos;article. Celui-ci se
              trouve dans le devis envoyé par le fournisseur.
            </p>
            <p>
              Vous pouvez aussi modifier la marge que l&apos;on peut faire sur
              la commande. Par défaut, notre marge est de <strong>6,5%</strong>.
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            5
          </div>
          <div className="flex w-3/4 flex-col gap-2 whitespace-pre-wrap break-words">
            <p>
              Une fois le devis généré, vous n&apos;avez qu&apos;à
              l&apos;envoyer au client qui a passé la commande.
            </p>
            <p>
              N&apos;oubliez pas de changer le status de la commande en cliquant
              sur le bouton <span className="font-bold">Envoyé</span>.
            </p>
            <p>
              Pour cela, vous devez vous rediriger vers{" "}
              <Link className="underline" href="/devis/client" passHref>
                https://inswear-tools.vercel.app/client
              </Link>
              .
            </p>
            <p>
              Comme pour le devis pour le fournisseur, vous devez remplir les
              informations que vous connaissez et que le fournisseur a confirmé
              avec son devis qu&apos;il vous a fourni.
            </p>
            <p>
              Cependant, vous devez maintenant inclure le{" "}
              <strong>prix unitaire</strong> de l&apos;article. Celui-ci se
              trouve dans le devis envoyé par le fournisseur.
            </p>
            <p>
              Vous pouvez aussi modifier la marge que l&apos;on peut faire sur
              la commande. Par défaut, notre marge est de <strong>6,5%</strong>.
            </p>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            6
          </div>
          <div className="flex w-3/4 flex-col gap-2 whitespace-pre-wrap break-words">
            <p>
              Lorsque vous avez une réponse du client, vous pouvez modifier le
              status en fonction de leur réponse:{" "}
              <span className="font-bold">Accepté</span> ou{" "}
              <span className="font-bold">Refusé</span>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
