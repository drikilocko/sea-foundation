import { Barlow_Condensed, DM_Sans, Manrope } from "next/font/google";
import CookieConsent from "@/components/layout/CookieConsent";
import Preloader from "@/components/layout/Preloader";
import RevealOnScroll from "@/components/layout/RevealOnScroll";
import ScrollProgress from "@/components/home/ScrollProgress";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { LOGO_COLOR, SITE_URL } from "@/lib/site";
import "@/styles/index.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: LOGO_COLOR },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${dmSans.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>.site-preloader { display: none; }</style>",
          }}
        />
        <SmoothScrollProvider>
          <LanguageProvider>
            <Preloader />
            {children}
            <CookieConsent />
            <RevealOnScroll />
            <ScrollProgress />
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
