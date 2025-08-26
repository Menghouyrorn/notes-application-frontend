<template>
  <div class="w-full">
    <Tabs default-value="table">
      <TabsList class="w-[200px] rounded-xs">
        <TabsTrigger value="table" class="cursor-pointer rounded-xs">
          <LayoutList />
        </TabsTrigger>
        <TabsTrigger value="grid" class="cursor-pointer rounded-xs">
          <Grid2x2 />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>CreatedAt</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="grid">
        <div class="w-full grid grid-cols-5 gap-2">
          <div v-for="_ in Array.from({ length: 10 })">
            <TaskCard />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import TaskCard from "@/components/shared/TaskCard.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutList, Grid2x2 } from "lucide-vue-next";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
</script>

<style></style>
