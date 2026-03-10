"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1715000000000 = void 0;
class InitialSchema1715000000000 {
    name = 'InitialSchema1715000000000';
    async up(queryRunner) {
        // Create Enums
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'BARBER', 'CLIENT')`);
        await queryRunner.query(`CREATE TYPE "booking_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW')`);
        await queryRunner.query(`CREATE TYPE "queue_status_enum" AS ENUM('WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TYPE "loyalty_tier_enum" AS ENUM('BRONZE', 'SILVER', 'GOLD', 'PLATINUM')`);
        await queryRunner.query(`CREATE TYPE "notification_status_enum" AS ENUM('SCHEDULED', 'SENT', 'FAILED')`);
        // Create Tables
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "full_name" character varying NOT NULL,
                "role" "user_role_enum" NOT NULL DEFAULT 'CLIENT',
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "barbers" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "user_id" uuid NOT NULL,
                "specialties" text[] NOT NULL DEFAULT '{}',
                "working_hours" jsonb,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "REL_barbers_user" UNIQUE ("user_id"),
                CONSTRAINT "PK_barbers" PRIMARY KEY ("id"),
                CONSTRAINT "FK_barbers_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "clients" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "user_id" uuid,
                "phone" character varying NOT NULL,
                "email" character varying,
                "visit_count" integer NOT NULL DEFAULT 0,
                "notes" text,
                CONSTRAINT "REL_clients_user" UNIQUE ("user_id"),
                CONSTRAINT "PK_clients" PRIMARY KEY ("id"),
                CONSTRAINT "FK_clients_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "services" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "duration" integer NOT NULL,
                "price" numeric(10,2) NOT NULL,
                "category" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_services" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "bookings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "barber_id" uuid NOT NULL,
                "client_id" uuid NOT NULL,
                "service_id" uuid NOT NULL,
                "appointment_time" TIMESTAMP NOT NULL,
                "status" "booking_status_enum" NOT NULL DEFAULT 'PENDING',
                "notes" text,
                CONSTRAINT "PK_bookings" PRIMARY KEY ("id"),
                CONSTRAINT "FK_bookings_barbers" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id"),
                CONSTRAINT "FK_bookings_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id"),
                CONSTRAINT "FK_bookings_services" FOREIGN KEY ("service_id") REFERENCES "services"("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "queue_entries" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "client_id" uuid NOT NULL,
                "barber_id" uuid,
                "position" integer NOT NULL,
                "status" "queue_status_enum" NOT NULL DEFAULT 'WAITING',
                "estimated_wait_minutes" integer NOT NULL DEFAULT 0,
                CONSTRAINT "PK_queue_entries" PRIMARY KEY ("id"),
                CONSTRAINT "FK_queue_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id"),
                CONSTRAINT "FK_queue_barbers" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "loyalty_cards" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "client_id" uuid NOT NULL,
                "points" integer NOT NULL DEFAULT 0,
                "tier" "loyalty_tier_enum" NOT NULL DEFAULT 'BRONZE',
                "rewards" jsonb NOT NULL DEFAULT '[]',
                CONSTRAINT "REL_loyalty_client" UNIQUE ("client_id"),
                CONSTRAINT "PK_loyalty_cards" PRIMARY KEY ("id"),
                CONSTRAINT "FK_loyalty_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "client_id" uuid NOT NULL,
                "type" character varying NOT NULL,
                "scheduled_at" TIMESTAMP NOT NULL,
                "sent_at" TIMESTAMP,
                "status" "notification_status_enum" NOT NULL DEFAULT 'SCHEDULED',
                "message" text NOT NULL,
                CONSTRAINT "PK_notifications" PRIMARY KEY ("id"),
                CONSTRAINT "FK_notifications_clients" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE
            )
        `);
        // Create Indexes
        await queryRunner.query(`CREATE INDEX "idx_user_email" ON "users" ("email")`);
        await queryRunner.query(`CREATE INDEX "idx_client_phone" ON "clients" ("phone")`);
        await queryRunner.query(`CREATE INDEX "idx_booking_time" ON "bookings" ("appointment_time")`);
        await queryRunner.query(`CREATE INDEX "idx_queue_position" ON "queue_entries" ("position")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "loyalty_cards"`);
        await queryRunner.query(`DROP TABLE "queue_entries"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "barbers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "notification_status_enum"`);
        await queryRunner.query(`DROP TYPE "loyalty_tier_enum"`);
        await queryRunner.query(`DROP TYPE "queue_status_enum"`);
        await queryRunner.query(`DROP TYPE "booking_status_enum"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }
}
exports.InitialSchema1715000000000 = InitialSchema1715000000000;
