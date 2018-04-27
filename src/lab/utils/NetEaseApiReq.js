// 网易云音乐 api 接口
// https://github.com/Binaryify/NeteaseCloudMusicApi

import Net from '../../utils/Net';
import Config from '../../config/Config';

const base = Config.neteaseApi;

// 查询歌曲列表
export const musicListReq = keyword => new Promise((resolve, reject) => {
    const url = `${base}search?keywords=${keyword}`;
    Net.neteaseFetch(url)
        .then((data) => {
            resolve(data.result);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

// 获取歌曲封面图
export const musicCoverReq = id => new Promise((resolve, reject) => {
    const url = `${base}song/detail?ids=${id}`;
    Net.neteaseFetch(url)
        .then((data) => {
            resolve(data.songs);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});

export const musicUrlReq = id => new Promise((resolve, reject) => {
    const url = `${base}music/url?id=${id}`;
    Net.neteaseFetch(url)
        .then((data) => {
            resolve(data.data);
        })
        .catch((error) => {
            reject(error.error || '未知错误');
        });
});
