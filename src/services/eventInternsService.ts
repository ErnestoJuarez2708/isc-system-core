import { getEventInterns, registerInternProcess, updateInternType, deleteInternRegistration } from '../repositories/eventInternsRepository';

export const getEventIntern = async (eventId: number) => {
    try {
        const listEventInterns = await getEventInterns(eventId);
        return listEventInterns;
    }
    catch(error){
        console.error('Error in EventInternsService.getEventIntern',error);
        throw new Error('Error fetching ListEventInterns')
    }
}

export const registerIntern = async (eventId: number, internId: number ) => {
    try{
        const registerInterns = await registerInternProcess(eventId,internId);
        return registerInterns;
    }
    catch(error){
        console.error('Error in EventInternsService.registerInternProcess',error);
        throw new Error('Error fetching RegisterIntern')
    }
}

export const updateInternsType = async (id_evento: number, id_becario: number, status: string) => {
    try{
        const updateInternsType = await updateInternType(id_evento,id_becario , status);
        return updateInternsType;
    } catch(error){
        console.error('Error in EventInternsService.updateInternsType',error);
        throw new Error('Error fetching Update Interns Type');
    }
} 

export const cancelInternRegistration = async (id_evento: number, id_becario: number) => {
    try{
        const cancelRegistration = await deleteInternRegistration(id_evento,id_becario);
        return cancelRegistration;
    } catch(error){
        console.error('Error in EventInternsService.deleteInternRegistration',error);
        throw new Error('Error fetching Cancel Registration');
    }
}