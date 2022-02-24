import { withAPISession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { METHODS } from "http";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v1/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_API_KEY}`,
        },
      }
    )
  ).json();
  res.json({ ok: true, ...response.result });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: false,
  })
);
