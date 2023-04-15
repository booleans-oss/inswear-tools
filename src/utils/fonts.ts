import { Poppins, Inter } from "next/font/google";

export const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

export const inter = Inter({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin-ext"],
});
