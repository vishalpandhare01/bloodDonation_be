###### Typescript support
- npm init --yes
- npm install express dotenv
- npm i -D typescript @types/express @types/node
- npx tsc --init
- npm install -D concurrently nodemon

##### postgesql
- npm install pg
- npm install prisma
- npx prisma init
- npm i @prisma/client
- add in env file :- DATABASE_URL = 'postgres://YourUserName:YourPassword@localhost:5432/your-DB-name'
- create db folder and add :-
- ==================================================
- import { PrismaClient } from "@prisma/client";
- const prisma = new PrismaClient()
- export default prisma
- ==================================================
- in production 
- npm install nodemon --save-dev
- npm install ngrok --save-dev

 // devApp.js
  const nodemon = require('nodemon')
+ const ngrok = require('ngrok')
+ const port = process.env.PORT || 3000

  nodemon({
    script: 'app.js',
    ext: 'js'
  })

+ let url = null

  nodemon.on('start', async () => {
-   console.log('app.js just started')
+   if (!url) {
+     url = await ngrok.connect({ port: port })
+     console.log(`Server now available at ${url}`)
+   }
  }).on('quit', async () => {
-   console.log('killing app.js')
+   await ngrok.kill()
  })