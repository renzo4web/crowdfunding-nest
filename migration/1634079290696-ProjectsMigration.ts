import {MigrationInterface, QueryRunner} from "typeorm";

export class ProjectsMigration1634079290696 implements MigrationInterface {
    name = 'ProjectsMigration1634079290696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "goal" integer NOT NULL, "curr_amount" integer NOT NULL, "status" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
