const axios = require("axios");
const cron = require("cron");

const questionsData = require("./dsa.json");
const questions = questionsData.questions;

const webhookUrl =
  "";

function sendQuestionToWebhook(questionIndex) {
  let color;
  switch (questionIndex) {
    case 0:
      color = 16776960; // Yellow
      break;
    case 1:
      color = 255; // Blue
      break;
    case 2:
      color = 32768; // Green
      break;
    default:
      color = 0; // Default color
  }

  const webhookPayload = {
    embeds: [
      {
        title: `Question ${questionIndex + 1}`,
        description: `**${questions[questionIndex].question}**\n**Explanation**:\n\`\`\`${questions[questionIndex].explanation}\`\`\`\n**Input**:\n\`\`\`${questions[questionIndex].input}\`\`\`\n**Output**:\n\`\`\`${questions[questionIndex].output}\`\`\`\n`,
        color: color,
      },
    ],
  };

  axios
    .post(webhookUrl, webhookPayload)
    .then(() => console.log(`Question ${questionIndex + 1} sent successfully`))
    .catch((error) =>
      console.error(`Error sending question ${questionIndex + 1}:`, error)
    );
}

function sendAnswerToWebhook(questionIndex) {
  let color;
  switch (questionIndex) {
    case 0:
      color = 16776960; // Yellow
      break;
    case 1:
      color = 255; // Blue
      break;
    case 2:
      color = 32768; // Green
      break;
    default:
      color = 0; // Default color
  }

  const webhookPayload = {
    embeds: [
      {
        title: `Answer ${questionIndex + 1}`,
        description: `**Explanation**:\n\`\`\`${questions[questionIndex].explanation_code}\`\`\`\n**C++**:\n\`\`\`${questions[questionIndex].cpp}\`\`\`\n**Java**:\n\`\`\`${questions[questionIndex].java}\`\`\`\n\n**Python**:\n\`\`\`${questions[questionIndex].python}\`\`\`\n`,
        color: color,
      },
    ],
  };

  axios
    .post(webhookUrl, webhookPayload)
    .then(() => console.log(`Answer ${questionIndex + 1} sent successfully`))
    .catch((error) =>
      console.error(`Error sending answer ${questionIndex + 1}:`, error)
    );
}

const questionJob = new cron.CronJob("00 55 15 * * *", () => {
  const todayQuestionIndexes = [0, 1, 2];

  todayQuestionIndexes.forEach((questionIndex, index) => {
    setTimeout(() => {
      sendQuestionToWebhook(questionIndex);
    }, index * 2000);
  });
});

questionJob.start();

const answerJob = new cron.CronJob("00 56 15 * * *", () => {
  const todayQuestionIndexes = [0, 1, 2];

  todayQuestionIndexes.forEach((questionIndex, index) => {
    setTimeout(() => {
      sendAnswerToWebhook(questionIndex);
    }, index * 2000);
  });
});

answerJob.start();

console.log("Discord automation started.");
