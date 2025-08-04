import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'OXGN API',
      version: '1.0.0',
    };
  }

  @Get('api')
  getApiInfo() {
    return {
      name: 'OXGN Artist-Fan Platform API',
      version: '1.0.0',
      description: 'Backend API for the OXGN artist-fan subscription platform',
      endpoints: {
        health: '/health',
        auth: '/auth/*',
        users: '/users/*',
        artists: '/artists/*',
        posts: '/posts/*',
      },
    };
  }
}
