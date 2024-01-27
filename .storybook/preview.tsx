import { DndProvider } from "react-dnd"
import type { Preview } from "@storybook/react"
import { HTML5Backend } from "react-dnd-html5-backend"
import "../src/global.css"

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <DndProvider backend={HTML5Backend}>
          <Story />
        </DndProvider>
      )
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
