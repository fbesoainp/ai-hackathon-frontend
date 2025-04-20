"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ArrowLeft from "@/assets/icons/arrow-left.svg";

export default function RestaurantResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const initialResults = [
    {
      name: "Restaurant 1",
      photos: [
        "https://resizer.otstatic.com/v2/photos/xlarge/2/72607942.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj6GvKhRfoMZY25z3FK2j_mA5Vj-_hzo-3pg&s",
        "https://images.squarespace-cdn.com/content/v1/553fce79e4b003bef702d42a/1430433772679-5PTAVEAMPI3NPBDY9PN9/hero_wLogo.jpg?format=2500w",
        "https://images.squarespace-cdn.com/content/v1/553fce79e4b003bef702d42a/1430433772679-5PTAVEAMPI3NPBDY9PN9/hero_wLogo.jpg?format=2500w"
        ],
        "rating": 4.5,
        "total_reviews": 120,
        "price": "$$",
        "tag": "Italian",
        "tags": ["American", "Modern", "Live music"],
        "location": "123 Main St, Cityville",
        "summary": "A cozy Italian restaurant known for its homemade pasta and romantic ambiance.",
        "description": "This restaurant matches stacy's taste perfectly! It's a great spot for a romantic dinner.",
        "review_summary": "People love the pasta and the ambiance. It's a great place for a date night.",
        "opening_hours": ["9:30", "20:00"],
    },
    {
      name: "Restaurant 2",
      photos: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj6GvKhRfoMZY25z3FK2j_mA5Vj-_hzo-3pg&s",
        "https://resizer.otstatic.com/v2/photos/xlarge/2/72607942.webp",
        "https://images.squarespace-cdn.com/content/v1/553fce79e4b003bef702d42a/1430433772679-5PTAVEAMPI3NPBDY9PN9/hero_wLogo.jpg?format=2500w"
        ],
        "rating": 4.8,
        "price": "$$$",
        "tag": "Japanese",
        "tags": ["Sushi", "Sashimi", "Japanese"],
        "location": "456 Elm St, Cityville",
        "summary": "A modern sushi bar offering a wide variety of fresh sushi and sashimi.",
        "description": "Stacy will love this place! It's a great spot for sushi lovers.",
        "review_summary": "The sushi is fresh and the atmosphere is modern. Perfect for sushi lovers.",
        "opening_hours": ["9:30", "21:00"],
    },
    {
      name: "Restaurant 3",
      photos: [
          "https://images.squarespace-cdn.com/content/v1/553fce79e4b003bef702d42a/1430433772679-5PTAVEAMPI3NPBDY9PN9/hero_wLogo.jpg?format=2500w",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj6GvKhRfoMZY25z3FK2j_mA5Vj-_hzo-3pg&s",
          "https://resizer.otstatic.com/v2/photos/xlarge/2/72607942.webp",
        ],
        "rating": 4.2,
        "price": "$",
        "tag": "Dessert",
        "tags": ["Desserts", "Cakes", "Pastries"],
        "location": "789 Oak St, Cityville",
        "summary": "A charming bakery known for its delicious cakes and pastries.",
        "description": "Stacy likes desserts, so this place is a must-visit! It's perfect for a sweet treat.",
        "review_summary": "The cakes are delicious and the pastries are to die for. A must-visit for dessert lovers.",
        "opening_hours": ["9:30", "21:00"],

    },
    {
        name: "Restaurant 4",
        photos: [
            "https://resizer.otstatic.com/v2/photos/xlarge/2/72607942.webp",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj6GvKhRfoMZY25z3FK2j_mA5Vj-_hzo-3pg&s",
            "https://images.squarespace-cdn.com/content/v1/553fce79e4b003bef702d42a/1430433772679-5PTAVEAMPI3NPBDY9PN9/hero_wLogo.jpg?format=2500w"
            ],
        "rating": 4.7,
        "price": "$$",
        "tag": "Mexican",
        "tags": ["Tacos", "Burritos", "Mexican"],
        "location": "321 Pine St, Cityville",
        "summary": "A vibrant Mexican restaurant with a lively atmosphere and delicious tacos.",
        "description": "Stacy loves Mexican food, so this place is a perfect match! It's great for a fun night out.",
        "review_summary": "The tacos are amazing and the atmosphere is lively. A great spot for a fun night out.",
        "opening_hours": ["9:30", "21:00"],
    }
  ]

  const [query, setQuery] = useState(initialQuery);
  const [restaurants, setRestaurants] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuerySubmit = () => {
    // Placeholder: should trigger API call in logic version
    console.log("Searching for:", query);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    router.push(`/query?input=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center py-8 p-3">
            <button onClick={handleBack}>
                <Image src="/icons/arrow-back.svg" alt="Back" width={35} height={35} />
            </button>
            <input
                type="text"
                placeholder="Click to type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuerySubmit()}
                className="bg-white text-black rounded-full w-[21rem] h-[3rem] px-6 pr-[3.5rem] py-2 text-[1rem]"
            />
            </div>
            <div className="h-[0.03125rem] w-full bg-[#838383] mb-2"/>
            <div className="flex flex-col items-center w-full max-w-[400px] max-h-[700px] overflow-y-auto">
                {!isLoading ? (
                <div className="flex flex-col gap-5">
                    {restaurants.map((restaurant, index: number) => (
                    <div
                        key={index}
                        className="max-w-[350px] bg-white/95 text-black p-4 rounded-[0.625rem]"
                    >
                        <div className="flex items-center flex-row gap-4 mb-2 overflow-x-auto">
                            {restaurant.photos.map((photo, index) => (
                            <Image
                                key={index}
                                src={photo}
                                alt={restaurant.name}
                                width={100}
                                height={100}
                                className="rounded-lg w-[100px] h-[100px] object-cover"
                            />
                            ))}
                        </div>
                        <h3 className="text-lg font-medium mb-1">{restaurant.name}</h3>
                        <p className="text-sm text-black-600">{restaurant.rating}/5.0・{restaurant.price}・{restaurant.tag}</p>
                        {(() => {
                            const now = new Date();
                            const currentMinutes = now.getHours() * 60 + now.getMinutes();
                            const [closeHourStr, closeMinStr] = restaurant.opening_hours?.[1]?.split(":") || [];
                            const closingMinutes = parseInt(closeHourStr) * 60 + parseInt(closeMinStr);
                            const isOpen = currentMinutes < closingMinutes;

                            return (
                                <div className="flex flex-row justify-start items-center">
                                    <p className={`text-sm font-bold ${isOpen ? "text-green-700" : "text-red-700"}`}>
                                    {isOpen ? "Open" : "Closed"}
                                    </p>
                                    <p className="text-sm">
                                    ・{isOpen ? "Closes at " + restaurant.opening_hours?.[1] : "Opens at " + restaurant.opening_hours?.[0]}
                                    </p>
                                </div>
                            );
                        })()}
                        <div className="flex flex-row gap-2 justify-start items-center">
                            <Image
                                src="/icons/star.svg"
                                alt="star"
                                width={3}
                                height={3}
                                className="w-3 h-3"
                            />
                            <p className="text-sm text-gray-600">{restaurant.summary || "Summary not available"}</p>
                        </div>
                        <div className="flex flex-row gap-2 justify-start items-center pt-2">
                            {restaurant.tags.map((tag, index) => (
                            <div
                                key={index}
                                className="border border-[#D9D9D9] bg-white rounded-[3.125rem] p-2 text-sm font-medium tracking-[0.0175rem] leading-normal"
                            >
                                {tag}
                            </div>
                            ))}
                        </div>                        
                    </div>
                    ))}
                </div>
                ) : (
                <div className="flex justify-center items-center h-[200px]">
                    <div className="w-[35px] h-[35px] border-4 border-t-white border-white/20 rounded-full animate-spin" />
                </div>
                )}
            </div>
        </div> 
    </div>
    );
}
