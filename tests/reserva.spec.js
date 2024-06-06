const { test, expect } = require('@playwright/test')

test.describe.serial('Reservas', () => {
  let id
  let token

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

    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    id = responseBody.bookingid

    console.log(responseBody)
    console.log("Seu id é: " + id)

    expect(responseBody.booking).toHaveProperty("firstname", "Bruno")
    expect(responseBody.booking).toHaveProperty("lastname", "Henrique")
    expect(responseBody.booking).toHaveProperty("totalprice", 111)
    expect(responseBody.booking).toHaveProperty("depositpaid", true)
  })

  test('Consultando as reservas cadastradas por id', async ({ request }) => {
    const response = await request.get(`/booking/${id}`)

    expect(response.ok()).toBeTruthy()

    const jsonBody = await response.json()
    console.log(jsonBody)

    expect(jsonBody).toHaveProperty("firstname", "Bruno")
    expect(jsonBody).toHaveProperty("lastname", "Henrique")
    expect(jsonBody).toHaveProperty("totalprice", 111)
    expect(jsonBody).toHaveProperty("depositpaid", true)
  })

  test('Consultando todas as reservas cadastradas', async ({ request }) => {
    const response = await request.get('/booking')

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    console.log(await response.json())
  })

  test('Atualização Parcial', async ({ request }) => {
    const authResponse = await request.post('/auth', {
      data: {
        "username": "admin",
        "password": "password123"
      }
    })

    const responseBody = await authResponse.json()
    token = responseBody.token
    
    console.log(await authResponse.json())
    console.log("Seu token é: " + token)

    const partialUpdateRequest = await request.patch(`/booking/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": `token=${token}`
      },
      data: {
        "firstname": "Bruno",
        "lastname": "Henrique 2",
        "totalprice": 222,
        "depositpaid": false,
      }
    })

    expect(partialUpdateRequest.ok()).toBeTruthy()

    const updateResponseBody = await partialUpdateRequest.json()

    console.log(updateResponseBody)

    expect(updateResponseBody).toHaveProperty("firstname", "Bruno")
    expect(updateResponseBody).toHaveProperty("lastname", "Henrique 2")
    expect(updateResponseBody).toHaveProperty("totalprice", 222)
    expect(updateResponseBody).toHaveProperty("depositpaid", false)
  })
})
