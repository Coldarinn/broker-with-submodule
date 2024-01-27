import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { FieldInput } from "~/Input";
import { Error as ErrorComponent } from "~/Error";
import styled from "@emotion/styled";
import { email, required } from "@/modules/validator";
import { FORM_ERROR } from "final-form";
import { useNavigate } from "react-router-dom";
import { Link } from "~/Link.ts";
import { Button as BaseButton } from "~/Button";
import { Layout } from "@/shared-components/Layout";
import { customFetch } from "@/modules/fetch";
import { parseJWT, useUser } from "@/modules/user";

type LoginModel = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { setUser } = useUser();

  const navigate = useNavigate();
  return (
    <FinalForm<LoginModel>
      onSubmit={async (body) => {
        try {
          const data = await fetchLogin(body);
          const decodedToken = parseJWT(data.accessToken);

          const userDataResponse = await customFetch("/user", {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          }).then((res) => res.json());

          const userData = { ...data, ...decodedToken, ...userDataResponse };

          localStorage.setItem("userData", JSON.stringify(userData));

          setUser(userData);

          navigate("/");
        } catch {
          return { [FORM_ERROR]: "Неверная почта или пароль" };
        }
      }}
    >
      {({ handleSubmit, submitting, submitError }) => (
        <Layout>
          <Form onSubmit={handleSubmit}>
            <Title>Авторизация</Title>
            <Field
              name="email"
              label="E-MAIL *"
              placeholder="Введите e-mail"
              component={FieldInput}
              validate={email}
            />
            <Field
              name="password"
              label="ПАРОЛЬ"
              placeholder="Введите пароль"
              type="password"
              component={FieldInput}
              validate={required}
            />
            <Button type="submit" isLoading={submitting}>
              ВОЙТИ
            </Button>
            {submitError && <ErrorComponent>{submitError}</ErrorComponent>}
            <Row>
              {/*<Text>Не помню почту или пароль</Text>*/}
              <Link to="/sign-up">У меня нет аккаунта</Link>
            </Row>
          </Form>
        </Layout>
      )}
    </FinalForm>
  );
};

const fetchLogin = async (body: LoginModel) => {
  const data = await customFetch("/auth/login", {
    method: "POST",
    body: body as any,
  }).then((res) => res.json());

  if (!data.accessToken) {
    throw new Error();
  }

  return data;
};

const Form = styled.form`
  margin: auto;
  width: 364px;

  display: grid;
  gap: 12px;
`;

const Title = styled.div`
  margin: 0 auto 24px;
  text-align: center;

  color: #fff;
  font-size: 32px;
`;

const Button = styled(BaseButton)`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// const Text = styled.div`
//   color: #fff;
//   font-size: 14px;
//   line-height: 140%;
//   letter-spacing: 0.28px;
// `
