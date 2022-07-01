import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Anonymous Post')
  .setDescription('Anonymous Post API Document')
  .setVersion('1.0')
  .build();
