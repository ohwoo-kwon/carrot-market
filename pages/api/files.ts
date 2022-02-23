import { withAPISession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  res.json({ ok: true, url: "" });
}

export default withAPISession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
