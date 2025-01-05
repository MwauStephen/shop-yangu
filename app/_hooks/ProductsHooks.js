import {
  addProduct,
  getAllProducts,
  deleteProduct as deleteProductApi,
  updateProduct as updateProductApi,
} from "../_lib/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// all products custom hooks
export const useFetchProducts = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
  return { products, error, isLoading };
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
