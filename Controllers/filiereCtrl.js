//Imports
const models = require('../models');

module.exports = {

    // Fonction pour ajouter une filière
    register: async(req,res)=>{
        const { acrofil, description, niveau} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
        // Si l'un des champs est vide
        if(!acrofil || !description || !niveau){
            return res.status(400).json("Il y'a des paramètres manquants");
        }
        try{
            // verifier que la filière avec ce ID existe
            const filiereFound = await models.Filiere.findOne({ where: { acrofil: acrofil } });
            if (filiereFound) {
                return res.status(409).json({ 'erreur': "La filière existe déja" });
            }
            // ajouter l'element dans la base de données
            const newFiliere = await models.Filiere.create({acrofil,description,niveau});
            return res.status(201).json({ 'filiereId': newFiliere.id});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de créer cette filière veuille réssayer"})
        }
    },

    // Fonction pour modifier les données d'une filière
    update: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        const { acrofil, description, niveau} = req.body;// création d'un element qui prendra en paramètre les champs saisies 
        try{
            // verifier que la filière avec ce ID existe
            const filiereFound = await models.Filiere.findOne({ where: { id: id } });
            if (!filiereFound) {
                return res.status(409).json({ 'erreur': "La filière n'existe pas veuillez la créer d'abord" });
            }
            // modification de la filière
            await models.Filiere.update({acrofil,description,niveau}, { where: { id: id } });
            return res.status(200).json({ 'succès': "La filière a été mise à jour avec succès" });
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de modifier les informations cette filière veuillez réssayer"})
        }
    },
    delete: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        // verifier que la filière avec ce ID existe
        try{
            const filiereFound = await models.Filiere.findOne({ where: { id: id } });
            if (!filiereFound) {
                return res.status(409).json({ 'erreur': "La filière n'existe pas veuillez la créer d'abord" });
            }
            //Supprimer la filière
            await models.Filiere.destroy({ where: { id: id } });

            return res.status(200).json({ 'succès': "la filière a été supprimé avec succès" });
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de supprimer la filière"});
        }
    },

    getFiliere: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        // verifier que la filière avec ce ID existe
        try{
            const filiereFound = await models.Filiere.findOne({ where: { id: id } });
            if (!filiereFound) {
                return res.status(409).json({ 'erreur': "La filière n'existe pas veuillez la créer d'abord" });
            }
            return res.status(200).json({ 'Filiere': filiereFound });
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de recuperer la filière"});
        }
    }
    ,
    allFiliere: async(req,res)=>{
        models.Filiere.findAllFiliere({}).then(function(filiere){
            return res.status(201).json({
                'satus':true,
                'data':filiere
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des filiere'})
        });
    }
}