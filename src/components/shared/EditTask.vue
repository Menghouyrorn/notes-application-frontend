<template>
  <Dialog v-model:open="isOpen">
    <DialogContent
      :class="
        isFullScreen
          ? 'w-screen h-screen !max-w-none rounded-none'
          : '!max-w-5xl'
      "
    >
      <DialogHeader>
        <DialogTitle
          class="flex items-center relative justify-between text-xl uppercase font-extrabold text-gray-500"
          >Edit Notes
          <div class="flex absolute -top-[17px] right-2">
            <Button
              v-if="!isFullScreen"
              size="icon"
              @click="onFullScreen"
              variant="ghost"
              class="cursor-pointer"
              ><Expand
            /></Button>
            <Button
              v-else
              size="icon"
              @click="onFullScreen"
              variant="ghost"
              class="cursor-pointer"
              ><Minimize
            /></Button></div
        ></DialogTitle>
        <dialog-description>
          On this side you can edit the information for your notes.
        </dialog-description>
      </DialogHeader>
      <div class="h-full w-full overflow-y-auto overflow-x-hidden">
        <FormTask :is-loading="isPending" :handle-submit="onSubmit" />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import Button from "../ui/button/Button.vue";
import { Expand, Minimize } from "lucide-vue-next";
import { ref, watch } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { useMutationEditTask } from "@/services";
import FormTask from "./FormTask.vue";
import type { TaskType } from "@/types";

const isOpen = defineModel<boolean>("open");
const props = defineProps<{ id: number; defaultValue?: TaskType }>();
const isFullScreen = ref<boolean>(false);
const onFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
};
const { mutate: onUpdateTask, isPending } = useMutationEditTask();

const schema = toTypedSchema(
  z.object({
    title: z.string(),
    description: z.string(),
  })
);

const form = useForm({
  validationSchema: schema,
});

watch(isOpen, (open) => {
  if (open && props.defaultValue) {
    form.setValues({
      title: props.defaultValue.title,
      description: props.defaultValue.description,
    });
  }
});

const onSubmit = form.handleSubmit((v) => {
  onUpdateTask({
    id: Number(props.id),
    payload: v,
  });
  isOpen.value = false;
});
</script>

<style></style>
