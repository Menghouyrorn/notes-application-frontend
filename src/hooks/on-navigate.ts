import { useRoute, useRouter } from "vue-router";

interface NavigateProps {
  key: string;
  value: string;
}

export const onNavigate = ({ key, value }: NavigateProps) => {
  const route = useRoute();
  const router = useRouter();
  const query = { ...route.query };
  query[key] = value;
  return router.replace({ query: query });
};
