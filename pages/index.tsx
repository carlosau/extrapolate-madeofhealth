import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { useUploadModal } from "@/components/home/upload-modal";
import { Upload, Heart } from "lucide-react";
import PhotoBooth from "@/components/home/photo-booth";
import { redis } from "@/lib/upstash";
//import Tooltip from "@/components/shared/tooltip";
import { nFormatter } from "@/lib/utils";
import CookieConsent from "react-cookie-consent"; // Import the CookieConsent component


export default function Home({ count }: { count: number }) {
  const { UploadModal, setShowUploadModal } = useUploadModal();
  console.log('total generated photos:', nFormatter(count))
  return (
    <>
    <Layout>
      <UploadModal />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="myCookieConsent" // Change to a unique name for your cookies
        style={{ background: "#bcbcbc" }}
        buttonStyle={{ background: "#A3E634", color: "#fff", fontSize: "15px", fontWeight: "400", borderRadius: "20px" }}
      >
      
        We use cookies to enhance your experience.{" "}
        <span style={{ fontWeight: "bold" }}>
          We don&apos;t store, use, sell or share user&apos;s photos
        </span>{" "}
        By clicking "Accept," you agree to our use of cookies and our{" "}
        <a href="/cookies-policy">Cookies Policy</a> and{" "}
        <a href="/privacy-notice">Privacy Notice</a>.
      
      </CookieConsent>
      <div
        className="z-10 max-w-2xl px-5 xl:px-0"
      
      >
        <h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          
        >
          <Balancer>How will your facial skin look?</Balancer>
        </h1>
        <p
          className="mt-6 text-center text-gray-500 md:text-xl"
          
        >
          <Balancer ratio={0.6}>
            Upload your photo, view the results and discover a special product¹ for your skin.{" "}
            <div>
            <small>1. All recommended products are backed by scientific research and are available for purchase on their manufacturers' official website. After results, you'll have access to the official manufacture website. We don&apos;t manufacture any of these products, we only recommend them.
            </small>
            </div>
            {/*
            <Tooltip
              content={
                <div className="flex flex-col items-center justify-center space-y-3 p-10 text-center sm:max-w-xs">
                  <p className="text-sm text-gray-700">
                    Cada foto será removida automaticamente após 24 horas.
                  </p>
                </div>
              }
            >
              <span className="hidden cursor-default underline decoration-dotted underline-offset-2 transition-colors hover:text-gray-800 sm:block">
                100% gratuito e sua privacidade protegida.
              </span>
            </Tooltip>
            */}
          </Balancer>
        </p>
        <div className="-mb-4">
          <button
            className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-lime-400 px-5 py-2 text-sm text-white font-bold transition-colors hover:bg-lime-300 hover:text-black"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload className="animate-pulse h-5 w-5 text-white group-hover:text-black" />
            <p>Upload my photo</p>
          </button>
          <p className="collapse mt-6 text-center text-sm text-gray-500">
            {nFormatter(count)} fotos geradas e contando...
          </p>
        </div>
        <PhotoBooth
          input={`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER}/input.webp`} 
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/ALjj/4mIh+P+/9Lv/wCn0+xeLxV9cWWUtL0AUz0tKQAAeVU0j4d/y2cTsDiuaawAAAAASUVORK5CYII="
          output={`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER}/output.gif`}
        />
      </div>
    </Layout>
    </>
  );
}

export async function getStaticProps() {
  const count = await redis.dbsize();
  return {
    props: {
      count,
    },
    revalidate: 60,
  };
}
