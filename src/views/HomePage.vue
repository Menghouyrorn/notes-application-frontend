<template>
  <div class="w-full space-y-4">
    <div class="flex justify-between items-center mt-2">
      <div class="flex gap-x-2">
        <Input placeholder="Search..." />
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
      <div v-for="_ in Array.from({ length: 10 })">
        <TaskCard />
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
import { Plus } from "lucide-vue-next";
import CreateTask from "@/components/shared/CreateTask.vue";
import { ref } from "vue";

let isCreate = ref<boolean>(false);

const onCreate = () => {
  isCreate.value = !isCreate.value;
};
</script>

<style></style>
