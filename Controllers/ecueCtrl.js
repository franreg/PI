const models = require('../models');
module.exports = {
    //Fonction pour créer un élément constitutif d'une unité d'enseignement
    register: async(req,res)=>{
        
        const { codeecue, libelleecue, credituecue,UEId} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
        // Si l'un des champs est vide
        
        if(!codeecue ||!libelleecue ||!credituecue ||!UEId){
            return res.status(409).json({'erreur':"Il y'a des paramètres qui manque"});
        }
        try{
            const ecueFound = await models.ECUE.findOne({where:{codeecue:codeecue}});
            if(ecueFound){
                return res.status(409).json({'erreur':"Cette Unité d'enseignement existe déja"});
            }
            const newECUE =  await models.ECUE.create({ codeecue, libelleecue, credituecue, UEId});
            return res.status(201).json({'UEid':newECUE.id});
        }catch(erreur){
            return res.status(500).json({'erreur':"Une erreur est survenue lors de l'insertion"});
        }
        
    },

    //Fonction pour modifier un élément constitutif d'une unité d'enseignement
    update: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        const { codeecue, libelleecue, credituecue,UEId} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
        try{
            // Verifier que l'élément constitutif de l'unité d'enseignement n'existe pas déja
            const ecueFound = await models.ECUE.findOne({where: {id:id}});
            if(!ecueFound){
                return res.status(409).json({ 'erreur': "L'ECUE n'existe pas" });
            }
            //modifier l'élément constitutif de l'unité d'enseignement dans la table
             await models.ECUE.update({ codeecue, libelleecue, credituecue,UEId},{where:{id:id}});
            return res.status(201).json({'succès':"L'ECUE à été modifiée avec succès"});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de mdofiier cette ECUE  veuillez réssayer"});
        }
    },

    //Fonction pour supprimer un élément constitutif d'une unité d'enseignement
    delete: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        try{
           // Verifier que l'élément constitutif de l'unité d'enseignement n'existe pas déja
           const ecueFound = await models.ECUE.findOne({where: {id:id}});
           if(!ecueFound){
               return res.status(409).json({ 'erreur': "L'ECUE n'existe pas" });
           }
           //modifier l'élément constitutif de l'unité d'enseignement dans la table
            await models.ECUE.destroy({where:{id:id}});
           return res.status(201).json({'succès':"L'ECUE à été supprimée avec succès"});
       }catch(erreur){
           res.status(500).json({'erreur':"Impossible de mdofiier cette ECUE  veuillez réssayer"});
       }
    },

    //Fonction pour recuperer un élément constitutif d'une unité d'enseignement
    getECUE: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        try{
           // Verifier que l'élément constitutif de l'unité d'enseignement n'existe pas déja
           const ecueFound = await models.ECUE.findOne({where: {id:id}});
           if(!ecueFound){
               return res.status(409).json({ 'erreur': "L'ECUE n'existe pas" });
           }
           //afficher l'élément constitutif de l'unité d'enseignement dans la table
            
           return res.status(201).json({'succès':ecueFound});
       }catch(erreur){
           res.status(500).json({'erreur':"Impossible de mdofiier cette ECUE  veuillez réssayer"});
       }
    },

    //Fonction pour afficher tous les éléments constitutifs d'une unité d'enseignement
    AllECUEbyUE: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        try{
          
           //afficher l'élément constitutif de l'unité d'enseignement dans la table
            await models.ECUE.findAll({where:{ue:id}})
           return res.status(201).json({'succès':ecueFound});
       }catch(erreur){
           res.status(500).json({'erreur':"Impossible de mdofiier cette ECUE  veuillez réssayer"});
       }
    },

    //Fonction pour recupere tous les élément constitutif des unités d'enseignement
    AllECUE: async(req,res)=>{
        models.ECUE.findAllECUE({}).then(function(ecue){
            return res.status(201).json({
                'satus':true,
                'data':ecue
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des ECUE'})
        });
    }
}