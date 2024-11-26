import { NextApiRequest, NextApiResponse } from "next";

import { randomBytes } from "crypto";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(req: NextApiRequest) {
 revalidateTag("player");
 redirect("/")
}
