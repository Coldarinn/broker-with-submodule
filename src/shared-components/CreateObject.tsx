import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { FieldInput } from "~/Input";
import { FieldSelect, option } from "~/Select";
import { Button } from "~/Button";
import { Error as ErrorComponent } from "~/Error";
import { FieldInputFiles } from "~/InputFile";
import { FieldTextArea } from "~/TextArea";
import { composeValidators, maxCountChar, required } from "@/modules/validator";
import styled from "@emotion/styled";
import { customFetch } from "@/modules/fetch";

type Props = {
  onClose: () => void;
  getLandplots: () => void;
};

type ObjectModel = {
  ownerName: string;
  location: option;
  address: string;
  area: number;
  price: number;
  cadastreNumber: string;
  description: string;
  files: File[];
};

export const CreateObject = ({ onClose, getLandplots }: Props) => {
  return (
    <FinalForm<ObjectModel>
      onSubmit={async (body) => {
        try {
          const data = { ...body, location: body.location.name };

          const formData = new FormData();
          for (const key in data) {
            if (
              Object.prototype.hasOwnProperty.call(data, key) &&
              key !== "files"
            ) {
              // @ts-ignore
              formData.append(key, data[key]);
            }
          }

          data.files.forEach((file) => {
            formData.append("files", file);
          });

          await fetchCreateObject(formData);
          getLandplots();
          onClose();
        } catch {
          return { [FORM_ERROR]: "Не удалось создать объект" };
        }
      }}
    >
      {({ values, handleSubmit, submitting, submitError }) => (
        <Form onSubmit={handleSubmit}>
          <Title>Предложить объект</Title>
          <Content>
            <Grid cols={2}>
              <Field
                name="ownerName"
                label="СОБСТВЕННИК ОБЪЕКТА *"
                placeholder="Введите название компании"
                component={FieldInput}
                validate={required}
              />
              <Field
                name="location"
                label="РАСПОЛОЖЕНИЕ *"
                placeholder="Выберите расположение"
                component={FieldSelect}
                validate={required}
                options={locations}
              />
            </Grid>
            <Field
              name="address"
              label="АДРЕС *"
              placeholder="Введите адрес объекта"
              component={FieldInput}
              validate={required}
            />
            <Grid cols={3}>
              <Field
                name="area"
                label="ПЛОАЩДЬ *"
                placeholder="0"
                type="number"
                component={FieldInput}
                validate={required}
                unit="га"
              />
              <Field
                name="price"
                label="ЦЕНА *"
                placeholder="0"
                type="number"
                component={FieldInput}
                validate={required}
                unit="₽"
              />
              <Field
                name="cadastreNumber"
                label="КАДАСТРОВЫЙ НОМЕР *"
                placeholder="00:00:0000000:00"
                component={FieldInput}
                validate={composeValidators(required, validateNumberMask)}
                patternMask="X"
                patternChar="X"
                patternFormat="XX:XX:XXXXXX:XX"
              />
            </Grid>
            <div>
              <Field
                name="description"
                label="ОПИСАНИЕ"
                placeholder="Введите описание объекта"
                component={FieldTextArea}
                validate={composeValidators(required, maxCountChar(2000))}
              />
              <Note>0-2000 символов</Note>
            </div>
          </Content>
          <Field
            name="files"
            component={FieldInputFiles}
            value={values.files}
            maxSizeInMB={50}
            validate={required}
          />
          <Grid cols={2}>
            <Button
              type="button"
              color="secondary"
              isLoading={submitting}
              onClick={onClose}
            >
              ОТМЕНА
            </Button>
            <Button type="submit" isLoading={submitting}>
              СОЗДАТЬ
            </Button>
          </Grid>
          {submitError && <ErrorComponent>{submitError}</ErrorComponent>}
        </Form>
      )}
    </FinalForm>
  );
};

const fetchCreateObject = async (body: FormData) => {
  const data = await customFetch(`/landplot`, {
    method: "POST",
    body,
  });

  if (data.status !== 201) {
    throw new Error();
  }

  return {};
};

const validateNumberMask = (value: string) =>
  String(value).includes("X") ? "Некорректный кадастровый номер" : undefined;

const locations = [
  {
    value: "Москва",
    name: "Москва",
  },
  {
    value: "Новая Москва",
    name: "Новая Москва",
  },
  {
    value: "Московская область",
    name: "Московская область",
  },
  {
    value: "Санкт-Петербург",
    name: "Санкт-Петербург",
  },
  {
    value: "ЛО",
    name: "ЛО",
  },
  {
    value: "Регионы",
    name: "Регионы",
  },
];

const Form = styled.form`
  width: 800px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  border-radius: 24px;
  background: #141414;
`;
const Title = styled.div`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
const Content = styled.div`
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  border-bottom: 1px solid #1f1f1f;
`;
const Grid = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  gap: 24px;
`;
const Note = styled.div`
  color: #fff;
  line-height: 140%;
  letter-spacing: 0.28px;
`;
