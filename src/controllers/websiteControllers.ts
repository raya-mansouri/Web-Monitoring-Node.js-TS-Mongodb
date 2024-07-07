import { Request, Response } from 'express';
import Website from '../models/website';

export const addWebsite = async (req: Request, res: Response) => {
  try {
    const { url, alertMethods } = req.body;
    const website = new Website({ url, alertMethods });
    await website.save();
    res.status(201).json(website);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add website' });
  }
};

export const getWebsites = async (req: Request, res: Response) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch websites' });
  }
};

export const getWebsiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const website = await Website.findById(id);

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    res.status(200).json(website);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving website', error });
  }
};

export const deleteWebsite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Website.findByIdAndDelete(id);
    res.status(200).json({ message: 'Website deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting website', error });
  }
};