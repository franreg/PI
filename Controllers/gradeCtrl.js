const models = require('../models');
module.exports={
    //fonction pour créer un grade
    register: async(req,res)=>{
        const { acronyme, designation_grade} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
        // Si l'un des champs est vide
        if(!acronyme || !designation_grade){
            return res.status(400).json("Il y'a des paramètres manquants");
        }
        try{
            // verifier que le grade avec ce acronyme existe
            const gradeFound = await models.Grade.findOne({ where: { acronyme: acronyme } });
            if (gradeFound) {
                return res.status(409).json({ 'erreur': "Le grade existe déja" });
            }
            // ajouter l'element dans la base de données
            const newGrade = await models.Grade.create({acronyme,designation_grade});
            return res.status(201).json({ 'GradeId': newGrade.id});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de créer ce grade veuillez réssayer"})
        }
    },
    // fonction pour modifier un grade
    update: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        const { acronyme, designation_grade} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
    
        try{
            // verifier que le grade avec ce acronyme existe
            const gradeFound = await models.Grade.findOne({ where: { id: id } });
            if (!gradeFound) {
                return res.status(409).json({ 'erreur': "Le grade n'existe pas" });
            }
            // modifier l'element dans la base de données
             await models.Grade.update({acronyme,designation_grade},{where:{id:id}});
            return res.status(201).json({ 'succès': "Le grade à été modifié "});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de créer ce grade veuillez réssayer"})
        }
    },
    //fonction pour supprimer un grade 
    delete: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
    
        try{
            // verifier que le grade avec ce acronyme existe
            const gradeFound = await models.Grade.findOne({ where: { id: id } });
            if (!gradeFound) {
                return res.status(409).json({ 'erreur': "Le grade n'existe pas" });
            }
            // modifier l'element dans la base de données
             await models.Grade.destroy({where:{id:id}});
            return res.status(201).json({ 'succès': "Le grade à été supprimé"});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de supprimer ce grade veuille réssayer"})
        }
    },
    //fonction pour recuper un grade
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
    
        try{
            // verifier que le grade avec ce acronyme existe
            const gradeFound = await models.Grade.findOne({ where: { id: id } });
            if (!gradeFound) {
                return res.status(409).json({ 'erreur': "Le grade n'existe pas" });
            }
            // recupere l'element dans la base de données
            return res.status(201).json({ 'grade':  gradeFound});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de recuper ce grade veuille réssayer"})
        }
    },

    //fonction pour afficher tous les grades
    getAllGrade: async(req,res)=>{

    }
}