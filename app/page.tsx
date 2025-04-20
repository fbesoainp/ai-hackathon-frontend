// app/page.tsx
"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import SignUpForm from "@/components/SignUpForm";

export default function HomePage() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false });
  const [slideIndex, setSlideIndex] = useState(0);

  const handleToggle = () => {
    if (!embla) return;
    const next = (slideIndex + 1) % 3;
    embla.scrollTo(next);
    setSlideIndex(next);
  };

  return (
    <div className="flex-1 justify-center items-center relative h-screen w-screen">
      {/* Embla viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        {/* slides container */}
        <div className="flex h-full w-full">
          {/* Slide 0: Home */}
          <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
            <h1 className="text-4xl font-semibold">Pairfecto</h1>
          </div>
          {/* Slide 1: Second text */}
          <div className="flex-shrink-0 h-full w-full flex items-center justify-center">
            <p
              className="
                text-white 
                text-justify 
                text-[1.625rem] 
                w-80 
                font-light 
                leading-[120%] 
                tracking-[-0.01625rem]
              "
            >
              Welcome to{" "}
              <span className="font-bold">
                Pairfecto
              </span>
              {" "} where finding the perfect restaurant for your partner is no longer a hassle.
            </p>
          </div>

          {/* Slide 2: Sign up form */}
          <div className="flex-shrink-0 flex items-center justify-center h-full w-full">
            <SignUpForm />
          </div>
        </div>

        {slideIndex < 2 && (
          <button
            onClick={handleToggle}
            className="absolute bottom-4 right-4 p-2 rounded-full shadow hover:bg-white transition"
          >
            <Image
              src="/icons/arrow-right.svg"
              alt="next"
              width={36}
              height={36}
            />
          </button>
        )}
      </div>
    </div>
  );
}