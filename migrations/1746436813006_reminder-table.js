/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Create the reminder enum type
  pgm.sql(`
    CREATE TYPE reminder_status AS ENUM ('pending', 'sent', 'failed');
  `);
  // Create the reminder table
  pgm.sql(`
    CREATE TABLE reminder (
      id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      subject VARCHAR(225) NOT NULL,
      body TEXT NOT NULL,
      user_email VARCHAR(225) NOT NULL,
      status reminder_status NOT NULL DEFAULT 'pending',
      notification_time TIMESTAMP NOT NULL,
      cretated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  // Create the index on the user_email column
  pgm.sql(`
    CREATE INDEX reminder_user_email_idx ON reminder (user_email);
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Drop the index on the user_email column
  pgm.sql(`
    DROP INDEX reminder_user_email_idx;
  `);
  // Drop the reminder table
  pgm.sql(`
    DROP TABLE reminder;
  `);
  // Drop the reminder enum type
  pgm.sql(`
    DROP TYPE reminder_status;
  `);
};
