<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface WeatherWidgetProps {
  temperature?: number
  condition?: string
  location?: string
  humidity?: number
  windSpeed?: number
}

const props = withDefaults(defineProps<WeatherWidgetProps>(), {
  temperature: 72,
  condition: 'Partly Cloudy',
  location: 'San Francisco, CA',
  humidity: 65,
  windSpeed: 8,
})

const currentTime = ref('')

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000) // Update every minute
})
</script>

<template>
  <div class="weather-widget bg-white rounded-lg shadow-md p-6 max-w-sm">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-800">
        Weather
      </h2>
      <div class="text-sm text-gray-500">
        {{ currentTime }}
      </div>
    </div>

    <div class="text-center mb-4">
      <div class="text-3xl font-bold text-gray-800 mb-1">
        {{ temperature }}°
      </div>
      <div class="text-gray-600">
        {{ condition }}
      </div>
      <div class="text-sm text-gray-500">
        {{ location }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 text-sm">
      <div class="flex justify-between">
        <span class="text-gray-500">Humidity</span>
        <span class="font-medium">{{ humidity }}%</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500">Wind</span>
        <span class="font-medium">{{ windSpeed }} mph</span>
      </div>
    </div>
  </div>
</template>
