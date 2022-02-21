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
  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: {
      createdBy: { select: { id: true, name: true, avatar: true } },
    },
  });

  res.json({ ok: true, reviews });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: false,
  })
);
