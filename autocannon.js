const autocannon = require('autocannon')
const { json } = require('express')

async function init(){
    const instance = autocannon({
    url: 'http://localhost:8080/get-token',
    method: 'POST',
    connections: 1000,
    duration: 10,
    form: { "relativeId": { "type": "text", "value": "1057186308"}, "studentId": { "type": "text", "value": "1057186692"}}
    })

    // this is used to kill the instance on CTRL-C
    process.once('SIGINT', () => {
        instance.stop()
    })

    // just render results
    autocannon.track(instance, {renderProgressBar: true})
}
init()