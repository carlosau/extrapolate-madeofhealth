import React, { useState } from "react";
import PhotoBooth from "../home/photo-booth";
// import PhotoPage from "../../pages/p/[id]";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export interface DataProps {
  output: string | null; // output of prediction
  expired?: boolean; // if the data is expired
  failed?: boolean; // if the prediction failed
}

interface PhotoBoothContainerProps {
  input: string;
  blurDataURL?: string;
  output: string | null;
  data?: DataProps;
  failed?: boolean
}

export default function PhotoBoothContainer({
  input,
  blurDataURL,
  output,
  data: fallbackData,
  failed
}: PhotoBoothContainerProps) {
  //shared states
  const [state, setState] = useState("output");
  // const [loading, setLoading] = useState(true);
  
  //get the route
  const router = useRouter();
  const isPhotoPageRoute = router.pathname === "/p/[id]";
  const id: boolean = router.pathname === "/p/[id]";

  //data fetching
  const { data, error, isLoading } = useSWR<DataProps>(`/api/images/${id}`, fetcher, {
    fallbackData,
    refreshInterval: fallbackData?.output || fallbackData?.expired ? 0 : 500,
    refreshWhenHidden: true,
  });
  
  return (
    <>
      {/* Pass the shared states as props to the PhotoBooth component */}
      <PhotoBooth
        state={state}
        setState={setState}
        loading={isLoading}
       // setLoading={setLoading}
        input={input}
        blurDataURL={blurDataURL}
        output={output}
      />

      {/* Pass the shared states as props to the PhotoPage component */}
      {isPhotoPageRoute && data && (
            <PhotoBooth
            state={state}
            setState={setState}
            loading={isLoading}
          // setLoading={setLoading}
            input={input}
            blurDataURL={blurDataURL}
             output={output}
             failed={failed}
             data={data}
          />

          
    
    )}
    </>
  );
}

