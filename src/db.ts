import * as Sequelize from 'sequelize';
import Config from './config';

export const db = new Sequelize(Config.db.database, Config.db.username, Config.db.password, Config.db.options);

interface EventArrtibutes {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    limit: number;
    total: number;
    waiting: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EventInstance extends Sequelize.Instance<EventArrtibutes>, EventArrtibutes { }

export const EventTable = db.define<EventInstance, EventArrtibutes>('event', {
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false
    },
    limit: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    waiting: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {});
