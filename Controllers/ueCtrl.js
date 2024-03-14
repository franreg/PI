const models = require('../models');
module.exports = {
    //Fonction pour créer une unité d'enseignement
    register: async(req,res)=>{
       
        const { codeue, libelleue, creditue} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
        // Si l'un des champs est vide
        if(!codeue || !libelleue || !creditue){
            return res.status(400).json("Il y'a des paramètres manquants");
        }
        try{
            // Verifier que l'unité d'enseignement n'existe pas déja
            const ueFound = await models.UE.findOne({where: {codeue:codeue}});
            if(ueFound){
                return res.status(409).json({ 'erreur': "L'unité d'enseignement existe déja" });
            }
            //ajoutér l'unité d'enseignement dans la table
            const newUE = await models.UE.create({codeue, libelleue, creditue});
            return res.status(201).json({'UEid':newUE.id});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de créer cette unité d'enseignement  veuille réssayer"});
        }
    },

    //Fonction pour modifier une unité d'enseignement
    update: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        const { codeue, libelleue, creditue} = req.body; // création d'un element qui prendra en paramètre les champs saisies 
        try{
            // Verifier que l'unité d'enseignement n'existe pas déja
            const ueFound = await models.UE.findOne({where: {id:id}});
            if(!ueFound){
                return res.status(409).json({ 'erreur': "L'unité d'enseignement n'existe pas" });
            }
            //modifier l'unité d'enseignement
            await models.UE.update({codeue, libelleue, creditue},{ where: { id: id }});
            return res.status(201).json({'succès':"L'unité d'enseignement à été modifiée"});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de modfier cette unité d'enseignement  veuillez réssayer"});
        }
    },
    //Fonction pour supprimer une unité d'enseignement
    delete: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        try{
            // Verifier que l'unité d'enseignement n'existe pas déja
            const ueFound = await models.UE.findOne({where: {id:id}});
            if(!ueFound){
                return res.status(409).json({ 'erreur': "L'unité d'enseignement n'existe pas" });
            }
            //suppression de l'UE
            await models.UE.destroy({ where: { id: id } });
            return res.status(201).json({'succès':"L'unité d'enseignement à été supprimé"});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de modfier cette unité d'enseignement  veuillez réssayer"});
        }
    },
    //Fonction pour recuperer une unité d'enseignement
    getUE: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        try{
            // Verifier que l'unité d'enseignement n'existe pas déja
            const ueFound = await models.UE.findOne({where: {id:id}});
            if(!ueFound){
                return res.status(409).json({ 'erreur': "L'unité d'enseignement n'existe pas" });
            }
            return res.status(201).json({'succès': ueFound});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de recuperer cette unité d'enseignement veuille réssayer"});
        }
    },
    //Fonction pour recuper toutes les unités d'enseignements
    AllUE: async(req,res)=>{
        models.UE.findAllUE({}).then(function(ue){
            return res.status(201).json({
                'satus':true,
                'data':ue
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des UE'})
        });
    }
}