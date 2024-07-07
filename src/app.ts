import express from 'express';
import connectDB from './utils/db';
import routes from './routes';
import { monitorWebsites } from './services/monitorService';
import schedule from 'node-schedule';

const app = express();

app.use(express.json());
app.use('/api', routes);

connectDB();

schedule.scheduleJob('*/30 * * * *', monitorWebsites); // Runs every 30 minutes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});