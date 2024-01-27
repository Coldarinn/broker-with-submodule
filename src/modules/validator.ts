export const required = (value: string | Array<unknown>) =>
  !value || value.length === 0 ? "Обязательное поле" : undefined

export const email = (value: string) =>
  (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value,
    )
  ) ?
    undefined
  : "Некорректная почта"

export const minCountChar = (min: number) => (value: string) =>
  value?.length < min ?
    `Число символов должно быть больше ${min - 1}`
  : undefined

export const maxCountChar = (max: number) => (value: string) =>
  value?.length > max ?
    `Число символов должно быть меньше ${max + 1}`
  : undefined

export const confirmPassword = (password1: string) => (password2: string) =>
  password1 === password2 ? undefined : "Пароли должны совпадать"

export const composeValidators =
  (
    ...validators: Array<
      (value: string, allValue: object) => undefined | string
    >
  ) =>
  (value: string, allValue: object) =>
    validators.reduce<undefined | string>(
      (error, validator) => error || validator(value, allValue),
      undefined,
    )
