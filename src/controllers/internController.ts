import { Request, Response } from 'express'
import { updateHours, getInternById } from '../services/internService';
import { sendSuccess } from '../handlers/successHandler';


export const updateHoursController = async (req: Request, res: Response) => {
    try {
      const { intern_id } = req.params;
      const {new_hours} = req.body;
      const updateHoursIntern = await updateHours(parseInt(intern_id,10), new_hours);
      return res.status(200).json({ success: true, data: updateHoursIntern });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

export const getInternsById = async (req: Request, res: Response) => {
    try{
        const { intern_id } = req.params;
        const intern = await getInternById(parseInt(intern_id,10));
        if (!intern) {
        return res.status(404).json({ success: false, message: 'Event not found' });
        }
        sendSuccess(res, intern, 'Event retrieved succesfully');
    }catch(error){
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}