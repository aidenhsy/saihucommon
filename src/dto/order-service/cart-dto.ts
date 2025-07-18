export interface CartItemDto {
  item_id: string;
  name: string;
  price: string;
  unit_name: string;
  big_pic_url: string;
  qty: number;
}

export interface CartDataDto {
  total_qty: number;
  total_price: number;
  items: CartItemDto[];
}
