import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const port = process.env.PORT
  console.info(`Starting server on port ${port}`)
  await app.listen(port)
}
bootstrap()
