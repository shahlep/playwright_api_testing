import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'

  test('Simple API Test - Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/3`)
    expect(response.status()).toBe(200)
    //asserting the response
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.data.id).toBe(3)
    expect(responseBody.data.first_name).toBe('Emma')
    expect(responseBody.data.last_name).toBe('Wong')
    expect(responseBody.data.email).toBeTruthy()
    expect(responseBody.support.url).toBe('https://reqres.in/#support-heading')
    expect(responseBody.support.text).toBe('To keep ReqRes free, contributions towards server costs are appreciated!')

  })
  test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
    expect(response.status()).toBe(404)
  })
  test('POST Request - Create New User', async ({ request }) => {
    const response = await request.post(`${baseUrl}/user`, {
      data: {
        id: 1000,
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.id).toBe(1000)
    expect(responseBody.createdAt).toBeTruthy()
  })
  

})