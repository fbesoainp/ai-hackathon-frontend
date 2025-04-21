"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/integrations/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PairfectoBackendAPI from "@/integrations/pairfectoBackend";
import { User } from "firebase/auth";


export default function MainView() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const pairfectoBackend = new PairfectoBackendAPI();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
        setUserPhoto(user.photoURL || "");
        setCurrentUser(user);
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    let results = [];
  
    if (currentUser) {
      results = await pairfectoBackend.submitQuery(currentUser, query);
    }
  
    // stash them in sessionStorage
    sessionStorage.setItem("pairfectoResults", JSON.stringify(results));
  
    setIsLoading(false);
    console.log("Query submitted:", query);
  
    // only pass the query itself
    router.push(`/query/results?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen">
        <div className="flex flex-col items-center justify-center text-white">
            
        <button
            onClick={async () => {
                try {
                await signOut(auth);
                router.push("/");
                } catch (error) {
                console.error("Logout failed:", error);
                }
            }}
            className="text-sm"
            >
            Logout
        </button>

        <div className="flex flex-col justify-center items-center mt-1">
            <div className="flex flex-col justify-center items-start gap-4 mb-12">
                <div className="flex items-center gap-3">
                    {userPhoto && (
                    <Image
                        src={userPhoto}
                        alt={userName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    )}
                    <p className="text-white text-[1rem] font-light leading-normal tracking-[0.0175rem]">
                    Welcome back, {userName}.
                    </p>
                </div>

                <h2 className="text-white text-[2rem] font-normal leading-[2.5rem] tracking-[-0.01875rem]">
                    What kind of restaurant are you looking for?
                </h2>
            </div>

            <div className="flex flex-row items-center gap-2">
            <input
                type="text"
                placeholder="Click to type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white rounded-full h-[4.25rem] px-6 pr-[3.5rem] py-3 text-black text-[1.25rem] shadow-[0px_0px_15px_rgba(255,255,255,0.60)]"
            />
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-[3rem] h-[3rem] flex items-center justify-center"
            >
                {isLoading ? (
                <div className="w-[35px] h-[35px] border-4 border-t-white border-white/20 rounded-full animate-spin" />
                ) : (
                <Image src="/icons/arrow-right.svg" alt="Submit" width={35} height={35} />
                )}
            </button>
            </div>
        </div>
        </div>
    </div>
  );
}
