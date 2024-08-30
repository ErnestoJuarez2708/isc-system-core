import db from './pg-connection';

const tableName = 'events_interns';

export const getEventInterns = async (eventId: number) => {
    try{
        const listEventInterns = await db(`${tableName} as ei`)
            .join('events as e', 'ei.event_id', 'e.id')
            .join('interns as i', 'ei.intern_id', 'i.id')
            .select(
            'e.*',
            'i.*',
            'ei.type',
            'ei.created_at as registration_date',
            'ei.updated_at as last_update'
            )
            .where('ei.event_id', eventId)
        return listEventInterns;
    }
    catch(error){
        console.error('Error in EventInternsRepository.getEventInterns',error)
        throw new Error('Error fetching ListEventInterns')
    }
};

export const registerInternProcess= async(eventId: number, internId: number ) => {

    try{
        const registerInterns = await db(tableName).insert({
            event_id: eventId,
            intern_id: internId,
            type: 'pending',
        }).returning('*');
    }
    catch(error){
        console.error('Error in EventInternsRepository.registerInternProcess',error)
        throw new Error('Error fetching RegisterInterns')
    }
}

export const updateInternType = async(eventId: number, internId: number, status: string) =>{
    try{
        const result = await db(tableName)
        .where({
            intern_id: internId,
            event_id: eventId
        })
        .update({
            type: status,
            updated_at: new Date()
        })
        .returning('*');
        return result;
    } catch (error) {
        console.error('Error in EventInternsRepository.updateInternStatus', error);
        throw new Error('Error updating Intern status');
    }
}

export const deleteInternRegistration = async(eventId: number, internId: number) =>{
    try {
        const result = await db(tableName)
            .where({
                event_id: eventId,
                intern_id: internId
            })
            .del()
            .returning('*');
        return result;
    } catch (error) {
        console.error('Error in EventInternsRepository.deleteInternRegistration', error);
        throw new Error('Error deleting Intern registration');
    }
}