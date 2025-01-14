import {
  addProduct,
  getAllProducts,
  deleteProduct as deleteProductApi,
  updateProduct as updateProductApi,
  getProductSummary,
  getStockStatus,
} from "../_lib/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

// all products custom hooks
export const useFetchProducts = (page) => {
  const [currentPage, setCurrentPage] = useState(page);
  const {
    data: { data: products, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getAllProducts(currentPage),
  });
  return { products, error, isLoading, count, currentPage, setCurrentPage };
};
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: addNewProduct, isLoading } = useMutation({
    mutationFn: (product) => addProduct(product),
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(`Product could not be added.${error.message}`);
    },
  });
  return { addNewProduct, isLoading };
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: ({ updateProductData, id }) =>
      updateProductApi(updateProductData, id),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(`Product could not be updated.${error.message}`);
    },
  });
  return { updateProduct, isLoading };
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isLoading } = useMutation({
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(`Product could not be deleted.${error.message}`);
    },
  });
  return { deleteProduct, isLoading };
};

export const useProductSummary = () => {
  const { data, error } = useQuery({
    queryKey: ["productSummary"],
    queryFn: getProductSummary,
  });
  // console.log(data);
  // const { totalValue, totalStockLevel } = data;
  // const { totalValue = 0, totalStockLevel = 0 } = data;
  // return { totalValue, totalStockLevel, error };
  return { data, error };
};

export const useFetchStockStatus = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["stockStatus"],
    queryFn: getStockStatus,
  });

  return { data, error, isLoading };
};
