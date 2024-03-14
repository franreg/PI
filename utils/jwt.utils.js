const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Générer une clé secrète aléatoire
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Générer un token JWT avec une clé secrète valide

module.exports = {

    // Fonction pour générer un jeton JWT
    generateToken : (payload) => {
        const secretKey = "probleme_intensif";
        const token = jwt.sign(payload,secretKey, { algorithm: "HS256",expiresIn: '24h' });
        return { token, secretKey };
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
        if (authorization && authorization.startsWith('Bearer ')) {
            return authorization.substring(7); // Supprimer le préfixe 'Bearer '
        }
        return null;
    },

    getAgentMatricule: function(authorization) {
        const token = this.parseAuthorization(authorization);
        if (token) {
            try {
                const decodedToken = jwt.verify(token, secretKey);
                return decodedToken.matricule_agent ? String(decodedToken.matricule_agent) : "-1";
            } catch (err) {
                console.error("Erreur lors de la vérification du token :", err);
            }
        }
        return "-1"; // Token invalide ou non présent
    },

    getEtudiantMatricule: function(authorization) {
        const token = this.parseAuthorization(authorization);
        if (token) {
            try {
                const decodedToken = jwt.verify(token, secretKey);
                return decodedToken.matricule_etudiant ? String(decodedToken.matricule_etudiant) : "-1";
            } catch (err) {
                console.error("Erreur lors de la vérification du token :", err);
            }
        }
        return "-1"; // Token invalide ou non présent
    },
    getEnseigantMatricule: function(authorization) {
        const token = this.parseAuthorization(authorization);
        if (token) {
            try {
                const decodedToken = jwt.verify(token, secretKey);
                return decodedToken.matricule_enseignant ? String(decodedToken.matricule_enseignant) : "-1";
            } catch (err) {
                console.error("Erreur lors de la vérification du token :", err);
            }
        }
        return "-1"; // Token invalide ou non présent
    }
};
