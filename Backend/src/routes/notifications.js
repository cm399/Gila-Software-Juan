// api.js

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    subscribed: ['Sports', 'Movies'],
    channels: ['SMS', 'E-Mail'],
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    phone: '0987654321',
    subscribed: ['Finance', 'Movies'],
    channels: ['Push Notification', 'E-Mail'],
  },
  {
    id: 3,
    name: 'Alpha User',
    email: 'alpha@alpha.com',
    phone: '0654321',
    subscribed: ['Movies'],
    channels: ['E-Mail'],
  },
];

var logs = [];

const logsPath = path.join(__dirname, 'logs.json');

function saveLog(log) {
  logs.push(log);
  fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
}

function sendNotification(user, category, message) {
  const subscribers = users.filter(
    (u) => u.subscribed.includes(category) && u.id !== user.id
  );
  subscribers.forEach((subscriber) => {
    subscriber.channels.forEach((channel) => {
      switch (channel) {
        case 'SMS':
          console.log(`Sending SMS notification to ${subscriber.phone}`);
          saveLog({
            user: subscriber.name,
            category,
            message,
            type: 'SMS',
            time: new Date(),
          });
          break;
        case 'E-Mail':
          console.log(`Sending E-Mail notification to ${subscriber.email}`);
          saveLog({
            user: subscriber.name,
            category,
            message,
            type: 'E-Mail',
            time: new Date(),
          });
          break;
        case 'Push Notification':
          console.log(`Sending Push Notification to ${subscriber.name}`);
          saveLog({
            user: subscriber.name,
            category,
            message,
            type: 'Push Notification',
            time: new Date(),
          });
          break;
        default:
          break;
      }
    });
  });
}

router.post('/send-notification', (req, res) => {
  const { category, message } = req.body;
  const user = users[0]; // You can change this to the logged-in user
  sendNotification(user, category, message);
  res.sendStatus(200);
});

router.get('/logs', (req, res) => {
  res.json(logs);
});

module.exports = router;
