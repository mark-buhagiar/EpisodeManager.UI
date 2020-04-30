const users = [
    {
        id: 1,
    },
];

const subscriptions = [
    {
        id: 1,
        userId: 1,
        title: 'Rookie',
    },
    {
        id: 2,
        userId: 1,
        title: 'Psych',
    },
];

const preferences = { qualities: [1, 2, 3] };

const shows = [
    {
        id: 1,
        title: 'Rookie',
    },
    {
        id: 2,
        title: 'Psych',
    },
    {
        id: 3,
        title: 'Monk',
    },
    {
        id: 4,
        title: 'Chuck',
    },
    {
        id: 675,
        title: 'Outlander',
    },
];

const episodes = [
    {
        id: 419,
        title: 'WWE Monday Night RAW 2020-04-06',
        show: 'WWE Monday Night funny fun timesRAW',
        publishedDate: new Date(),
        season: null,
        number: null,
        airDate: '2020-04-06',
        quality: 3,
        repack: false,
        link:
            'magnet:?xt=urn:btih:FE4815AEF713C2491A85C66FE0E8CF0AAADD06DE&dn=WWE+Monday+Night+RAW+2020+04+06+1080p+WEB+x264+ADMIT&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: true,
    },
    {
        id: 420,
        title: 'WWE Monday Night RAW 2020-04-06',
        show: 'WWE Monday Night RAW',
        publishedDate: '2020-04-12T14:00:39',
        season: null,
        number: null,
        airDate: '2020-04-06',
        quality: 1,
        repack: false,
        link:
            'magnet:?xt=urn:btih:6B0BC9227F7F83F2FEE857F4CCF0FB4916782A02&dn=WWE+Monday+Night+RAW+2020+04+06+WEB+x264+ADMIT&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 596,
        title: '#1403 - WWE Performance Center in Orlando, FL',
        show: 'WWE Monday Night RAW',
        publishedDate: '2020-04-16T19:20:20',
        season: null,
        number: null,
        airDate: '2020-04-13',
        quality: 3,
        repack: false,
        link:
            'magnet:?xt=urn:btih:8CB5B921050FC7C270B44AB2415B577C16587ED2&dn=WWE+Monday+Night+RAW+2020+04+13+1080p+WEB+x264+MenInTights&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 597,
        title: '#1403 - WWE Performance Center in Orlando, FL',
        show: 'WWE Monday Night RAW',
        publishedDate: '2020-04-16T19:20:20',
        season: null,
        number: null,
        airDate: '2020-04-13',
        quality: 2,
        repack: false,
        link:
            'magnet:?xt=urn:btih:48D7E4F423BAE92E0F02AB9BAD21849597490139&dn=WWE+Monday+Night+RAW+2020+04+13+720p+WEB+x264+MenInTights&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 409,
        title: 'Black Monday 2x06 Arthur Ponzarelli',
        show: 'Black Monday',
        publishedDate: '2020-04-12T06:10:15',
        season: 2,
        number: 6,
        airDate: null,
        quality: 1,
        repack: false,
        link:
            'magnet:?xt=urn:btih:35DEAE98C70CB72140A70D66E66FA0ADEBF08D92&dn=Black+Monday+S02E06+WEBRip+x264+XLF&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 410,
        title: 'Black Monday 2x06 Arthur Ponzarelli',
        show: 'Black Monday',
        publishedDate: '2020-04-12T06:20:17',
        season: 2,
        number: 6,
        airDate: null,
        quality: 2,
        repack: false,
        link:
            'magnet:?xt=urn:btih:EE340156546DF66B1879C0502F210AE9A06EFCF2&dn=Black+Monday+S02E06+720p+WEBRip+x264+XLF&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 411,
        title: 'Black Monday 2x06 Arthur Ponzarelli',
        show: 'Black Monday',
        publishedDate: '2020-04-12T06:40:15',
        season: 2,
        number: 6,
        airDate: null,
        quality: 3,
        repack: false,
        link:
            'magnet:?xt=urn:btih:A1AC5BF74D90A1F24E2211107ACA8F21F42BD8F2&dn=Black+Monday+S02E06+Arthur+Ponzarelli+1080p+AMZN+WEBRip+DDP5+1+x264+monkee&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 526,
        title: 'Episode 8',
        show: 'Devs',
        publishedDate: '2020-04-16T06:20:17',
        season: 1,
        number: 8,
        airDate: null,
        quality: 2,
        repack: false,
        link:
            'magnet:?xt=urn:btih:6FC710DB609B6D1D3D3CA98B7BEF9ABCFBCF1231&dn=Devs+S01E08+720p+WEBRip+x264+XLF&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 529,
        title: '',
        show: 'Devs',
        publishedDate: '2020-04-15T23:10:16',
        season: 1,
        number: 1,
        airDate: null,
        quality: 1,
        repack: true,
        link:
            'magnet:?xt=urn:btih:7D35507072DB3E133DB1553BDB22F4D9E0EAF116&dn=Devs+S01E01+REPACK+HDTV+x264+RiVER&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 551,
        title: 'Episode 8',
        show: 'Devs',
        publishedDate: '2020-04-16T06:20:17',
        season: 1,
        number: 8,
        airDate: null,
        quality: 1,
        repack: false,
        link:
            'magnet:?xt=urn:btih:3B47B48C3790B3171C012D659EE9F833EADC932D&dn=Devs+S01E08+WEBRip+x264+XLF&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 569,
        title: 'Episode 8',
        show: 'Devs',
        publishedDate: '2020-04-16T08:40:15',
        season: 1,
        number: 8,
        airDate: null,
        quality: 3,
        repack: false,
        link:
            'magnet:?xt=urn:btih:A40B7FB5B8AAD9794F7389D262388E755D3FA116&dn=Devs+S01E08+iNTERNAL+1080p+WEB+h264+TRUMP&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
    {
        id: 606,
        title: '',
        show: 'Devs',
        publishedDate: '2020-04-16T23:20:20',
        season: 1,
        number: 2,
        airDate: null,
        quality: 2,
        repack: true,
        link:
            'magnet:?xt=urn:btih:22707E62083C256E328203EA4AC8FDA354BEBCC9&dn=Devs+S01E02+REPACK+720p+HDTV+x264+RiVER&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce',
        downloaded: false,
    },
];

module.exports = {
    episodes,
    users,
    preferences,
    subscriptions,
    shows,
};
