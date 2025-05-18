import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import { codeInput } from '@sanity/code-input'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'Blog',

  projectId: 'i8budvep',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), codeInput(), ...(isDev ? devOnlyPlugins : [])],
  

  schema: {
    types: schemaTypes,
  },
})

