export const isEmpty = str => str === null || str === '' || str.trim() === '';
export const isEmail = email => /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email);
