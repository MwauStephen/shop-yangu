// api services for supabase
import supabase, { supabaseUrl } from "./supabase";

const shopImageUrl = `${supabaseUrl}/storage/v1/object/public/shop/`;
const productImageUrl = `${supabaseUrl}/storage/v1/object/public/product/`;

// 1.api function for selecting all shops
export const getAllShops = async () => {
  const { data, error } = await supabase.from("shops").select("*");
  if (error)
    throw new Error(`Shop details could not be fetched: ${error.message}`);
  return data;
};

// 2.api function for adding a new shop
export const addShop = async (shop) => {
  const { data, error } = await supabase
    .from("shops")
    .insert([{ ...shop, logo: shop.shopImageUrl }]);
  if (error) throw new Error(error.message);
  return data;
};

// 3.api function for updating a shop
export const updateShop = async (shop) => {
  const { data, error } = await supabase
    .from("shops")
    .update(shop)
    .eq({ id: shop.id });
  if (error) throw new Error(error.message);
  return data;
};

// 4.api function for deleting a shop
export const deleteShop = async (id) => {
  const { data, error } = await supabase.from("shops").delete().eq({ id });
  if (error) throw new Error(error.message);
  return data;
};

// 1.api function for selecting all products
export const getAllProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error(error.message);
  return data;
};
// 2.api function for adding a new product
export const addProduct = async (product) => {
  const { data, error } = await supabase.from("products").insert([product]);
  if (error) throw new Error(error.message);
  return data;
};
// 3.api function for updating a product
export const updateProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq({ id: product.id });
  if (error) throw new Error(error.message);
  return data;
};
// 4.api function for deleting a product
export const deleteProduct = async (id) => {
  const { data, error } = await supabase.from("products").delete().eq({ id });
  if (error) throw new Error(error.message);
  return data;
};
