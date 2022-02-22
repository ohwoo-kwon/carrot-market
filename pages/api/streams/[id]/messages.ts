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
    body: { message },
    session: { user },
  } = req;
  const createdMessage = await client.message.create({
    data: {
      message,
      stream: {
        connect: {
          id: +id.toString(),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({ ok: true, createdMessage });
}

export default withAPISession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
