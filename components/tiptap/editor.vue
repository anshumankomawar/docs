<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { BoldIcon, ChatBubbleBottomCenterIcon, ChevronLeftIcon, ClockIcon, CodeBracketIcon, CommandLineIcon, DocumentIcon, FolderIcon, ItalicIcon, ListBulletIcon, ShareIcon, StrikethroughIcon, UnderlineIcon } from '@heroicons/vue/24/outline'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon } from '@radix-icons/vue'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const client = useSupabaseClient()
const user = useSupabaseUser()

const props = defineProps<{
  initialContent: string,
  filePath: string
}>()

const displaypath = props.filePath.split('/').slice(1);

const editor = useEditor({
  content: props.initialContent,
  editorProps: {
    attributes: {
      class: 'prose prose-zinc dark:prose-invert h-full max-w-none outline-none [&_ol]:list-decimal [&_ul]:list-disc',
    },
  },
  onSelectionUpdate: ({ editor }) => {
  },
  extensions: [
    StarterKit,
    Blockquote,
    Highlight,
    Typography,
    Underline,
    BulletList,
    ListItem,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return 'What’s the title?'
        }

        return 'Can you add some further context?'
      },
    }),
  ],
})

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

async function save(htmlToSave: string) {
  if (htmlToSave) {
    const { error } = await client
      .from('versions')
      .update({ content: htmlToSave })
      .eq('inode_path', props.filePath)
      .eq('version_number', 0)
      .eq('user_id', user.value.id)

    if (error) {
      console.error('Error saving file: ', error);
    } else {
      console.log('File saved successfully');
    }
  }
}

const handleSaveShortcut = async (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 's') {
    event.preventDefault();
    if (!editor.value) return;

    const htmlToSave = editor.value.getHTML();
    console.log('Saving file...', props.filePath);
    save(htmlToSave);
  }
};

const debouncedSave = debounce(async (htmlToSave: string) => {
  console.log('Saving file...', props.filePath);
  save(htmlToSave);
}, 3000);

onMounted(async () => {
  window.addEventListener('keydown', handleSaveShortcut);
  editor.value.commands.focus('start')

  if (editor.value) {
    editor.value.on('update', () => {
      const htmlToSave = editor.value.getHTML();
      debouncedSave(htmlToSave);
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleSaveShortcut);
});
</script>

<template>
  <div class="flex-0 flex flex-col w-full justify-center items-center">
    <div v-if="editor" class="w-full h-16 px-6 py-6 border-b flex items-center">
      <ChevronLeftIcon class="size-4 mr-4 cursor-pointer" @click="navigateTo('/')" />
      <Breadcrumb>
        <BreadcrumbList>
          <template v-for="(item, index) in displaypath" :key="index">
            <BreadcrumbItem>
              <BreadcrumbLink class="text-xs hover:text-none"
                :class="{ 'dark:text-white text-black': index === displaypath.length - 1 }">
                {{ item }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="index < displaypath.length - 1" />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
      <div class="flex-grow"></div>
      <ClockIcon class="size-4 mr-2 ml-auto cursor-pointer" />
      <ShareIcon class="size-4 ml-auto cursor-pointer" />
    </div>
    <div v-if="editor" class="w-full h-10 py-1 flex items-center justify-center border-b ">
      <div class="h-full flex items-center justify-start space-x-1">
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle bold" @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'bg-accent': editor.isActive('bold') }" asChild>
          <BoldIcon class="size-3 dark:text-white" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle italic" @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'bg-accent': editor.isActive('italic') }" asChild>
          <ItalicIcon class="size-3 dark:text-white" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle underline" @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'bg-accent': editor.isActive('underline') }" asChild>
          <UnderlineIcon class="size-3 dark:text-white" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle strikethrough" @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'bg-accent': editor.isActive('strike') }" asChild>
          <StrikethroughIcon class="size-3 dark:text-white" />
        </div>
        <div class="h-full py-1">
          <Separator orientation="vertical" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle strikethrough" @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'bg-accent': editor.isActive({ textAlign: 'left' }) }" asChild>
          <TextAlignLeftIcon class="size-3 dark:text-white" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle strikethrough" @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'bg-accent': editor.isActive({ textAlign: 'center' }) }" asChild>
          <TextAlignCenterIcon class="size-3 dark:text-white" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle strikethrough" @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'bg-accent': editor.isActive({ textAlign: 'right' }) }" asChild>
          <TextAlignRightIcon class="size-3 dark:text-white" />
        </div>
        <div class="h-full py-1">
          <Separator orientation="vertical" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle strikethrough" @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'bg-accent': editor.isActive('blockquote') }" asChild>
          <ChatBubbleBottomCenterIcon class="size-3 dark:text-white" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle strikethrough" @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'bg-accent': editor.isActive('codeBlock') }" asChild>
          <CodeBracketIcon class="size-3 dark:text-white" />
        </div>
        <div
          class="h-6 px-2 hover:cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          variant="ghost" aria-label="Toggle strikethrough" @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'bg-accent': editor.isActive('bulletList') }" asChild>
          <ListBulletIcon class="size-3 dark:text-white" />
        </div>
      </div>
    </div>
    <div class="flex-0 justify-center h-full min-w-2xl max-w-2xl mt-8 mb-0 overflow-y-scroll">
      <div v-if="editor" class="h-full">
        <editor-content :editor="editor" class="h-full overflow-y-scroll pt-8 flex-grow max-w-none" />
      </div>
      <div v-else class="space-y-2 mt-8">
        <Skeleton class="w-36 h-12 mb-8" />
        <Skeleton class="h-8 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-24 w-full" />
        <Skeleton class="flex-1 w-full" />
      </div>
    </div>
    <!--<div class="flex-1 max-w-1/4 bg-altbackground border-l border-altborder ml-4 py-16 px-4">
          <div>asdf</div>
        </div>
        -->
  </div>
</template>

<style lang="scss">
.tiptap {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    /* Code styling */
    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }
}

.bubble-menu {
  display: flex;
  background-color: #0D0D0D;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
