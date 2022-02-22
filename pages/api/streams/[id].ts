import { withAPISession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
  });
  res.json({ ok: true, stream });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: false,
  })
);
