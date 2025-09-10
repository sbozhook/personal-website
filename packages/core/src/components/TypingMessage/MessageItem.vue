<script setup lang="ts">
import type { MessageType } from '@sbozhook/types'
import { Badge } from '@sbozhook/ui'
import { computed } from 'vue'

interface Props {
  message: MessageType
  isTyping?: boolean
  typingContent?: string
}

const props = withDefaults(defineProps<Props>(), {
  isTyping: false,
  typingContent: '',
})

const emits = defineEmits<{
  messageClick: [message: MessageType]
}>()

const isYou = computed(() => props.message.role === 'user')

const displayContent = computed(() => {
  if (props.message.role === 'assistant' && props.isTyping && props.typingContent !== '') {
    return props.typingContent
  }
  return props.message.content
})

function formatTime(timestamp: Date) {
  return timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function handleClick() {
  emits('messageClick', props.message)
}
</script>

<template>
  <div
    class="py-2 px-2  cursor-pointer transition-colors flex"
    title="Click to view debug info"
    :data-message-id="message.id"
    @click="handleClick"
  >
    <div
      class="flex items-start flex-re flex-1 gap-4"
      :class="isYou ? 'flex-row-reverse' : ''"
    >
      <!-- Avatar -->

      <!-- Message Content -->
      <div
        class="bg-primary/5 shadow-sm p-3 rounded-xl message-content hover:bg-gray-50 relative"
        :class="isYou ? 'ml-12 bg-primary/20 ' : 'mr-12'"
      >
        <div
          class="mb-1 flex gap-2 items-center w-full"
          :class="[isYou ? 'text-right w-full justify-end' : 'justify-between']"
        >
          <div class="gap-2 flex">
            <template v-if="!isYou">
              <Badge>Ai Assistant</Badge>
              <Badge variant="outline">
                Dwayne
              </Badge>
            </template>
            <template v-else>
              <Badge variant="secondary">
                You
              </Badge>
            </template>
          </div>
          <div class="text-xs text-right text-gray-500 justify-self-end">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>

        <!-- Message text -->
        <div
          class="mt-2 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap"
          :class="isYou ? 'text-right' : ''"
        >
          {{ displayContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-content {
  animation: messageContentFadeIn 0.4s ease-out;
}

@keyframes messageContentFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.message-content:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
