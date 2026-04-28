export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // 🔐 Hardcoded API Key
    const SECRET_KEY = "abhay123secure";

    // Query + Header दोनों से key लो
    const userKey = req.query.key || req.headers["x-api-key"];

    // ❌ Invalid key
    if (!userKey || userKey !== SECRET_KEY) {
      return res.status(403).send(`
        <h2 style="color:red;text-align:center;">
          ❌ Invalid API Key
        </h2>
      `);
    }

    // Default ID
    const uid = id || "123456789012";

    // External API call
    const response = await fetch(
      `https://anishexploits.com/api/family.php?exploits=${uid}`
    );

    let data = await response.text();

    // 🧹 Clean unwanted lines
    data = data.replace(/💳 BUY API.*\n?/g, "");
    data = data.replace(/🆘 SUPPORT.*\n?/g, "");
    data = data.replace(/👮 Credit:.*\n?/g, "");

    // Convert text → HTML
    const lines = data
      .split("\n")
      .map(line => `<div class="line">${line}</div>`)
      .join("");

    // 🎨 UI Design
    const html = `
    <html>
    <head>
      <title>Family Info</title>
      <style>
        body {
          background: #0d1117;
          color: #00ffcc;
          font-family: monospace;
          padding: 15px;
        }
        .box {
          border: 1px solid #00ffcc;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 0 15px #00ffcc;
        }
        .line {
          margin: 6px 0;
          border-bottom: 1px dashed #00ff44;
          padding-bottom: 4px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          color: #ffffff;
        }
      </style>
    </head>
    <body>
      <div class="box">
        ${lines}
      </div>

      <div class="footer">
        👨‍💻 Developer by Abhay Singh
      </div>
    </body>
    </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error"
    });
  }
}
