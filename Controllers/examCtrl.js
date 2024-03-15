const models = require('../models');

// Concerne les notes d'examen 
module.exports= {
    
    //Fonction pour créer des notes d'éudiants
    register: async(req,res)=>{
        const { MaquetteId,EtudiantId, ECUEId,note } = req.body;
        // Si l'un des champs est vide
        if (!MaquetteId ||!EtudiantId || !ECUEId ||!note) {
            return res.status(400).json({ erreur: "Il y a des paramètres manquants" });
        }
        try {
            // Vérifier que le note n'existe pas déja
            const noteexamenFound = await models.noteexam.findOne({ where: { MaquetteId: MaquetteId, EtudiantId:EtudiantId, ECUEId:ECUEId} });
            if (noteexamenFound) {
                return res.status(409).json({ error: "Cet etudiant a déjà une note" });
            }
            // Ajouter l'élément dans la base de données
            const newNoteExamen = await models.noteexam.create({ MaquetteId,EtudiantId, ECUEId,note });
            return res.status(201).json({ NoteExamenId: newNoteExamen.id, message: "Note ajoutée avec succès" });
        } catch (error) {
            console.error("Erreur lors de l'ajout de cette note d'examen :", error.message);
            res.status(500).json({ erreur: "Impossible d'ajouter cette note d'examen, veuillez réessayer" });
        }   
    },
    //Fonction pour modifier la note d'un étudiant
    update: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL
        const { MaquetteId,EtudiantId, ECUEId,note } = req.body;
        
        try {
            // Vérifier que le note n'existe pas déja
            const noteexamenFound = await models.noteexam.findOne({ where: {id:id} });
            if (!noteexamenFound) {
                return res.status(409).json({ error: "Cette note n' existe déjà" });
            }
            // Modifier l'élément dans la base de données
            await models.noteexam.update({ MaquetteId,EtudiantId, ECUEId,note },{ where: {id:id} });
            return res.status(201).json({  message: "Note modifiée avec succès" });
        } catch (error) {
            console.error("Erreur lors de la modification de cette note d'examen :", error.message);
            res.status(500).json({ erreur: "Impossible de modifier cette note d'examen, veuillez réessayer" });
        }   
    },

    // Fonction pour supprimer la note d'un étudiant
    delete : async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL
       
        try {
            // Vérifier que le note n'existe pas déja
            const noteexamenFound = await models.noteexam.findOne({ where: {id:id} });
            if (!noteexamenFound) {
                return res.status(409).json({ error: "Cette note n' existe déjà" });
            }
            // Supprimer l'élément dans la base de données
             await models.noteexam.destroy({ where: {id:id} });
            return res.status(201).json({  message: "Note supprimée avec succès" });
        } catch (error) {
            console.error("Erreur lors de la suppression de cette note d'examen :", error.message);
            res.status(500).json({ erreur: "Impossible d'ajouter cette note d'examen, veuillez réessayer" });
        }   
    },
    // fonction récupere la note d'un étudiant a partir de son ID
    getOne: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL
       
        try {
            // Vérifier que le note n'existe pas déja
            const noteexamenFound = await models.noteexam.findOne({ where: {id:id} });
            if (!noteexamenFound) {
                return res.status(409).json({ error: "Cette note n' existe déjà" });
            }
            // Récupérer l'élément dans la base de données
            
            return res.status(201).json({  message: noteexamenFound });
        } catch (error) {
            console.error("Erreur lors de la récupération de cette note d'examen :", error.message);
            res.status(500).json({ erreur: "Impossible de recuperer cette note d'examen, veuillez réessayer" });
        }   
    },

    //fonction pour récupere toutes les notes d'un étudiant par son ID

    getbyIDEtudiant: async(req,res)=>{
        const id = parseInt(req.params.id); // Récupère l'id dans l'URL
       
        try {
            // Vérifier que le note n'existe pas déja
            const noteexamenFound = await models.noteexam.findAll({ where: {EtudiantId:id} });
            if (noteexamenFound.lengh<0) {
                return res.status(409).json({ error: "Il n'y a pas de  note pour ce étudiant " });
            }
            // Récupérer les éléments  dans la base de données
            
            return res.status(201).json({  message: noteexamenFound });
        } catch (error) {
            console.error("Erreur lors de la récupération de ces notes d'examen :", error.message);
            res.status(500).json({ erreur: "Impossible de recuperer ces notes d'examen, veuillez réessayer" });
        }   
    },

    // Fonction pour afficher toutes les notes
    
    AllNoteExamen: async(req,res)=>{
        try {
            const exam = await models.noteexam.findAll();
            return res.status(200).json({
              status: true,
              data: exam
            });
          } catch (error) {
            return res.status(500).json({ error: "Problème de récupération des notes" });
          }
    }
}