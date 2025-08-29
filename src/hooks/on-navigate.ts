import { useRoute, useRouter } from "vue-router";

interface NavigateProps {
  key: string;
  value: string;
  keyRemove?: string[];
}

export const useOnNavigate = () => {
  const route = useRoute();
  const router = useRouter();

  const onNavigate = ({ key, value, keyRemove }: NavigateProps) => {
    const query = { ...route.query };

    if (keyRemove && keyRemove.length > 0) {
      keyRemove.forEach((k) => delete query[k]);
    }
    query[key] = value;
    return router.replace({ query: query });
  };
  return { onNavigate };
};
