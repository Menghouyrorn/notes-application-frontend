<template>
  <div>
    <Card
      class="p-1 grid gap-y-2 rounded-xs shadow-sm hover:shadow-md transition-all ease-in-out cursor-pointer"
    >
      <CardHeader class="p-0 m-0">
        <CardTitle class="flex justify-between items-center px-2 py-0 m-0">
          <p class="text-lg font-medium">Test</p>
          <div class="flex items-center">
            <Button size="icon" variant="ghost" class="cursor-pointer p-0 m-0"
              ><PenLine
            /></Button>
            <Button
              size="icon"
              variant="ghost"
              class="cursor-pointer p-0 m-0 text-red-500"
              ><Trash
            /></Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent class="px-2 py-0">
        <p class="text-xs">Description</p>
      </CardContent>
      <CardFooter
        class="px-2 py-1.5 border-t-1 border-t-amber-400 flex justify-end items-center"
      >
        <p class="flex text-xs font-bold text-gray-500 items-center gap-x-2">
          <CalendarDays :size="15" /> 23/23/2022
        </p>
      </CardFooter>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
  CardContent,
} from "../ui/card";
import Button from "../ui/button/Button.vue";
import { Ellipsis, CalendarDays, PenLine, Trash } from "lucide-vue-next";
</script>

<style></style>
