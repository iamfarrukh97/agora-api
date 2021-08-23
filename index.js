// HTTP basic authentication example in node.js using the RTC Server RESTful API
const https = require('https')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

// Customer ID
const customerKey = process.env.customerId
// Customer secret
const customerSecret = process.env.secretKey
// Concatenate customer key and customer secret and use base64 to encode the concatenated string
const plainCredential = customerKey + ':' + customerSecret
// Encode with base64
encodedCredential = Buffer.from(plainCredential).toString('base64')
authorizationField = 'Basic ' + encodedCredential

// Set request parameters
const options = {
  hostname: 'api.agora.io',
  port: 443,
  path: '/dev/v1/projects',
  method: 'GET',
  headers: {
    Authorization: authorizationField,
    'Content-Type': 'application/json'
  }
}
const options1 = {
  hostname: 'api.agora.io',
  port: 443,
  path: '/dev/v1/channel/e2168f29e26546e6b16b92e31a9b643f',
  method: 'GET',
  headers: {
    Authorization: authorizationField,
    'Content-Type': 'application/json'
  }
}

// Create request object and send request
const req = https.request(options1, res => {
  console.log(`Status code: ${res.statusCode}`)
  //   console.log(`res :`, res.data)

  res.on('data', d => {
    // console.log('d', d)
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
