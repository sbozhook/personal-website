import { ref } from 'vue'

export function useTypingAnimation(initialContent = '') {
  const isTyping = ref(false)
  const preserve = ref(true)
  const typingContent = ref(initialContent)
  const direction = ref('lr')
  const lastText = ref('')
  const lettersArray = ref<Array<{ letter: string, visible: boolean }>>([...typingContent.value].map(letter => ({
    letter,
    visible: true,
  })))
  let currentResolve = () => null
  let timeOut = 0
  let lrIndex = 0
  let rlIndex = 0

  const stop = () => {
    if (!isTyping.value) {
      return
    }
    clearTimeout(timeOut)
    isTyping.value = false
    currentResolve()
    currentResolve = () => null
  }

  function shuffle(array: Array<unknown>) {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]] // swap
    }
    return arr
  }

  const typeMessage = async (text: string, delay: number = 15): Promise<void> => {
    return new Promise((resolve) => {
      currentResolve = resolve as typeof currentResolve
      isTyping.value = true
      if (lastText.value !== text) {
        typingContent.value = preserve.value ? ' '.repeat(text.length) : ''
        lrIndex = 0
        rlIndex = text.length - 1
      }
      lastText.value = ''
      let currentIndex = direction.value === 'lr' ? lrIndex : rlIndex
      const typeChar = () => {
        const isLr = direction.value === 'lr'
        if (isLr && currentIndex <= text.length) {
          const letters = [...typingContent.value]
          letters[currentIndex] = text[currentIndex]
          typingContent.value = letters.join('')
          isLr ? lrIndex++ : rlIndex--
          currentIndex = isLr ? lrIndex : rlIndex

          if (currentIndex <= text.length) {
            timeOut = setTimeout(typeChar, delay) as unknown as number
          }
          else {
            // Finished typing
            stop()
          }
        }
        else {
          const letters = [...typingContent.value]
          letters[currentIndex] = text[currentIndex]
          typingContent.value = letters.join('')

          isLr ? lrIndex++ : rlIndex--
          currentIndex = isLr ? lrIndex : rlIndex

          if (currentIndex <= text.length) {
            timeOut = setTimeout(typeChar, delay) as unknown as number
          }
          else {
            // Finished typing
            stop()
          }
        }
      }

      typeChar()
    })
  }

  const eraseMessage = async (text: string, delay: number = 15): Promise<void> => {
    return new Promise((resolve) => {
      currentResolve = resolve as typeof currentResolve
      isTyping.value = true
      if (lastText.value !== text) {
        typingContent.value = text
        lrIndex = 0
        rlIndex = text.length - 1
      }
      lastText.value = text
      let currentIndex = direction.value === 'lr' ? lrIndex : rlIndex
      const typeChar = () => {
        const isLr = direction.value === 'lr'
        if (isLr && currentIndex <= text.length) {
          const letters = [...typingContent.value]
          letters.pop()
          typingContent.value = letters.join('')
          isLr ? lrIndex++ : rlIndex--
          currentIndex = isLr ? lrIndex : rlIndex

          if (currentIndex <= text.length) {
            timeOut = setTimeout(typeChar, delay) as unknown as number
          }
          else {
            // Finished typing
            stop()
          }
        }
        else {
          const letters = [...typingContent.value]
          letters.shift()
          typingContent.value = letters.join('')

          isLr ? lrIndex++ : rlIndex--
          currentIndex = isLr ? lrIndex : rlIndex

          if (currentIndex <= text.length) {
            timeOut = setTimeout(typeChar, delay) as unknown as number
          }
          else {
            // Finished typing
            stop()
          }
        }
      }

      typeChar()
    })
  }

  const dismissMessage = async (delay: number = 15): Promise<void> => {
    return new Promise((resolve) => {
      const map = new Map()
      const indexSet = new Set([...typingContent.value].map((t, i) => i))
      const array = [...indexSet.values()]
      array.forEach((index, i) => {
        const left = [...indexSet.values()]
        const random = Math.round(Math.random())
        const random2 = Math.round(Math.random())
        const random3 = Math.round(Math.random())
        const toDelete = i % 2 ? 0 + random + random2 : left.length - 1 - random - random2
        const res = left[toDelete] ?? left[random3 ? 0 : left.length - 1]
        map.set(index, res)
        indexSet.delete(res)
      })
      currentResolve = resolve as typeof currentResolve
      isTyping.value = true
      let currentIndex = 0
      const typeChar = () => {
        const index = map.get(currentIndex)

        lettersArray.value[index].visible = false
        map.delete(currentIndex)
        currentIndex++

        if (map.size) {
          timeOut = setTimeout(typeChar, delay) as unknown as number
        }
        else {
          // Finished typing
          stop()
        }
      }

      typeChar()
    })
  }

  const stopTyping = () => {
    isTyping.value = false
    typingContent.value = ''
  }

  const setDirection = (dir: 'lr' | 'rl') => {
    direction.value = dir
  }

  const reset = (lrIndex = 0) => {
    currentResolve = () => null
    timeOut = 0
    lastText.value = ''
    lrIndex = 0
    rlIndex = 0
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
