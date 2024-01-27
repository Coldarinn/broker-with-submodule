const pages = [
  {
    name: "login",
    path: "/login",
  },
  {
    name: "sign-up",
    path: "/sign-up",
  },
  {
    name: "main",
    path: "/",
  },
]

const viewports = [
  { width: 1920, height: 1080 },
  { width: 800, height: 600 },
]

describe("Screenshot pages", () => {
  for (const { name, path } of pages) {
    const isMainPage = name === "main"

    for (const { width, height } of viewports) {
      const fileName = `${name} ${width}x${height}`

      it(`Screenshot for ${fileName}`, () => {
        if (isMainPage) {
          cy.intercept(
            {
              method: "GET",
              url: "http://localhost:8080/api/v1/landplot?limit=4&offset=0",
            },
            { fixture: "landplots" },
          ).as("getLandplots")
        }

        cy.viewport(width, height)
        cy.visit(path, {
          onBeforeLoad: (win) => {
            if (isMainPage) {
              win.localStorage.setItem(
                "userData",
                JSON.stringify({
                  accessToken:
                    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwTFBiM25HT3lFNk1ydUJocDFUODg1aVRpV2tjdTR4bmNWWGhQclV5bmhZIn0.eyJleHAiOjE3MDYxMTk0MTEsImlhdCI6MTcwNjExOTExMSwianRpIjoiMzRhZTE0YzUtZTVlZC00ZGRhLTk1ZjgtOGQ2ODZlYzczMDg4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5icm9rZXIuZnNrLXRlY2gucnUvcmVhbG1zL2Jyb2tlciIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYnJva2VyIiwiYWNjb3VudCJdLCJzdWIiOiJhNDY1M2Q5ZC05OTg0LTQ4ZTYtODMwMy1kM2QwNGEzMWMxYjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJicm9rZXItYXBwIiwic2Vzc2lvbl9zdGF0ZSI6ImJmNTM3MTNlLTRmMDktNDA3MS1iOTJjLTg4OGYwNGVhNTJkYSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1icm9rZXIiLCJhcHBfdXNlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctdXNlcnMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfSwiYnJva2VyIjp7InJvbGVzIjpbInJlYWQtdG9rZW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LWFwcGxpY2F0aW9ucyIsInZpZXctY29uc2VudCIsInZpZXctZ3JvdXBzIiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJtYW5hZ2UtY29uc2VudCIsImRlbGV0ZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmY1MzcxM2UtNGYwOS00MDcxLWI5MmMtODg4ZjA0ZWE1MmRhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJrcGFsa2luNjBAZ21haWwuY29tIiwiZW1haWwiOiJrcGFsa2luNjBAZ21haWwuY29tIn0.pLEdTNM91R2vZ50bmojY7U0W46PyhMNo1Pxyl2HeWMi_lbQPAUO1R7-npFDpXz4BWkavrN-ZhNZe9QGzvPG0MOPmcORjguwcodBXWrBt6LAZj6iMMgWh3IIKK4C4FwsKlk__tMgdZBkhyNQQnRi7wA3X73HJZ-PZ8XSdKmYzLVS-B3PtU8Xaex-we96JxkUWjZm1sCY_h3WlksTr0Eu2yUAMX7Yhp1PkgzOUfG4ztJfu2UzH5EbyE6GgqlN7vvfb3dhMz8ZAR38EnwCZVuIIBE-lpVT0DCRt45RFdJPQ3XgFE7I-JpexAqSNb_3SG_aRyeORKVakqOdzq4SyGx7iJg",
                  refreshToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlZWRiZGUxMy1lNDNjLTRmNzItYmJiZC04ZjBjMjYyYTYzZGEifQ.eyJleHAiOjE3MDYxMjA5MTEsImlhdCI6MTcwNjExOTExMSwianRpIjoiZDhjMzM2NTItZDFjZi00ZDM0LTg0OGYtZGQ4Y2Q3NmE5ODU5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5icm9rZXIuZnNrLXRlY2gucnUvcmVhbG1zL2Jyb2tlciIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuYnJva2VyLmZzay10ZWNoLnJ1L3JlYWxtcy9icm9rZXIiLCJzdWIiOiJhNDY1M2Q5ZC05OTg0LTQ4ZTYtODMwMy1kM2QwNGEzMWMxYjciLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiYnJva2VyLWFwcCIsInNlc3Npb25fc3RhdGUiOiJiZjUzNzEzZS00ZjA5LTQwNzEtYjkyYy04ODhmMDRlYTUyZGEiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJiZjUzNzEzZS00ZjA5LTQwNzEtYjkyYy04ODhmMDRlYTUyZGEifQ.r7-kDwFwRZlf2ql_dVTFbEd5XQWQWI4rgTkKCFSV7xg",
                  realm_access: {
                    roles: [
                      "default-roles-broker",
                      "app_user",
                      "offline_access",
                      "uma_authorization",
                    ],
                  },
                  resource_access: {
                    "realm-management": {
                      roles: [
                        "view-users",
                        "view-authorization",
                        "query-groups",
                        "query-users",
                      ],
                    },
                    broker: {
                      roles: ["read-token"],
                    },
                    account: {
                      roles: [
                        "manage-account",
                        "view-applications",
                        "view-consent",
                        "view-groups",
                        "manage-account-links",
                        "manage-consent",
                        "delete-account",
                        "view-profile",
                      ],
                    },
                  },
                  scope: "profile email",
                  sid: "bf53713e-4f09-4071-b92c-888f04ea52da",
                  email_verified: false,
                  preferred_username: "kpalkin60@gmail.com",
                  email: "kpalkin60@gmail.com",
                  id: 3,
                  name: "Палкин Кирилл Дмитриевич",
                  phone: "79922297423",
                  role: "app_user",
                  company: "coldarinn company",
                  accountType: "account_type_personal",
                  createdAt: "2024-01-22T11:02:09.322Z",
                  updatedAt: "2024-01-22T11:02:09.322Z",
                }),
              )
            }
          },
        })

        if (isMainPage) {
          cy.wait("@getLandplots")
        }

        cy.compareSnapshot(fileName)
      })
    }
  }
})
