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
const jwt = require('jsonwebtoken');

app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)

  let result = login(
    req.body.Username,
    req.body.Password,
    )

    let token = generateToken(result)
  res.send(token)
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

app.get('/bye', verifyToken, (req, res) => {
  res.send('Bye Bye UTeM!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function register(reqUsername,reqPassword,reqName,reqEmail){
}

function generateToken(userData){
    const token = jwt.sign(
        userData,
        'inipassword' ,
        {expiresIn: 60 },
    );
    return token
}

function verifyToken(req, res, next) {
    let header = req.headers.authorization
    console.log(header)

    let token = header.split(' ')[1]

    jwt.verify(token, 'inipassword', function(err, decoded) {
        if(err) {
            res.send("Invalid Token")
        }

        req.user = decoded
        next()
    });
}