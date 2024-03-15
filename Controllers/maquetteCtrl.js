// Imports
const models = require('../models');

module.exports= {

    // Créer une maquette
    register: async(req,res)=>{
        const { AnneeId, FiliereId, semestre, UEId1, UEId2, UEId3, UEId4, UEId5, UEId6, UEId7, UEId8, UEId9, UEId10 } = req.body; // création d'un élément qui prendra en paramètre les champs saisis 
    // Si l'un des champs est vide
    if (!AnneeId || !FiliereId || !semestre) {
        return res.status(400).json("Il y a des paramètres manquants");
    }
    try {
        // vérifier que la maquette avec ce ID existe
        const maquetteFound = await models.Maquette.findOne({ where: {  AnneeId: AnneeId, FiliereId: FiliereId, semestre: semestre } });
        if (maquetteFound) {
            return res.status(409).json({ 'erreur': "La maquette existe déjà" });
        }
        // ajouter l'élément dans la base de données
        const newMaquette = await models.Maquette.create({ AnneeId, FiliereId, semestre, UEId1, UEId2, UEId3, UEId4, UEId5, UEId6, UEId7, UEId8, UEId9, UEId10 });
        return res.status(201).json({ 'FiliereId': newMaquette.id ,'message':"Une maquette vient d'être ajoutée"});
    } catch (erreur) {
        res.status(500).json({ 'erreur': "Impossible de créer cette maquette veuillez réessayer" })
    }
    },

    //Modifier une maquette
    update: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
        const { AnneeId, FiliereId, semestre, UEId1, UEId2, UEId3, UEId4, UEId5, UEId6, UEId7, UEId8, UEId9, UEId10 } = req.body; // création d'un élément qui prendra en paramètre les champs saisis 
        // Si l'un des champs est vide
    
        try {
            // vérifier que la maquette avec ce ID existe
            const maquetteFound = await models.Maquette.findOne({ where: { id: id } });
            if (!maquetteFound) {
                return res.status(409).json({ 'erreur': "La maquette n'existe pas" });
            }
            // ajouter l'élément dans la base de données
            await models.Maquette.update({ AnneeId, FiliereId, semestre, UEId1, UEId2, UEId3, UEId4, UEId5, UEId6, UEId7, UEId8, UEId9, UEId10 }, { where: { id: id } });
            return res.status(201).json({ 'succès':"La modication à été effectuée "});
        } catch (erreur) {
            res.status(500).json({ 'erreur': "Impossible de modifier cette maquette veuillez réessayer" })
        }
    },

    //supprimer une maquette
    delete: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
       
        // Si l'un des champs est vide
    
        try {
            // vérifier que la maquette avec ce ID existe
            const maquetteFound = await models.Maquette.findOne({ where: { id: id } });
            if (!maquetteFound) {
                return res.status(409).json({ 'erreur': "La maquette n'existe pas" });
            }
            // ajouter l'élément dans la base de données
            await models.Maquette.destroy({ where: { id: id } });
            return res.status(201).json({ 'succès':"La suppression à été effectuée "});
        } catch (erreur) {
            res.status(500).json({ 'erreur': "Impossible de supprimer cette maquette veuillez réessayer" })
        }
    },

    // recuperer la maquette d'une classe
    getMaquettebyFiliere: async(req,res)=>{
        
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL

        try {
            // Rechercher toutes les maquettes ayant le même ID de filière
            const maquettes = await models.Maquette.findAll({ where: { FiliereId: id } });
    
            if (maquettes.length === 0) {
                return res.status(404).json({ 'erreur': "Aucune maquette trouvée pour cette filière" });
            }
    
            // Retourner les maquettes trouvées
            return res.status(200).json({ 'Maquette': maquettes });
        } catch (erreur) {
            res.status(500).json({ 'erreur': "Impossible de récupérer les maquettes, veuillez réessayer" })
        }
    }, 

    //recupere toutes les maquettes
    getAllMaquette: async(req,res)=>{
        models.Maquette.findAllMaquette({}).then(function(ue){
            return res.status(201).json({
                'satus':true,
                'data':ue
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des maquettes'})
        });
    },

    // Fonction pour recuperer une maquette par sa filière
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
       
        // Si l'un des champs est vide
    
        try {
            // vérifier que la maquette avec ce ID existe
            const maquetteFound = await models.Maquette.findOne({ where: { id: id } });
            if (!maquetteFound) {
                return res.status(409).json({ 'erreur': "La maquette n'existe pas" });
            }
            // Récuperer l'élément dans la base de données
          
            return res.status(201).json({ 'succès':maquetteFound});
        } catch (erreur) {
            res.status(500).json({ 'erreur': "Impossible de recuperer cette maquette veuillez réessayer" })
        }
    }
}