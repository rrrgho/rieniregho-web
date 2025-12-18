"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectLoginRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session.status === "authenticated") {
      const token = sessionStorage.getItem("bearerToken");
      if (!token) {
        router.push("/api/auth/validate-token");
      } else {
        if (typeof window !== undefined) {
          console.log("HARD RELOAD: to administrator", session.status);
          // window.location.href = "/administrator";
        } else {
          console.log("PUSH: to administrator", session.status);
          // router.push("/administrator");
        }
      }
    } else {
      setIsLoading(false);
    }
  }, [session]);

  // Show loading while checking authentication
  if (isLoading || session.status === "loading") {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <Spinner className="size-8" />
          <p className="text-muted-foreground">Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (session.status === "authenticated") {
    return null;
  }
  return <div>{children}</div>;
};

export default ProtectLoginRoute;
