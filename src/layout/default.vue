<template>
  <div class="min-h-screen w-full">
    <Navbar />
    <main class="p-2">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
</script>

<style></style>
