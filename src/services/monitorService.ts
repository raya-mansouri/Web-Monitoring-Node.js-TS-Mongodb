import axios from 'axios';
import Website from '../models/website';
import { sendAlert } from './alertService';

const checkWebsiteStatus = async (website: any) => {
  try {
    const response = await axios.get(website.url);
    if (response.status !== 200) {
      throw new Error('Non-200 status code');
    }
    website.status = 'up';
    // website.downtimeCount = 0;
  } catch (error) {
    website.status = 'down';
    website.downtimeCount += 1;
    sendAlert(website);
  } finally {
    website.lastChecked = new Date();
    await website.save();
  }
};

export const monitorWebsites = async () => {
  const websites = await Website.find();
  websites.forEach(checkWebsiteStatus);
};