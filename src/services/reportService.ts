import Website from '../models/website';

export const getUptimeReport = async () => {
  const websites = await Website.find();
  const report = websites.map((website) => ({
    url: website.url,
    status: website.status,
    lastChecked: website.lastChecked,
    downtimeCount: website.downtimeCount,
  }));
  return report;
};