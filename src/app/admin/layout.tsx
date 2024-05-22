'use client'
import { ReactNode, useEffect } from "react";
import {useAuthState} from 'react-firebase-hooks/auth'

import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase/client";
import { useAuth } from "@/hooks/auth";
import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const {isAuthenticated, role} = useAuth();

  if (!user && isAuthenticated){
    router.push('/')
    return null
  }

  return (
    <div className="flex bg-gray-100 flex-1">
      <NavBar role={role} />
      <div className="pt-10 ml-80 w-full h-full">
        {children}
      </div>
    </div>
  );
}
