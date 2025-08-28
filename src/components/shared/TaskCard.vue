<template>
  <Card class="p-1 grid gap-y-2 rounded-xs shadow-sm">
    <CardHeader class="p-0 m-0">
      <CardTitle class="flex justify-between items-center px-2 py-0 m-0">
        <p class="text-lg font-medium text-gray-600">{{ props.title }}</p>
        <div class="flex items-center">
          <Button
            @click="onEdit"
            size="icon"
            variant="ghost"
            class="cursor-pointer p-0 m-0"
            ><PenLine
          /></Button>
          <Button
            type="button"
            @click="
              () => {
                onDeleteTask(props.id);
              }
            "
            size="icon"
            variant="ghost"
            class="cursor-pointer p-0 m-0 text-red-500"
            ><Trash
          /></Button>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent
      class="px-2 py-0 h-[140px] transition-all ease-in-out cursor-pointer overflow-y-auto"
      @click="router.replace(`/notes/${props.id}`)"
    >
      <p class="text-xs" v-html="props.description"></p>
    </CardContent>
    <CardFooter
      class="px-2 py-1.5 border-t-1 border-t-amber-400 flex justify-end items-center"
    >
      <p class="flex text-xs font-bold text-gray-500 items-center gap-x-2">
        <CalendarDays :size="15" /> {{ props.created_at.string }}
      </p>
    </CardFooter>
  </Card>
  <EditTask :default-value="props" v-model:open="isEdit" :id="props.id" />
</template>

<script lang="ts" setup>
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from "../ui/card";
import Button from "../ui/button/Button.vue";
import { CalendarDays, PenLine, Trash } from "lucide-vue-next";
import type { DateType } from "@/types";
import { useMutationDeleteTask } from "@/services";
import EditTask from "./EditTask.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  created_at: DateType;
  updated_at: DateType;
}

const props = defineProps<TaskCardProps>();
const router = useRouter();

const { mutate: onDeleteTask } = useMutationDeleteTask();

const isEdit = ref<boolean>(false);

const onEdit = () => {
  isEdit.value = !isEdit.value;
};
</script>

<style></style>
