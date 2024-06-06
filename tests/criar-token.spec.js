// @ts-check
const { test, expect } = require('@playwright/test')

var token
test('Atualização Parcial', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  })

  console.log(await response.json())
  const responseBody = await response.json()
  token = responseBody.token
  console.log("Seu token é: " + token)

  const partialUpdateRequest = await request.patch('/booking/278', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Cookie": `token=${token}`
    },
    data: {
      "firstname": "Bruno",
      "lastname": "Felix",
      "totalprice": 222,
      "depositpaid": false,
    }
  })
  console.log(await partialUpdateRequest.json())
})