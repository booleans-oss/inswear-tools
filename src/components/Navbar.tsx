import { Fragment, type FC } from "react";
import Image from "next/image";
import { poppins } from "@/utils/fonts";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";

const Navbar: FC = () => {
  const { user, isLoaded } = useUser();
  return (
    <nav className="flex h-20 w-screen flex-row items-center justify-between border-b border-gray-300 bg-white/10 px-40 text-black">
      <div className="flex flex-row gap-20">
        <Link href="/" passHref>
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
        </Link>

        <div className="flex flex-row items-center gap-10">
          <Link href="/comment-faire">Comment faire?</Link>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
              {({ open }) => (
                <div className="flex items-center gap-3">
                  Devis {open ? <BsChevronUp /> : <BsChevronDown />}
                </div>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/devis/fournisseur" passHref>
                        <button
                          className={`${
                            active ? "bg-gray-100" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <BsBoxSeam
                              className="mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <BsBoxSeam
                              className="mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          )}
                          Devis pour fournisseur
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/devis/client" passHref>
                        <button
                          className={`${
                            active ? "bg-gray-100" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <BsCurrencyDollar
                              className="mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <BsCurrencyDollar
                              className="mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          )}
                          Devis pour client
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {isLoaded && user && <UserButton />}
    </nav>
  );
};

export default Navbar;
