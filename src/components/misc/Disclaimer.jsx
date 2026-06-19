import SquareAd from '@/components/adsenses/SquareAd';
import ResponsiveAd from '@/components/adsenses/ResponsiveAd';
import isAdEnabled from '@/utils/isAdEnabled';
import { formatDate } from '@/utils/dateFormat';
import './miscPages.css';

const Disclaimer = () => {
    const lastUpdated = formatDate(new Date());

    return (
        <div className="misc-section">
            <section className="misc-hero">
                <span className="eyebrow">Legal notice</span>
                <h1>Disclaimer</h1>
                <p>
                    Important information about our terms of use and liability limitations. This page explains what you can expect from Quiz-Blog and what we expect from users.
                </p>
                <a className="misc-link" href="mailto:quizblog.rw@gmail.com">
                    quizblog.rw@gmail.com
                </a>
            </section>

            <div className="misc-content">
                <section className="misc-card">
                    <h2>Quick Summary</h2>
                    <p>
                        This disclaimer outlines the limits of liability for content on quizblog.rw. We provide information in good faith, but cannot guarantee completeness, accuracy, or reliability.
                    </p>
                    <div className="misc-callout">
                        For more details or questions, contact us at{' '}
                        <a className="misc-link" href="mailto:quizblog.rw@gmail.com">
                            quizblog.rw@gmail.com
                        </a>.
                    </div>
                </section>

                <section className="misc-card">
                    <h2>Disclaimers for quizblog.rw</h2>
                    <p>
                        All information on{' '}
                        <a className="misc-link" href="https://www.quizblog.rw">
                            https://www.quizblog.rw
                        </a>{' '}
                        is provided in good faith and for general information only. We do not guarantee completeness, accuracy, or reliability. Any action you take is at your own risk.
                    </p>

                    <div className="misc-alert">
                        <strong>Warning:</strong> We include links to external websites, but we cannot control or guarantee their content or nature.
                    </div>

                    <p>
                        External links do not imply our endorsement. Content on other sites may change without notice.
                    </p>

                    <div className="misc-alert">
                        <strong>Note:</strong> When leaving quizblog.rw, other sites may have different privacy policies and terms. Review them before interacting or sharing information.
                    </div>
                </section>

                <section className="misc-card">
                    <h2>Consent</h2>
                    <p>By using our website, you consent to and agree with this disclaimer.</p>
                </section>

                <section className="misc-card">
                    <h2>Updates</h2>
                    <p>Any changes to this disclaimer will be posted here. Check back regularly for the latest version.</p>
                    <p className="mb-0">Last updated: {lastUpdated}</p>
                </section>

                {isAdEnabled() && (
                    <section className="misc-card">
                        <ResponsiveAd />
                    </section>
                )}

                {isAdEnabled() && (
                    <section className="misc-card">
                        <SquareAd />
                    </section>
                )}
            </div>
        </div>
    );
};

export default Disclaimer;
