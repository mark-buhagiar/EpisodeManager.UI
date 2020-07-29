import React from 'react';
import Panel from '../common/panel';
import './HelpPage.scss';

const HelpPage: React.FC = (): JSX.Element => {
    return (
        <>
            <Panel title="My calendar is blank! What do I do now?">
                Head over to your profile page by clicking the link at the top right. Here you can customize your
                preferred show qualities, as well as select which shows you would like to subscribe to.
            </Panel>
            <Panel title="How do I download episodes?">
                You can click episode names in the calender to download them. Downloads happen through magnet links.
                Which means you need a torrent client which supports magnet links (most do).
                <br />
                <br />
                You can also download multiple episodes by using the checkbox next to episode titles and then clicking
                the download button. Certain browsers might complain when you try to do this. You can put those great
                Googling skills to work in order to work around the issue.
            </Panel>
            <Panel title="How do I see the episodes for a single show?">
                Navigate to the shows page using the top nav bar. You can then use the provided filters to accesses the
                desired episodes.
            </Panel>
            <Panel title="I can't find a particular show?">
                <p>
                    Unfortunately the source of our data may be incomplete, which is entirely out of our control. Also,
                    the site first went live on the 22nd of February 2015, so any episodes that aired before that date
                    are unavailable. Sorry{' '}
                    <span role="img" aria-label="smile">
                        ☹️
                    </span>
                </p>
            </Panel>
            <Panel title="Older shows are taking forever to download!">
                The primary purpose of this website is to download new episodes as they are released. Older episodes
                will probably have lost most of their trackers, and will take much longer to download. In these cases,
                you are probably better off finding a bundled season elsewhere.
            </Panel>
            <Panel title="Where can I contact you?">
                <p>
                    If you have any questions or run into any problems, kindly get in touch by emailing me on{' '}
                    <a className="email-link" href="mailto:episodemanagerinfo@gmail.com">
                        episodemanagerinfo@gmail.com
                    </a>
                    .
                </p>
            </Panel>
            <Panel title="How much does it cost?">
                <p>
                    Everything here is free, but if you would like to, you can{' '}
                    <a className="email-link" target="blank" href="https://www.buymeacoffee.com/episodemanager">
                        click here to buy me a coffee
                    </a>
                    .
                </p>
            </Panel>
        </>
    );
};

export default HelpPage;
