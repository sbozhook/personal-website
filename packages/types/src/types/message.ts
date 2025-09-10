import type { Static } from '../utils'
import { Type } from '../utils'

export const MessageBase = {
  id: Type.String(),
  conversationId: Type.Optional(Type.String()),
  content: Type.String(),
  role: Type.String(),
  timestamp: Type.Number(),
}

export const MessageTypeObject = Type.Object(MessageBase)

export type MessageType = Static<typeof MessageTypeObject>
