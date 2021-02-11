const {s3Upload, s3Get} = require('../util');
async function main(){
    try {
        console.log(await s3Upload());
        console.log(await s3Get());
    } catch (error) {
        console.log(error);
    }
}
module.exports = main;