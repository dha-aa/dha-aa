import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/dha-aa/database/refs/heads/main/dha-aa/Portfolio.json");
    
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${res.status}` },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}