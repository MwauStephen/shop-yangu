import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addShop,
  getAllShops,
  updateShop as updateShopApi,
  deleteShop as deleteShopApi,
} from "../_lib/apiServices";
import { toaster } from "@/components/ui/toaster";

// custom hooks for shops
export const useFetchShops = () => {
  const {
    data: shops,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["shops"],
    queryFn: () => getAllShops(),
  });

  return { shops, error, isLoading };
};

export const useAddShop = () => {
  const queryClient = useQueryClient();
  const { mutate: addNewShop, isLoading } = useMutation({
    mutationFn: (shop) => addShop(shop),
    onSuccess: () => {
      // invalidate the query to refetch the data
      queryClient.invalidateQueries(["shops"]);
      toaster.create({
        title: "Shop added successfully",
        type: "success",
        placement: "top-center",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Shop could not be added.${error.message}`,
        type: "error",
        placement: "top-center",
      });
    },
  });
  return { addNewShop, isLoading };
};
export const useUpdateShop = () => {
  const queryClient = useQueryClient();
  const { mutate: updateShop, isLoading } = useMutation({
    mutationFn: ({ shop, id }) => updateShopApi(shop, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["shops"]);
      toaster.create({
        title: "Shop updated successfully",
        type: "success",
        placement: "top-center",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Shop could not be updated.${error.message}`,
        type: "error",
        placement: "top-center",
      });
    },
  });

  return { updateShop, isLoading };
};
export const useDeleteShop = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteShop, isLoading } = useMutation({
    mutationFn: (id) => deleteShopApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["shops"]);
      toaster.create({
        title: "Shop deleted successfully",
        type: "success",
        placement: "top-center",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Shop could not be deleted.${error.message}`,
        type: "error",
        placement: "top-center",
      });
    },
  });

  return { deleteShop, isLoading };
};
