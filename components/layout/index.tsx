import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import Tooltip from "@/components/shared/tooltip";
import { useRouter } from "next/router";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children?: ReactNode;
}) {
  const scrolled = useScroll(50);

  const router = useRouter()
  const actualRouter = router.asPath
  const siteUrl = 'myskin.madeofhealth.com'
  const fullHref = `https://${siteUrl}${actualRouter}`

  return (
    <>
      <Meta {...meta} />
      <div className="fixed h-screen w-full bg-gradient-to-br from-lime-100 via-blue-50 to-green-100" />
      <div
        className={`fixed top-0 w-full pt-2 pb-2 ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/madeofhealth-logo.svg"
              alt="madeofhealth-logo"
              width="169"
              height="44"
              className="mr-2 rounded-sm p-3"
            ></Image>
          </Link>
          <div className="flex items-center space-x-4">
            {/*
            <a
              href="https://madeofhealth.com/products/skincare"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/shopping-bag-icon.svg"
                alt="Compartilhar"
                width={30}
                height={30}
              ></Image>
            </a>
            */}
            {/*SOCIAL SHARE BUTTONS START*/}
            <Tooltip
              content={
                <div className="items-center justify-center align-center text-center p-3">
                  <WhatsappShareButton
                    url={fullHref}
                    title="Look how nice it is! Simulate your future appearance!"
                    separator=": "
                  >
                    <WhatsappIcon size={36} round />
                  </WhatsappShareButton>
                  <p>share</p>
                </div>
              }
            >
              <Image
                src="/share-logo1.svg"
                alt="Share"
                width={36}
                height={36}
              ></Image>
            </Tooltip>
            {/*SOCIAL SHARE BUTTONS END*/}
          </div>
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
      <div className="text-gray-500">
          © {new Date().getFullYear()}{" "}
            <span>
            madeofhealth.com
            </span>
        
            </div>
           <div className="flex flex-row justify-center text-gray-500 text-sm">
           <u>
                <Link href="/cookies-policy">Cookies Policy</Link>
              </u>
              <span className="px-2">{" "}|{" "}</span>
              <u>
                <Link href="/privacy-notice">Privacy Notice</Link>
              </u>
           </div>
      </div>
    </>
  );
}
