/**
 * 对象浅比较
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns 
 */
export const objectIsEqual = (obj1, obj2) => {
    for (let key in obj1) {
        if (!Object.is(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}