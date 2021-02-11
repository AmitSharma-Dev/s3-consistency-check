const main = require('./src/index.js');
exports.handler = async (event) => {
    try {
        await main();
        return {
            "statusCode": 200,
            "body": JSON.stringify({
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};