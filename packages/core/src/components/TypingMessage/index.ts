import type { MessageType } from '@sbozhook/types'

export { default as TypingMessage } from './TypingMessage.vue'

export function buildMessage(content: string, meta: Partial<MessageType> = {}): MessageType {
  return {
    content,
    timestamp: new Date().getTime(),
    ...meta,
  }
}
