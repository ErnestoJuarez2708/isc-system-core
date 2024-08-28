import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('interns', function (table) {
      table.increments('id').primary();
      table
        .integer('user_profile_id')
        .unsigned()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table.integer('total_hours').unsigned().defaultTo(0);
      table.integer('pending_hours').unsigned().defaultTo(0);
      table.integer('completed_hours').unsigned().defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now(6));
      table.timestamp('updated_at').defaultTo(knex.fn.now(6));
    })
    .createTable('events', function (table) {
      table.increments('id').primary();
      table
        .integer('responsible_intern_id')
        .unsigned()
        .references('id')
        .inTable('interns')
        .onDelete('CASCADE');
      table.string('title');
      table.string('description');
      table.string('location');
      table.integer('duration_hours');
      table.integer('max_interns');
      table.integer('min_interns');
      table.timestamp('start_date');
      table.timestamp('end_date');
      table.timestamp('registration_deadline');
      table.timestamp('start_cancellation_date');
      table.timestamp('end_cancellation_date');
      table.timestamp('created_at').defaultTo(knex.fn.now(6));
      table.timestamp('updated_at').defaultTo(knex.fn.now(6));
    })
    .createTable('events_interns', function (table) {
      table.integer('intern_id').unsigned().references('id').inTable('interns').onDelete('CASCADE');
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE');
      table.string('status').unique();
      table.boolean('is_reserve');
      table.timestamp('created_at').defaultTo(knex.fn.now(6));
      table.timestamp('updated_at').defaultTo(knex.fn.now(6));
      table.primary(['intern_id', 'event_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('interns')
    .dropTableIfExists('events')
    .dropTableIfExists('events_interns');
}
