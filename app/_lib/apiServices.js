// api services for supabase
import { ITEMS_PER_PAGE } from "../_utils/constants";
import supabase, { supabaseUrl } from "./supabase";

const shopImageUrl = `${supabaseUrl}/storage/v1/object/public/shop/`;
const productImageUrl = `${supabaseUrl}/storage/v1/object/public/product/`;

// 1b.api function for selecting all shops with operations(filter and pagination)
export const getAllShops = async (page = 1) => {
  let query = supabase.from("shops").select("*", { count: "exact" });

  // pagination logic(server side pagination)
  if (page) {
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error)
    throw new Error(`Shop details could not be fetched.${error.message}`);

  return { data, count };
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
  query = query.insert([{ ...shop, logo: imagePath, shopStatus: "Inactive" }]);

  const { data, error } = await query.select().single();

  // console.log(data, "data from api function");

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

// 4b.api function for deleting a shop by first checking if it has associated products
export const deleteShop = async (id) => {
  // Check if the shop has active products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id")
    .eq("shopId", id);

  if (productsError) {
    throw new Error(`Could not check shop products. ${productsError.message}`);
  }

  if (products.length > 0) {
    throw new Error(
      "Cannot delete shop with active products. Please re-assign those products to another shop."
    );
  }

  // Proceed with the deletion if no active products
  const { data, error } = await supabase.from("shops").delete().eq("id", id);
  if (error) {
    throw new Error(`Shop could not be deleted. ${error.message}`);
  }
  return data;
};

// 1b.api function for selecting all products with operations(filter and pagination)
export const getAllProducts = async (page = 1) => {
  let query = supabase.from("products").select("*", { count: "exact" });

  // pagination logic(server side pagination)
  if (page) {
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error)
    throw new Error(`Product details couldn't be fetched.${error.message}`);

  return { data, count };
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

  // console.log(data, "data from api function");

  if (error) {
    console.log(error);
    throw new Error("Products could not be created");
  }

  // Update the shop status to "Active" after assinging/adding a product to it
  const { error: shopStatusError } = await supabase
    .from("shops")
    .update({ shopStatus: "Active" })
    .eq("id", shopId);

  if (shopStatusError) {
    throw new Error(`Shop status could not be updated. ${shopError.message}`);
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

  // console.log(data, "data from update api function");

  if (error) {
    console.log(error);
    throw new Error("Product could not be updated");
  }

  // If image has already a path i.e image has been uploaded  return data
  // if (hasImagePath) return data;
  if (hasImagePath) {
    // Update the shop status to "Active"
    const { error: shopStatusError } = await supabase
      .from("shops")
      .update({ shopStatus: "Active" })
      .eq("id", shopId);

    if (shopStatusError) {
      throw new Error(
        `Shop status could not be updated. ${shopStatusError.message}`
      );
    }
  }
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

// 4b.Update the deleteProduct Function to Change the shopStatus to "Inactive" if No Products Remain
export const deleteProduct = async (id) => {
  // Get the shopId of the product to be deleted
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("shopId")
    .eq("id", id)
    .single();

  if (productError) {
    throw new Error(`Could not find product. ${productError.message}`);
  }

  // Delete the product
  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(`Product could not be deleted. ${error.message}`);
  }

  // Check if the shop has any remaining products
  const { data: remainingProducts, error: remainingProductsError } =
    await supabase.from("products").select("id").eq("shopId", product.shopId);

  if (remainingProductsError) {
    throw new Error(
      `Could not check remaining products. ${remainingProductsError.message}`
    );
  }

  if (remainingProducts.length === 0) {
    // Update the shop status to "Inactive"
    const { error: shopError } = await supabase
      .from("shops")
      .update({ shopStatus: "Inactive" })
      .eq("id", product.shopId);

    if (shopError) {
      throw new Error(`Shop status could not be updated. ${shopError.message}`);
    }
  }

  return data;
};

// 5.api function for product stats summary
export const getProductSummary = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error)
    throw new Error(`Product details couldn't be fetched. ${error.message}`);

  // calculate the total value of all products(price *stock level)
  const totalValue = data.reduce((acc, product) => {
    const productValue = product.price * product.stockLevel;
    return acc + productValue;
  }, 0);

  // console.log(totalValue, "total value from api function");

  // caluclate total stock level (sum of all stock levels)
  const totalStockLevel = data.reduce((acc, product) => {
    return acc + product.stockLevel;
  }, 0);

  // console.log(totalStockLevel, "total stock level from api function");

  return { totalValue, totalStockLevel };
};

// 6.api function for calculating the total stock stats
export const getStockStatus = async () => {
  // fetch data from products and shops table
  const { data, error } = await supabase
    .from("products")
    .select("*,shops(shopName)")
    .order("stockLevel", { ascending: false });

  if (error)
    throw new Error(`Product details couldn't be fetched. ${error.message}`);
  // Calculate stock status distribution
  const stockStatusDistribution = {
    instock: 0,
    outOfStock: 0,
    lowStock: 0,
  };

  // Initialize Shop Stock Levels: An object that will store the total stock level for each shop.
  const shopStockLevels = {};

  // loop through the products data
  data.forEach((product) => {
    if (product.stockLevel > 5) {
      stockStatusDistribution.instock += 1;
    } else if (product.stockLevel === 0) {
      stockStatusDistribution.outOfStock += 1;
    } else {
      stockStatusDistribution.lowStock += 1;
    }

    // For each product, the shopStockLevels object is updated to include the shopName and accumulate the totalStock for each shop.
    if (!shopStockLevels[product.shopId]) {
      shopStockLevels[product.shopId] = {
        shopName: product.shops.shopName,
        totalStock: 0,
      };
      shopStockLevels[product.shopId].totalStock += product.stockLevel;
    }
  });
  // console.log(stockStatusDistribution, "stock distribution from api function");
  // Get top 5 shops by stock level
  const topShops = Object.values(shopStockLevels)
    .sort((a, b) => b.totalStock - a.totalStock)
    .slice(0, 5);

  return { stockStatusDistribution, topShops };
};
