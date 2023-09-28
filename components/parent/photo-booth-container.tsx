import React, { useState } from "react";
import PhotoBooth from "../home/photo-booth";
// import PhotoPage from "../../pages/p/[id]";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface DataProps {
  output: string | null; // output of prediction
  expired?: boolean; // if the data is expired
  failed?: boolean; // if the prediction failed
}

interface PhotoBoothContainerProps {
  input: string;
  blurDataURL?: string;
  output: string | null;
  data?: DataProps | undefined;
}

export default function PhotoBoothContainer({
  input,
  blurDataURL,
  output,
  data: fallbackData,
}: PhotoBoothContainerProps) {
  //shared states
  const [state, setState] = useState("output");
  const [loading, setLoading] = useState(true);
  
  //get the route
  const router = useRouter();
  const isPhotoPageRoute = router.pathname === "/p/[id]";
  const id: boolean = router.pathname === "/p/[id]";

  //data fetching
  const { data } = useSWR<DataProps>(`/api/images/${id}`, fetcher, {
    fallbackData,
    refreshInterval: (fallbackData && fallbackData.output) || (fallbackData && fallbackData.expired) ? 0 : 500,
    refreshWhenHidden: true,
  });

  return (
    <>
      {/* Pass the shared states as props to the PhotoBooth component */}
      <PhotoBooth
        state={state}
        setState={setState}
        loading={loading}
        setLoading={setLoading}
        input={input}
        blurDataURL={blurDataURL}
        output={output}
      />

      {/* Pass the shared states as props to the PhotoPage component */}
      {isPhotoPageRoute && data && (
            <PhotoBooth
            input={input}
            blurDataURL={blurDataURL}
             output={data!.output}
             failed={data!.failed}
          />

          
    
    )}
    </>
  );
}

