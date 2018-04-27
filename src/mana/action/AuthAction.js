// 用户的初始化和删除
export const AuthActionTypes = {
    INIT_USER: 'INIT_USER',
    DEL_USER: 'DEL_USER'
};

export const initUSer = user => ({
    type: AuthActionTypes.INIT_USER,
    user
});