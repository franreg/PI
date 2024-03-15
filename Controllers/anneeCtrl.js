// Imports 
const { Op } = require('sequelize');
const models = require('../models');
function isValidDate(dateS){
    let date = new Date(dateS);
    return date instanceof Date && !isNaN(date);
}
module.exports={

    // fonction pour créer une année acadèmique
    register: async(req,res)=>{
                
        // Votre code continue ici
        const { titre,date_debut, date_fin } = req.body;
        // Si l'un des champs est vide
        if (!titre ||!date_debut || !date_fin) {
        return res.status(400).json({ erreur: "Il y a des paramètres manquants" });
        }

        // Vérification de la validité des dates
        if (!isValidDate(date_debut) || !isValidDate(date_fin)) {
        return res.status(400).json({ erreur: "Les dates saisies sont invalides" });
        }

        // Conversion des dates en objets Date
        const debutDate = new Date(date_debut);
        const finDate = new Date(date_fin);

        // Vérification que la date de début est antérieure à la date de fin
        if (debutDate >= finDate) {
        return res.status(400).json({ erreur: "La date de début doit être antérieure à la date de fin" });
        }

        try {
        // Vérification des dates dans la base de données
        const existingAnnee = await models.annee.findOne({
            where: {
            [Op.or]: [
                {
                [Op.and]: [
                    { date_debut: { [Op.lte]: debutDate } },
                    { date_fin: { [Op.gte]: finDate } }
                ]
                },
                {
                [Op.and]: [
                    { date_debut: { [Op.gte]: debutDate } },
                    { date_fin: { [Op.lte]: finDate } }
                ]
                },
                {
                [Op.and]: [
                    { date_debut: { [Op.gte]: debutDate } },
                    { date_debut: { [Op.lte]: finDate } }
                ]
                },
                {
                [Op.and]: [
                    { date_fin: { [Op.gte]: debutDate } },
                    { date_fin: { [Op.lte]: finDate } }
                ]
                }
            ]
            }
        });

        if (existingAnnee) {
            return res.status(409).json({ erreur: "Une année académique existe déjà pour cet intervalle de dates" });
        }

        // Ajout de l'élément dans la base de données
        const newAnnee = await models.annee.create({ titre, date_debut, date_fin });
        return res.status(201).json({ AnneeId: newAnnee.id, message: "Année académique créée avec succès" });
        } catch (error) {
        console.error("Erreur lors de la création de l'année :", error.message);
        res.status(500).json({ erreur: "Impossible de créer cette année académique, veuillez réessayer" });
        }   
    },

    // fonction pour modifier une année acadèmique 
    update: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        const { titre,date_debut, date_fin } = req.body;
        //
        try{
            // Vérifier que l'année acadèmique existe bel et bien dans notre base de donnée
            const anneeFound = await models.annee.findOne({ where: { id: id } });
            if (!anneeFound) {
                return res.status(409).json({ error: "L'annee n'existe pas" });
            }
            // Effectuer la modification de l'année académique
            await models.annee.update({ titre, date_debut, date_fin },{where:{id:id}});
            return res.status(201).json({'succès':"L'année acadèmique à été modifiée"});
        }
        catch (error) {
            console.error("Erreur lors de la modification de l'année :", error.message);
            res.status(500).json({ erreur: "Impossible de modifier cette année académique, veuillez réessayer" });
        }
    },

    // fonction pour supprimer une année acadèmique 
    delete: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        try{
            // Vérifier que l'année acadèmique existe bel et bien dans notre base de donnée
            const anneeFound = await models.annee.findOne({ where: { id: id } });
            if (!anneeFound) {
                return res.status(409).json({ error: "L'annee n'existe pas" });
            }
            // Effectuer la suppression de l'année académique
            await models.annee.destroy({where:{id:id}});
            return res.status(201).json({'succès':"L'année acadèmique à été supprimée"});
        } catch (error) {
            console.error("Erreur lors de la suppression de l'année :", error.message);
            res.status(500).json({ erreur: "Impossible de supprimer cette année académique, veuillez réessayer" });
        }
    },

    // fonction pour recuper une année académique
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupérer l'id de l'URL
        try{
            // Vérifier que l'année acadèmique existe bel et bien dans notre base de donnée
            const anneeFound = await models.annee.findOne({ where: { id: id } });
            if (!anneeFound) {
                return res.status(409).json({ error: "L'annee n'existe pas" });
            }
            // Récupérer l'année académique
           
            return res.status(201).json({'succès':anneeFound});
        } catch (error) {
            console.error("Erreur lors de la suppression de l'année :", error.message);
            res.status(500).json({ erreur: "Impossible de supprimer cette année académique, veuillez réessayer" });
        }
    },

    //fonction pour afficher toutes les années académiques
    AllAnnee: async(req,res)=>{
         
        models.annee.findAllAnnee({}).then(function(an){
            return res.status(201).json({
                'satus':true,
                'data':an
            })
        }).catch(function(err){
            return res.status(500).json({'erreur':'problème de récuération des années acadèmiques'})
        });
    },

}