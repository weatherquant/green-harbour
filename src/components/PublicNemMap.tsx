"use client";

import Link from "next/link";
import { assets } from "@/lib/demo-data";

const positions: Record<string, { left: string; top: string }> = {
  sunshine: { left: "73%", top: "25%" },
  western: { left: "67%", top: "32%" },
  darling: { left: "75%", top: "51%" },
  murray: { left: "65%", top: "67%" },
  limestone: { left: "48%", top: "62%" },
};

export default function PublicNemMap() {
  return (
    <div className="relative h-[610px] w-full scale-[1.06] xl:scale-[1.12]">
      <svg
  viewBox="0 0 900 650"
  className="absolute inset-0 h-full w-full"
  aria-label="Green Harbour Energy Australian portfolio"
>
  {/* Australia — geographic context */}
  <path
    d="
      M122 205
      L150 145
      L215 109
      L304 91
      L383 111
      L429 145
      L477 127
      L542 91
      L613 102
      L666 143
      L701 201
      L688 262
      L658 309
      L677 354
      L665 414
      L638 468
      L583 500
      L520 484
      L464 456
      L405 461
      L352 444
      L298 457
      L241 433
      L191 391
      L161 341
      L126 296
      L110 247
      Z
    "
    fill="#eceee9"
    stroke="#cfd4cd"
    strokeWidth="2"
    strokeLinejoin="round"
  />

  {/* Western Australia */}
  <path
    d="
      M122 205
      L150 145
      L215 109
      L304 91
      L363 112
      L357 235
      L341 326
      L298 390
      L241 433
      L191 391
      L161 341
      L126 296
      L110 247
      Z
    "
    fill="#e7e9e4"
    stroke="#ffffff"
    strokeWidth="3"
  />

  {/* Northern Territory */}
  <path
    d="
      M363 112
      L429 145
      L477 127
      L470 268
      L357 268
      Z
    "
    fill="#e7e9e4"
    stroke="#ffffff"
    strokeWidth="3"
  />

  {/* Queensland / NEM */}
  <path
    d="
      M477 127
      L542 91
      L613 102
      L666 143
      L701 201
      L688 262
      L658 309
      L566 304
      L470 268
      Z
    "
    fill="#cbd9d0"
    stroke="#ffffff"
    strokeWidth="3"
  />

  {/* South Australia / NEM */}
  <path
    d="
      M357 268
      L470 268
      L566 304
      L542 371
      L518 420
      L464 456
      L405 461
      L352 444
      L341 326
      Z
    "
    fill="#dce2d9"
    stroke="#ffffff"
    strokeWidth="3"
  />

  {/* NSW / NEM */}
  <path
    d="
      M566 304
      L658 309
      L677 354
      L665 414
      L589 426
      L542 371
      Z
    "
    fill="#c5d5cb"
    stroke="#ffffff"
    strokeWidth="3"
  />

  {/* Victoria / NEM */}
  <path
    d="
      M542 371
      L589 426
      L665 414
      L638 468
      L583 500
      L518 462
      Z
    "
    fill="#b9cfc2"
    stroke="#ffffff"
    strokeWidth="3"
  />

  {/* Tasmania / NEM */}
  <path
    d="
      M574 535
      L617 526
      L640 559
      L612 601
      L573 579
      Z
    "
    fill="#c5d5cb"
    stroke="#ffffff"
    strokeWidth="3"
  />

  {/* NEM region labels */}
  <g
    fill="#52645a"
    fontSize="13"
    letterSpacing="2.5"
    textAnchor="middle"
  >
    <text x="590" y="215">QLD1</text>
    <text x="613" y="365">NSW1</text>
    <text x="586" y="457">VIC1</text>
    <text x="444" y="370">SA1</text>
    <text x="606" y="568">TAS1</text>
  </g>

  {/* Geographic context */}
  <g
    fill="#a2a8a1"
    fontSize="10"
    letterSpacing="2"
    textAnchor="middle"
  >
    <text x="235" y="275">WESTERN AUSTRALIA</text>
    <text x="414" y="205">NORTHERN TERRITORY</text>
  </g>
</svg>

      {assets.map((asset) => {
        const position = positions[asset.id];

        if (!position) return null;

        return (
          <Link
            key={asset.id}
            href={`/assets/${asset.id}`}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={position}
          >
            <span className="absolute -inset-3 rounded-full border border-[#1d684d]/25 opacity-0 transition group-hover:scale-110 group-hover:opacity-100" />

            <span className="block h-3 w-3 rounded-full border-2 border-white bg-[#176044] shadow-[0_0_0_3px_rgba(23,96,68,0.15)] transition group-hover:scale-125" />

            <span className="pointer-events-none absolute left-5 top-1/2 w-44 -translate-y-1/2 rounded-xl border border-[#d7ddd7] bg-white/95 p-3 opacity-0 shadow-xl backdrop-blur transition group-hover:translate-x-1 group-hover:opacity-100">
              <span className="block text-[8px] tracking-[0.15em] text-[#7b837c]">
                {asset.region}
              </span>

              <span className="mt-1 block text-[12px] font-semibold text-[#171a17]">
                {asset.name}
              </span>

              <span className="mt-2 block text-[10px] text-[#697069]">
                {asset.powerMW} MW / {asset.capacityMWh} MWh
              </span>

              <span className="mt-3 block text-[9px] font-medium text-[#176044]">
                VIEW INVESTMENT →
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}