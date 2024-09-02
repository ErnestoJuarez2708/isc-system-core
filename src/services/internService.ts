import { updateHoursInterns, getInternsById } from "../repositories/internsRepository";

export const updateHours = async(internId: number, hoursEvent: number) => {
    try{
        const {pending_hours, completed_hours} = await getInternById(internId);
        const updateHoursIntern = await updateHoursInterns(internId,pending_hours- hoursEvent, completed_hours+hoursEvent);
        return updateHoursIntern;
    } catch(error){
        console.error('Error in InternsService.updateHours',error);
        throw new Error('Error fetching Update Hours Intern');
    }
}

export const getInternById = async(internId: number) => {
    try {
        const event = await getInternsById(internId);
        return event;
      } catch (error) {
        console.error('Error in eventsService.getInternById:', error);
        throw new Error('Error fetching Interns');
      }
    
}