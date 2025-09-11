import type { ResponseKey } from "@/types";
import { useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";

interface OnHandleQuery {
  queryKey?: string[];
  type?: ResponseKey;
  onSuccess?: () => void;
}

export const useOnhandleQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const onSuccess = ({ queryKey, type, onSuccess }: OnHandleQuery) => {
    onSuccess?.();
    queryClient.invalidateQueries({ queryKey });
    toast.success(`${type} Successfully`);
  };

  const onError = ({ type }: OnHandleQuery) => {
    toast.error(`${type} Error Please try again!`);
  };
  return { onSuccess, onError };
};
