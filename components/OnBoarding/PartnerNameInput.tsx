"use client";

interface PartnerNameInputProps {
  nameInput: string;
  setName: (name: string) => void;
}

export default function PartnerNameInput({ nameInput, setName }: PartnerNameInputProps) {
  return (
    <div className="flex flex-col justify-center items-center w-100">
      <div className="flex flex-col items-start gap-4 mb-7">
        <h2 className="text-white text-4xl font-semibold leading-[120%] tracking-[-0.01875rem] ml-5 mr-5">
          What’s your partner’s first name?
        </h2>
      </div>
      <div className="w-85 ml-5 mr-5 flex-row h-[4.3rem] px-[1.25rem] py-[0.75rem] flex justify-between items-center self-stretch border border-white opacity-80 rounded-[0.625rem]">
        <input
          type="text"
          className="bg-transparent text-white text-base font-normal leading-[100%] placeholder:text-[#D9D9D9] focus:outline-none"
          placeholder="Stacie"
          value={nameInput}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
}
