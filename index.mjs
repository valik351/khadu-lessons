import 'dotenv/config'
import * as cheerio from 'cheerio';
import ical, {ICalCalendarMethod} from "ical-generator";
import * as http from "node:http";

const getCSRF = async () => {
    const data = await fetch("https://vuz.khadi.kharkov.ua/time-table/student", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "privacy_police=true; cookie_language=ce35ab22c9a2111ad400356bd02de4e8ad3135e0d5d8170a67ad1369ee608b49a%3A2%3A%7Bi%3A0%3Bs%3A15%3A%22cookie_language%22%3Bi%3A1%3Bs%3A2%3A%22ru%22%3B%7D; select-year-semester-year=8cfadd516d035fea2366b2a64649daf0f6c5403f43f1172cea3ab276a9e21ea4a%3A2%3A%7Bi%3A0%3Bs%3A25%3A%22select-year-semester-year%22%3Bi%3A1%3Bi%3A2024%3B%7D; select-year-semester-semester=adbc59ce40a8ebdf3e7f6af14b9ef27a52f00bfb323078e57b3cea9fdf481c45a%3A2%3A%7Bi%3A0%3Bs%3A29%3A%22select-year-semester-semester%22%3Bi%3A1%3Bi%3A0%3B%7D; _gid=GA1.3.2130972667.1757948232; _ga=GA1.3.1570555297.1755979564; _ga_YYL4B3Y5QW=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_GWKKEWJ3YT=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_SY736LCG2H=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_7D1YKHVHG6=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_KR44H30LNX=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_XFN3H2QTTG=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_V9QEHJXNG4=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_LD20Q2S8KE=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_LKZ3P9R3M5=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; advanced-frontend=1elovpuqjgodmmmjn449106hut; _csrf-frontend=d99fc856aad7021c330cc7a5f3f5eff9e8f62646fe49ac9f6230c1e71ebf7fa9a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22vGnf5wRvpLfyHK2w9J-eQpfjaDYMf62Z%22%3B%7D",
            "Referer": "https://vuz.khadi.kharkov.ua/time-table/student?type=0"
        },
        "body": null,
        "method": "GET"
    });

    const $ = cheerio.load(await data.text());

    return $('[name="csrf-token"]').attr('content')
}

const getLink = async (r1, r2) => {
    return fetch(`https://vuz.khadi.kharkov.ua/time-table/show-ads?r1=${r1}&r2=${r2}`, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrf-token": "NQT10uxrWGJbkMTgOllTKkaDAFsjcaRcdCoUpJof6KtDQ5u02RwKFCvcoplyEmFdf8ktPnIBwjYVbk3p_Cna8Q==",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "privacy_police=true; cookie_language=ce35ab22c9a2111ad400356bd02de4e8ad3135e0d5d8170a67ad1369ee608b49a%3A2%3A%7Bi%3A0%3Bs%3A15%3A%22cookie_language%22%3Bi%3A1%3Bs%3A2%3A%22ru%22%3B%7D; select-year-semester-year=8cfadd516d035fea2366b2a64649daf0f6c5403f43f1172cea3ab276a9e21ea4a%3A2%3A%7Bi%3A0%3Bs%3A25%3A%22select-year-semester-year%22%3Bi%3A1%3Bi%3A2024%3B%7D; select-year-semester-semester=adbc59ce40a8ebdf3e7f6af14b9ef27a52f00bfb323078e57b3cea9fdf481c45a%3A2%3A%7Bi%3A0%3Bs%3A29%3A%22select-year-semester-semester%22%3Bi%3A1%3Bi%3A0%3B%7D; _ga=GA1.3.1570555297.1755979564; _ga_YYL4B3Y5QW=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_GWKKEWJ3YT=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_SY736LCG2H=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_7D1YKHVHG6=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_KR44H30LNX=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_XFN3H2QTTG=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_V9QEHJXNG4=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_LD20Q2S8KE=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_LKZ3P9R3M5=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; advanced-frontend=1elovpuqjgodmmmjn449106hut; _csrf-frontend=d99fc856aad7021c330cc7a5f3f5eff9e8f62646fe49ac9f6230c1e71ebf7fa9a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22vGnf5wRvpLfyHK2w9J-eQpfjaDYMf62Z%22%3B%7D",
            "Referer": "https://vuz.khadi.kharkov.ua/time-table/student?type=0"
        },
        "body": null,
        "method": "GET"
    });
}

const getData = async (csrf) => {

    return fetch("https://vuz.khadi.kharkov.ua/time-table/student?type=0", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "privacy_police=true; cookie_language=ce35ab22c9a2111ad400356bd02de4e8ad3135e0d5d8170a67ad1369ee608b49a%3A2%3A%7Bi%3A0%3Bs%3A15%3A%22cookie_language%22%3Bi%3A1%3Bs%3A2%3A%22ru%22%3B%7D; select-year-semester-year=8cfadd516d035fea2366b2a64649daf0f6c5403f43f1172cea3ab276a9e21ea4a%3A2%3A%7Bi%3A0%3Bs%3A25%3A%22select-year-semester-year%22%3Bi%3A1%3Bi%3A2024%3B%7D; select-year-semester-semester=adbc59ce40a8ebdf3e7f6af14b9ef27a52f00bfb323078e57b3cea9fdf481c45a%3A2%3A%7Bi%3A0%3Bs%3A29%3A%22select-year-semester-semester%22%3Bi%3A1%3Bi%3A0%3B%7D; _gid=GA1.3.2130972667.1757948232; _ga=GA1.3.1570555297.1755979564; _ga_YYL4B3Y5QW=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_GWKKEWJ3YT=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_SY736LCG2H=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_7D1YKHVHG6=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_KR44H30LNX=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_XFN3H2QTTG=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_V9QEHJXNG4=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_LD20Q2S8KE=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; _ga_LKZ3P9R3M5=GS2.1.s1757975174$o3$g0$t1757975174$j60$l0$h0; advanced-frontend=1elovpuqjgodmmmjn449106hut; _csrf-frontend=d99fc856aad7021c330cc7a5f3f5eff9e8f62646fe49ac9f6230c1e71ebf7fa9a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22vGnf5wRvpLfyHK2w9J-eQpfjaDYMf62Z%22%3B%7D",
            "Referer": "https://vuz.khadi.kharkov.ua/time-table/student?type=0"
        },
        "body": `_csrf-frontend=${csrf}&TimeTableForm%5BfacultyId%5D=3&TimeTableForm%5Bcourse%5D=4&TimeTableForm%5BgroupId%5D=896&TimeTableForm%5BstudentId%5D=12357`,
        "method": "POST"
    });
}

const getEvents = async () => {
    const csrf = await getCSRF();
    const data = await getData(csrf);
    const $ = cheerio.load(await data.text());

    const trs = $('tr')
    const events = []
    const promises = []


    for (const tr of trs) {
        const start = $(tr).find('th.headcol .start').text()
        const end = $(tr).find('th.headcol .end').text()

        if (start) {
            const cells = $(tr).find('td .cell')
            for (const el of cells) {
                const $cell = $(el);
                const $button = $cell.find('[data-r1]');
                const $div = $cell.find('div[data-content]');

                const event = {
                    'data-r1': $button.attr('data-r1'),
                    'data-r2': $button.attr('data-r2'),
                    'data-content': $div.attr('data-content'),
                    start,
                    end
                }
                if (event["data-r1"]) {
                    promises.push(
                        getLink(event["data-r1"], event["data-r2"])
                            .then(res => res.json())
                            .then(linkData => {
                                try {
                                    const $$ = cheerio.load(linkData.html);
                                    event.link = $$('a').attr('href')

                                } catch (e) {
                                    console.log(e);
                                }
                                events.push(event)
                            })
                    );

                }
            }
        }
    }
    await Promise.all(promises);
    return events;
}

export const getCalendar = async () => {
    // const events = await getEvents();
    const events = [
        {
            'data-r1': '281196',
            'data-r2': '22.09.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Лк]<br>ауд. М_107<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        },
        {
            'data-r1': '281183',
            'data-r2': '29.09.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  15.08.2025",
            start: '15:10',
            end: '16:45',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281103',
            'data-r2': '30.09.2025',
            'data-content': 'Іноземна мова[Пз1]<br>ауд. М_114а<br>МА-41-22<br>Миргород Віолетта Олегівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5423'
        },
        {
            'data-r1': '281196',
            'data-r2': '06.10.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Лк]<br>ауд. М_107<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        },
        {
            'data-r1': '281182',
            'data-r2': '29.09.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Лк]<br>ауд. М_107<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281216',
            'data-r2': '07.10.2025',
            'data-content': 'Промислові логічні контролери[Пз]<br>ауд. М_113<br>МА-41-22<br>Гурко Олександр Геннадійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=6794'
        },
        {
            'data-r1': '281183',
            'data-r2': '22.09.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281196',
            'data-r2': '13.10.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Лк]<br>ауд. М_107<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        },
        {
            'data-r1': '281103',
            'data-r2': '07.10.2025',
            'data-content': 'Іноземна мова[Пз1]<br>ауд. М_114а<br>МА-41-22<br>Миргород Віолетта Олегівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5423'
        },
        {
            'data-r1': '281088',
            'data-r2': '23.09.2025',
            'data-content': 'Гнучке автоматизоване виробництво і робото-технічні комплекси[Пз]<br>ауд. М_103<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  21.08.2025',
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1210'
        },
        {
            'data-r1': '281078',
            'data-r2': '25.09.2025',
            'data-content': 'Автоматизовані системи управління експериментом[Пз]<br>ауд. М_113<br>МА-41-22<br>Кононихін Олександр Сергійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1238'
        },
        {
            'data-r1': '281197',
            'data-r2': '01.10.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Пз]<br>ауд. М_105<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        },
        {
            'data-r1': '281087',
            'data-r2': '16.09.2025',
            'data-content': 'Гнучке автоматизоване виробництво і робото-технічні комплекси[Лк]<br>ауд. М_103<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  21.08.2025',
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1210'
        },
        {
            'data-r1': '281182',
            'data-r2': '13.10.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Лк]<br>ауд. М_107<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281196',
            'data-r2': '29.09.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Лк]<br>ауд. М_107<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        },
        {
            'data-r1': '281182',
            'data-r2': '22.09.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Лк]<br>ауд. М_107<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281078',
            'data-r2': '02.10.2025',
            'data-content': 'Автоматизовані системи управління експериментом[Пз]<br>ауд. М_113<br>МА-41-22<br>Кононихін Олександр Сергійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1238'
        },
        {
            'data-r1': '281216',
            'data-r2': '23.09.2025',
            'data-content': 'Промислові логічні контролери[Пз]<br>ауд. М_113<br>МА-41-22<br>Гурко Олександр Геннадійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=6794'
        },
        {
            'data-r1': '281183',
            'data-r2': '06.10.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  15.08.2025",
            start: '15:10',
            end: '16:45',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281103',
            'data-r2': '14.10.2025',
            'data-content': 'Іноземна мова[Пз1]<br>ауд. М_114а<br>МА-41-22<br>Миргород Віолетта Олегівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5423'
        },
        {
            'data-r1': '281087',
            'data-r2': '14.10.2025',
            'data-content': 'Гнучке автоматизоване виробництво і робото-технічні комплекси[Лк]<br>ауд. М_103<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  21.08.2025',
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1210'
        },
        {
            'data-r1': '281088',
            'data-r2': '07.10.2025',
            'data-content': 'Гнучке автоматизоване виробництво і робото-технічні комплекси[Пз]<br>ауд. М_103<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  21.08.2025',
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1210'
        },
        {
            'data-r1': '281216',
            'data-r2': '14.10.2025',
            'data-content': 'Промислові логічні контролери[Пз]<br>ауд. М_113<br>МА-41-22<br>Гурко Олександр Геннадійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=6794'
        },
        {
            'data-r1': '281103',
            'data-r2': '23.09.2025',
            'data-content': 'Іноземна мова[Пз1]<br>ауд. М_114а<br>МА-41-22<br>Миргород Віолетта Олегівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5423'
        },
        {
            'data-r1': '281078',
            'data-r2': '09.10.2025',
            'data-content': 'Автоматизовані системи управління експериментом[Пз]<br>ауд. М_113<br>МА-41-22<br>Кононихін Олександр Сергійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1238'
        },
        {
            'data-r1': '281149',
            'data-r2': '08.10.2025',
            'data-content': 'Системний аналіз[Пз]<br>ауд. М_105<br>МА-41-22<br>Нефьодов Леонід Іванович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/enrol/index.php?id=1224'
        },
        {
            'data-r1': '281216',
            'data-r2': '30.09.2025',
            'data-content': 'Промислові логічні контролери[Пз]<br>ауд. М_113<br>МА-41-22<br>Гурко Олександр Геннадійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=6794'
        },
        {
            'data-r1': '281216',
            'data-r2': '16.09.2025',
            'data-content': 'Промислові логічні контролери[Пз]<br>ауд. М_113<br>МА-41-22<br>Гурко Олександр Геннадійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=6794'
        },
        {
            'data-r1': '281077',
            'data-r2': '03.10.2025',
            'data-content': 'Автоматизовані системи управління експериментом[Лк]<br>ауд. М_107<br>МА-41-22<br>Кононихін Олександр Сергійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1238'
        },
        {
            'data-r1': '281122',
            'data-r2': '09.10.2025',
            'data-content': 'Інтелектуальні інформаційні системи[Пз]<br>ауд. М_107<br>МА-41-22<br>Запорожцев Сергій Юрійович<br>Добавлено:  12.08.2025',
            start: '08:00',
            end: '09:35',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=2779'
        },
        {
            'data-r1': '281197',
            'data-r2': '24.09.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Пз]<br>ауд. М_105<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        },
        {
            'data-r1': '281087',
            'data-r2': '30.09.2025',
            'data-content': 'Гнучке автоматизоване виробництво і робото-технічні комплекси[Лк]<br>ауд. М_103<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  21.08.2025',
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1210'
        },
        {
            'data-r1': '281183',
            'data-r2': '06.10.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281078',
            'data-r2': '18.09.2025',
            'data-content': 'Автоматизовані системи управління експериментом[Пз]<br>ауд. М_113<br>МА-41-22<br>Кононихін Олександр Сергійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1238'
        },
        {
            'data-r1': '281222',
            'data-r2': '19.09.2025',
            'data-content': 'Промислові логічні контролери[Лк]<br>ауд. М_107<br>МА-41-22<br>Гурко Олександр Геннадійович<br>Добавлено:  12.08.2025',
            start: '08:00',
            end: '09:35',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=6794'
        },
        {
            'data-r1': '281103',
            'data-r2': '16.09.2025',
            'data-content': 'Іноземна мова[Пз1]<br>ауд. М_114а<br>МА-41-22<br>Миргород Віолетта Олегівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5423'
        },
        {
            'data-r1': '281183',
            'data-r2': '13.10.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  15.08.2025",
            start: '15:10',
            end: '16:45',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281121',
            'data-r2': '02.10.2025',
            'data-content': 'Інтелектуальні інформаційні системи[Лк]<br>ауд. М_103<br>МА-41-22<br>Запорожцев Сергій Юрійович<br>Добавлено:  12.08.2025',
            start: '08:00',
            end: '09:35',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=2779'
        },
        {
            'data-r1': '281149',
            'data-r2': '24.09.2025',
            'data-content': 'Системний аналіз[Пз]<br>ауд. М_105<br>МА-41-22<br>Нефьодов Леонід Іванович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/enrol/index.php?id=1224'
        },
        {
            'data-r1': '281222',
            'data-r2': '03.10.2025',
            'data-content': 'Промислові логічні контролери[Лк]<br>ауд. М_107<br>МА-41-22<br>Гурко Олександр Геннадійович<br>Добавлено:  12.08.2025',
            start: '08:00',
            end: '09:35',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=6794'
        },
        {
            'data-r1': '281122',
            'data-r2': '25.09.2025',
            'data-content': 'Інтелектуальні інформаційні системи[Пз]<br>ауд. М_107<br>МА-41-22<br>Запорожцев Сергій Юрійович<br>Добавлено:  12.08.2025',
            start: '08:00',
            end: '09:35',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=2779'
        },
        {
            'data-r1': '281183',
            'data-r2': '22.09.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  15.08.2025",
            start: '15:10',
            end: '16:45',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281183',
            'data-r2': '29.09.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281197',
            'data-r2': '08.10.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Пз]<br>ауд. М_105<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        },
        {
            'data-r1': '281148',
            'data-r2': '17.09.2025',
            'data-content': 'Системний аналіз[Лк]<br>ауд. М_113<br>МА-41-22<br>Нефьодов Леонід Іванович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/enrol/index.php?id=1224'
        },
        {
            'data-r1': '281077',
            'data-r2': '19.09.2025',
            'data-content': 'Автоматизовані системи управління експериментом[Лк]<br>ауд. М_107<br>МА-41-22<br>Кононихін Олександр Сергійович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1238'
        },
        {
            'data-r1': '281148',
            'data-r2': '01.10.2025',
            'data-content': 'Системний аналіз[Лк]<br>ауд. М_113<br>МА-41-22<br>Нефьодов Леонід Іванович<br>Добавлено:  12.08.2025',
            start: '09:45',
            end: '11:20',
            link: 'https://dl2022.khadi-kh.com/enrol/index.php?id=1224'
        },
        {
            'data-r1': '281121',
            'data-r2': '18.09.2025',
            'data-content': 'Інтелектуальні інформаційні системи[Лк]<br>ауд. М_103<br>МА-41-22<br>Запорожцев Сергій Юрійович<br>Добавлено:  12.08.2025',
            start: '08:00',
            end: '09:35',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=2779'
        },
        {
            'data-r1': '281183',
            'data-r2': '13.10.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Пз]<br>ауд. М_103<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '13:25',
            end: '15:00',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281182',
            'data-r2': '06.10.2025',
            'data-content': "Комп'ютерно-інтегровані системи управління об'єктами галузі[Лк]<br>ауд. М_107<br>МА-41-22<br>Філь Наталія Юріївна<br>Добавлено:  12.08.2025",
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=1233'
        },
        {
            'data-r1': '281197',
            'data-r2': '17.09.2025',
            'data-content': 'Основи конструювання та системи автоматизованного проектування[Пз]<br>ауд. М_105<br>МА-41-22<br>Біньковська Анжела Борисівна<br>Добавлено:  12.08.2025',
            start: '11:40',
            end: '13:15',
            link: 'https://dl2022.khadi-kh.com/course/view.php?id=5955'
        }
    ]

    const calendar = ical({ name: 'my first iCal' });
    calendar.method(ICalCalendarMethod.REQUEST)
    for (const event of events) {
        const day = event["data-r2"].split('.').reverse().join('-');

        const startTime = new Date(day + 'T' + event["start"] + ':00');
        const endTime = new Date(day+ 'T' + event["end"] + ':00');

        calendar.createEvent({
            id: startTime.toISOString().replace(/[-:.]/g,"") + "@khadu.kh",
            location: "Khnadu",
            start: startTime,
            end: endTime,
            summary: 'Khnadu lesson',
            description: event["data-content"],
            url: event.link,
        });
    }
    return calendar.toString();
}

http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="calendar.ics"',
    });

    res.end(await getCalendar());
}).listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
