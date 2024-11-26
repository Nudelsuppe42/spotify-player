import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
 revalidateTag("player");
 redirect("/")
}
 export const runtime = "edge";