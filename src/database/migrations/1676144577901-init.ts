import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676144577901 implements MigrationInterface {
    name = 'init1676144577901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`cellphone\` int NOT NULL, \`address\` varchar(255) NULL, \`city\` varchar(255) NULL, \`country\` varchar(255) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_8a049c7f44f6ebb2f583ef54de\` (\`cellphone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8a049c7f44f6ebb2f583ef54de\` ON \`contact\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
    }

}
