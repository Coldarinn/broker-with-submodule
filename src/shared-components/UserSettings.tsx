import { Form as FinalForm, Field as BaseField } from "react-final-form";
import { FieldInput } from "~/Input";
import { Error as ErrorComponent } from "~/Error";
import styled from "@emotion/styled";
import { composeValidators, email, required } from "@/modules/validator";
import { FORM_ERROR } from "final-form";
import { FieldSelect } from "~/Select";
import { accountTypes, useUser } from "@/modules/user";
import { css } from "@emotion/react";

const validatePhoneMask = (value: string) =>
  String(value).includes("_") ? "Некорректный номер телефона" : undefined;

type SettingsModel = {
  name: string;
  accountType: (typeof accountTypes)[number];
  company?: string;
  email: string;
  phone: string;
};

export const UserSettings = () => {
  const { state } = useUser();

  const userData: SettingsModel = {
    name: state.name,
    accountType: accountTypes.find(
      (item) => item.value === state.accountType
    ) ?? { name: "Частный брокер", value: "account_type_broker" },
    company: state.company,
    email: state.email,
    phone: state.phone.substring(1),
  };

  return (
    <FinalForm<SettingsModel>
      initialValues={userData}
      onSubmit={async (body) => {
        try {
          await fetchUpdateUserSettings(body);
        } catch {
          return { [FORM_ERROR]: "Invalid email or password" };
        }
      }}
    >
      {({ values, handleSubmit, submitError }) => (
        <Form onSubmit={handleSubmit}>
          <Title>Настройки профиля</Title>
          <Row
            withBorder={
              !(
                values.accountType &&
                values.accountType.value !== "account_type_broker"
              )
            }
          >
            <Field
              name="name"
              label="ФИО *"
              placeholder="Введите ФИО"
              component={FieldInput}
              validate={required}
              disabled
            />
            <Field
              name="accountType"
              label="КТО ВЫ *"
              placeholder="Кто Вы"
              component={FieldSelect}
              validate={required}
              options={accountTypes}
              disabled
            />
          </Row>
          {values.accountType &&
            values.accountType.value !== "account_type_broker" && (
              <Row withBorder>
                <HiddenField />
                <Field
                  name="company"
                  label="НАЗВАНИЕ КОМПАНИИ *"
                  placeholder="Введите название компании"
                  component={FieldInput}
                  validate={required}
                  disabled
                />
              </Row>
            )}
          <Row>
            <Field
              name="email"
              label="E-MAIL *"
              placeholder="Введите e-mail"
              component={FieldInput}
              validate={email}
              disabled
            />
            <Field
              name="phone"
              label="ТЕЛЕФОН *"
              placeholder="Введите телефон"
              patternFormat="+7 (###) - ### - ## - ##"
              component={FieldInput}
              validate={composeValidators(required, validatePhoneMask)}
              disabled
            />
          </Row>
          {submitError && <ErrorComponent>{submitError}</ErrorComponent>}
        </Form>
      )}
    </FinalForm>
  );
};

const fetchUpdateUserSettings = (body: SettingsModel) => {
  return fetch(`/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body as any,
  }).then((x) => {
    if (!x.ok) {
      throw new Error(x.statusText);
    }
    return x.text();
  });
};

const Form = styled.form`
  width: 752px;
  padding: 24px;

  border-radius: 24px;
  background: #141414;
`;
const Title = styled.div`
  margin-bottom: 24px;

  color: #fff;
  font-size: 24px;
  text-align: center;
`;
const Row = styled.div<{ withBorder?: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  ${({ withBorder }) =>
    withBorder
      ? css`
          padding-bottom: 10px;
          border-bottom: 1px solid #1f1f1f;
          margin-bottom: 24px;
        `
      : css`
          margin-bottom: 10px;
        `}
`;
const Field = styled(BaseField<any>)`
  flex: 1;
  max-width: 50%;
`;
const HiddenField = styled.div`
  flex: 1;
  max-width: 50%;
`;
