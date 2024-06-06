// @ts-check
const { test, expect } = require('@playwright/test')

var id
test('Cadastrando uma reserva', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      "firstname": "Bruno",
      "lastname": "Henrique",
      "totalprice": 111,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2024-06-04",
        "checkout": "2024-06-09",
      },
      "additionalneeds": "super bowls"
    }
  })
  console.log(await response.json())
  const responseBody = await response.json()
  // expect(responseBody.booking).toHaveProperty("firstname", "Bruno")
  // expect(responseBody.booking).toHaveProperty("lastname", "Henrique")
  // expect(responseBody.booking).toHaveProperty("totalprice", 111)
  // expect(responseBody.booking).toHaveProperty("depositpaid", true)
  id = responseBody.bookingid
  console.log("Seu id é: " + id)
})