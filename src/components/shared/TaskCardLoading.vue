<template>
  <Card class="p-1 grid gap-y-2 rounded-xs shadow-sm">
    <CardHeader class="p-0 m-0">
      <CardTitle class="flex justify-between items-center px-2 py-0 m-0">
        <Skeleton class="h-4 w-32 bg-gray-200 rounded-sm"></Skeleton>
        <div class="flex items-center gap-x-2">
          <Skeleton class="h-6 w-6 bg-gray-200 rounded-sm" />
          <Skeleton class="h-6 w-6 bg-gray-200 rounded-sm" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent
      class="px-2 py-0 h-[140px] transition-all ease-in-out cursor-pointer overflow-y-auto"
    >
      <Skeleton class="h-full bg-gray-200 rounded-sm"></Skeleton>
    </CardContent>
    <CardFooter
      class="px-2 py-1.5 border-t-1 border-t-amber-400 flex justify-end items-center"
    >
      <Skeleton class="h-5 w-32 bg-gray-200 rounded-sm"></Skeleton>
    </CardFooter>
  </Card>
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
import { Skeleton } from "../ui/skeleton";
</script>

<style></style>
