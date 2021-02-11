const AWS = require('aws-sdk');
var uuid = require('uuid');
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'comproGreenDev'});
const s3 = new AWS.S3();
const bucketName = 'c1-apps-dev-test';
let fileName = uuid.v1();
const largeFile = require('../large-file.json');
const updateFileName = function(){
    fileName = uuid.v1();
}
const s3Get = async () => {
    try {
        const data = await s3.getObject({
            Bucket: bucketName,
            Key: 'consistency-test/' + fileName + '.txt',
        }).promise();
        return {
            status: 200,
            data: data.Body.toString().slice(0 , 7)
        };
    } catch (error) {
        return ({status: error.statusCode, error: error.code});
    }
}

const s3Upload = async (updated = '') => {
    try {
        let body = fileName;
        if(updated) body = updated + ' ' + body;
        if(largeFile) body += JSON.stringify(largeFile);
        const param = {Bucket: bucketName, Key: 'consistency-test/' + fileName + '.txt', Body: body};
        await s3.putObject(param).promise();
        if(updated) 
            return 'updated successfully ' + fileName;
        return 'uploaded successfully ' + fileName;
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.updateFileName = updateFileName;
exports.s3Upload = s3Upload;
exports.s3Get = s3Get;