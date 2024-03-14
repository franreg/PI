const models = require('../models');
module.exports={
    //fonction pour créer une specialisation pour les enseigants
    register: async(req,res)=>{
        const { acronyme, designation_specialisation } = req.body; // Création d'un élément qui prendra en paramètre les champs saisis 
        // Si l'un des champs est vide
        if (!acronyme || !designation_specialisation) {
            return res.status(400).json({ error: "Il y a des paramètres manquants" });
        }

        try {
            // Vérifier que la spécialisation avec ce acronyme n'existe pas déjà
            const specialisationFound = await models.specialisation.findOne({ where: { acronyme: acronyme } });
            if (specialisationFound) {
                return res.status(409).json({ error: "La spécialisation existe déjà" });
            }
            // Ajouter l'élément dans la base de données
            const newSpecialisation = await models.specialisation.create({ acronyme, designation_specialisation });
            return res.status(201).json({ specialisationId: newSpecialisation.id });
        } catch (error) {
            res.status(500).json({ error: "Impossible de créer cette spécialisation, veuillez réessayer" });
        }

    },
    // fonction pour modifier une specialisation
    update: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL
        const { acronyme, designation_specialisation } = req.body; // Création d'un élément qui prendra en paramètre les champs saisis 
        
        try {
            // Vérifier que la spécialisation avec cet id existe
            const specialisationFound = await models.specialisation.findByPk(id);
            if (!specialisationFound) {
                return res.status(404).json({ error: "La spécialisation n'existe pas" });
            }
            // Modifier l'élément dans la base de données
            await models.specialisation.update({ acronyme, designation_specialisation }, { where: { id: id } });
            return res.status(200).json({ success: "La spécialisation a été modifiée avec succès" });
        } catch (error) {
            res.status(500).json({ error: "Impossible de modifier cette spécialisation, veuillez réessayer" });
        }
    },
    //fonction pour supprimer une specialisation 
    delete: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL

        try {
            // Vérifier que la spécialisation avec cet id existe
            const specialisationFound = await models.specialisation.findByPk(id);
            if (!specialisationFound) {
                return res.status(404).json({ error: "La spécialisation n'existe pas" });
            }
            // Supprimer l'élément dans la base de données
            await models.specialisation.destroy({ where: { id: id } });
            return res.status(200).json({ success: "La spécialisation a été supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ error: "Impossible de supprimer cette spécialisation, veuillez réessayer" });
        }
    },
    //fonction pour recuper un specialisation
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL
        try {
            // Vérifier que la spécialisation avec cet id existe
            const specialisationFound = await models.specialisation.findByPk(id);
            if (!specialisationFound) {
                return res.status(404).json({ error: "La spécialisation n'existe pas" });
            }
            // Récupérer l'élément dans la base de données
            return res.status(200).json({ specialisation: specialisationFound });
        } catch (error) {
            res.status(500).json({ error: "Impossible de récupérer cette spécialisation, veuillez réessayer" });
        }
    },

    //fonction pour afficher tous les specialisations
    getAllspecialisation: async(req,res)=>{
        try {
            const specialisations = await models.specialisation.findAll();
            return res.status(200).json({ specialisations: specialisations });
        } catch (error) {
            return res.status(500).json({ error: "Impossible de récupérer les spécialisations, veuillez réessayer" });
        }
    }
}