export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { licenseKey } = req.body;

  const response = await fetch("https://live.dodopayments.com/licenses/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ license_key: licenseKey })
  });

  const data = await response.json();

  // Log what Dodo actually returns so we can see the real structure
  console.log("Dodo response:", JSON.stringify(data));

  res.status(200).json({ valid: false, raw: data });
}
