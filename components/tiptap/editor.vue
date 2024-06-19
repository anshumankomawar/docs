<script setup lang="ts">
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'

const { saveFileContent } = useFileContent();

const CustomDocument = Document.extend({
  content: 'block*',
})

const props = defineProps<{
  initialContent: string,
  filePath: string
}>()

const editor = useEditor({
  content: props.initialContent,
  editorProps: {
    attributes: {
      class: 'prose prose-zinc dark:prose-invert h-full max-w-none outline-none [&_ol]:list-decimal [&_ul]:list-disc',
    },
  },
  extensions: [
    CustomDocument,
    StarterKit.configure({
      document: false,
    }),
    Highlight,
    Typography,
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

const handleSaveShortcut = async (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 's') {
    event.preventDefault();
    if (!editor.value) return;

    const htmlToSave = editor.value.getHTML();
    if (!htmlToSave) return;

    console.log('Saving file...', props.filePath);

    saveFileContent(props.filePath, htmlToSave);
  }
};

const debouncedSave = debounce(async (htmlToSave: string) => {
  if (htmlToSave) {
    console.log('Auto-saving file...', props.filePath);
    saveFileContent(props.filePath, htmlToSave);
  }
}, 3000); // 2000ms = 2 seconds

onMounted(async () => {
  window.addEventListener('keydown', handleSaveShortcut);

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
  <div v-if="editor">
    <bubble-menu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        Strike
      </button>
    </bubble-menu>
    <editor-content :editor="editor" class="h-full overflow-y-scroll pt-8 flex-grow max-w-none" />
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
