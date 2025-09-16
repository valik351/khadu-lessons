import {getCalendar} from "../index.mjs";

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader(
        'Content-Disposition',
        'attachment; filename="calendar.ics"'
    );
    res.status(200).send(await getCalendar());
}