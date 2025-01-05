import { toaster } from "@/components/ui/toaster";
import {
  addProduct,
  getAllProducts,
  updateProduct as updateProductApi,
} from "../_lib/apiServices";
import { useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries(["products"]);
      toaster.create({
        title: "Product added successfully",
        type: "success",
        placement: "top-center",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Product could not be added.${error.message}`,
        type: "error",
        placement: "top-center",
      });
    },
  });
  return { addNewProduct, isLoading };
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: ({ product, id }) => updateProductApi(product, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toaster.create({
        title: "Product updated successfully",
        type: "success",
        placement: "top-center",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Product could not be updated.${error.message}`,
        type: "error",
        placement: "top-center",
      });
    },
  });
  return { updateProduct, isLoading };
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isLoading } = useMutation({
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toaster.create({
        title: "Product deleted successfully",
        type: "success",
        placement: "top-center",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Product could not be deleted.${error.message}`,
        type: "error",
        placement: "top-center",
      });
    },
  });
  return { deleteProduct, isLoading };
};
