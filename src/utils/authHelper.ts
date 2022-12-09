import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {ACCESS_KEY_FORMAT, JWT_EXPIRY_TIME, JWT_REFRESH_EXPIRY} from '../config/constant';
import {CONFIG} from '../config/env';

const createAccessToken = (body) => {
  return jwt.sign(body, CONFIG.JWT_ACCESS_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });
};

const createRefreshToken = (body) => {
  return jwt.sign(body, CONFIG.JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRY,
  });
};

const authenticatePassword = (currentPassword, userPassword) => {
  return bcrypt.compareSync(currentPassword, userPassword);
};


const createProjectAccessKey=async (format = ACCESS_KEY_FORMAT)=>{
  const buffer: any = await bcrypt.genSalt(Number(CONFIG.SALT));
  const hashKey: any = await bcrypt.hash(CONFIG.API_SECRET, buffer.toString(format));
  return {buffer, hashKey};
};

const checkProjectAccess=async (key, format = ACCESS_KEY_FORMAT)=>{
  const hashKey: any = await bcrypt.hash(CONFIG.API_SECRET, key.toString(format));
  return hashKey;
};

export default {
  createAccessToken,
  createRefreshToken,
  authenticatePassword,
  createProjectAccessKey,
  checkProjectAccess,
};
