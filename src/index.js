const server= require('./app.js')


//Server starting
async function main(){
    await server.listen(server.get('port'));
    console.log(`Server on port ${server.get('port')}`);
}
main();