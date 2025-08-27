import { List, ListOrdered, LayoutList } from "lucide-vue-next";
const SELECT_HEADING = {
  placeholder: "H",
  data: [
    {
      value: "1",
      label: "H1",
    },
    {
      value: "2",
      label: "H2",
    },
    {
      value: "3",
      label: "H3",
    },
    {
      value: "4",
      label: "H4",
    },
  ],
};
const SELECT_LIST = {
  placeholder: "List",
  data: [
    {
      value: "bulletList",
      label: "BulletList",
      icon: List,
    },
    {
      value: "orderedList",
      label: "OrderList",
      icon: ListOrdered,
    },
    {
      value: "tasklist",
      label: "Task List",
      icon: LayoutList,
    },
  ],
};
export { SELECT_HEADING, SELECT_LIST };
