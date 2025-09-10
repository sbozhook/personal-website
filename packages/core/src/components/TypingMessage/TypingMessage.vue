<script setup lang="ts">
import type { MessageType } from '@sbozhook/types'
import { computed, onMounted } from 'vue'
import { useTypingAnimation } from '../../composables'
import MessageItem from './MessageItem.vue'

interface Props {
  message: MessageType
}

const props = defineProps<Props>()

const { isTyping, typingContent, typeMessage } = useTypingAnimation()
const message = computed(() => ({
  ...props.message,
  timestamp: new Date(props.message.timestamp),
}))

onMounted(() => {
  typeMessage(props.message.content)
})
</script>

<template>
  <MessageItem
    :message="message"
    :typing-content="typingContent"
    :is-typing="isTyping"
  />
</template>
