import { Form as FinalForm, Field } from "react-final-form"
import { FORM_ERROR } from "final-form"
import { Button } from "@/uikit/Button"
import { Error as ErrorComponent } from "@/uikit/Error"
import { FieldInputFiles } from "@/uikit/InputFile"
import { required } from "@/modules/validator"
import styled from "@emotion/styled"
import { customFetch } from "@/modules/fetch"

type Props = {
  id: string
  onClose: () => void
  increaseFiles: (count: number) => void
}

type AddFilesModel = {
  file: File[]
}

export const AddFiles = ({ id, onClose, increaseFiles }: Props) => {
  return (
    <FinalForm<AddFilesModel>
      onSubmit={async (body) => {
        try {
          const formData = new FormData()

          body.file.forEach((file) => {
            formData.append("file", file)
          })

          await fetchAddFiles(id, formData)
          increaseFiles(body.file.length)
          onClose()
        } catch {
          return { [FORM_ERROR]: "Не удалось добавить файлы" }
        }
      }}
    >
      {({ values, handleSubmit, submitting, submitError }) => (
        <Form onSubmit={handleSubmit}>
          <Title>Добавить файлы в объект №{id} </Title>
          <Field
            name="file"
            component={FieldInputFiles}
            value={values.file}
            maxSizeInMB={50}
            validate={required}
          />
          <Grid>
            <Button
              type="button"
              color="secondary"
              isLoading={submitting}
              onClick={onClose}
            >
              ОТМЕНА
            </Button>
            <Button type="submit" isLoading={submitting}>
              СОХРАНИТЬ
            </Button>
          </Grid>
          {submitError && <ErrorComponent>{submitError}</ErrorComponent>}
        </Form>
      )}
    </FinalForm>
  )
}

const fetchAddFiles = async (id: string, body: FormData) => {
  const data = await customFetch(`/landplot/file/${id}`, {
    method: "POST",
    body,
  })

  if (data.status !== 201) {
    throw new Error()
  }

  return {}
}

const Form = styled.form`
  width: 800px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  border-radius: 24px;
  background: #141414;
`
const Title = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;

  border-bottom: 1px solid #1f1f1f;

  color: #fff;
  font-size: 24px;
  text-align: center;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`
