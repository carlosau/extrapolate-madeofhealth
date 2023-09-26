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
import { Upload } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingCircle } from "../../components/shared/icons";

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

   // State to control the visibility of the product result recommendation
   const [showProductResult, setShowProductResult] = useState(false);




  return (
    <Layout>
      <Toaster />
      <UploadModal />
      <motion.div
        className="z-10 max-w-2xl px-5 xl:px-0"
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
          Result
        </motion.h1>
        <motion.p
          className="mt-0 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >

                         {/* CONDITIONS TO SHOW THE PRODUCT RESULT:
                         - show after 27seconds
                     AND only show the product result if:
                        - it's the first image generation from the user
                        - 
                    */}
                  {showProductResult && (
                  // The result product (Showed above the photo-booth) 
                    <div className="absolute top-0 flex flex-col items-center p-2">
                          <div>
                              <LoadingCircle />
                              <p
                                  className="text-sm text-gray-500 pt-3"
                                >
                                  Analyzing your skin...
                                </p>
                          </div>
                          <div>
                                <p>Good News!</p>
                                <p>We found the recommended product for your skin!</p>
                                <button
                                  className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-green-600 px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                >
                                  <Link href="https://madeofhealth.com/product/link">Discover the product</Link>
                                </button>
                          </div>
                    </div>
                  )}

          <Balancer ratio={0.6} className="invisible">
          text text text text text text text text text text text text text
          </Balancer>
        </motion.p>
        {data?.expired ? (
          <motion.div
            className="mx-auto mt-10 flex h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white sm:h-[600px] sm:w-[600px]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <p className="text-sm text-gray-500">
            Your photo has been deleted. Please add another photo.
            </p>
            <button
              className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="h-5 w-5 text-white group-hover:text-black" />
              <p>Upload new photo</p>
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
