import { Router } from 'express';
import { addWebsite, getWebsites, deleteWebsite, getWebsiteById } from './controllers/websiteControllers'
import { getUptimeReport } from './services/reportService';

const router = Router();

router.post('/websites', addWebsite);
router.get('/websites', getWebsites);
// router.get('/website/:id', getWebsiteById);
router.delete('/website/:id', deleteWebsite);

router.get('/report', async (req, res) => {
  const report = await getUptimeReport();
  res.json(report);
});

export default router;