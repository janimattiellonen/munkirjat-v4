export default class ArrayUtils {
    static chunk(src, chunkSize) {
        var arr = [];

        for (var i = 0; i < src.length; i += chunkSize) {
            arr.push(src.slice(i, i + chunkSize));
        }

        return arr;
    }
}
