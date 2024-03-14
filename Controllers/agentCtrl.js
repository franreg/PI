const jwt = require('jsonwebtoken');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwtUtils = require('../utils/jwt.utils');

module.exports = {
    register: async (req, res) => {
        const { nom_agent, prenom_agent, dn_agent, matricule_agent, password, email, numero, sexe } = req.body;
        if (!nom_agent || !prenom_agent || !dn_agent || !matricule_agent || !password || !email || !numero || !sexe) {
            return res.status(400).json({ 'erreur': 'Il y a des paramètres manquants' });
        }

        try {
            const agentFound = await models.Agent.findOne({ where: { matricule_agent: matricule_agent } });
            if (agentFound) {
                return res.status(409).json({ 'erreur': "L'agent existe déjà" });
            }

            const bcryptedpassword = await bcryptjs.hash(password, 5);
            const newAgent = await models.Agent.create({
                nom_agent, prenom_agent, dn_agent, matricule_agent, password: bcryptedpassword,
                email, numero, sexe
            });
            return res.status(201).json({ 'agentId': newAgent.id });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de créer cet agent" });
        }
    },

    login: async (req, res) => {
        const { matricule_agent, password } = req.body;
        if (!matricule_agent || !password) {
            return res.status(400).json({ 'erreur': "Il y a des paramètres manquants" });
        }

        try {
            const agentFound = await models.Agent.findOne({ where: { matricule_agent: matricule_agent } });
            if (!agentFound) {
                return res.status(404).json({ 'erreur': "Cet agent n'existe pas dans notre base de données" });
            }

            const isMatch = await bcryptjs.compare(password, agentFound.password);
            if (!isMatch) {
                return res.status(403).json({ 'erreur': "Le mot de passe est invalide" });
            }

            const token = jwtUtils.generateToken({ matricule_agent: agentFound.matricule_agent }, '24h');
            return res.status(200).json({ 'token': token });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de vérifier les données de l'utilisateur" });
        }
    },

    logout: async (req, res) => {
        // À implémenter selon les besoins de votre application
        try {
            const headerAuth = req.headers['authorization'];  // Utilisez req.headers['authorization'] pour récupérer l'en-tête Authorization
            const token = jwtUtils.parseAuthorization(headerAuth);
            console.log(token);
            if (!token) {
                return res.status(400).json({ 'erreur': "Le token est erroné" });
            }
    
            const decodedToken = jwtUtils.verifyToken(token);
            if (!decodedToken || !decodedToken.matricule_agent) {
                return res.status(400).json({ 'erreur': "Le token est invalide" });
            }
    
            const matricule_agent = decodedToken.matricule_agent;
            const agent = await models.Agent.findOne({ where: { matricule_agent: matricule_agent } });
            if (!agent) {
                return res.status(404).json({ 'erreur': "L'agent n'existe pas" });
            }
    
            return res.status(201).json({'succès':"Déconnexion réussie"});
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible d'exécuter la requête" });
        }
    },
    getAgentProfile: async (req, res) => {
        try {
            const headerAuth = req.headers['authorization'];  // Utilisez req.headers['authorization'] pour récupérer l'en-tête Authorization
            const token = jwtUtils.parseAuthorization(headerAuth);
            console.log(token);
            if (!token) {
                return res.status(400).json({ 'erreur': "Le token est erroné" });
            }
    
            const decodedToken = jwtUtils.verifyToken(token);
            if (!decodedToken || !decodedToken.matricule_agent) {
                return res.status(400).json({ 'erreur': "Le token est invalide" });
            }
    
            const matricule_agent = decodedToken.matricule_agent;
            const agent = await models.Agent.findOne({ where: { matricule_agent: matricule_agent } });
            if (!agent) {
                return res.status(404).json({ 'erreur': "L'agent n'existe pas" });
            }
    
            return res.status(200).json(agent);
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible d'exécuter la requête" });
        }
    }
    
    ,
    allagent: async (req, res) => {
       
        models.Agent.findAllAgent({}).then(function(agent){
            return res.status(201).json({
                'satus':true,
                'data':agent
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des agents'})
        });
    },
    updateAgent: async (req, res) => {
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        const { nom_agent, prenom_agent, dn_agent, matricule_agent, password, email, numero, sexe } = req.body;
        try {
            // Vérifier si l'agent avec l'ID donné existe
            const agentFound = await models.Agent.findOne({ where: { id: id } });
            if (!agentFound) {
                return res.status(404).json({ 'erreur': "L'agent avec cet ID n'existe pas" });
            }

            // Mettre à jour les informations de l'agent
            await models.Agent.update({
                nom_agent, prenom_agent, dn_agent, matricule_agent, password, email, numero, sexe
            }, { where: { id: id} });

            return res.status(200).json({ 'succès': "Agent mis à jour avec succès" });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de faire la modification" });
        }
    },

    deleteAgent: async (req, res) => {
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        try {
            // Vérifier si l'agent avec l'ID donné existe
            const agentFound = await models.Agent.findOne({ where: { id: id } });
            if (!agentFound) {
                return res.status(404).json({ 'erreur': "L'agent avec cet ID n'existe pas" });
            }

            // Supprimer l'agent
            await models.Agent.destroy({ where: { id: id } });

            return res.status(200).json({ 'succès': "Agent supprimé avec succès" });
        } catch (error) {
            return res.status(500).json({ 'erreur': "Impossible de supprimer l'agent" });
        }
    }
};
