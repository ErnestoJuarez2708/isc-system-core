import { Request, Response } from 'express'
import { getEventIntern, registerIntern, updateInternsType, cancelInternRegistration } from '../services/eventInternsService';
import { sendCreated, sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';

export const getEventInternsController = async(req: Request, res: Response) => {
    try{
        const { id_evento } = req.params;
        const result = await getEventIntern( parseInt(id_evento, 10) );

        if(!result){
            return res.status(404).json({ success: false, message: 'Event_Interns process not found' }) 
        }
        sendSuccess(res, result, 'Event_Interns process retrieved successfully')
    }
    catch(error){
        res.status(500).json({success: false, message: 'Internal server error' })
    }
};

export const registerInternController = async(req: Request, res: Response) => {
    try {
        const { id_evento } = req.params;
        const { id_becario } = req.body;
        const register = await registerIntern(parseInt(id_evento, 10),id_becario);
        sendCreated(res, register, 'Defense created successfully');
    } catch (error) {
        if (error instanceof Error) {
            handleError(res, error);
        }
    }
}

export const updateInternType = async(req: Request, res: Response) => {
    try {
        const { id_evento, id_becario } = req.params;
        const { status } = req.body;
        const result = await updateInternsType(parseInt(id_evento, 10), parseInt(id_becario, 10), status);
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const deleteRegistrationController = async(req: Request, res: Response) => {
    try {
        const { id_evento, id_becario } = req.params;
        const result = await cancelInternRegistration(parseInt(id_evento, 10),parseInt( id_becario));
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}