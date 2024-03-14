var express = require("express");
var router = express.Router();
let axios = require("axios");
let OpenAI = require("openai");
const notifier = require("node-notifier");

const openai = new OpenAI({
  apiKey: "sk-2LB3tfUoO2i43tLbZDhBT3BlbkFJsSCGTpDYcY4sf3D*****",
  dangerouslyAllowBrowser: true,
});

/* GET users listing. */
router.post("/", async function (req, res, next) {
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0], "-----------------------15");
  }

  main();

  // console.log(response, "----------------------20");

  // async function chatWithGPT3(prompt) {
  //   console.log("-------------------in for chatWithGPT3");
  //   const apiKey = "sk-2LB3tfUoO2i43tLbZDhBT3BlbkFJsSCGTpDYcY4sf3D*****"; // Replace with your API key
  //   const apiUrl =
  //     "https://api.openai.com/v1/engines/davinci-codex/completions"; // Use the appropriate engine

  //   try {
  //     const response = await axios.post(
  //       apiUrl,
  //       {
  //         prompt: prompt,
  //         max_tokens: 150, // You can adjust this limit as needed
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${apiKey}`,
  //         },
  //       }
  //     );
  //     console.log(response.data.choices[0].text, "---------------25");
  //     return response.data.choices[0].text;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return null;
  //   }
  // }
  // async function main() {
  //   console.log("---------------------innn for main function");
  //   const prompt =
  //     'Translate the following English text to Hindi: "Hello, how are you?"';
  //   const response = await chatWithGPT3(prompt);
  //   console.log("ChatGPT Response:", response);
  // }

  // main();
});

async function sendNotification(notification) {
  return new Promise((resolve, reject) => {
    notifier.notify(notification, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

router.post("/notification", async function (req, res, next) {
  // Define the notification message
  const notification = {
    title: "Notification Title1",
    message: "This is your live notification!",
    // icon: "path/to/icon.png", // (optional) Provide an icon
  };

  // Send the notification
  // notifier.notify(notification, (err, response) => {
  //   console.log(response);
  //   if (err) {
  //     console.error("Error sending notification:", err);
  //   }
  // });

  try {
    await sendNotification(notification);
    res.send("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Notification could not be sent");
  }
});

module.exports = router;
