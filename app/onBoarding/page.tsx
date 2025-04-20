"use client";

import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import PreferencesList from "@/components/OnBoarding/PreferencesList";
import ProgressBar from "@/components/OnBoarding/ProgressBar";
import PartnerNameInput from "@/components/OnBoarding/PartnerNameInput";
import CuisineTypes from "@/constants/CuisineTypes";
import DietTypes from "@/constants/DietTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PairfectoBackendAPI from "@/integrations/pairfectoBackend";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/integrations/firebase";
import { User } from "firebase/auth";


const CarouselSteps = {
  PartnerName: "PartnerName",
  CuisinePreferences: "CuisinePreferences",
  DietPreferences: "DietPreferences",
};

const cuisinePreferences = CuisineTypes.map((cuisine) => ({
  name: cuisine,
  isSelected: false,
}));
const dietPreferences = DietTypes.map((diet) => ({
  name: diet,
  isSelected: false,
}));

export default function Preferences() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [partnerName, setPartnerName] = useState("");

  const [userCuisinePreferences, setUserCuisinePreferences] = useState(
    cuisinePreferences
  );
  const [parterCuisinePreferences, setParterCuisinePreferences] = useState(
    cuisinePreferences
  );
  const [userDietPreferences, setUserDietPreferences] = useState(
    dietPreferences
  );
  const [parterDietPreferences, setPartnerDietPreferences] = useState(
    dietPreferences
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const pairfectoBackend = new PairfectoBackendAPI();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const steps = useMemo(
    () => [
      { type: CarouselSteps.PartnerName },
      {
        title: "What are your favorite cuisines?",
        subTitle: "Do your best. We’ll take care of the rest.",
        items: userCuisinePreferences,
        setItems: setUserCuisinePreferences,
        type: CarouselSteps.CuisinePreferences,
      },
      {
        title: "What are your partner’s favorite cuisines?",
        subTitle: "Do your best. We’ll take care of the rest.",
        items: parterCuisinePreferences,
        setItems: setParterCuisinePreferences,
        type: CarouselSteps.CuisinePreferences,
      },
      {
        title: "What are your diets?",
        subTitle: "Do your best. We’ll take care of the rest.",
        items: userDietPreferences,
        setItems: setUserDietPreferences,
        type: CarouselSteps.DietPreferences,
      },
      {
        title: "What are your partner’s diets?",
        subTitle: "Do your best. We’ll take care of the rest.",
        items: parterDietPreferences,
        setItems: setPartnerDietPreferences,
        type: CarouselSteps.DietPreferences,
      },
    ],
    [
      userCuisinePreferences,
      parterCuisinePreferences,
      userDietPreferences,
      parterDietPreferences,
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  const handleNext = async () => {
    if (!emblaApi) return;
    if (selectedIndex === steps.length - 1) {
      await submitPreferences();
      router.push("/onBoarding/Finish");
    } else {
      emblaApi.scrollNext();
    }
  };

  const handlePrevious = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  };

  const submitPreferences = async () => {
    try {
      await pairfectoBackend.updatePreferences(
        currentUser!,
        partnerName,
        parterCuisinePreferences
          .filter((c) => c.isSelected)
          .map((c) => c.name),
        parterDietPreferences
          .filter((d) => d.isSelected)
          .map((d) => d.name),
        userCuisinePreferences
          .filter((c) => c.isSelected)
          .map((c) => c.name),
        userDietPreferences
          .filter((d) => d.isSelected)
          .map((d) => d.name),
      );
      router.push("/onBoarding/Finish");
    } catch (err) {
      console.error("Error submitting preferences:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 h-screen">
      <ProgressBar progress={((selectedIndex + 1) / steps.length) * 100} />
      <div className="overflow-hidden w-full max-w-[400px] h-[600px] mt-12" ref={emblaRef}>
        <div className="flex">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              {step.type === CarouselSteps.PartnerName ? (
                <PartnerNameInput
                  nameInput={partnerName}
                  setName={setPartnerName}
                />
              ) : (
                <PreferencesList
                  title={step.title!}
                  subTitle={step.subTitle!}
                  items={step.items!}
                  setItems={step.setItems!}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center w-90 mt-16">
        {selectedIndex > 0 ? (
          <button onClick={handlePrevious}>
            <Image
                src="/icons/arrow-left.svg"
                alt="next"
                width={36}
                height={36}
            />
          </button>
        ) : (
          <div className="w-[40px]" />
        )}
        <button onClick={handleNext}>
          <Image
            src="/icons/arrow-right.svg"
            alt="next"
            width={36}
            height={36}
        />
        </button>
      </div>
    </div>
  );
}
