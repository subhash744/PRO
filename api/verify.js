export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { licenseKey } = req.body;

  const response = await fetch(`https://api.dodopayments.com/licenses/activate`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DODO_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      license_key: licenseKey,
      device_fingerprint: "extension",
      name: "Chrome Extension"
    })
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ valid: true });
  } else {
    res.status(200).json({ valid: false, reason: data });
  }
}
