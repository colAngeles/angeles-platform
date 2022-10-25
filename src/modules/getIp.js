const os = require('os')
function getIpAddress(){
    return Object.values(os.networkInterfaces())
           .reduce((acumulator, iface) => [...acumulator, ...iface], [])
            .filter(({address, family, internal})=> !address.includes('169.254') && family == 'IPv4' && !internal)
             .map(({address}) => address)[0]
}
module.exports = getIpAddress()