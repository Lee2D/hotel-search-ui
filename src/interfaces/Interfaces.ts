export interface Room {
    id: number;
    hotel_id: number;
    type_name: string;
    price_per_person: number;
    max_people: number;
    num_rooms_available: number;
    photos: string[];
  }
  
  export interface Photo {
    id: number;
    hotelId: number;
    url: string;
  }

  export interface RoomCombination {
    roomTypeCounts: number;
    totalPrice: number;
  }
  
  export interface Hotel {
    id: number;
    name: string;
    stars: number;
    city: string;
    address: string;
    photos: Photo[];
    roomTypes: Room[];
    combinations: RoomCombination[];
  }
  