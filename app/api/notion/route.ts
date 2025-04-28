import { buildFinalData } from "@/data/notion";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    try {
        const res = await buildFinalData();
        return NextResponse.json(res)

    } catch(error) {
        console.log(error)
    }
    
  
}