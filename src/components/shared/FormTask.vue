<template>
  <form @submit="props.handleSubmit" class="space-y-2">
    <form-field v-slot="{ componentField }" name="title">
      <form-item>
        <form-label>Title</form-label>
        <form-control>
          <Input placeholder="title..." v-bind="componentField" />
        </form-control>
        <form-message />
      </form-item>
    </form-field>
    <form-field v-slot="{ field }" name="description">
      <form-item>
        <form-label>Description</form-label>
        <form-control>
          <TiptapComponent
            v-model="field.value"
            @update:model-value="field.onInput"
          />
        </form-control>
        <form-message />
      </form-item>
    </form-field>
    <Button
      v-if="!props.isLoading"
      variant="destructive"
      class="rounded-sm px-8 cursor-pointer font-normal flex items-center"
      ><ArrowDownToLine /> Save</Button
    >
    <Button
      v-else
      variant="destructive"
      class="rounded-sm px-8 cursor-pointer font-normal flex items-center"
      >Loading...</Button
    >
  </form>
</template>

<script lang="ts" setup>
import Button from "../ui/button/Button.vue";
import { ArrowDownToLine } from "lucide-vue-next";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "../ui/input/Input.vue";
import TiptapComponent from "./TiptapComponent.vue";

interface FormTaskProps {
  handleSubmit: (e?: Event | undefined) => Promise<void | undefined>;
  isLoading: boolean;
}

const props = defineProps<FormTaskProps>();
</script>

<style></style>
