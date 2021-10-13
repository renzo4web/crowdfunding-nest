import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersMigration1634164415926 implements MigrationInterface {
    name = 'UsersMigration1634164415926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "goal" integer NOT NULL, "curr_amount" integer NOT NULL, "status" varchar NOT NULL, "ownerId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_project"("id", "name", "code", "goal", "curr_amount", "status") SELECT "id", "name", "code", "goal", "curr_amount", "status" FROM "project"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`ALTER TABLE "temporary_project" RENAME TO "project"`);
        await queryRunner.query(`CREATE TABLE "temporary_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "goal" integer NOT NULL, "curr_amount" integer NOT NULL, "status" varchar NOT NULL, "ownerId" integer, CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_project"("id", "name", "code", "goal", "curr_amount", "status", "ownerId") SELECT "id", "name", "code", "goal", "curr_amount", "status", "ownerId" FROM "project"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`ALTER TABLE "temporary_project" RENAME TO "project"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" RENAME TO "temporary_project"`);
        await queryRunner.query(`CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "goal" integer NOT NULL, "curr_amount" integer NOT NULL, "status" varchar NOT NULL, "ownerId" integer)`);
        await queryRunner.query(`INSERT INTO "project"("id", "name", "code", "goal", "curr_amount", "status", "ownerId") SELECT "id", "name", "code", "goal", "curr_amount", "status", "ownerId" FROM "temporary_project"`);
        await queryRunner.query(`DROP TABLE "temporary_project"`);
        await queryRunner.query(`ALTER TABLE "project" RENAME TO "temporary_project"`);
        await queryRunner.query(`CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "goal" integer NOT NULL, "curr_amount" integer NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "project"("id", "name", "code", "goal", "curr_amount", "status") SELECT "id", "name", "code", "goal", "curr_amount", "status" FROM "temporary_project"`);
        await queryRunner.query(`DROP TABLE "temporary_project"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
