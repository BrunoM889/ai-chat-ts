import { NextResponse } from "next/server";
import model from "@/libs/ai";

export async function POST(req: Request) {
  const res: { clientPrompt: string; context: string } = await req.json();

  const result = await model.generateContent(
    `PROMPT DEL USUARIO: ${res.clientPrompt} \n ///// \n CONTEXTO PREVIO: ${res.context}\n`
  );
  const response = await result.response;
  const text: string = response.text();
  const lines: string[] = text.split("\n");

  return NextResponse.json({ autor: "AI", msj: lines });
}
