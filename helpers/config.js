let bearerToken = `${process.env.API_TOKEN}`

const config = {
  headers: {
    'Authorization': 'Bearer ' + bearerToken,
    'Content-Type': 'application/json'
  },
}

module.exports = config
