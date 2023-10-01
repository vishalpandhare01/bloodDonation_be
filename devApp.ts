// devApp.js
const nodemon = require('nodemon')
const ngrok = require('ngrok')
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT 

  nodemon({
    script: 'index.ts',
    ext: 'ts'
  })

 let url: null = null

  nodemon.on('start', async () => {
  console.log('index.ts just started')
   if (!url) {
     url = await ngrok.connect({ port: port })
     console.log(`Server now available at ${url}`)
   }
  }).on('quit', async () => {
   console.log('killing insex.ts')
   await ngrok.kill()
  })

  