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
          >Create Notes
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
          Add a new note to capture important details and manage your tasks
          effectively.
        </dialog-description>
      </DialogHeader>
      <div class="h-full w-full overflow-y-auto">
        <form class="space-y-2">
          <form-field v-slot="{ componentField }" name="title">
            <form-item>
              <form-label>Title</form-label>
              <form-control>
                <Input placeholder="title..." v-bind="componentField" />
              </form-control>
              <form-message />
            </form-item>
          </form-field>
          <form-field v-slot="{ componentField }" name="description">
            <form-item>
              <form-label>Description</form-label>
              <form-control>
                <TiptapComponent v-bind="componentField" />
              </form-control>
              <form-message />
            </form-item>
          </form-field>
        </form>
      </div>
      <DialogFooter>
        <Button
          variant="destructive"
          class="rounded-sm px-8 cursor-pointer font-normal flex items-center"
          ><ArrowDownToLine /> Save</Button
        >
      </DialogFooter>
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
import { Expand, Minimize, ArrowDownToLine } from "lucide-vue-next";
import { ref } from "vue";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "../ui/input/Input.vue";
import TiptapComponent from "./TiptapComponent.vue";
import DialogFooter from "../ui/dialog/DialogFooter.vue";
const isOpen = defineModel<boolean>("open");
const isFullScreen = ref<boolean>(false);
const onFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
};
</script>

<style></style>
