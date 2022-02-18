import { prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const user = await client.user.upsert({
    where: {
      ...(phone ? { phone: +phone } : {}),
      ...(email ? { email } : {}),
    },
    create: {
      name: "Anonymous",
      ...(phone ? { phone: +phone } : {}),
      ...(email ? { email } : {}),
    },
    update: {},
  });
  console.log(user);
  // if (email) {
  //   user = await client.user.findFirst({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (!user) {
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         email,
  //       },
  //     });
  //   }
  // }
  // if (phone) {
  //   user = await client.user.findFirst({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (!user) {
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         phone: +phone,
  //       },
  //     });
  //   }
  // }
  return res.status(200).end();
}

export default withHandler("POST", handler);
