require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const config = require("./helpers/config");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    let botId = `${process.env.API_BOT_ID}`;
    let phoneNbr = `${process.env.PHONE_NUMBER}`;

    await axios.post(
      `https://graph.facebook.com/v15.0/${botId}/messages`,
      {
        messaging_product: "whatsapp",
        to: phoneNbr,
        type: "template",
        template: {
          name: "prueba_plantilla",
          language: { code: "es_AR" },
        },
      },
      config
    );

    res.status(200).json({ msg: "mensaje enviado con exito" });
  } catch (error) {
    console.log("error en get envio de mensaje", error);
  }
});

app.get("/webhook", (req, res) => {
  try {
    const mode = req.query("hub.mode");
    const challenge = req.query("hub.challenge");
    const token = req.query("hub.verify_token");
    const myToken = "prueba-01";

    if (mode && token) {
      if (mode === "subscribe" && token === myToken) {
      }
    }
  } catch (error) {
    console.log("error en webhook", error);
  }
});

app.post("/webhook", (req, res) => {
  try {
    const { entry } = req.body;
    if (entry && entry.length > 0) {
      const { changes } = entry[0];
      if (changes && changes.length > 0) {
        const { value } = changes[0];
        if (value && value.messages && value.messages.length > 0) {
          const message = value.messages[0];
          const from = message.from; // El número de teléfono del remitente
          const text = message.text.body; // El texto del mensaje recibido

          console.log(`Mensaje recibido de ${from}: ${text}`);

          // Aquí podrías enviar una respuesta automática, guardar el mensaje en una base de datos, etc.
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.log("error post webhook", error);
  }
});

app.listen(port, (req, res) => {
  console.log("server ok ", port);
});
