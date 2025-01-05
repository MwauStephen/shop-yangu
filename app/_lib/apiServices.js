// api services for supabase
import supabase, { supabaseUrl } from "./supabase";

const shopImageUrl = `${supabaseUrl}/storage/v1/object/public/shop/`;
const productImageUrl = `${supabaseUrl}/storage/v1/object/public/product/`;

// 1.api function for selecting all shops
export const getAllShops = async () => {
  const { data, error } = await supabase.from("shops").select("*");
  if (error)
    throw new Error(`Shop details could not be fetched.${error.message}`);
  return data;
};

// 2.api function for adding a new shop
export const addShop = async (shop) => {
  // Checks if image is present in supabase upon adding
  const hasImagePath = shop.logo?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${shop.logo.name}`.replace(" /", "");
  const imagePath = hasImagePath
    ? shop.logo
    : `${supabaseUrl}/storage/v1/object/public/shops/${imageName}`;

  // 1.create a shop
  let query = supabase.from("shops");

  // 1a) Creates new shop
  query = query.insert([{ ...shop, logo: imagePath }]);

  const { data, error } = await query.select().single();

  console.log(data, "data from api function");

  if (error) {
    console.log(error);
    throw new Error("Shop could not be created");
  }

  // If image has already a path i.e image has been uploaded  return data
  if (hasImagePath) return data;

  // 2.Upload the cabin image
  const { error: storageError } = await supabase.storage
    .from("shops")
    .upload(imageName, shop.logo);

  // 3.Prevent a new shop from being created if there is an error uploading the image(Delete the shop)
  if (storageError) {
    await supabase.from("shops").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Shop image could not be uploaded and shop was not created"
    );
  }
  return data;
};

// 3.api function for updating a shop
export const updateShop = async (shop, id) => {
  // Checks if image is present in supabase upon editing
  const hasImagePath = shop.logo?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${shop.logo.name}`.replace(" /", "");
  const imagePath = hasImagePath
    ? shop.logo
    : `${supabaseUrl}/storage/v1/object/public/shops/${imageName}`;

  let query = supabase.from("shops");

  // 1b) edits shop
  if (id) {
    query = query
      .update({ ...shop, logo: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select();

  // console.log(data, "data from api function");

  if (error) {
    console.log(error);
    throw new Error("Shop could not be updated");
  }

  // If image has already a path i.e image has been uploaded  return data
  if (hasImagePath) return data;

  // 2.Upload the cabin image
  const { error: storageError } = await supabase.storage
    .from("shops")
    .upload(imageName, shop.logo);

  // 3.Prevent a new cabin from being created if there is an error uploading the image(Delete the cabin)
  if (storageError) {
    await supabase.from("shops").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Shop image could not be uploaded and shop was not created"
    );
  }
  return data;
};
// 4.api function for deleting a shop

export const deleteShop = async (id) => {
  const { data, error } = await supabase.from("shops").delete().eq("id", id);
  if (error) throw new Error(`Shop could not be deleted.${error.message}`);
  return data;
};

// 1.api function for selecting all products
export const getAllProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error)
    throw new Error(`Product details couldn't be fetched.${error.message}`);
  return data;
};
// 2.api function for adding a new product
export const addProduct = async (product) => {
  // 1.Extract shop name from product data since it is not needed in the product table but we need the shop id
  const { shopName, ...extractedProductData } = product;

  // query shop table to get the shop id
  const { data: shopData, error: shopError } = await supabase
    .from("shops")
    .select("*")
    .eq("shopName", shopName)
    .single();

  if (shopError)
    throw new Error(`Shop details couldn't be fetched.${shopError.message}`);

  // get shop id
  const shopId = shopData.id;

  // Checks if image is present in supabase upon adding
  const hasImagePath = extractedProductData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${
    extractedProductData.image.name
  }`.replace(" /", "");
  const imagePath = hasImagePath
    ? extractedProductData.image
    : `${supabaseUrl}/storage/v1/object/public/products/${imageName}`;

  // 1.create a shop
  let query = supabase.from("products");

  // 1a) Creates new shop
  query = query.insert([{ ...extractedProductData, image: imagePath, shopId }]);

  const { data, error } = await query.select().single();

  console.log(data, "data from api function");

  if (error) {
    console.log(error);
    throw new Error("Products could not be created");
  }

  // If image has already a path i.e image has been uploaded  return data
  if (hasImagePath) return data;

  // 2.Upload the product image
  const { error: storageError } = await supabase.storage
    .from("products")
    .upload(imageName, extractedProductData.image);

  // 3.Prevent a new product from being created if there is an error uploading the image(Delete the shop)
  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Product image could not be uploaded and product was not created"
    );
  }
  return data;
};
// 3.api function for updating a product
export const updateProduct = async (product, id) => {
  // 1.Extract shop name from product data since it is not needed in the product table but we need the shop id
  const { shopName, ...extractedProductData } = product;

  // query shop table to get the shop id
  const { data: shopData, error: shopError } = await supabase
    .from("shops")
    .select("*")
    .eq("shopName", shopName)
    .single();

  if (shopError)
    throw new Error(`Shop details couldn't be fetched.${shopError.message}`);

  // get shop id
  const shopId = shopData.id;

  // Checks if image is present in supabase upon editing
  const hasImagePath = extractedProductData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${
    extractedProductData.image.name
  }`.replace(" /", "");
  const imagePath = hasImagePath
    ? extractedProductData.image
    : `${supabaseUrl}/storage/v1/object/public/products/${imageName}`;

  let query = supabase.from("products");

  // 1b) edits shop
  if (id) {
    query = query
      .update({ ...extractedProductData, image: imagePath, shopId })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  console.log(data, "data from update api function");

  if (error) {
    console.log(error);
    throw new Error("Product could not be updated");
  }

  // If image has already a path i.e image has been uploaded  return data
  if (hasImagePath) return data;

  // 2.Upload the cabin image
  const { error: storageError } = await supabase.storage
    .from("products")
    .upload(imageName, extractedProductData.image);

  // 3.Prevent a new product from being created if there is an error uploading the image(Delete the product)
  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Product image could not be uploaded and product was not created"
    );
  }
  return data;
};
// 4.api function for deleting a product
export const deleteProduct = async (id) => {
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
