const { getWalletFunc } = require('../../application/sdk/getWallet.js')
const { enrollAdminFunc } = require('../../application/sdk/enrollAdmin.js')
const { registUsersFunc } = require('../../application/sdk/registUsers.js')

const getWallet = ( req, res ) => {
    const { id } = req.body
    getWalletFunc(id)
    res.json({a:id})
}

const enrollAdmin = ( req, res ) => {
    const a = enrollAdminFunc();

    res.json({a:a})
}

const registUsers = ( req, res ) => {
    registUsersFunc()
    res.json({sadf:'eee'});
}

module.exports = { getWallet, enrollAdmin, registUsers }