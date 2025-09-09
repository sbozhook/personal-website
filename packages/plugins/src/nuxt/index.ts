import type { } from '@nuxt/schema' // workaround for TS bug with "phantom" deps

import type { Components } from 'caster-ui/constant'
import { addComponent, defineNuxtModule } from '@nuxt/kit'
import { components as allComponents } from 'caster-ui/constant'

export interface ModuleOptions {
  components: Partial<Record<keyof Components, boolean>> | boolean
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@caster-ui/nuxt',
    configKey: 'caster',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: '',
    components: true,
  },
  setup({ prefix, components }) {
    if (components === false) {
      return
    }

    let groupName: keyof Components
    for (groupName in allComponents) {
      if (components === true || components[groupName]) {
        for (const component of allComponents[groupName]) {
          addComponent({
            name: `${prefix}${component}`,
            export: component,
            filePath: 'caster-ui',
          })
        }
      }
    }
  },
})
