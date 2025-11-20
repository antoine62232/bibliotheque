import typesModel from "../models/typesModel.js";

// Récupérer tous les types de livres
const getAllTypes = async (req, res) => {
    // trycatch pour gérer les erreurs
    // On essaye d'exécuter le code et si une erreur survient, on la capture
    try {
        // Appel du modèle pour récupérer tous les types
        const types = await typesModel.fetchAllTypes();
        // Définition du code de statut HTTP à 200 (OK)
        res.status(200);
        // Envoi de la réponse avec les types récupérés en JSON
        res.json(types);
    } catch (error) {
        // En cas d'erreur, on définit le code de statut HTTP à 500 (Erreur serveur)
        res.status(500);
        // Envoi de la réponse avec un message d'erreur
        res.json({ message: "Erreur serveur lors de la récupération des types." });
    }
};

// Récupérer un type de livre par son ID
const getTypeById = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        const type = await typesModel.fetchTypeById(id);
        // Vérification si le type existe (type n'est pas undefined)
        // Si oui, on renvoie le type avec un statut 200
        // Sinon, on renvoie un statut 404 (non trouvé)
        if (type) {
            res.status(200);
            res.json(type);
        } else {
            res.status(404);
            res.json({ message: "Type non trouvé." });
        }
    } catch (error) {
        res.status(500);
        res.json({ message: "Erreur serveur lors de la récupération du type." });
    }
};

// Création d'un nouveau type de livre
const createType = async (req, res) => {
    try {
        // {
        // "label" : "Nouveau Type"
        // {
        // Récupération du label depuis le corps de la requête
        const { label } = req.body;
        const createType = await typesModel.createType(label);
        // Réponse avec le statut 201 (Créé)
        res.status(201);
        res.json(createType );
    } catch (error) {
        res.status(500);
        res.json({ message: "Erreur serveur lors de la création du type." });
    }
};

// Mise à jour d'un type de livre existant
const updateType = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // Récupération du label depuis le corps de la requête
        const { label } = req.body;
        // updateType : nombre de lignes affectées
        const updateType = await typesModel.updateType(id, label);
        if (updateType === 0) {
            res.status(404);
            res.json({ message: "Type non trouvé pour la mise à jour." });
        }else{
            res.status(201);
            res.json(updateType);
        }
    } catch (error) {
        res.status(500);
        res.json({ message: "Erreur serveur lors de la mise à jour du type." });
    }
};

// Suppression d'un type de livre par son ID
const deleteType = async (req, res) => {
    try {
        // Récupération de l'ID depuis les paramètres de la requête
        const id = req.params.id;
        // deleteType : nombre de lignes affectées
        const deleteType = await typesModel.deleteType(id);
        if (deleteType === 0) {
            res.status(404);
            res.json({ message: "Type non trouvé pour la suppression." });
        }else{
            res.status(200);
            res.json(deleteType);
        }
    } catch (error) {
        res.status(500);
        res.json({ message: "Erreur serveur lors de la suppression du type." });
    }
};

export default {
    getAllTypes,
    getTypeById,
    createType,
    updateType,
    deleteType
};