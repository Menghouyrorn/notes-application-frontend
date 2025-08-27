<template>
  <div
    class="h-14 shadow-sm flex justify-between items-center px-4 dark:shadow-md dark:outline-1"
  >
    <router-link to="/">
      <p
        class="text-lg font-extrabold text-gray-500 flex items-center gap-x-1 uppercase cursor-pointer"
      >
        Notes <PencilLine :size="17" />
      </p>
    </router-link>
    <div class="flex items-center gap-x-3">
      <Button
        class="cursor-pointer"
        @click="store = 'light'"
        size="icon"
        variant="ghost"
        v-if="store == 'dark'"
        ><Sun
      /></Button>
      <Button
        class="cursor-pointer"
        size="icon"
        @click="store = 'dark'"
        variant="ghost"
        v-else
        ><Moon
      /></Button>
      <RouterLink to="/auth/login">
        <Button size="sm" class="cursor-pointer rounded-sm">Login</Button>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "./ui/button/Button.vue";
import { PencilLine, Sun, Moon } from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";

const { system, store } = useColorMode();
</script>

<style></style>
