import { ref } from 'vue'

export function useTypingAnimation(initialContent = '') {
  const isTyping = ref(false)
  const preserve = ref(true)
  const typingContent = ref(initialContent)
  const direction = ref<'lr' | 'rl'>('lr')
  const lastText = ref('')
  const lettersArray = ref<Array<{ letter: string, visible: boolean }>>([...typingContent.value].map(letter => ({
    letter,
    visible: true,
  })))

  let currentResolve: () => void = () => {}
  let rafId = 0
  let currentIndex = 0
  let frameCount = 0
  let targetFrames = 0

  const stop = () => {
    if (!isTyping.value) {
      return
    }
    isTyping.value = false
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    currentResolve()
    currentResolve = () => {}
    frameCount = 0
    targetFrames = 0
  }

  const createFramedAnimation = (
    animationFn: () => boolean | void,
    delay: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      currentResolve = resolve
      isTyping.value = true

      frameCount = 0
      targetFrames = Math.max(1, Math.round(delay / 16.67))

      const animate = () => {
        frameCount++

        if (frameCount >= targetFrames) {
          const shouldContinue = animationFn()

          if (shouldContinue === false) {
            stop()
            return
          }

          frameCount = 0
        }

        if (isTyping.value) {
          rafId = requestAnimationFrame(animate)
        }
      }

      rafId = requestAnimationFrame(animate)
    })
  }

  const typeMessage = async (text: string, delay: number = 15): Promise<void> => {
    if (lastText.value !== text) {
      typingContent.value = preserve.value ? ' '.repeat(text.length) : ''
      currentIndex = direction.value === 'lr' ? 0 : text.length - 1
    }
    lastText.value = text

    return createFramedAnimation(() => {
      const isLr = direction.value === 'lr'
      const letters = [...typingContent.value]
      letters[currentIndex] = text[currentIndex]
      typingContent.value = letters.join('')

      if (isLr) {
        currentIndex++
        if (currentIndex >= text.length) {
          return false
        }
      }
      else {
        currentIndex--
        if (currentIndex < 0) {
          return false
        }
      }
    }, delay)
  }

  const eraseMessage = async (text: string, delay: number = 15): Promise<void> => {
    if (lastText.value !== text) {
      typingContent.value = text
    }
    lastText.value = text

    return createFramedAnimation(() => {
      const letters = [...typingContent.value]

      if (direction.value === 'lr') {
        letters.pop()
      }
      else {
        letters.shift()
      }

      typingContent.value = letters.join('')

      if (letters.length === 0) {
        return false
      }
    }, delay)
  }

  const dismissMessage = async (delay: number = 15): Promise<void> => {
    const map = new Map()
    const indexSet = new Set([...typingContent.value].map((_, i) => i))
    const array = [...indexSet.values()]

    array.forEach((index, i) => {
      const left = [...indexSet.values()]
      const random = Math.round(Math.random())
      const random2 = Math.round(Math.random())
      const random3 = Math.round(Math.random())
      const toDelete = i % 2 ? random + random2 : left.length - 1 - random - random2
      const res = left[toDelete] ?? left[random3 ? 0 : left.length - 1]
      map.set(index, res)
      indexSet.delete(res)
    })

    lettersArray.value = [...typingContent.value].map(letter => ({
      letter,
      visible: true,
    }))

    let dismissIndex = 0

    return createFramedAnimation(() => {
      const index = map.get(dismissIndex)
      if (index !== undefined) {
        lettersArray.value[index].visible = false
      }
      map.delete(dismissIndex)
      dismissIndex++

      if (map.size === 0) {
        return false
      }
    }, delay)
  }

  const stopTyping = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    isTyping.value = false
    typingContent.value = ''
    frameCount = 0
    targetFrames = 0
  }

  const setDirection = (dir: 'lr' | 'rl') => {
    direction.value = dir
  }

  const reset = () => {
    currentResolve = () => {}
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    lastText.value = ''
    currentIndex = 0
    frameCount = 0
    targetFrames = 0
    isTyping.value = false
  }

  return {
    isTyping,
    typingContent,
    typeMessage,
    eraseMessage,
    dismissMessage,
    stopTyping,
    setDirection,
    stop,
    reset,
    lettersArray,
  }
}
