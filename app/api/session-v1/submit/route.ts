import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      gender,
      age,
      serviceType,
      problemType,
      priceTier,
      answers,
      submittedAt,
    } = body;

    const leadRecord = {
      name: name || "Anonymous",
      email: email || "",
      gender: gender || answers?.["q_gender"] || "",
      age: age || answers?.["q_age"] || "",
      service_type: serviceType || "individual",
      problem_type: problemType || "porn",
      price_tier: priceTier || "Free",
      answers: answers || {},
      created_at: submittedAt || new Date().toISOString(),
    };

    console.log("[Session V1 Lead API] Received submission:", {
      name: leadRecord.name,
      email: leadRecord.email,
      gender: leadRecord.gender,
      age: leadRecord.age,
      price_tier: leadRecord.price_tier,
      service_type: leadRecord.service_type,
      problem_type: leadRecord.problem_type,
    });

    let supabaseError: string | null = null;
    let insertedData = null;

    try {
      const { data, error } = await supabase
        .from("session_v1_leads")
        .insert([leadRecord])
        .select();

      if (error) {
        console.warn("[Session V1 Lead API] Supabase insertion note:", error.message);
        supabaseError = error.message;
      } else {
        insertedData = data;
        console.log("[Session V1 Lead API] Successfully inserted lead into Supabase table session_v1_leads!");
      }
    } catch (err: any) {
      console.warn("[Session V1 Lead API] Supabase request error:", err?.message || err);
      supabaseError = err?.message || String(err);
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      lead: leadRecord,
      supabaseInserted: !supabaseError,
      supabaseError,
      data: insertedData,
    });
  } catch (error: any) {
    console.error("[Session V1 Lead API] Server error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process lead" },
      { status: 500 }
    );
  }
}
