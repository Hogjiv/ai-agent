const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Разрешаем любые CORS-запросы
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const API_KEY =
  "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";

app.post("/", async (req, res) => {
  try {
    const content = req.body.message;
    console.log("Received message:", content);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "z-ai/glm-4.5-air:free",
          messages: [
            {
              role: "user",
              content: content,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    res.json({
      success: true,
      data: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error during fetch:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
