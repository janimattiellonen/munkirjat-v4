var ArrayUtils = {
    chunk: function(src, chunkSize) {
        var arr = [];

        for (var i = 0; i < src.length; i += chunkSize) {
            arr.push(src.slice(i, i + chunkSize));
        }

        return arr;
    }
};


module.exports = ArrayUtils;