<template>
  <div
    :class="
      clsx(
        'relative',
        'border-input shadow-sm rounded-sm flex py-1 items-center px-1 gap-x-1 focus:border-2 focus:border-amber-800'
      )
    "
  >
    <slot name="prefixicon" />
    <ArrowDown01 :size="20" />
    <Input
      placeholder="Search..."
      class="focus-visible:border-0 focus-visible:ring-0 border-0 shadow-none"
    />
    <User :size="20" />
    <slot name="suffixicon" />
  </div>
</template>

<script lang="ts" setup>
import clsx from "clsx";
import Input from "../ui/input/Input.vue";
import { User, ArrowDown01 } from "lucide-vue-next";
</script>

<style></style>
