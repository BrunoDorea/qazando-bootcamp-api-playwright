// @ts-check
const { test, expect } = require('@playwright/test')
test('Consultando as reservas cadastradas', async ({ request }) => {
  const response = await request.get('/booking')
  console.log(await response.json())
  expect(response.ok()).toBeTruthy()  // Verifica se a resposta da API foi bem sucedida
  expect(response.status()).toBe(200) // Verifica se o status code é 200
})

test('Consultando as reservas cadastradas por id', async ({ request }) => {
  const response = await request.get('/booking/278')
  const jsonBody = await response.json()
  console.log(jsonBody)
  // expect(jsonBody.firstname).toBe('John')
  // expect(jsonBody.lastname).toBe('Smith')
  // expect(jsonBody.totalprice).toBe(111)
})