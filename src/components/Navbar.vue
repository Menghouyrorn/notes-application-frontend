<template>
  <div
    class="h-14 shadow-sm sticky top-0 z-50 bg-white transition-all ease-in-out flex justify-between items-center px-4 dark:shadow-md dark:outline-1"
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
      <RouterLink to="/auth/login" v-if="!currentUser.current_user">
        <Button size="sm" class="cursor-pointer rounded-sm">Login</Button>
      </RouterLink>
      <Popover v-else>
        <PopoverTrigger>
          <Avatar class="cursor-pointer">
            <AvatarImage
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
            />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] rounded-sm">
          <div class="space-y-2">
            <div>
              <p class="text-lg font-bold text-gray-500 text-center">
                {{ currentUser.current_user.name }}
              </p>
              <p class="text-md font-medium text-gray-600 text-center">
                {{ currentUser.current_user.email }}
              </p>
            </div>
            <Button
              type="button"
              @click="LogoutUser"
              class="w-full flex items-center text-sm rounded-sm cursor-pointer"
              size="sm"
              variant="destructive"
            >
              <LogOut />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "./ui/button/Button.vue";
import { PencilLine, Sun, Moon, LogOut } from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";
import { useUserStore } from "@/store/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useLogoutMutation } from "@/services";

const { store } = useColorMode();
const currentUser = useUserStore();
const { mutate: LogoutUser } = useLogoutMutation();
</script>

<style></style>
