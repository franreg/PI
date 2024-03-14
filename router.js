var express = require('express');
const agentCtrl = require('./Controllers/agentCtrl');
const filiereCtrl = require('./Controllers/filiereCtrl');
const ueCtrl = require('./Controllers/ueCtrl');
const ecueCtrl = require('./Controllers/ecueCtrl');
const maquetteCtrl = require('./Controllers/maquetteCtrl');
const gradeCtrl = require('./Controllers/gradeCtrl');
const specialisationCtrl = require('./Controllers/specialisationCtrl');
const etudiantCtrl = require('./Controllers/etudiantCtrl');
const enseignantCtrl = require('./Controllers/enseignantCtrl');



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
    apiRouter.get('/agent/logout', agentCtrl.logout);

    // Route pour récupérer les informations d'un compte
    apiRouter.get('/agent/menu', agentCtrl.getAgentProfile);

    // Route pour mettre à jour un agent
    apiRouter.put('/agent/update/:id', agentCtrl.updateAgent);

    // Route pour supprimer un agent
    apiRouter.delete('/agent/delete/:id', agentCtrl.deleteAgent);

    // Route pour afficher tous les agents
    apiRouter.get('/agent/all',agentCtrl.allagent);

    // Route pour récuperer les données d'un agent 
    apiRouter.get('/agent/one/:id',agentCtrl.getAgentbyId);

    // route pour modifier son mot de passe
    apiRouter.put('/agent/password',agentCtrl.updatepassword);

    /**
     *  Routes des Enseignants
     *  */

    // Route pour créer les étudiants
    apiRouter.post('/enseignant/register',enseignantCtrl.register);

    // Route pour modifier les informations d'un enseignant
    apiRouter.put('/enseignant/update/:id',enseignantCtrl.update);

    // Route pour supprimer un enseigant
    apiRouter.delete('/enseignant/delete/:id',enseignantCtrl.delete);

    // Route pour recuperer un enseigant
    apiRouter.get('/enseignant/one/:id',enseignantCtrl.getOne);

    // Route pour se connecter pour un enseignant
    apiRouter.post('/enseignant/login',enseignantCtrl.login);

    // Route pour récuperer le profile d'un enseignant
    apiRouter.get('/enseignant/profile',enseignantCtrl.getProfile);

    // Route pour se déconnecter 
    apiRouter.get('/enseignant/logout',enseignantCtrl.logout);

    // Route pour modifier son mot de passe enseignant
    apiRouter.get('/enseignant/password',enseignantCtrl.updatePassword);

    // Route pour recuperer tous les tous les enseignants
    apiRouter.get('/enseignant/all',enseignantCtrl.AllEnseignant);

    /**
     *  Routes des Etudiants
     *  */

    // Route pour créer un étudiant
    apiRouter.post('/etudiant/register',etudiantCtrl.register);

    // Route pour qu'un etudiant se connecte
    apiRouter.post('/etudiant/login',etudiantCtrl.login);

    // Route pour la deconnexion d'un compte étudiant
    apiRouter.get('/etudiant/logout',etudiantCtrl.logout);

    // Route pour recuperer les informations de l'étudiant
    apiRouter.get('/etudiant/profile',etudiantCtrl.getetudiantProfile);

    // Route pour modifier les information d'un étudiant
    apiRouter.put('/etudiant/update/:id', etudiantCtrl.updateetudiant);

    // Route pour supprimer un étudiant 
    apiRouter.delete('/etudiant/delete/:id', etudiantCtrl.deleteetudiant);

    // Route pour recupere un etudiant 
    apiRouter.get('/etudiant/one/:id',etudiantCtrl.getEtudiantbyId);

    // Route pour modifier son mot de passe étudiant
    apiRouter.put('/etudiant/password',etudiantCtrl.updatepassword);

    // Route pour afficher tous les étudians de la BD
    apiRouter.get('/etudiant/all',etudiantCtrl.alletudiant);

    //
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
     * Route  pour les grades d'un enseignant
     */

    //Route pour créer un grade
    apiRouter.post('/grade/register',gradeCtrl.register);

    // Route pour modifier grade
    apiRouter.put('/grade/update/:id',gradeCtrl.update);

    // Route pour supprimer le grade 
    apiRouter.delete('/grade/delete/:id',gradeCtrl.delete);

    // Route pour recupere un grade
    apiRouter.get('/grade/one/:id',gradeCtrl.getOne);

    // Route  pour recuperer tous les grades
    apiRouter.get('/grade/all',gradeCtrl.getAllGrade);

    /**
     * Routes pour les spécialité d'un enseignant
     */

    // Route pour créer une spécialisaton
    apiRouter.post('/specialisaton/register',specialisationCtrl.register);  

    // Route pour modifier une spécialisation
    apiRouter.put('/specialisaton/update/:id',specialisationCtrl.update);

    // Route pour supprimer une spécialisation
    apiRouter.delete('/specialisaton/delete/:id',specialisationCtrl.delete);

    // Route pour recuperer une spécialisation
    apiRouter.get('/specialisaton/one/:id',specialisationCtrl.getOne);

    // Route pour recuperer tous les spécialisations
    apiRouter.get('/specialisaton/all',specialisationCtrl.getAllspecialisation);

    return apiRouter;
})();
