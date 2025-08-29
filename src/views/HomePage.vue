<template>
  <div class="w-full space-y-4">
    <div class="flex justify-between items-center mt-2">
      <div class="flex gap-x-2">
        <div class="relative w-full max-w-sm items-center">
          <Input
            type="text"
            v-model="searchData"
            @update:model-value="onSearchData"
            placeholder="Search..."
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>
        <Select v-model="selectedSort">
          <SelectTrigger class="w-[180px] cursor-pointer">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="find_today">Today</SelectItem>
            <SelectItem value="find_week">Week</SelectItem>
          </SelectContent>
        </Select>
        <Button
          v-if="selectedSort"
          class="cursor-pointer rounded-sm"
          variant="destructive"
          @click="
            () => {
              selectedSort = '';
              onClearSearch(['sort_title', 'find_week', 'find_today']);
            }
          "
          >Clear</Button
        >
      </div>
      <Button @click="onCreate" size="sm" class="rounded-sm cursor-pointer"
        ><Plus /> Add Notes</Button
      >
    </div>
    <div class="w-full grid grid-cols-5 gap-2">
      <div
        v-for="(_, index) in Array.from({ length: 10 })"
        :key="index"
        v-if="isLoadingtasks"
      >
        <TaskCardLoading />
      </div>
      <div
        v-for="(data, i) in tasks_data?.tasks"
        :key="i"
        v-else-if="Number(tasks_data?.tasks.length) > 0"
      >
        <TaskCard
          :created_at="data.created_at"
          :updated_at="data.updated_at"
          :id="data.id"
          :title="data.title"
          :description="data.description"
        />
      </div>
      <div v-else class="w-full col-span-5 mt-20">
        <p
          class="text-5xl font-extrabold text-gray-300 uppercase flex justify-center items-center w-full"
        >
          No Notes
        </p>
      </div>
    </div>
    <CreateTask v-model:open="isCreate" />
  </div>
</template>

<script lang="ts" setup>
import TaskCard from "@/components/shared/TaskCard.vue";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-vue-next";
import CreateTask from "@/components/shared/CreateTask.vue";
import { ref } from "vue";
import { useQueryUserTasks } from "@/services";
import { useUserStore } from "@/store/auth";
import { useToast } from "vue-toast-notification";
import { useOnNavigate, useWatchQueryParams } from "@/hooks";
import TaskCardLoading from "@/components/shared/TaskCardLoading.vue";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

const { data: tasks_data, isFetching: isLoadingtasks } = useQueryUserTasks();
let isCreate = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const { onNavigate } = useOnNavigate();
let timeout = ref(0);
const user = useUserStore();
const toast = useToast();
const searchParams = useWatchQueryParams(["find_today", "find_week"]);

const selectedSort = ref<string>(searchParams.value || "");
const searchData = ref<string>((route?.query["title"] as string) || "");

const onCreate = () => {
  if (!user.current_user) {
    toast.error("Please Login first before you create notes");
  } else {
    isCreate.value = !isCreate.value;
  }
};

const onSearchData = (value: string | number) => {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    onNavigate({
      key: "title",
      value: value as string,
      keyRemove: ["find_week", "find_today"],
    });
  }, 500);
};

watch(selectedSort, (value: string) => {
  switch (value) {
    case "find_today":
      onNavigate({
        key: "find_today",
        value: "true",
        keyRemove: ["find_week", "title"],
      });
      break;
    case "find_week":
      onNavigate({
        key: "find_week",
        value: "true",
        keyRemove: ["find_today", "title"],
      });
      break;
  }
});

const onClearSearch = (key: string[]) => {
  let currentRoute = { ...route.query };
  key.forEach((v) => {
    delete currentRoute[v];
  });
  router.replace({ query: currentRoute });
};
</script>

<style></style>
