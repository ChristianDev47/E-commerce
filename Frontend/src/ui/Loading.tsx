import { useState, useEffect, type PropsWithChildren } from "react";
import { useProductData } from "../hooks/useProductData";

export default function Loading({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { products } = useProductData();

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 250); 

      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [products]);

  return loading ? (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-[#f2f2f2]">
      <LoadingImage fileName="/icon.svg" />
      <LoadingBar progress={progress} /> 
    </div>
  ) : (
    children
  );
}

function LoadingImage({ fileName }: { fileName: string }) {
  return (
    <img
      src={fileName}
      width="100"
      height="100"
      className="mr-4 border-none outline-none loading-video"
    />
  );
}

function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="w-[80px] h-2 mt-2 bg-gray-300 transition-all">
      <div
        className="h-2 bg-gray-400"
        style={{ width: `${progress}%`, transition: "width 0.25s ease-in-out" }}
      ></div>
    </div>
  );
}
