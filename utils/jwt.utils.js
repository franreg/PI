const jwt = require('jsonwebtoken');
const secretKey = 'votre_clé_secrète'; // Remplacez par votre propre clé secrète

module.exports = {
    secret: secretKey,

    // Fonction pour générer un jeton JWT
    generateToken: function(payload, expiresIn) {
        return jwt.sign(payload, secretKey, { expiresIn: '2h' });
    },

    // Fonction pour vérifier un jeton JWT
    verifyToken: function(token) {
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            return null; // Token invalide
        }
    },

    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getAgentMatricule: function(authorization) {
        const token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                const decodedToken = jwt.verify(token, secretKey);
                console.log(matricule_agent);
                return decodedToken.matricule_agent ? String(decodedToken.matricule_agent) : "-1";
            } catch (err) {
                console.error("Erreur lors de la vérification du token :", err);
            }
        }
        return "-1"; // Token invalide ou non présent
    }
    
};
