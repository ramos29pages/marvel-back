const crypto = require('crypto');

const getAuthParams = () => {
    const ts = Date.now().toString();
    const hash = crypto
        .createHash('md5')
        .update(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY)
        .digest('hex');
    return `ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`;
};

module.exports = getAuthParams;