// Imports
const jwt = require('jsonwebtoken');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwtUtils = require('../utils/jwt.utils');

module.exports= {
    register: async (req, res) => {
        const { nom_etudiant, prenom_etudiant, dn_etudiant, matricule_etudiant, password, email, numero, sexe,FiliereId } = req.body;

        // Vérifier si tous les champs nécessaires sont fournis
        if (!nom_etudiant || !prenom_etudiant || !dn_etudiant || !matricule_etudiant || !password || !email || !numero || !sexe || !FiliereId) {
            return res.status(400).json({ error: 'Il y a des paramètres manquants' });
        }
        
        try {
            // Vérifier si un étudiant avec ce matricule existe déjà
            const etudiantFound = await models.Etudiant.findOne({ where: { matricule_etudiant: matricule_etudiant } });
            if (etudiantFound) {
                return res.status(409).json({ error: "L'étudiant existe déjà" });
            }
        
            // Hasher le mot de passe avec bcryptjs
            const bcryptedPassword = await bcryptjs.hash(password, 5);
        
            // Créer un nouvel étudiant dans la base de données
            const newEtudiant = await models.Etudiant.create({
                nom_etudiant,
                prenom_etudiant,
                dn_etudiant,
                matricule_etudiant,
                password: bcryptedPassword,
                email,
                numero,
                sexe,
                FiliereId
            });
        
            return res.status(201).json({ etudiantId: newEtudiant.id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de créer cet étudiant" });
        }
        
    },

    login: async (req, res) => {
        const { matricule_etudiant, password } = req.body;
        if (!matricule_etudiant || !password) {
            return res.status(400).json({ 'erreur': "Il y a des paramètres manquants" });
        }

        try {
            const etudiantFound = await models.Etudiant.findOne({ where: { matricule_etudiant: matricule_etudiant } });
            if (!etudiantFound) {
                return res.status(404).json({ 'erreur': "Mot de passe ou matricule erroné" });
            }

            const isMatch = await bcryptjs.compare(password, etudiantFound.password);
            if (!isMatch) {
                return res.status(403).json({ 'erreur': "Le mot de passe est invalide" });
            }

            const token = jwtUtils.generateToken({ matricule_etudiant: etudiantFound.matricule_etudiant }, '24h');
            return res.status(200).json({ 'Etudiant':'connecté','token': token });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de vérifier les données de l'utilisateur" });
        }
    },

    logout: async (req, res) => {
        try {
            const headerAuth = req.headers['authorization'];  // Utilisez req.headers['authorization'] pour récupérer l'en-tête Authorization
            const token = jwtUtils.parseAuthorization(headerAuth);

            if (!token) {
                return res.status(400).json({ 'erreur': "Le token est erroné" });
            }

            const decodedToken = jwt.verify(token, "probleme_intensif");;
            console.log(decodedToken); // Affichez le token décodé pour le débogage

            if (!decodedToken || !decodedToken.matricule_etudiant) {
                return res.status(400).json({ 'erreur': "Le token est invalide" });
            }

            const matricule_etudiant = decodedToken.matricule_etudiant;
            const etudiant = await models.Etudiant.findOne({ where: { matricule_etudiant } });

            if (!etudiant) {
                return res.status(404).json({ 'erreur': "L'étudiant n'existe pas" });
            }

            return res.status(200).json("Déconnexion réussie");
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible d'exécuter la requête" });
        }
    },
    getetudiantProfile: async (req, res) => {
        try {
            const headerAuth = req.headers['authorization'];  // Utilisez req.headers['authorization'] pour récupérer l'en-tête Authorization
            const token = jwtUtils.parseAuthorization(headerAuth);

            if (!token) {
                return res.status(400).json({ 'erreur': "Le token est erroné" });
            }

            const decodedToken = jwt.verify(token, "probleme_intensif");;
            console.log(decodedToken); // Affichez le token décodé pour le débogage

            if (!decodedToken || !decodedToken.matricule_etudiant) {
                return res.status(400).json({ 'erreur': "Le token est invalide" });
            }

            const matricule_etudiant = decodedToken.matricule_etudiant;
            const etudiant = await models.Etudiant.findOne({ where: { matricule_etudiant } });

            if (!etudiant) {
                return res.status(404).json({ 'erreur': "L'étudiant n'existe pas" });
            }

            return res.status(200).json(etudiant);
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible d'exécuter la requête" });
        }
    }
    
    ,
    alletudiant: async (req, res) => {
        models.Etudiant.findAlletudiant({}).then(function(etudiant){
            return res.status(201).json({
                'satus':true,
                'data':etudiant
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des etudiants'})
        });
    },
    updateetudiant: async (req, res) => {
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        const { nom_etudiant, prenom_etudiant, dn_etudiant, matricule_etudiant, password, email, numero, sexe } = req.body;
        try {
            // Vérifier si l'etudiant avec l'ID donné existe
            const etudiantFound = await models.Etudiant.findOne({ where: { id: id } });
            if (!etudiantFound) {
                return res.status(404).json({ 'erreur': "L'etudiant avec cet ID n'existe pas" });
            }

            // Mettre à jour les informations de l'etudiant
            await models.Etudiant.update({
                nom_etudiant, prenom_etudiant, dn_etudiant, matricule_etudiant, password, email, numero, sexe
            }, { where: { id: id} });

            return res.status(200).json({ 'succès': "etudiant mis à jour avec succès" });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de faire la modification" });
        }
    },

    deleteetudiant: async (req, res) => {
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        try {
            // Vérifier si l'etudiant avec l'ID donné existe
            const etudiantFound = await models.Etudiant.findOne({ where: { id: id } });
            if (!etudiantFound) {
                return res.status(404).json({ 'erreur': "L'etudiant avec cet ID n'existe pas" });
            }

            // Supprimer l'etudiant
            await models.Etudiant.destroy({ where: { id: id } });

            return res.status(200).json({ 'succès': "etudiant supprimé avec succès" });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de supprimer l'etudiant" });
        }
    },

    // Récuperer un étudiant par son Id
    getEtudiantbyId: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        try {
            // Vérifier si l'etudiant avec l'ID donné existe
            const etudiantFound = await models.Etudiant.findOne({ where: { id: id } });
            if (!etudiantFound) {
                return res.status(404).json({ 'erreur': "L'etudiant avec cet ID n'existe pas" });
            }
            // retourner l'etudiant
            return res.status(200).json({ 'Etudiant': etudiantFound });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de faire la modification" });
        }
    },

    // Fonction pour modifier le mot de passe 
    updatepassword: async(req,res)=>{
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
          if (!decodedToken || !decodedToken.matricule_etudiant) {
            return res.status(400).json({ erreur: "Le token est invalide" });
          }
        
          // Récupération du matricule de l'étudiant à partir du token décodé
          const matricule_etudiant = decodedToken.matricule_etudiant;
        
          // Recherche de l'étudiant dans la base de données
          const etudiant = await models.Etudiant.findOne({ where: { matricule_etudiant } });
        
          // Si l'étudiant n'existe pas
          if (!etudiant) {
            return res.status(404).json({ erreur: "L'étudiant n'existe pas" });
          }
        
          // Comparaison des mots de passe
          if (password !== ppassword) {
            return res.status(409).json({ erreur: "Les mots de passe ne correspondent pas" });
          }
        
          // Mise à jour du mot de passe de l'étudiant
          await models.Etudiant.update({ password }, { where: { matricule_etudiant: etudiant.matricule_etudiant } });
        
          // Envoi d'une réponse de succès
          return res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
        } catch (error) {
          // Envoi d'une réponse d'erreur
          return res.status(500).json({ erreur: "Impossible d'exécuter la requête" });
        }
    }
}