import { User } from "firebase/auth";
export interface AccountInfo {
  preferences: any;
}

export interface PartnerInfo {
  name: string;
  preferences: any;
}

export interface RestaurantInfo {
  name: string;
  photos: string[];
  location: string;
  rating: number;
  total_reviews: number;
  tags: string[];
  tag: string;
  summary: string;
  description: string;
  review_summary: string;
}

export default class PairfectoBackendAPI {
  private URL: string = "https://pairfecto.tatanpoker09.com";

  async getAccountInfo(user: User): Promise<AccountInfo> {
    console.log("Fetching account info");
    // Simulate a network request
    const response = await fetch(`${this.URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "uid": user.uid,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch account info");
    }
    const data = await response.json();
    console.log("Account info response:", data);
    return {
      preferences: data.preferences,
    };
  }

  async updatePreferences(
    user: User,
    name: string,
    parter_preferred_cuisines: string[],
    parter_diets: string[],
    user_preferred_cuisines: string[],
    user_diets: string[],
  ): Promise<void> {
    console.log("Updating parameters:", {
      name,
      parter_preferred_cuisines,
      parter_diets,
      user_preferred_cuisines,
      user_diets,
    });
    // Simulate a network request
    const response = await fetch(`${this.URL}/user/prefs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "uid": user.uid,
      },
      body: JSON.stringify({
        name,
        user: {
          cuisines: user_preferred_cuisines,
          diets: user_diets,
          budget: "",
          atmosphere: [],
        },
        partner: {
          cuisines: parter_preferred_cuisines,
          diets: parter_diets,
          budget: "",
          atmosphere: [],
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update preferences");
    }
  }

  async submitQuery(user: User, query: string): Promise<RestaurantInfo[]> {
    console.log("Submitting query:", query);
    // Simulate a network request
    const response = await fetch(`${this.URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "uid": user.uid,
      },
      body: JSON.stringify({ text: query }),
    });

    console.log(user.uid);

    if (!response.ok) {
      throw new Error("Failed to submit query");
    }
    const data = await response.json();
    console.log("Query response:", data);
    return data.results;
    
  }
}
