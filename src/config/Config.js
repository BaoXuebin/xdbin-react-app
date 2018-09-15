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
    theme: 'red',
    defaultAvatar: 'https://cn.gravatar.com/avatar/d7391870bd848246ba32d17dd031c4c6?s=80&r=G&d='
}, Config);
