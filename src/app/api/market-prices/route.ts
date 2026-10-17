import { NextResponse } from "next/server";

const OPEN_ELECTRICITY_URL =
  "https://api.openelectricity.org.au/v4/market/network/NEM";

function toNemLocalNaive(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Brisbane",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get(
    "minute"
  )}:${get("second")}`;
}

export async function GET() {
  const apiKey = process.env.OPENELECTRICITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Open Electricity API key is not configured." },
      { status: 500 }
    );
  }

  const now = new Date();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const params = new URLSearchParams();

  params.append("metrics", "price");
  params.set("interval", "1h");

  // Open Electricity expects timezone-naive dates in NEM network time.
  params.set("date_start", toNemLocalNaive(start));
  params.set("date_end", toNemLocalNaive(now));

  params.set("primary_grouping", "network_region");

  try {
    const response = await fetch(
      `${OPEN_ELECTRICITY_URL}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();

      console.error(
        "Open Electricity API error:",
        response.status,
        message
      );

      return NextResponse.json(
        {
          error: "Unable to retrieve electricity prices.",
          upstreamStatus: response.status,
          upstreamMessage: message,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Market price request failed:", error);

    return NextResponse.json(
      {
        error: "Unable to retrieve electricity prices.",
      },
      { status: 500 }
    );
  }
}