export interface ActiveMenuResDto {
  id: number;
  name: string;
  items: FoodItemDto[];
}

export interface FoodItemDto {
  id: number;
  name: string;
  price: string;
  unit_name: string;
  big_pic_url: string;
  category_id: number;
}
