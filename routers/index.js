const express = require('express');
const router = express.Router();
const VulnerabildadControllers = require('../controllers/vulnerabilidadControllers');


module.exports = function() {

    //Rutas Vulvenerabilidades
    router.get('/vulnerabilidades', VulnerabildadControllers.list); //get: /vulnerabilidades

    router.get('/vulnerabilidades/:id', VulnerabildadControllers.show); //get: /vulnerabilidades
    router.put('/vulnerabilidades/:id', VulnerabildadControllers.update); //get: /vulnerabilidades
    router.delete('/vulnerabilidades/:id', VulnerabildadControllers.delete); //get: /vulnerabilidades


    return router;
}