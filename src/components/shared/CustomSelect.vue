<template>
  <Select v-model="select_model" @update:model-value="(v) => onChangeValue(v)">
    <SelectTrigger size="default" class="rounded-xs">
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <div v-for="s_value in props.data">
        <SelectItem :value="s_value.value"
          ><component :is="s_value.icon" /> {{ s_value.label }}</SelectItem
        >
      </div>
    </SelectContent>
  </Select>
</template>

<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AcceptableValue } from "reka-ui";

type SelectData = {
  value: string;
  label?: string;
  icon?: any;
};

interface CustomSelectProps {
  placeholder?: string;
  data: SelectData[];
}

const select_model = defineModel<string>("select_model");
const props = defineProps<CustomSelectProps>();
const emit = defineEmits(["onUpdate"]);
function onChangeValue(v: AcceptableValue) {
  emit("onUpdate", v);
}
</script>

<style></style>
