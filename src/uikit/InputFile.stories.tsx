import React from "react"
import { Meta } from "@storybook/react"
import { InputFiles } from "./InputFile.tsx"

export default {
  title: "Components/InputFile",
  component: InputFiles,
} as Meta

const createMockFile = () => new File(["foo"], "foo.txt")

export const Base = () => {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <div>
      <h1>Interactive </h1>
      <InputFiles
        name={"input-file-name"}
        onChange={setFiles}
        value={files}
        maxSizeInMB={50}
      />
      <h1>With error</h1>
      <InputFiles
        name={"input-file-name"}
        onChange={() => {}}
        value={[
          createMockFile(),
          createMockFile(),
          createMockFile(),
          createMockFile(),
        ]}
        maxSizeInMB={0}
      />
    </div>
  )
}
