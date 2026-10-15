import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

const SEED = 12847;

export async function GET() {
  const { count, error } = await supabase
    .from("addiction_votes")
    .select("*", { count: "exact", head: true });

  if (error) return NextResponse.json({ count: SEED });
  return NextResponse.json({ count: SEED + (count ?? 0) });
}

export async function POST() {
  const { error } = await supabase
    .from("addiction_votes")
    .insert({ voted_at: new Date().toISOString() });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { count } = await supabase
    .from("addiction_votes")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ count: SEED + (count ?? 0) });
}
