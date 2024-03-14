const models = require('../models');
module.exports={
    //fonction pour créer une specialisation pour les enseigants
    register: async(req,res)=>{
        const { acronyme, designation_specialsation} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
        // Si l'un des champs est vide
        if(!acronyme || !designation_specialsation){
            return res.status(400).json("Il y'a des paramètres manquants");
        }
        try{
            // verifier que le specialisation avec ce acronyme existe
            const specialisationFound = await models.Specialisation.findOne({ where: { acronyme: acronyme } });
            if (specialisationFound) {
                return res.status(409).json({ 'erreur': "La specialisation existe déja" });
            }
            // ajouter l'element dans la base de données
            const newSpecialisation = await models.Specialisation.create({acronyme,designation_specialsation});
            return res.status(201).json({ 'specialisationId': newSpecialisation.id});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de créer cette specialisation veuillez réssayer"})
        }
    },
    // fonction pour modifier une specialisation
    update: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        const { acronyme, designation_specialsation} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
    
        try{
            // verifier que le specialisation avec ce acronyme existe
            const specialisationFound = await models.Specialisation.findOne({ where: { id: id } });
            if (!specialisationFound) {
                return res.status(409).json({ 'erreur': "La specialisation n'existe pas" });
            }
            // modifier l'element dans la base de données
             await models.Specialisation.update({acronyme,designation_specialsation},{where:{id:id}});
            return res.status(201).json({ 'succès': "La specialisation à été modifié "});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de créer cette specialisation veuillez réssayer"})
        }
    },
    //fonction pour supprimer une specialisation 
    delete: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
    
        try{
            // verifier que la specialisation avec ce acronyme existe
            const specialisationFound = await models.Specialisation.findOne({ where: { id: id } });
            if (!specialisationFound) {
                return res.status(409).json({ 'erreur': "La spécialisation n'existe pas" });
            }
            // modifier l'element dans la base de données
             await models.Specialisation.destroy({where:{id:id}});
            return res.status(201).json({ 'succès': "La specialisation à été supprimé"});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de supprimer cette specialisation veuille réssayer"});
        }
    },
    //fonction pour recuper un specialisation
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
    
        try{
            // verifier que le specialisation avec ce acronyme existe
            const specialisationFound = await models.Specialisation.findOne({ where: { id: id } });
            if (!specialisationFound) {
                return res.status(409).json({ 'erreur': "La spécialisation n'existe pas" });
            }
            // recupere l'element dans la base de données
            return res.status(201).json({ 'specialisation':  specialisationFound});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de recupere cette specialisation veuille réssayer"})
        }
    },

    //fonction pour afficher tous les specialisations
    getAllspecialisation: async(req,res)=>{

    }
}