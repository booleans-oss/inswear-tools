import type { FC } from "react";
import Image from "next/image";
import { poppins } from "@/utils/fonts";
import { useUser } from "@clerk/nextjs";
import * as Avatar from "@radix-ui/react-avatar";

const Navbar: FC = () => {
  const { user, isLoaded } = useUser();
  return (
    <nav className="flex h-20 w-screen flex-row items-center justify-between bg-white/10 px-40 text-black border-b border-gray-300">
      <div className="flex flex-row gap-20">
        <div
          className={
            poppins.className +
            " flex flex-row items-center gap-4 text-2xl font-bold capitalize tracking-widest"
          }
        >
          <Image
            src="/assets/logos/logo-black.png"
            alt="Logo"
            width={40}
            height={40}
          />
          INS&apos;WEAR
        </div>

        <div className="flex flex-row items-center gap-10">
          <div>Devis</div>
          <div>Membres</div>
        </div>
      </div>

      {isLoaded && user && (
        <Avatar.Root>
          <Avatar.Image
            src={user.profileImageUrl}
            className="h-10 w-10 rounded-full"
          />
          <Avatar.Fallback />
        </Avatar.Root>
      )}
    </nav>
  );
};

export default Navbar;
