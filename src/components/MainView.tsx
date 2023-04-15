import { inter } from "@/utils/fonts"
import type { FC } from "react"
import { FaPlus } from "react-icons/fa"

type MainViewProps = {
   createDevis: () => void 
}

const MainView: FC<MainViewProps> = ({ createDevis }) => {
    return (
        <div className="flex flex-col gap-10">
          <h1
            className={inter.className + " text-3xl font-medium text-black/80"}
          >
            Devis actifs
          </h1>
          <div className="flex flex-row gap-8">
            <div className="flex h-[364px] w-[292px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-transparent" onClick={createDevis}>
              <div className="rounded-full border-2 border-gray-200 p-2">
                <FaPlus />
              </div>
              <div className="text-md font-bold">Créer un devis</div>
            </div>
            <div className="flex h-[364px] w-[292px] flex-col rounded-xl border border-gray-300 bg-transparent">
              <div className="flex h-[164px] w-full items-center justify-center rounded-t-xl bg-red-500 text-white">
                Route des Vins
              </div>
              <div className="flex flex-col gap-2 px-6 py-4 text-sm">
                <div>
                  <p className="font-semibold">Route des Vins</p>
                  <p className="font-semibold text-black/70">#42032</p>
                </div>
                <div className="text-[13px]">
                  <p className="font-light text-gray-500">
                    Updated 4 hours ago
                  </p>
                  <p className="font-light text-black">Created by @Clement</p>
                </div>
                <div>
                  <p>
                    7 items <span className="text-gray-500">|</span> 1,200€
                  </p>
                </div>
                <div className="mt-4">
                  <p>
                    <span className="rounded-sm bg-green-500/30 px-3 py-1 text-xs font-semibold text-green-500">
                      Validé
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default MainView