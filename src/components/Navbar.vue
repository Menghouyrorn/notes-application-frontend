<template>
  <div class="h-14 shadow-sm flex justify-between items-center px-4">
    <router-link to="/">
      <p
        class="text-lg font-extrabold text-gray-500 flex items-center gap-x-1 uppercase cursor-pointer"
      >
        Notes <PencilLine :size="17" />
      </p>
    </router-link>
    <div>
      <!-- <TextInput /> -->
    </div>
    <div>
      <Button size="default">Login</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TextInput from "./shared/TextInput.vue";
import Button from "./ui/button/Button.vue";
import { PencilLine } from "lucide-vue-next";
</script>

<style></style>
