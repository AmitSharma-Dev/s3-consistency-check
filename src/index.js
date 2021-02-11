async function main(){
    try {
        const scenario = '3';
        const test = require('./scenarios/test' + scenario + '.js');
        for(let i = 0; i<100;i++) {
            console.log("***************")
            await test();
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = main;