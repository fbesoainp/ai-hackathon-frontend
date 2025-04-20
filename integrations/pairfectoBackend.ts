export interface AccountInfo {
  name: string;
  email: string;
  picture: string;
}

export interface PartnerInfo {
  name: string;
  preferences: any;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  rating: number;
  user_ratings_total: number;
  explanation: string;
  website: string;
  photo_url: string;
}

export default class PairfectoBackendAPI {
  private URL: string = "http://localhost:8000";

  async getAccountInfo(): Promise<AccountInfo> {
    console.log("Fetching account info");
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      name: "John Doe",
      email: "",
      picture: "https://example.com/profile.jpg",
    };
  }

  async getPartner(): Promise<PartnerInfo | null> {
    // pass
    return null;
  }

  async createPartner(
    name: string,
    preferred_cuisines: string[],
    disliked_cuisines: string[],
    diets: string[],
    allergies: string[]
  ): Promise<void> {
    console.log("Creating partner with parameters:", {
      name,
      preferred_cuisines,
      disliked_cuisines,
      diets,
      allergies,
    });
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return null;
  }

  async postQuery(query: string): Promise<RestaurantInfo[]> {
    return null;
    
  }

	async verifyToken(): Promise<boolean> {
    return null;

	}
}
