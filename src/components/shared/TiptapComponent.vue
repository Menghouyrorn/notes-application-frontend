<template>
  <div class="space-y-1">
    <div
      class="border-b-1 py-1 flex gap-x-2 items-center container"
      v-if="editor"
    >
      <CustomSelect
        @on-update="(v) => onChangeHeading(v)"
        v-model:select_model="select_heading"
        :placeholder="SELECT_HEADING.placeholder"
        :data="SELECT_HEADING.data"
      />
      <CustomSelect
        @on-update="(v) => onChangeListing(v)"
        v-model:select_model="select_list"
        :placeholder="SELECT_LIST.placeholder"
        :data="SELECT_LIST.data"
      />
      <Button
        @click="editor.chain().focus().toggleBlockquote().run()"
        type="button"
        size="icon"
        variant="outline"
        class="rounded-xs cursor-pointer font-normal"
        ><TextQuote
      /></Button>
      <Button
        variant="outline"
        class="rounded-xs cursor-pointer font-normal"
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        >B</Button
      >
      <Button
        type="button"
        variant="outline"
        class="rounded-xs cursor-pointer font-normal"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        ><FileJson
      /></Button>
      <Button
        type="button"
        variant="outline"
        class="rounded-xs cursor-pointer font-normal"
        @click="editor.chain().focus().toggleItalic().run()"
        ><Italic
      /></Button>
      <Button
        type="button"
        variant="outline"
        class="rounded-xs cursor-pointer font-normal"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <Underline />
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button
            type="button"
            variant="outline"
            class="rounded-xs cursor-pointer font-normal"
          >
            <Link />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[240px] px-4 py-2 flex gap-x-2 items-center">
          <Input
            v-model="link_text"
            placeholder="test"
            class="focus-visible:border-none focus-visible:ring-1"
          />
          <Button
            size="sm"
            type="button"
            class="cursor-pointer rounded-sm"
            @click="onSetLink"
            >Save</Button
          >
        </PopoverContent>
      </Popover>
      <Button
        @click="onSelectFile"
        type="button"
        size="icon"
        variant="outline"
        class="rounded-xs cursor-pointer font-normal"
        ><ImageDown
      /></Button>
      <input
        accept="image/*"
        ref="image_field"
        class="hidden"
        @change="onUplaodImage"
        type="file"
      />
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeUnmount, onUpdated, ref, watch } from "vue";
import { Heading, type Level } from "@tiptap/extension-heading";
import CustomSelect from "./CustomSelect.vue";
import { SELECT_HEADING, SELECT_LIST } from "@/data";
import CodeBlock from "@tiptap/extension-code-block";
import {
  TaskList,
  TaskItem,
  BulletList,
  OrderedList,
} from "@tiptap/extension-list";
import type { AcceptableValue } from "reka-ui";
import Button from "../ui/button/Button.vue";
import {
  TextQuote,
  FileJson,
  Italic,
  Underline,
  Link,
  ImageDown,
} from "lucide-vue-next";
import BlockQuote from "@tiptap/extension-blockquote";
import ItalicTiptap from "@tiptap/extension-italic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Input from "../ui/input/Input.vue";
import LinkTiptap from "@tiptap/extension-link";
import ImageTiptap from "@tiptap/extension-image";

const select_heading = ref("");
const select_list = ref("");
const link_text = ref("");
const image_field = ref<HTMLInputElement | null>(null);

const modelValue = defineModel<string>();

const editor = useEditor({
  content: modelValue.value || "",
  editable: true,
  extensions: [
    StarterKit,
    ImageTiptap.configure({
      inline: false,
      allowBase64: true,
      HTMLAttributes: {
        class: "m-auto w-[400px]",
      },
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: "list-decimal pl-4",
      },
    }),
    CodeBlock.configure({
      HTMLAttributes: {
        class: "bg-slate-600 text-white py-3 px-2 font-mono rounded-sm text-sm",
      },
    }),
    BlockQuote.configure({
      HTMLAttributes: {
        class: "border-l-3 border-l-gray-600 px-2",
      },
    }),
    TaskList.configure({
      HTMLAttributes: {
        class: "list-none pl-0",
      },
    }),
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: "flex items-center space-x-1",
      },
    }),
    Heading.configure({
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "font-bold tracking-tight",
      },
    }),
    BulletList.configure({
      HTMLAttributes: {
        class: "list-disc pl-4",
      },
    }),
    ItalicTiptap,
    LinkTiptap.configure({
      HTMLAttributes: {
        class: "underline text-blue-500",
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML();
  },
  editorProps: {
    attributes: {
      class:
        "h-[360px] border rounded-sm bg-gray-50 dark:bg-background py-2 px-3 overflow-y-auto",
    },
  },
});

watch(modelValue, (value) => {
  if (editor && value !== editor.value?.getHTML()) {
    editor.value?.commands.setContent(value || "", { emitUpdate: false });
  }
});

let old_data = ref<{
  oldHead: string;
  oldList: string;
}>({
  oldHead: "",
  oldList: "",
});

watch([select_heading, select_list], ([head, list]) => {
  if (!editor) return;
  editor.value
    ?.chain()
    .focus()
    .toggleHeading({ level: Number(head) as Level })
    .run();
  old_data.value.oldHead = head;
  condition_list(list);
  old_data.value.oldList = list;
});

function onChangeHeading(v: AcceptableValue) {
  // check if old value is equal new value or not if it true reset
  if (v == old_data.value.oldHead) {
    editor.value
      ?.chain()
      .focus()
      .toggleHeading({ level: Number(old_data.value.oldHead) as Level })
      .run();
    select_heading.value = "";
  }
}

function onChangeListing(v: AcceptableValue) {
  if (v == old_data.value.oldList) {
    condition_list(old_data.value.oldList);
    select_list.value = "";
  }
}
const condition_list = (list: string) => {
  switch (list) {
    case "bulletList":
      editor.value?.chain().focus().toggleBulletList().run();

      break;
    case "orderedList":
      editor.value?.chain().focus().toggleOrderedList().run();
      break;
    case "tasklist":
      editor.value?.chain().focus().toggleTaskList().run();
      break;
    default:
      return;
  }
};

const onSetLink = () => {
  if (link_text.value == "") {
    editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  } else {
    editor.value
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: link_text.value })
      .run();
  }
};

function onSelectFile() {
  image_field.value?.click();
}

const onUplaodImage = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    editor.value
      ?.chain()
      .focus()
      .setImage({ src: reader.result as string })
      .run();
  };
  reader.readAsDataURL(file);
};
onBeforeUnmount(() => {
  editor?.value?.destroy();
});
</script>

<style>
.tiptap-wrapper .ProseMirror {
  min-height: 300px;
  max-width: 100%;
}
</style>
