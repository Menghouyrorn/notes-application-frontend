import { computed } from "vue";
import { useRoute } from "vue-router";

export const useWatchQueryParams = (params: string[]) => {
  const route = useRoute();

  const search_params = computed(() => {
    return params
      .map((v) => `${v}=${route.query[v] || ""}`)
      .filter((param) => !param.includes("null"))
      .join("&");
  });

  return search_params;
};
