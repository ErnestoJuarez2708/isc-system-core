import { Knex } from 'knex';

const userTable = 'user_profile'

exports.seed = async function (knex: Knex) {
  await knex(userTable).del();

  await knex(userTable).insert([
      {id: 1, username: 'admin', name:'name', lastname:'name', mothername: 'name', password: '$2a$10$qv1IXHI4lhio8vJGS6O1UuIzTqTpdHY9dz5gyA9D5PFb1pGxJv3Kq', email: 'luis@gmail.com', phone:76256172, role_id: 1}
  ]);
};
