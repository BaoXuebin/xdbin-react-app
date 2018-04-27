import Prod from './Prod';
import Dev from './Dev';

let Config = Dev;
if (process.env.NODE_ENV === Prod.NODE_ENV) {
    Config = Prod;
}

export default Object.assign({
    // 网站名称
    website: 'xdbin',
    defaultTitle: '陆止于此，海始于斯。',
    neteaseApi: '/netease/',
    theme: 'red'
}, Config);
