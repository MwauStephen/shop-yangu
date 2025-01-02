// a file for all api requests to the json server

// API request to get all shops
export const getAllShops = async () => {
  const res = await fetch("http://localhost:8001/shops");
  const data = await res.json();
  return data;
};

// api function to add a new shop
export const addShop = async (shop) => {
  const res = await fetch("http://localhost:8001/shops", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(shop),
  });

  const data = await res.json();
  return data;
};

// api function to update a shop
export const updateShop = async (shop) => {
  const res = await fetch(`http://localhost:8001/shops/${shop.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(shop),
  });

  const data = await res.json();
  return data;
};

// api function to delete a shop
export const deleteShop = async (id) => {
  const res = await fetch(`http://localhost:8001/shops/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};
