import fs from "node:fs/promises";

const queryUrl =
  "https://geo.abs.gov.au/arcgis/rest/services/ASGS2026/STE/MapServer/0/query" +
  "?where=STATE_CODE_2026%20IN%20(%271%27,%272%27,%273%27,%274%27,%275%27,%276%27,%277%27,%278%27)" +
  "&outFields=STATE_CODE_2026,STATE_NAME_2026" +
  "&returnGeometry=true" +
  "&outSR=4326" +
  "&f=geojson";

async function fetchJson(url, attempts = 4) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      console.log(`Downloading ABS geography (${attempt}/${attempts})...`);

      const response = await fetch(url, {
        headers: {
          Accept: "application/geo+json, application/json",
          "User-Agent": "Green-Harbour-Map-Builder/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(
          `ABS request failed: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 1500)
        );
      }
    }
  }

  throw lastError;
}

function getBounds(polygon) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  for (const ring of polygon) {
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  }

  return {
    minLon,
    maxLon,
    minLat,
    maxLat,
    span: (maxLon - minLon) * (maxLat - minLat),
  };
}

function principalPolygon(geometry) {
  if (!geometry) return null;

  if (geometry.type === "Polygon") {
    return geometry.coordinates;
  }

  if (geometry.type !== "MultiPolygon") {
    return null;
  }

  let best = null;
  let bestSpan = -Infinity;

  for (const polygon of geometry.coordinates) {
    const bounds = getBounds(polygon);

    if (bounds.span > bestSpan) {
      best = polygon;
      bestSpan = bounds.span;
    }
  }

  return best;
}

/*
 * Fixed Australian geographic viewport.
 *
 * This is deliberately NOT a D3 geographic projection.
 * We're simply mapping Australian longitude/latitude coordinates
 * into an SVG presentation coordinate system.
 */
const GEO = {
  minLon: 112,
  maxLon: 154,
  minLat: -44.5,
  maxLat: -9.5,
};

const SVG = {
  left: 55,
  right: 845,
  top: 35,
  bottom: 580,
};

function project(lon, lat) {
  const longitudeScale = 0.88;

  const rawX =
    SVG.left +
    ((lon - GEO.minLon) / (GEO.maxLon - GEO.minLon)) *
      (SVG.right - SVG.left);

  const centreX = (SVG.left + SVG.right) / 2;

  const x = centreX + (rawX - centreX) * longitudeScale;

  const y =
    SVG.top +
    ((GEO.maxLat - lat) / (GEO.maxLat - GEO.minLat)) *
      (SVG.bottom - SVG.top);

  return [x, y];
}

function ringToPath(ring) {
  if (!ring?.length) return "";

  return ring
    .map(([lon, lat], index) => {
      const [x, y] = project(lon, lat);

      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join("") + "Z";
}

function polygonToPath(polygon) {
  return polygon.map(ringToPath).join("");
}

const source = await fetchJson(queryUrl);

const states = [];

for (const feature of source.features) {
  const polygon = principalPolygon(feature.geometry);

  if (!polygon) continue;

  const bounds = getBounds(polygon);

  console.log(
    `${feature.properties.STATE_NAME_2026}:`,
    `lon ${bounds.minLon.toFixed(2)} → ${bounds.maxLon.toFixed(2)},`,
    `lat ${bounds.minLat.toFixed(2)} → ${bounds.maxLat.toFixed(2)}`
  );

  states.push({
    code: feature.properties.STATE_CODE_2026,
    name: feature.properties.STATE_NAME_2026,
    path: polygonToPath(polygon),
  });
}

await fs.mkdir("src/data", { recursive: true });

await fs.writeFile(
  "src/data/australia-map.json",
  JSON.stringify(states, null, 2),
  "utf8"
);

console.log(`Generated ${states.length} Australian state/territory paths.`);