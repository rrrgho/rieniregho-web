"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useDetectPathname({ pathname }: { pathname: string }) {
  const path = usePathname();
  const [detected, setDetected] = useState<boolean>(false);

  useEffect(() => {
    if (path.split("/").includes(pathname)) {
      setDetected(true);
    }
  }, []);

  return detected;
}
