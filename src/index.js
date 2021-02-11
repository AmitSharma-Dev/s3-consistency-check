async function main(){
    try {
        const scenario = process.argv.slice(2)[0] || '3';
        const test = require('./scenarios/test' + scenario + '.js');
        // for(let i = 0; i<100;i++) {
            console.log("***************")
            await test();
        // }
    } catch (error) {
        console.log(error);
    }
}
main();