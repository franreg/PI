// Imports
const jwt = require('jsonwebtoken');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwtUtils = require('../utils/jwt.utils');

module.exports={

    // Fonction pour enregistrer un enseignant
    register: async(req,res)=>{
        const { nom_enseignant, prenom_enseignant, dn_enseignant, matricule_enseignant, password, email, numero, sexe,GradeId,SpecialisationId } = req.body;

        // Vérifier si tous les champs nécessaires sont fournis
        if (!nom_enseignant || !prenom_enseignant || !dn_enseignant || !matricule_enseignant || !password || !email || !numero || !sexe || !GradeId || !SpecialisationId) {
            return res.status(400).json({ error: 'Il y a des paramètres manquants' });
        }
        
        try {
            // Vérifier si un étudiant avec ce matricule existe déjà
            const enseignantFound = await models.Enseignant.findOne({ where: { matricule_enseignant: matricule_enseignant } });
            if (enseignantFound) {
                return res.status(409).json({ error: "L'enseignant existe déjà" });
            }
        
            // Hasher le mot de passe avec bcryptjs
            const bcryptedPassword = await bcryptjs.hash(password, 5);
        
            // Créer un nouvel étudiant dans la base de données
            const newEnseignant = await models.Enseignant.create({
                nom_enseignant,
                prenom_enseignant,
                dn_enseignant,
                matricule_enseignant,
                password: bcryptedPassword,
                email,
                numero,
                sexe,
                GradeId,
                SpecialisationId
            });
        
            return res.status(201).json({ EnseignantId: newEnseignant.id ,'Message':"L'enseignant à été crée"});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de créer cet enseignant" });
        }
        
    },

    // Fonction pour modifier les informations d'un enseignant
    update: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        const { nom_enseignant, prenom_enseignant, dn_enseignant, matricule_enseignant, password, email, numero, sexe,GradeId,SpecialisationId } = req.body;
        try {
            // Vérifier si un étudiant avec ce matricule existe déjà
            const enseignantFound = await models.Enseignant.findOne({ where: { id: id } });
            if (!enseignantFound) {
                return res.status(409).json({ error: "L'enseignant n'existe pas" });
            }
        
            // Hasher le mot de passe avec bcryptjs
            const bcryptedPassword = await bcryptjs.hash(password, 5);
        
            // Modifier un  enseignant dans la base de données
            await models.Enseignant.update({
                nom_enseignant,
                prenom_enseignant,
                dn_enseignant,
                matricule_enseignant,
                password: bcryptedPassword,
                email,
                numero,
                sexe,
                GradeId,
                SpecialisationId
            },{where:{id:id}});
        
            return res.status(201).json({ 'succès': 'La modification à été éffectué' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de modifier cet enseignant" });
        }
        
    },

    // Fonction pour supprimer un enseignant de la BD
    delete: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        try {
            // Vérifier si un étudiant avec ce matricule existe déjà
            const enseignantFound = await models.Enseignant.findOne({ where: { id: id } });
            if (!enseignantFound) {
                return res.status(409).json({ error: "L'enseignant n'existe pas" });
            }
        
            // Supprimer un étudiant dans la base de données
            await models.Enseignant.destroy({where:{id:id}});
        
            return res.status(201).json({ 'succès': 'La suppression à été éffectué' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de supprimer cet enseignant" });
        }
        
    },

    // Fonction pour recuper un enseignant via son ID
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        try {
            // Vérifier si un étudiant avec ce matricule existe déjà
            const enseignantFound = await models.Enseignant.findOne({ where: { id: id } });
            if (!enseignantFound) {
                return res.status(409).json({ error: "L'enseignant n'existe pas" });
            }
        
            // Recuperer un étudiant dans la base de données
        
            return res.status(201).json({ 'Enseignant':  enseignantFound});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de recupere cet enseignant" });
        }
    },

    // Fonction pour se connecter
    login: async(req,res)=>{
        const { matricule_enseignant, password } = req.body;

        // Vérification que les champs ne sont pas vides
        if (!matricule_enseignant || !password) {
        return res.status(400).json({ erreur: "Des paramètres sont manquants" });
        }

        try {
        // Recherche de l'enseignant dans la base de données
        const enseignantFound = await models.Enseignant.findOne({ where: { matricule_enseignant } });

        // Si l'enseignant n'existe pas
        if (!enseignantFound) {
            return res.status(404).json({ erreur: "Mot de passe ou matricule erroné" });
        }

        // Comparaison du mot de passe
        const isMatch = await bcryptjs.compare(password, enseignantFound.password);

        // Si le mot de passe est incorrect
        if (!isMatch) {
            return res.status(403).json({ erreur: "Le mot de passe est invalide" });
        }

        // Génération du token
        const token = jwtUtils.generateToken({ matricule_enseignant }, '24h');

        // Envoi d'une réponse de succès avec le token
        return res.status(200).json({ message: "Enseignant connecté", token });
        } catch (error) {
        // Journalisation de l'erreur
        console.error('Erreur lors de la connexion de l\'enseignant :', error.message);

        // Envoi d'une réponse d'erreur
        return res.status(500).json({ erreur: "Impossible de vérifier les données de l'utilisateur" });
        }
    },

    // fonction pour se deconnecter
    logout: async(req,res)=>{
        try {
            const headerAuth = req.headers['authorization'];  // Utilisez req.headers['authorization'] pour récupérer l'en-tête Authorization
            const token = jwtUtils.parseAuthorization(headerAuth);

            if (!token) {
                return res.status(400).json({ 'erreur': "Le token est erroné" });
            }

            const decodedToken = jwt.verify(token, "probleme_intensif");;
            console.log(decodedToken); // Affichez le token décodé pour le débogage

            if (!decodedToken || !decodedToken.matricule_enseignant) {
                return res.status(400).json({ 'erreur': "Le token est invalide" });
            }

            const matricule_enseignant = decodedToken.matricule_enseignant;
            const enseigant = await models.Enseignant.findOne({ where: { matricule_enseignant } });

            if (!enseigant) {
                return res.status(404).json({ 'erreur': "L'enseignant n'existe pas" });
            }

            return res.status(200).json({'succès':"Deconnexion réussie"});
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible d'exécuter la requête" });
        }
    },

    // Fonction pour recuper ses informations 
    getProfile: async(req,res)=>{
        try {
            const headerAuth = req.headers['authorization'];  // Utilisez req.headers['authorization'] pour récupérer l'en-tête Authorization
            const token = jwtUtils.parseAuthorization(headerAuth);

            if (!token) {
                return res.status(400).json({ 'erreur': "Le token est erroné" });
            }

            const decodedToken = jwt.verify(token, "probleme_intensif");;
            console.log(decodedToken); // Affichez le token décodé pour le débogage

            if (!decodedToken || !decodedToken.matricule_enseignant) {
                return res.status(400).json({ 'erreur': "Le token est invalide" });
            }

            const matricule_enseignant = decodedToken.matricule_enseignant;
            const enseigant = await models.Enseignant.findOne({ where: { matricule_enseignant } });

            if (!enseigant) {
                return res.status(404).json({ 'erreur': "L'enseignant n'existe pas" });
            }

            return res.status(200).json(enseigant);
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible d'exécuter la requête" });
        }
    },

    // Fonction pour modifier son mot de passe
    updatePassword: async(req,res)=>{
        const { password, ppassword } = req.body;

        // Vérification que les champs ne sont pas vides
        if (!password || !ppassword) {
          return res.status(409).json({ erreur: "Les champs ne sont pas remplis" });
        }
        
        try {
          // Récupération de l'en-tête d'authentification
          const headerAuth = req.headers["authorization"];
        
          // Analyse de l'en-tête d'authentification pour obtenir le token
          const token = jwtUtils.parseAuthorization(headerAuth);
        
          // Si le token est absent
          if (!token) {
            return res.status(400).json({ erreur: "Le token est erroné" });
          }
        
          // Vérification du token
          const decodedToken = jwt.verify(token, "probleme_intensif");
        
          // Si le token est invalide
          if (!decodedToken || !decodedToken.matricule_enseignant) {
            return res.status(400).json({ erreur: "Le token est invalide" });
          }
        
          // Récupération du matricule de l'enseignant à partir du token décodé
          const matricule_enseignant = decodedToken.matricule_enseignant;
        
          // Recherche de l'enseignant dans la base de données
          const enseignant = await models.Enseignant.findOne({ where: { matricule_enseignant } });
        
          // Si l'enseignant n'existe pas
          if (!enseignant) {
            return res.status(404).json({ erreur: "L'enseignant n'existe pas" });
          }
        
          // Comparaison des mots de passe
          if (password !== ppassword) {
            return res.status(409).json({ erreur: "Les mots de passe ne correspondent pas" });
          }
        
          // Mise à jour du mot de passe de l'enseignant
          await models.Enseignant.update({ password }, { where: { matricule_enseignant: enseignant.matricule_enseignant } });
        
          // Envoi d'une réponse de succès
          return res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
        } catch (error) {
          // Envoi d'une réponse d'erreur
          return res.status(500).json({ erreur: "Impossible d'exécuter la requête" });
        }
    },
    // Fonction pour renvoyer tous les enseignants de la BD
    AllEnseignant: async(req,res)=>{
        
        models.Enseignant.findAllEnseignant({}).then(function(enseignant){
            return res.status(201).json({
                'satus':true,
                'data':enseignant
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des enseignants'})
        });
    }
}