"use client";

interface Item {
  name: string;
  isSelected: boolean;
}

interface PreferencesListProps {
  title: string;
  subTitle?: string;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function PreferencesList({ title, subTitle, items, setItems }: PreferencesListProps) {
  const toggleSelectItem = (itemName: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.name === itemName ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-100">
      <div className="flex flex-col items-start gap-4 mb-7">
        <h2 className="text-white text-4xl font-semibold leading-[120%] tracking-[-0.01875rem] ml-5 mr-5">
          {title}
        </h2>
        {subTitle && (
          <p className="text-white font-light leading-normal tracking-[0.0175rem] ml-5 mr-5">
            {subTitle}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5 items-start overflow-y-auto pr-6" style={{ maxHeight: "25rem" }}>
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => toggleSelectItem(item.name)}
            className="w-80 ml-5 flex-row h-[4.3rem] px-[1.25rem] py-[0.75rem] flex justify-between items-center self-stretch border border-white opacity-80 rounded-[0.625rem]"
          >
            <span className="text-white text-base font-normal leading-[100%]">
              {item.name}
            </span>
            <div
              className={`w-[1.5rem] h-[1.5rem] border border-white opacity-80 rounded-[0.2rem] ${
                item.isSelected ? "bg-white" : ""
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
}
