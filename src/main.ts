import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend integration
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 OXGN API Server running on: http://localhost:${port}`);
  console.log(`📋 Health Check: http://localhost:${port}/health`);
  console.log(`📖 API Info: http://localhost:${port}/api`);
}
bootstrap(); 