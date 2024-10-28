export type TService = {
  name: string;
  description: string;
  review: {
    total: number;
    rating: number;
  };
  price: number;
  duration: number;
  imageUrl: string;
  isDeleted: boolean;
};
