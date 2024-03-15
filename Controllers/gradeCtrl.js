const models = require('../models');
module.exports={
    //fonction pour créer un grade
    register: async(req,res)=>{
        const { acronyme, designation_grade } = req.body; // création d'un élément qui prendra en paramètre les champs saisis 
    // Si l'un des champs est vide
    if (!acronyme || !designation_grade) {
        return res.status(400).json({ error: "Il y a des paramètres manquants" });
    }
    try {
        // Vérifier que le grade avec ce acronyme existe
        const gradeFound = await models.grade.findOne({ where: { acronyme: acronyme } });
        if (gradeFound) {
            return res.status(409).json({ error: "Le grade existe déjà" });
        }
        // Ajouter l'élément dans la base de données
        const newGrade = await models.grade.create({ acronyme, designation_grade });
        return res.status(201).json({ GradeId: newGrade.id, message: "Grade créé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Impossible de créer ce grade, veuillez réessayer" });
    }
    },
    // fonction pour modifier un grade
    update: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL
        const { acronyme, designation_grade } = req.body; // création d'un élément qui prendra en paramètre les champs saisis 
        // Si l'un des champs est vide
    try {
        // Vérifier que la spécialisation avec cet id existe
        const specialisationFound = await models.Specialisation.findByPk(id);
        if (!specialisationFound) {
            return res.status(404).json({ error: "La spécialisation n'existe pas" });
        }
        // Supprimer l'élément dans la base de données
        await models.Specialisation.update({acronyme, designation_grade },{ where: { id: id } });
        return res.status(200).json({ success: "La spécialisation a été modifiée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Impossible de modifier cette spécialisation, veuillez réessayer" });
    }
    },
    //fonction pour supprimer un grade 
    delete: async(req,res)=>{
        const id = parseInt(req.params.id);// Recupere l'id dans l'url
    
        try{
            // verifier que le grade avec ce acronyme existe
            const gradeFound = await models.grade.findOne({ where: { id: id } });
            if (!gradeFound) {
                return res.status(409).json({ 'erreur': "Le grade n'existe pas" });
            }
            // modifier l'element dans la base de données
             await models.grade.destroy({where:{id:id}});
            return res.status(201).json({ 'succès': "Le grade à été supprimé"});
        }catch(erreur){
            res.status(500).json({'erreur':"Impossible de supprimer ce grade veuille réssayer"})
        }
    },
    //fonction pour recuper un grade
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL

        try {
            // Vérifier que le grade avec cet id existe
            const gradeFound = await models.grade.findByPk(id);
            if (!gradeFound) {
                return res.status(404).json({ error: "Le grade n'existe pas" });
            }
            // Récupérer l'élément dans la base de données
            return res.status(200).json({ grade: gradeFound });
        } catch (error) {
            res.status(500).json({ error: "Impossible de récupérer ce grade, veuillez réessayer" });
        }
    },

    //fonction pour afficher tous les grades
     getAllGrade: async (req, res) => {
        try {
          const grades = await models.grade.findAll();
          return res.status(200).json({
            status: true,
            data: grades
          });
        } catch (error) {
          return res.status(500).json({ error: "Problème de récupération des grades" });
        }
      }
}