export type User = {
  name: string
  email: string
  phone: string
  accountType: accountType
  company: string
  role: "app_admin" | "app_user"
  accessToken: string
  refreshToken: string
}

export type accountType =
  | "account_type_broker"
  | "account_type_personal"
  | "account_type_company"

export const accountTypes = [
  {
    name: "Частный брокер",
    value: "account_type_broker",
  },
  {
    name: "Собственник",
    value: "account_type_personal",
  },
  {
    name: "Компания",
    value: "account_type_company",
  },
] as const
