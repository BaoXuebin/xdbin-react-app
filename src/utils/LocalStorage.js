export const LocalStorageKeys = {
    MUSIC_CACHE: '_cache'
};

export const get = (key) => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

export const persist = (key, value) => {
    if (typeof localStorage === 'undefined') {
        // 当前环境不是浏览器，直接退出
        return;
    }
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
};

export const clear = (key) => {
    if (typeof localStorage === 'undefined') {
        // 当前环境不是浏览器，直接退出
        return;
    }
    localStorage.removeItem(key);
};
