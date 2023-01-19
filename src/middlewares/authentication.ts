import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { CONFIG } from "../config/env";
import admin from "../services/admin";
import client from "../services/client";
import user from "../services/user";
import { TokenData } from "../types/jwt";
import authHelper from "../utils/authHelper";
import responseHelper from "../utils/responseHelper";

const generateToken = async (req, res) => {
  try {
    const userPayload = { email: req.email, id: req.id };
    const accessToken = authHelper.createAccessToken(userPayload);
    const refreshToken = authHelper.createRefreshToken(userPayload);
    const decodedRefreshToken: TokenData = jwtDecode(refreshToken);
    const tokens: any = {
      accessToken,
      refreshToken,
      expiresIn: decodedRefreshToken.exp,
      userId: decodedRefreshToken.id,
    };
    return tokens;
  } catch (e) {
    return responseHelper.errorResponse(
      res,
      StatusCodes.NOT_FOUND
    )("Token not found");
  }
};

const authenticate = async (req, res, type) => {
  try {
    const accessToken: any = req.headers["authorization"]
      .replace("Bearer ", "")
      .trim();
    const refreshToken = req.headers["refreshtoken"];
    if (!accessToken) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.UNAUTHORIZED
      )("UNAUTHORIZED");
    }
    const token: TokenData = jwtDecode(accessToken);
    if (!token) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.UNAUTHORIZED
      )("UNAUTHORIZED");
    }
    if (token.exp < ((Date.now() / 1000) | 0)) {
      if (refreshToken) {
        const refreshTokenData: TokenData = jwtDecode(
          refreshToken,
          CONFIG.JWT_REFRESH_SECRET
        );
        if (refreshTokenData.exp < ((Date.now() / 1000) | 0)) {
          return responseHelper.errorResponse(
            res,
            StatusCodes.UNAUTHORIZED
          )("Session expired. Try logging in again.");
        }
        const payload = {
          id: refreshTokenData.id,
          email: refreshTokenData.email,
        };
        await generateToken(payload, res);
      }
      return responseHelper.errorResponse(
        res,
        StatusCodes.NOT_FOUND
      )("Session Expired, Try logging in again");
    }
    const verifyUser: any = await getUserFromToken(
      accessToken,
      CONFIG.JWT_ACCESS_SECRET
    );
    let userData;
    if (type == "admin") {
      userData = await admin.get(verifyUser.email);
    } else if (type == "client") {
      userData = await client.get(verifyUser.email);
    } else {
      userData = await user.get(verifyUser.email);
    }
    if (!userData) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.UNAUTHORIZED
      )("Access Denied");
    }
    return userData;
  } catch (e) {
    return responseHelper.errorResponse(
      res,
      StatusCodes.UNAUTHORIZED
    )("Invalid Token");
  }
};

const getUserFromToken = async (accessToken, secret) => {
  return jwt.verify(accessToken, secret);
};

export default {
  authenticate,
  generateToken,
};
