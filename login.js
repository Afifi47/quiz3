let dbUsers = [
  {
      Username: "Ipi",
      Password: "767343",
      Name: "Afifi",
      Email: "afifiasri007@gmail.com"
  },
  {
      Username: "Tadak",
      Password: "197000",
      Name: "Harith",
      Email: "tadakikun@gmail.com"
  },
  {
      Username: "Anep",
      Password: "999999",
      Name: "Haniff",
      Email: "haniff@gmail.com"
  }
]
function register(reqUsername,reqPassword,reqName,reqEmail){
  dbUsers.push({
      Username: reqUsername,
      Password: reqPassword,
      Name: reqName,
      Email: reqEmail
  })
}

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)

  let result = login(
    req.body.Username,
    req.body.Password,
    )
  res.send(result)
})

function login(reqUsername, reqPassword){
  let matchUser = dbUsers.find(
      user => user.Username == reqUsername
  )
  if(!matchUser) return "User not found!"
  if(matchUser.Password==reqPassword){
      return matchUser
  }else{
      return "invalid password"
  }

}

app.post('/register', (req, res) => {
  let result = register(
    req.body.Username,
    req.body.Password,
    req.body.Name,
    req.body.Email
  )
  res.send(result)
})

app.get('/', (req, res) => {
  res.send('Hello UTeM!')
})

app.get('/bye', (req, res) => {
  res.send('Bye Bye UTeM!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// try to login
//console.log(login("Ipi", "767343"))
//console.log(login("Afifi", "767343"))
//console.log(login("Anep", "999999"))

//register("Penyu","123456","Amir","penyu@gmail.com")
//console.log(login("Penyu","123456"))