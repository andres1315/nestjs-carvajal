import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

export const validateToken = ({ authorization }) => {
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }

  const decodedToken = token
    ? jwt.verify(token, configService.get('SECRET_JWT'))
    : {};
  console.log(decodedToken);
  if (!token || !decodedToken)
    return {
      message: 'token missing or invalid',
      data: [],
      status: 400,
      success: false,
    };
  return { success: true };
};
