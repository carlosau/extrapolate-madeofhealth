import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useUploadModal } from "@/components/home/upload-modal";
import { Upload } from "lucide-react";
import PhotoBooth from "@/components/home/photo-booth";
import { redis } from "@/lib/upstash";
import Tooltip from "@/components/shared/tooltip";
import { nFormatter } from "@/lib/utils";
import ChildComponent from "@/components/home/ChildComponent";
import ParentComponent from "@/components/parent/ParentComponent";
import PhotoBoothContainer from "@/components/parent/photo-booth-container";

export default function Home({ count }: { count: number }) {
  const { UploadModal, setShowUploadModal } = useUploadModal();
  console.log('total generated photos:', nFormatter(count))
  return (
    <Layout>
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
          <Balancer>Are you taking care of your skin's health?</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer ratio={0.6}>
            Upload your photo, View the result below and discover a special product for your skin.{" "}
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
        </motion.p>
        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="-mb-4">
          <button
            className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload className="h-5 w-5 text-white group-hover:text-black" />
            <p>Upload my photo</p>
          </button>
          <ParentComponent />
          <p className="collapse mt-6 text-center text-sm text-gray-500">
            {nFormatter(count)} fotos geradas e contando...
          </p>
        </motion.div>
        <PhotoBoothContainer 
          input={`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER}/input.webp`} 
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/ALjj/4mIh+P+/9Lv/wCn0+xeLxV9cWWUtL0AUz0tKQAAeVU0j4d/y2cTsDiuaawAAAAASUVORK5CYII="
          output={`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER}/output.gif`}
        />
        {/*Old way
        <PhotoBooth
          input={`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER}/input.webp`}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/ALjj/4mIh+P+/9Lv/wCn0+xeLxV9cWWUtL0AUz0tKQAAeVU0j4d/y2cTsDiuaawAAAAASUVORK5CYII="
          output={`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER}/output.gif`}
        />
        */}
      </motion.div>
    </Layout>
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
