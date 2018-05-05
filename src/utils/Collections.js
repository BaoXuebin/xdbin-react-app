export default class Collections {
    static indexOf(collection, callback) {
        let index = -1;
        if (collection && collection.length > 0) {
            collection.forEach((c, i) => {
                if (callback(c)) {
                    index = i;
                }
            });
        }
        return index;
    }
}
