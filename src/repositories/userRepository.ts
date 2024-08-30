import UserRole from '../constants/roles';
import createUserRequest from '../dtos/createUserRequest';
import User from '../models/userInterface';
import { buildLogger } from '../plugin/logger';
import db from './pg-connection';

const logger = buildLogger('userRepository');

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db('user_profile as u').where('u.email', email).first('u.*');
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const students = await db('users as u')
      .select(
        'u.id',
        'u.code',
        db.raw("CONCAT(u.name, ' ', u.lastname, ' ', u.mothername) as name"),
        'u.email',
        'u.phone'
      )
      .join('user_roles as ur', 'u.id', '=', 'ur.user_id')
      .where('ur.role_id', UserRole.STUDENT.id);
    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStudentByCode = async (userCode: number) => {
  try {
    const student = await db('users as u')
      .select(
        'u.id',
        'u.name as student_name',
        'u.lastname as lastName',
        'u.mothername as motherName',
        'u.code'
      )
      .join('user_roles as ur', 'u.id', '=', 'ur.user_id')
      .where('ur.role_id', UserRole.STUDENT.id)
      .andWhere('u.code', userCode)
      .first();

    return student || null;
  } catch (error) {
    console.error('Error in getStudentByCode:', error);
    throw new Error('Error fetching student by code');
  }
};

export const createUser = async (userData: User) => {
  try {
    const [newUser] = await db('users').insert(userData).returning('id');
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfessors = async () => {
  try {
    logger.debug('Fetching professors');
    const professors = await db('users as u')
      .select(
        'u.id',
        'u.name as name',
        'u.lastname as lastName',
        'u.mothername as motherName',
        'u.email as email',
        'u.code as code',
        'u.phone as phone',
        'u.degree as degree',
        db.raw('COUNT(DISTINCT gp.id) FILTER (WHERE gp.tutor_id = u.id) AS tutoring_count'),
        db.raw('COUNT(DISTINCT gp.id) FILTER (WHERE gp.reviewer_id = u.id) AS review_count'),
        db.raw("CONCAT(u.name, ' ', u.lastname, ' ', u.mothername) as fullname")
      )
      .join('user_roles as ur', 'u.id', '=', 'ur.user_id')
      .leftJoin('graduation_process as gp', function (this: any) {
        this.on('gp.tutor_id', '=', 'u.id').orOn('gp.reviewer_id', '=', 'u.id');
      })
      .where('ur.role_id', UserRole.PROFESSOR.id)
      .groupBy('u.id');
    logger.info('Professors fetched successfully.');
    logger.debug(`Fetched professors: ${JSON.stringify(professors)}`);
    return professors;
  } catch (error) {
    logger.error(`Error fetching professors: ${error}`);
    throw Error('Error');
  }
};

export const getUserById = async (userId: number) => {
  try {
    const user = await db('users').where('id', userId).first();
    return user;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await db('users').where('id', userId).delete();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Update user data
 * @param userId User id
 * @param userData User data
 * @returns Updated user data
 */
export const updateUser = async (userId: number, userData: User | createUserRequest) => {
  try {
    await db('users').where('id', userId).update(userData);
    return userData;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
