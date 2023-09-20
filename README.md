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