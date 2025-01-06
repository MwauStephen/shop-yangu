import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addShop,
  getAllShops,
  updateShop as updateShopApi,
  deleteShop as deleteShopApi,
} from "../_lib/apiServices";
import toast from "react-hot-toast";

// custom hooks for shops
export const useFetchShops = () => {
  const {
    data: { data: shops, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["shops"],
    queryFn: () => getAllShops(),
  });

  return { shops, error, isLoading, count };
};

export const useAddShop = () => {
  const queryClient = useQueryClient();
  const { mutate: addNewShop, isLoading } = useMutation({
    mutationFn: addShop,
    onSuccess: () => {
      toast.success("Shop added successfully");
      // invalidate the query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
    onError: (error) => {
      toast.error(`Shop could not be added.${error.message}`);
    },
  });
  return { addNewShop, isLoading };
};
export const useUpdateShop = () => {
  const queryClient = useQueryClient();

  const { mutate: updateShop, isLoading } = useMutation({
    mutationFn: ({ updateShopData, id }) => updateShopApi(updateShopData, id),
    onSuccess: () => {
      toast.success("Shop updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
    onError: (error) => {
      toast.error(`Shop could not be updated.${error.message}`);
    },
  });

  return { updateShop, isLoading };
};
export const useDeleteShop = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteShop, isLoading } = useMutation({
    mutationFn: (id) => deleteShopApi(id),
    onSuccess: () => {
      toast.success("Shop deleted successfully");
      // invalidate the query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
    onError: (error) => {
      toast.error(`Shop could not be deleted.${error.message}`);
    },
  });

  return { deleteShop, isLoading };
};
