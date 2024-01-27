import React from "react";
import { Form as FinalForm, Field as BaseField } from "react-final-form";
import { FieldInput } from "~/Input";
import { Error as ErrorComponent } from "~/Error";
import styled from "@emotion/styled";
import {
  composeValidators,
  confirmPassword,
  email,
  minCountChar,
  required,
} from "@/modules/validator";
import { FORM_ERROR } from "final-form";
import { useNavigate } from "react-router-dom";
import { Link as BaseLink } from "~/Link.ts";
import { Button as BaseButton } from "~/Button";
import { Layout } from "@/shared-components/Layout";
import { FieldSelect } from "~/Select";
import { accountTypes, validatePhoneMask } from "@/modules/user";
import { css } from "@emotion/react";
import { customFetch } from "@/modules/fetch";

type SignUpModel = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  accountType: (typeof accountTypes)[number];
  phone: string;
  company?: string;
};

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [isSuccess] = React.useState(false);

  if (isSuccess) {
    return (
      <Layout>
        <SuccessBlock>
          <Title>Подтвердите аккаунт</Title>
          <Text>
            На вашу электронную почту отправлено письмо с подтверждением.
            Следуйсте инструкциям в письме, чтобы завершить регистрацию.
          </Text>
          <Button type="button" onClick={() => navigate("/login")}>
            ОК
          </Button>
        </SuccessBlock>
      </Layout>
    );
  }

  return (
    <FinalForm<SignUpModel>
      onSubmit={async (body) => {
        try {
          await fetchSignUp(body);
          // setIsSuccess(true)
          navigate("/login");
        } catch (error) {
          return { [FORM_ERROR]: (error as Error).message };
        }
      }}
    >
      {({ values, handleSubmit, submitting, submitError }) => (
        <Layout>
          <Form onSubmit={handleSubmit}>
            <Title>Создать аккаунт</Title>
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
              />
              <Field
                name="accountType"
                label="КТО ВЫ *"
                placeholder="Кто Вы"
                component={FieldSelect}
                validate={required}
                options={accountTypes}
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
                  />
                </Row>
              )}
            <Row withBorder>
              <Field
                name="email"
                label="E-MAIL *"
                placeholder="Введите e-mail"
                component={FieldInput}
                validate={email}
              />
              <Field
                name="phone"
                label="ТЕЛЕФОН *"
                placeholder="Введите телефон"
                patternFormat="+7 (###) - ### - ## - ##"
                component={FieldInput}
                validate={composeValidators(required, validatePhoneMask)}
              />
            </Row>
            <Row withBorder>
              <Field
                name="password"
                label="ПРИДУМАЙТЕ ПАРОЛЬ"
                placeholder="Введите пароль"
                type="password"
                component={FieldInput}
                validate={composeValidators(required, minCountChar(6))}
              />
              <Field
                name="confirmPassword"
                label="ПОВТОРИТЕ ПАРОЛЬ"
                placeholder="Введите пароль"
                type="password"
                component={FieldInput}
                validate={confirmPassword(values.password)}
              />
            </Row>
            <Button type="submit" isLoading={submitting}>
              СОЗДАТЬ АККАУНТ
            </Button>
            {submitError && <ErrorComponent>{submitError}</ErrorComponent>}
            <Link to="/login">У меня уже есть аккаунт</Link>
          </Form>
        </Layout>
      )}
    </FinalForm>
  );
};

const fetchSignUp = async ({ confirmPassword: _, ...body }: SignUpModel) => {
  const response = await customFetch(`/auth/signup`, {
    method: "POST",
    body: {
      ...body,
      phone: +body.phone.replace(/\D/g, ""),
      accountType: body.accountType.value,
      role: "app_user",
    } as any,
  });

  if (response.status !== 201) {
    const message = (await response.json())?.message;
    throw new Error(
      message
        ? message?.join?.("; ") ?? message
        : "Не удалось зарегистрироваться"
    );
  }

  return response;
};

const Title = styled.div`
  margin: 0 auto 24px;
  text-align: center;

  color: #fff;
  font-size: 32px;
`;

const SuccessBlock = styled.div`
  margin: auto;
  width: 364px;
`;

const Text = styled.div`
  text-align: center;
  margin-bottom: 24px;

  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.28px;
`;

const Form = styled.form`
  margin: auto;
  width: 752px;
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

const Button = styled(BaseButton)`
  width: 100%;
`;

const Link = styled(BaseLink)`
  display: block;
  text-align: center;
  margin-top: 24px;
`;

const Field = styled(BaseField<any>)`
  flex: 1;
  max-width: 50%;
`;

const HiddenField = styled.div`
  flex: 1;
  max-width: 50%;
`;
