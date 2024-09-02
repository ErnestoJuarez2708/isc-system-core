import db from './pg-connection';

const tableName = 'interns';

export const updateHoursInterns= async(internId: number, newHoursPending: number, newHoursCompleted: number) =>{
    try{
        const result = await db(tableName)
        .where({
            id: internId,
        })
        .update({
            pending_hours: newHoursPending,
            completed_hours: newHoursCompleted,
            updated_at: new Date()
        })
        .returning('*');
        return result;
    }
    catch(error){
        
        console.error('Error in InternsRepository.updateHoursInterns', error);
        throw new Error('Error Update Hours Interns');
    }
}
export const getInternsById = async(internId: number)=>{
    try {
        const event = await db(tableName).where('id', internId).first();
        return event;
    } catch (error) {
        console.error('Error in eventsRepository.getInternsById', error);
        throw new Error('Error fetching Interns');
    }
}