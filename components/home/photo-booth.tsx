import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Download } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LoadingCircle } from "../shared/icons";
import VideoPlayer from "../video/VideoPlayer";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function PhotoBooth({
  input = "",
  blurDataURL,
  output,
  failed,
  state, // Receive state as a prop
  setState = () => {}, // Receive setState as a prop
  loading, // Receive loading as a prop
  setLoading = () => {}, // Receive setLoading as a prop
}: {
  input: string;
  blurDataURL?: string;
  output: string | null;
  failed?: boolean;
  state: string; // Add state as a prop
  setState: (state: string) => void; // Add setState as a prop
  loading: boolean; // Add loading as a prop
  setLoading: (loading: boolean) => void; // Add setLoading as a prop
}) {
  const router = useRouter();
  const { id } = router.query;

  const direction = useMemo(() => (state === "output" ? 1 : -1), [state]);
  const [downloading, setDownloading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setShowForm(true);
      }
    }, 5000);
  }, [loading]);

  useEffect(() => {
    if (output) {
      setLoading(false);
    }
  }, [output]);

  console.log('Loading FROM PHOTOBOOTH is: ' + loading)

  console.log('State is: ' + state)

  console.log('Failed is: ' + failed)

  console.log('direction is: ' + direction)

  return (
    <motion.div
      className="group relative mx-auto mt-0 h-[400px] w-full overflow-hidden rounded-2xl border border-gray-200 sm:mt-2 sm:h-[600px] sm:w-[600px]"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <button
        onClick={() => setState(state === "output" ? "input" : "output")}
        className="absolute left-5 top-5 z-10 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all hover:scale-105 active:scale-95"
      >
        <p className="text-sm font-semibold text-gray-500">
          {state === "output" ? "View original" : "View result"}
        </p>
      </button>
      {/* 
        only show the download button if:
          - it's on a page with an id (i.e. not the demo page) 
          - there's an output
          - we're in the output tab
      */}
      {id && output && state === "output" && !failed && (
        <button
          onClick={() => {
            setDownloading(true);
            fetch(output, {
              headers: new Headers({
                Origin: location.origin,
              }),
              mode: "cors",
            })
              .then((response) => response.blob())
              .then((blob) => {
                let blobUrl = window.URL.createObjectURL(blob);
                forceDownload(
                  blobUrl,
                  `${id || "demo"}.${state === "output" ? "gif" : ""}`,
                );
                setDownloading(false);
              })
              .catch((e) => console.error(e));
          }}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          {downloading ? (
            <LoadingCircle />
          ) : (
            <Download className="h-5 w-5 text-green-500" />
          )}
        </button>
      )}
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {state === "output" ? (
            <motion.div
              key={output}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute h-full w-full"
            >
              {failed && (
                <div className="z-10 flex h-full w-full flex-col items-center bg-white pt-[70px] sm:pt-[100px]">
                  <p className="text-sm text-red-600">
                    Error - Not face image. Try upload a face image!
                  </p>
                </div>
              )}
              {loading && (
                <div className="z-10 flex h-full w-full flex-col items-center bg-white pt-[70px] sm:pt-[100px]">
                  <div className="w-[350px] pb-[30px] sm:w-[500px] sm:pb-[50px]">
                    <VideoPlayer src="/output-video-inter01-nosub-sdsize-prod.mp4" />
                  </div>
                  <LoadingCircle />
                  {id && showForm && (
                    <motion.div
                      className="my-4 flex flex-col items-center space-y-4"
                      initial="hidden"
                      whileInView="show"
                      animate="show"
                      viewport={{ once: true }}
                    >
                      <motion.p
                        className="text-sm text-gray-500"
                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                      >
                        Image in processing, please wait...
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              )}
              {output && (
                <Image
                  alt="output image"
                  src={output}
                  width={1280}
                  height={1280}
                  className="h-full object-cover"
                  onLoadStart={() => setLoading(true)}
                  onLoadingComplete={() => setLoading(false)}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key={input}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute h-full w-full"
            >
              <Image
                alt="original image"
                src={input}
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL}
                fill
              />
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </motion.div>
  );
}
