import { Manrope, Montserrat } from "next/font/google";

/**
 * Body/UI: Montserrat
 * Display/nav: Aeonik (Manrope substitute until licensed files are added)
 * Drop .woff2 files into public/fonts and switch to next/font/local to match exactly.
 */
export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const fontAeonik = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-aeonik",
  display: "swap",
});
