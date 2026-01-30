import { autherModel } from "../../DB/models/author.models.js";

export const addAuthors = async (req, res, next) => {
        try {
                const authors = await autherModel.insertMany(req.body);
                res.status(201).json({ message: 'Inserted done successfully', authors });
        }
        catch (error) {
                res.status(500).json({ message: 'Failed to insert authors', error: error.message });
        }

}

export const creatauthor = async (req, res, next) => {
        try {
                const author = await autherModel.insertOne(req.body);
                res.status(201).json({ message: 'Inserted done successfully', author });
        } catch (error) {
                res.status(500).json({ message: 'Failed to insert author', error: error.message });

        }

}