var jwt = require('jsonwebtoken');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

// Middleware pour vérifier le jeton JWT
module.exports = function(req, res, next) {
    // Récupérer le token depuis les en-têtes HTTP
    var token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ 'erreur': 'Token manquant, veuillez vous connecter' });
    }

    // Vérifier et décoder le token
    jwt.verify(token, jwtUtils.secret, function(err, decodedToken) {
        if (err) {
            return res.status(401).json({ 'erreur': 'Token invalide' });
        }

        // Charger l'agent à partir de la base de données
        models.Agent.findOne({
            where: { matricule_agent: decodedToken.matricule_agent }
        }).then(function(agent) {
            if (!agent) {
                return res.status(404).json({ 'erreur': 'Agent introuvable' });
            }

            // Stocker l'agent dans l'objet de requête pour une utilisation ultérieure
            req.agent = agent;
            next(); // Passer au prochain middleware ou à la route
        }).catch(function(err) {
            return res.status(500).json({ 'erreur': 'Erreur de chargement de l\'agent' });
        });
    });
};
