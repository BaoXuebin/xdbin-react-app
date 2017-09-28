export function other() {
}

// google analytics
export function googleAnalytics() {
    window.dataLayer = window.dataLayer || [];
    const gtag = () => dataLayer.push(arguments);
    gtag('js', new Date());

    gtag('config', 'UA-107197856-1');
}
