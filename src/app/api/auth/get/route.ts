import { NextRequest, NextResponse } from "next/server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const cf = getRequestContext();
  return NextResponse.json({env: cf.env,process: process.env});
}
export const runtime = "edge";
