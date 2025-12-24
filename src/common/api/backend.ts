import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Add JWT token to requests
axios.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('WINDOW_AUTH_SESSION')
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

type User = {
  id: number
  username: string
  email?: string
  password: string
  name: string
  role: string
  token: string
}

const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJ1c2VybmFtZSI6IndpbmRvdyIsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJXaW5kb3ciLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.JvoIJ-1OvGQtAQ2mY4F0zoEfiY4cMfvGld87TJePGm4'

const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' })

const users: User[] = [
  {
    id: 1,
    username: 'window',
    email: 'admin@email.com',
    password: '12345678',
    name: 'Window',
    role: 'Admin',
    token: AUTH_TOKEN,
  },
]

export default function configureBackend() {
  // Remove mock authentication - use real backend API
  // The login will now go to http://localhost:3001/api/auth/login

  mock.onPost('/register').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        const params = JSON.parse(config.data)

        // add new users
        const newUser: User = {
          id: users.length + 1,
          email: params.email,
          username: params.username,
          password: params.password,
          name: params.name,
          role: 'Admin',
          token: AUTH_TOKEN,
        }
        users.push(newUser)

        resolve([200, newUser])
      }, 1000)
    })
  })

  mock.onPost('/forget-password').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        const params = JSON.parse(config.data)

        // find if any user matches login credentials
        const filteredUsers = users.filter((user) => {
          return user.email === params.email
        })

        if (filteredUsers.length) {
          // if login details are valid return user details and fake jwt token
          const responseJson = {
            message: "We've sent you a link to reset password to your registered email.",
          }
          resolve([200, responseJson])
        } else {
          // else return error
          resolve([
            401,
            {
              message: 'Sorry, we could not find any registered user with entered email',
            },
          ])
        }
      }, 1000)
    })
  })
}
