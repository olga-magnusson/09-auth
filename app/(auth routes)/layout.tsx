"use client"

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter() as ReturnType<typeof useRouter> & {refresh: ()=> void };
  
  useEffect(()=>{
    router.refresh?.();
  }, [router]);

  
    return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}