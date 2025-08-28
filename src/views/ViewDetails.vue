<template>
  <div class="space-y-5 mt-2">
    <div class="flex justify-between items-center">
      <Button
        @click="
          () => {
            router.replace('/');
          }
        "
        size="icon"
        variant="outline"
        class="rounded-sm cursor-pointer"
      >
        <ChevronLeft />
      </Button>
      <p class="text-4xl font-extrabold text-gray-700">
        {{ task_data?.title }}
      </p>
      <div class="flex items-center gap-x-2">
        <p class="font-extrabold">
          {{ task_data?.created_at.string }}
        </p>
        <Button
          @click="onEdit"
          size="icon"
          class="rounded-sm cursor-pointer"
          variant="destructive"
          ><PenLine
        /></Button>
      </div>
    </div>
    <div
      class="p-4 border-gray-100 h-screen mx-auto w-[80%] overflow-y-auto border rounded-sm shadow-md"
    >
      <div v-html="task_data?.description"></div>
    </div>
    <EditTask
      :default-value="task_data"
      :id="Number(route.params.id)"
      :open="isEdit"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PenLine } from "lucide-vue-next";
import { useQueryTask } from "@/services";
import EditTask from "@/components/shared/EditTask.vue";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const { data: task_data } = useQueryTask(Number(route?.params?.id));
let isEdit = ref<boolean>();
const onEdit = () => {
  isEdit.value = !isEdit.value;
};
</script>

<style></style>
