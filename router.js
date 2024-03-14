var express = require('express');
const agentCtrl = require('./Controllers/agentCtrl');
const filiereCtrl = require('./Controllers/filiereCtrl');
const ueCtrl = require('./Controllers/ueCtrl');
const ecueCtrl = require('./Controllers/ecueCtrl');
const maquetteCtrl = require('./Controllers/maquetteCtrl');
const authMiddleware = require('./Controllers/authMiddleware');

exports.router = (function(){
    var apiRouter = express.Router();
    
    /**
     *  Routes des agents
     *  */

    // Route pour l'inscription d'un agent
    apiRouter.post("/agent/register", agentCtrl.register);

    // Route pour la connexion d'un agent
    apiRouter.post("/agent/login", agentCtrl.login);

    // Route pour la déconnexion d'un agent
    apiRouter.get('/agent/logout', authMiddleware, agentCtrl.logout);

    // Route pour récupérer les informations d'un compte
    apiRouter.get('/agent/menu', authMiddleware, agentCtrl.getAgentProfile);

    // Route pour mettre à jour un agent
    apiRouter.put('/agent/update/:id', agentCtrl.updateAgent);

    // Route pour supprimer un agent
    apiRouter.delete('/agent/delete/:id', authMiddleware, agentCtrl.deleteAgent);

    // Route pour afficher tous les agents
    apiRouter.get('/agent/all',agentCtrl.allagent);

    /**
     *  Routes des Enseignants
     *  */

    /**
     *  Routes des Etudiants
     *  */


     /**
     *  Routes des Filières
     *  */

    // Route pour la création d'une filière
    apiRouter.post('/filiere/register',filiereCtrl.register);

    // Route pour la modification d'une filière
    apiRouter.put('/filiere/update/:id',filiereCtrl.update);

    //Route pour la suppression d'une filière 
    apiRouter.delete('/filiere/delete/:id',filiereCtrl.delete);

    // Route pour afficher une filière 
    apiRouter.get('/filiere/one/:id',filiereCtrl.getFiliere);

    // Route pour afficher toute les filières
    apiRouter.get('/filiere/all',filiereCtrl.allFiliere);

    /**
     *  Routes des Unités d'Enseignements UE
     * 
     *  */

    // Route pour créer une nouvelle unité d'enseignement
    apiRouter.post('/ue/register',ueCtrl.register);
    
    //Route pour modifier une UE
    apiRouter.put('/ue/update/:id',ueCtrl.update);

    // Route pour supprimer une UE
    apiRouter.delete('/ue/delete/:id',ueCtrl.delete);

    // Route pour recuperer une UE
    apiRouter.get('/ue/one/:id',ueCtrl.getUE);

    // Route pour afficher toutes les UE
    apiRouter.get('/ue/all',ueCtrl.AllUE);

    /**
     *  Routes des Eléments constitutifs d'une unité d'enseignements
     *  */
    // Route pour créer une ECUE
    apiRouter.post('/ecue/register',ecueCtrl.register);

    // Route pour modifier une ECUE
    apiRouter.put('/ecue/update/:id',ecueCtrl.update);

    // Route pour supprimer une ECUE 
    apiRouter.delete('/ecue/delete/:id',ecueCtrl.delete);

    // Route pour récupérer une ECUE
    apiRouter.get('/ecue/one/:id',ecueCtrl.getECUE);

    // Route pour récupérer tous les ECUE d'une UE
    apiRouter.get('/ecue/ue/:id',ecueCtrl.AllECUEbyUE);

    // Route pour afficher toutes les ECUE
    apiRouter.get('/ecue/all',ecueCtrl.AllECUE);

    /**
     * Route pour les maquettes
     */

    //Route pour créer des maquettes
    apiRouter.post('/maquette/register',maquetteCtrl.register);

    //  Route pour modifier une maquette 
    apiRouter.put('/maquette/update/:id',maquetteCtrl.update);

    // Route pour supprimer une  route  
    apiRouter.delete('/maquette/delete/:id',maquetteCtrl.delete);

    // Rouyte pour recuperer une maquette en fonction de la filière 
    apiRouter.get('/maquette/filiere/:id',maquetteCtrl.getMaquettebyFiliere);

    //Route pour avoir toutes les maquettes 
    apiRouter.get('/maquette/all',maquetteCtrl.getAllMaquette);

    /**
     * Route  pour dispenser
     */

    return apiRouter;
})();
