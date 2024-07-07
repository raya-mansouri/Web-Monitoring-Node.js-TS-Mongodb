import nodemailer from 'nodemailer';
import { Telegraf } from 'telegraf';
import twilio from 'twilio';
import config from '../config';
import { IWebsite } from '../models/website';

const transporter = nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const bot = new Telegraf(config.telegramToken);
// const client = twilio(config.twilioAccountSid, config.twilioAuthToken);

export const sendAlert = async (website: IWebsite) => {
  const message = `Alert! Website ${website.url} is down.`;
  if (website.alertMethods.includes('email')) {
    await transporter.sendMail({
      from: config.emailUser,
      to: 'rayamansouri20@gmail.com',
      subject: 'Website Down Alert',
      text: message,
    });
  }
  if (website.alertMethods.includes('telegram')) {
    await bot.telegram.sendMessage(config.telegramChatId, message);
  }
  // if (website.alertMethods.includes('sms')) {
  //   await client.messages.create({
  //     body: message,
  //     from: config.twilioPhoneNumber,
  //     to: '+1234567890',
  //   });
  // }
};