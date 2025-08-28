<template>
  <Card class="w-xl rounded-sm m-auto mt-20">
    <CardHeader>
      <CardTitle class="text-xl font-extrabold uppercase">SignUp</CardTitle>
      <CardDescription class="font-medium"
        >Create your account by using email and password.</CardDescription
      >
    </CardHeader>
    <CardContent>
      <form @submit="onSignUp" class="space-y-5 grid grid-cols-2 gap-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Username..."
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
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
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Password..."
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password_confirmation">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm password..."
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="col-span-2 flex justify-center">
          <Button class="rounded-sm px-6 cursor-pointer">{{
            isPending ? "Loading..." : "SingUp"
          }}</Button>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between">
      <RouterLink to="/auth/login">
        <p class="text-xs underline hover:text-blue-600 cursor-pointer">
          has account!
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
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { useMutationCreateUser } from "@/services";

const { mutate: onSignUpUser, isPending } = useMutationCreateUser();
const schema = toTypedSchema(
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 8 characters long"),
    password_confirmation: z
      .string()
      .min(6, "Password must be at least 8 characters long"),
  })
);

const form = useForm({
  validationSchema: schema,
});

const onSignUp = form.handleSubmit((v) => {
  onSignUpUser(v);
});
</script>

<style></style>
