import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676176793711 implements MigrationInterface {
    name = 'init1676176793711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`state\` int NOT NULL DEFAULT '1', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`cellphone\` int NOT NULL, \`address\` varchar(255) NULL, \`city\` varchar(255) NULL, \`country\` varchar(255) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_8a049c7f44f6ebb2f583ef54de\` (\`cellphone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_e7e34fa8e409e9146f4729fd0cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_e7e34fa8e409e9146f4729fd0cb\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a049c7f44f6ebb2f583ef54de\` ON \`contact\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
