import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

client.user.create({
  data: {
    email: "hi@naver.com",
    name: "hi",
  },
});
