const {s3Upload, s3Get, updateFileName} = require('../util');

/**
 * Scenario: 
 * GET 404
 * PUT
 * GET 404/200
 * PUT updated 
 * GET updated/notUpdated
 *
 */
async function main(){
    try {
        let result;
        updateFileName();
        result = await s3Get();
        if(result.status != 404) result.expected = false;
        else result.expected = true;
        console.log(result);
        
        console.log(await s3Upload());
        result = await s3Get();
        if(result.status != 200) result.expected = false;
        else result.expected = true;
        console.log(result);
        
        console.log(await s3Upload('updated'));
        result = await s3Get();
        if(result.data != 'updated') result.expected = false;
        else result.expected = true;
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
module.exports = main;