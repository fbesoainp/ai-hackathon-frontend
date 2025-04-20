"use client";

import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const handleRedirection = () => {
    router.push("/query");
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <div className="h-[35vh]" />
      <div className="h-[50vh] flex flex-col justify-between items-center">
        <div className="flex flex-col items-start gap-[0.875rem] w-90">
          <h1 className="text-[2.5rem] font-normal leading-[2.5rem] tracking-[-0.01875rem]">
            Splendid!
          </h1>
          <p className="text-[1rem] font-light leading-normal tracking-[0.0175rem]">
            No worries, you can adjust both of your settings anytime in your
            profile settings.
          </p>
        </div>

        <button
          onClick={handleRedirection}
          className="bg-black rounded-[0.625rem] w-90 h-[4.5rem] flex items-center justify-center mt-[5rem] "
        >
          <span className="text-[#D9D9D9] text-[16px] font-bold">
            Let’s get started!
          </span>
        </button>
      </div>
    </div>
  );
}
