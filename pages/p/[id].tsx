import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { ParsedUrlQuery } from "node:querystring";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Layout from "@/components/layout";
import { getData, DataProps } from "@/lib/upstash";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import PhotoBooth from "@/components/home/photo-booth";
import { getPlaiceholder } from "plaiceholder";
import { useUploadModal } from "@/components/home/upload-modal";
import { Upload, ExternalLink, CornerDownRight } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useState, useEffect, use } from "react";
import { LoadingCircle } from "@/components/shared/icons";
import Link from "next/link";
import { setCookie, parseCookies } from "nookies"; // Import nookies library

export default function PhotoPage({
  input,
  blurDataURL,
  data: fallbackData,
}: {
  input: string;
  blurDataURL: string;
  data: DataProps;
}) {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<DataProps>(`/api/images/${id}`, fetcher, {
    fallbackData,
    refreshInterval: fallbackData.output || fallbackData.expired ? 0 : 500,
    refreshWhenHidden: true,
  });
  const { UploadModal, setShowUploadModal } = useUploadModal();

  //loading for this page
  const [loadingId, setLoadingId] = useState(true);
  useEffect(() => {
    if (data?.output) {
      setLoadingId(false);
    }
  }, [data?.output]);

  //times to show texts
  const [showFirstText, setShowFirstText] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (loadingId) {
        setShowFirstText(false);
        setShowSecondText(true);
      }
    }, 10000);
  }, [loadingId]);

  const productsLinks: {
    [key: string]: string; // Add an index signature
  } = {
    dermaprime:
      "https://258b49oxufvey25cpdv-3luls9.hop.clickbank.net/?tid=dermaprima_facebook_tid",
    bubnatural:
      "https://ae80e8i9yiu5w-x2yy-95k62z8.hop.clickbank.net/?tid=bubsnaturals_fb_tid",
    neotonics:
      "https://8a6aa4uyoejf12u7jc0mvfeq2c.hop.clickbank.net/?tid=neotonics_fb_tid",
    biorest:
      "https://b66491kysii72-06yc445k2kbg.hop.clickbank.net/?tid=biorest_fb_tid",
  };

  {
    /* phase 2 improvements(powered with VSL page): 
  const productsLinks = {
    "dermaprime": "https://madeofhealth.com/skin-care/products/dermaprime",
    "bubnatural": "https://madeofhealth.com/skin-care/products/bubnatural",
    "neotonics": "https://madeofhealth.com/skin-care/products/neotonics",
    "biorest": "https://madeofhealth.com/skin-care/products/biorest",
}
*/
  }

  // Random link state with initial value of null
  const [randomProductLink, setRandomProductLink] = useState<string | null>(
    null,
  );

  // Check for the visit counter in cookies
  const cookies = parseCookies(); // Parse cookies
  const visitCounter = parseInt(cookies.visitCounter || "0", 10); // Get visit counter from cookies

  useEffect(() => {
    // Check if randomProductLink is null
    if (randomProductLink === null && visitCounter === 1) {
      // Generate a random key from productsLinks
      const productKeys = Object.keys(productsLinks);
      const randomProductKey =
        productKeys[Math.floor(Math.random() * productKeys.length)];

      // Get the random link from productsLinks
      const randomLink = productsLinks[randomProductKey];

      // Update randomProductLink state with the random link
      setRandomProductLink(randomLink);
    }

    // Update the visit counter in cookies
    setCookie(null, "visitCounter", String(visitCounter + 1), {
      maxAge: 86400, // Set cookie expiration to 24 hours
      path: "/", // Set the path where the cookie is available
    });
  }, [randomProductLink, productsLinks, visitCounter]);

  console.log("visitCounter: " + visitCounter);

  //data output check
  console.log("data?.output: " + data?.output);

  return (
    <Layout>
      <Toaster />
      <UploadModal />
      <motion.div
        className="z-10 w-full px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Your Results
        </motion.h1>
        {!data?.expired && loadingId ? (
          <div className="align-center flex flex-col items-center justify-center">
            {/* First text while loading */}
            {showFirstText && (
              <div className="align-center flex flex-col items-center justify-center pt-6">
                <LoadingCircle />
                <p className="p-4">Analyzing your skin...</p>
              </div>
            )}

            {/* Second text while loading */}
            {showSecondText && (
              <div className="align-center flex flex-col items-center justify-center pt-6">
                <LoadingCircle />
                <p className="p-4">Choosing one great product for you...</p>
              </div>
            )}
          </div>
        ) : (
          !data?.expired && (
            <div className="align-center flex flex-col items-center justify-center pt-6">
              <div className="mb-6 mt-2 p-2 text-center">
                <p>🌟 Good News! 🌟</p>
                <p>
                  Here is a <b>recommended product</b> for your{" "}
                  <b>skin health</b> with <b>anti-aging properties</b>.
                </p>
              </div>
              {randomProductLink ? (
                <div className="align-center flex flex-col items-center justify-center">
                  <button className="flex animate-pulse items-center space-x-2 rounded-lg bg-lime-400 p-1 px-3 py-2 font-bold text-white shadow-md hover:bg-lime-500">
                    <ExternalLink className="animate-pulse text-white" />
                    {/*href link is from a random value of productsLinks object. */}
                    <Link href={randomProductLink} target="_blank">
                      Know your product
                    </Link>
                  </button>
                  <div className="p-1">
                    <small>
                      (you will be directed to the manufacturer&apos;s official
                      website)
                    </small>
                  </div>
                </div>
              ) : (
                <div className="align-center flex flex-col items-center justify-center">
                  <p>
                    Receive in your e-mail a special collection of the best
                    recommended products
                  </p>
                  <small>
                    Based in your results we will send no more than 5 products.
                  </small>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="your e-mail here"
                  />
                  <button className="flex animate-pulse items-center space-x-2 rounded-lg bg-lime-400 p-1 px-3 py-2 font-bold text-white shadow-md hover:bg-lime-500">
                    <CornerDownRight className="animate-pulse text-white" />
                    submit
                  </button>
                </div>
              )}
            </div>
          )
        )}
        {data?.expired ? (
          <motion.div
            className="mx-auto mt-10 flex h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white sm:h-[600px] sm:w-[600px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <p className="text-sm text-gray-500">
              Your photos have been deleted. Please upload a new photo.
            </p>
            <button
              className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-lime-400 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-lime-300 hover:text-black"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="h-5 w-5 animate-pulse text-white group-hover:text-black" />
              <p>Upload another photo</p>
            </button>
          </motion.div>
        ) : (
          <PhotoBooth
            input={input}
            blurDataURL={blurDataURL}
            output={data!.output}
            failed={data!.failed}
          />
        )}
      </motion.div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps = async (
  context: GetStaticPropsContext & { params: Params },
) => {
  const { id } = context.params;
  const input = `${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER}/${id}`;
  const data = await getData(id);
  if (data) {
    let imageData: { base64: string } | undefined;
    try {
      imageData = await getPlaiceholder(input);
    } catch (error) {
      console.error(error);
    }
    const { base64 } = imageData || {};
    return {
      props: {
        input,
        blurDataURL: base64 || "",
        data,
      },
      revalidate: 1,
    };
  } else {
    return { notFound: true, revalidate: 1 };
  }
};
