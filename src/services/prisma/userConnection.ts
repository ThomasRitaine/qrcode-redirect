import { PrismaClient, type UserConnection } from "@prisma/client";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

const prisma = new PrismaClient();

// function to extract user data and create a new user connection
export const createUserConnection = async (
  ip: string,
  userAgent: string,
  redirectionId: string,
): Promise<UserConnection> => {
  // Get data from the IP address and user agent
  const geo = geoip.lookup(ip);
  const userAgentParsed = new UAParser(userAgent);

  // Create a new user connection
  const userConnection = await prisma.userConnection.create({
    data: {
      ip,
      ipRange: geo?.range,
      timezone: geo?.timezone,
      countryCode: geo?.country,
      regionCode: geo?.region,
      city: geo?.city,
      coordinates: geo?.ll,
      accuracyRadius: geo?.area,
      deviceModel: userAgentParsed.getDevice().model,
      deviceType: userAgentParsed.getDevice().type,
      deviceVendor: userAgentParsed.getDevice().vendor,
      osName: userAgentParsed.getOS().name,
      osVersion: userAgentParsed.getOS().version,
      browserName: userAgentParsed.getBrowser().name,
      browserVersion: userAgentParsed.getBrowser().version,
      redirection: {
        connect: {
          id: redirectionId,
        },
      },
    },
  });
  return userConnection;
};
