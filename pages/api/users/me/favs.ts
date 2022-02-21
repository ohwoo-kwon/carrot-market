import { withAPISession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const favorites = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });
  res.json({ ok: true, favorites });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
