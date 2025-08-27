<template>
  <Card class="w-sm rounded-sm m-auto mt-20">
    <CardHeader>
      <CardTitle class="text-xl font-extrabold uppercase"
        >For Get Password</CardTitle
      >
      <CardDescription class="font-medium"
        >Forget your account password by using email.</CardDescription
      >
    </CardHeader>
    <CardContent>
      <form @submit="" class="space-y-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Email..."
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-center">
          <Button class="rounded-sm px-6 cursor-pointer">Submit</Button>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between">
      <RouterLink to="/auth/signup">
        <p class="text-xs underline hover:text-blue-600 cursor-pointer">
          Go to Signup!
        </p>
      </RouterLink>
      <RouterLink to="/auth/login">
        <p class="text-xs underline hover:text-blue-600 cursor-pointer">
          Go to login.
        </p>
      </RouterLink>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/ui/input/Input.vue";
import { Button } from "@/components/ui/button";
</script>

<style></style>
