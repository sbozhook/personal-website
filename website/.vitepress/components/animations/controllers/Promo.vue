<script setup lang="ts">
import type { Ref } from 'vue'
import { capitalize, computed, ref, watch } from 'vue'
import TypingTitle from '../TypingTitle.vue'

enum nodeEnum {
  website = 'website',
  blog = 'blog',
  story = 'story',
  docs = 'docs',
  community = 'community',
  assistant = 'assistant',
}

type nodeNames = keyof typeof nodeEnum

type NodeObject = {
  name: Ref<nodeNames>
  index: Ref<number>
  show: Ref<boolean>
}
class Node {
  reactive: NodeObject

  constructor(name: nodeNames, index: number) {
    this.reactive = {
      name: ref(name),
      index: ref(index),
      show: ref(false),
    }
  }

  setShow(show?: boolean) {
    this.reactive.show.value = show ?? !this.reactive.show.value
  }
}

const list = ref<NodeObject[]>([])
const current = ref<number | null>(null)
class NodeDirector {
  private map = new Map<nodeNames, Node>()
  private signal = ref(false)

  add(name: nodeNames) {
    this.map.set(name, new Node(name, this.map.size))
    this.signal.value = true
  }

  constructor() {
    Object.keys(nodeEnum).forEach((key) => {
      this.add(key as keyof typeof nodeEnum)
    })
    watch(this.signal, () => {
      const keyMap: Record<string, Node> = {}
      this.map.forEach((node) => {
        keyMap[node.reactive.index.value] = node
      })

      const result: Node['reactive'][] = []
      for (let i = 0; i < this.map.size; i++) {
        if (!keyMap[i]) {
          throw new Error('Order missmatch')
        }
        result.push(keyMap[i].reactive)
      }

      list.value = result
    }, {
      immediate: true,
    })
  }

  get(key: nodeNames) {
    return this.map.get(key)
  }

  assign(key: nodeNames) {
    const node = this.map.get(key)
    if (!node) {
      throw new Error(`Unable to assign: ${key}`)
    }
    current.value = node.reactive.index.value
  }
}

const director = new NodeDirector()
const currentNode = computed(() => list.value[current.value ?? -1] ?? null)

function increase() {
  if (typeof current.value === 'object') {
    return
  }
  current.value = current.value + 1
}

function nextAnimation() {
  if (typeof current.value === 'object') {
    current.value = 0
  }
  else {
    increase()
  }
  queueMicrotask(() => {
    const state = currentNode.value
    const node = director.get(state.name)
  })
}
</script>

<template>
  <div
    v-for="node in list"
    :key="node.name"
  >
    <TypingTitle
      :text="`The ${capitalize(node.name)}`"
      @finish="nextAnimation()"
    />
  </div>
</template>

<style scoped>

</style>
