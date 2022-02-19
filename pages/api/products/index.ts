import { withAPISession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const products = await client.product.findMany({});
    res.json({ ok: true, products });
  }
  if (req.method === "POST") {
    const { name, price, description } = req.body;
    const { user } = req.session;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, product });
  }
}

export default withAPISession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);