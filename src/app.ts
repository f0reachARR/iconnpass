import * as express from 'express';
import * as moment from 'moment';
import Config, { CONNPASS_EXPIRE } from './config';
import { db, EventTable } from './db';
import { svg, GREEN, RED, ORANGE, YELLOW, GRAY, BLUE } from './svg';
import { get } from './http';
import { Connpass } from './connpass';

const sanitize = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

(async () => {
    await db.authenticate();
    await db.sync();

    const app = express();
    app.listen(Config.port);

    app.get('/svg/test', (req, res, next) => {
        res.contentType('image/svg+xml; charset=utf-8').end(svg('iconnpass', 'It works!', GREEN));
    });
    app.get('/svg/:eventId', async (req, res, next) => {
        const eventId = Number((req.params.eventId as string || '').replace('.svg', ''));
        if (isNaN(eventId)) {
            return res.status(400).end('Bad Request');
        }
        let resultFromDb = await EventTable.findById(eventId);
        if (!resultFromDb || !resultFromDb.updatedAt || Date.now() - resultFromDb.updatedAt.getTime() > CONNPASS_EXPIRE * 1000) {
            const result = await get({
                url: `https://connpass.com/api/v1/event/?event_id=${eventId}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iconnpass/1.0)'
                },
                json: true
            }).catch(() => null);
            if (!result || result.statusCode !== 200) {
                return res.status(500).end('Connpass did not respond');
            }
            const resultJson = result.body as Connpass;
            if (resultJson.events.length !== 1) {
                return res.status(500).end('Event not found / API response invalid');
            }
            if (!resultFromDb) {
                resultFromDb = await EventTable.create({
                    id: eventId,
                    title: resultJson.events[0].title,
                    start: new Date(resultJson.events[0].started_at),
                    end: new Date(resultJson.events[0].ended_at),
                    limit: resultJson.events[0].limit || 0,
                    total: resultJson.events[0].accepted || 0,
                    waiting: resultJson.events[0].waiting || 0
                });
            } else {
                resultFromDb.title = resultJson.events[0].title;
                resultFromDb.start = new Date(resultJson.events[0].started_at);
                resultFromDb.end = new Date(resultJson.events[0].ended_at);
                resultFromDb.limit = resultJson.events[0].limit || 0;
                resultFromDb.total = resultJson.events[0].accepted || 0;
                resultFromDb.waiting = resultJson.events[0].waiting || 0;
                await resultFromDb.save();
            }
        }
        const now = moment();
        const [start, end] = [moment(resultFromDb.start), moment(resultFromDb.end)];
        let eventStatus = '受付中';
        let color = GREEN;
        if (end.isBefore(now)) {
            eventStatus = '終了';
            color = GRAY;
        } else if (start.isBefore(now)) {
            eventStatus = '開催中';
            color = BLUE;
        } else if (start.subtract(1, 'day').isBefore(now)) {
            eventStatus = '開催間近';
            color = ORANGE;
        } else if (resultFromDb.waiting > 0) {
            eventStatus = '待ち有';
            color = RED;
        }

        const subject = `${sanitize(resultFromDb.title)}`;
        const total = resultFromDb.waiting + resultFromDb.total;
        const status = resultFromDb.limit === 0 ? eventStatus : `[${eventStatus}] ${total}/${resultFromDb.limit}人`;
        res.contentType('image/svg+xml; charset=utf-8').end(svg(subject, status, color));
    });
})();