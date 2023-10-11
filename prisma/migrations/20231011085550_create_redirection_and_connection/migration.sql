-- CreateTable
CREATE TABLE "Redirection" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redirection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserConnection" (
    "id" TEXT NOT NULL,
    "redirectionId" TEXT NOT NULL,
    "ip" TEXT,
    "ipRange" BIGINT[],
    "timezone" TEXT,
    "countryCode" TEXT,
    "regionCode" TEXT,
    "city" TEXT,
    "coordinates" DOUBLE PRECISION[],
    "accuracyRadius" INTEGER,
    "deviceModel" TEXT,
    "deviceType" TEXT,
    "deviceVendor" TEXT,
    "osName" TEXT,
    "osVersion" TEXT,
    "browserName" TEXT,
    "browserVersion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserConnection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserConnection" ADD CONSTRAINT "UserConnection_redirectionId_fkey" FOREIGN KEY ("redirectionId") REFERENCES "Redirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
