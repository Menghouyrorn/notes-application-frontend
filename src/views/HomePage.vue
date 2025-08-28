<template>
  <div class="w-full space-y-4">
    <div class="flex justify-between items-center mt-2">
      <div class="flex gap-x-2">
        <div class="relative w-full max-w-sm items-center">
          <Input type="text" placeholder="Search..." class="pl-10" />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-4 text-muted-foreground" />
          </span>
        </div>
        <Select>
          <SelectTrigger class="w-[180px] cursor-pointer">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="month">Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button @click="onCreate" size="sm" class="rounded-sm cursor-pointer"
        ><Plus /> Add Notes</Button
      >
    </div>
    <div class="w-full grid grid-cols-5 gap-2">
      <div
        v-for="(data, i) in tasks_data?.tasks"
        :key="i"
        v-if="tasks_data?.tasks"
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

const { data: tasks_data, isLoading: isLoadingtasks } = useQueryUserTasks();
let isCreate = ref<boolean>(false);
const user = useUserStore();
const toast = useToast();

const onCreate = () => {
  if (!user.current_user) {
    toast.error("Please Login first before you create notes");
  } else {
    isCreate.value = !isCreate.value;
  }
};
</script>

<style></style>
