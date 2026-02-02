import { bookModel } from "../../DB/models/book.models.js";

// GET ALL BOOKS
export const allBooks = async (req, res, next) => {
        try {
                const books = await bookModel.find().toArray();
                res.status(200).json({ message: "done", books })
        } catch (error) {
                res.status(500).json({ message: 'Failed to get all books', error: error.message });
        }
}

// ADD ONE BOOK
export const addBook = async (req, res, next) => {
        try {
                const { b_title, b_author, b_year, b_genres } = req.body;
                const book = await bookModel.insertOne(req.body);
                res.status(201).json({ message: 'Inserted done successfully', book });
        } catch (error) {
                res.status(500).json({ message: 'Failed to insert book', error: error.message });
        }
}

// ADD MANY BOOKS 
export const addMoreBooks = async (req, res, next) => {
        try {

                if (!Array.isArray(req.body)) {
                        return res.status(400).json({ message: "Body must be an array" });
                }

                const books = await bookModel.insertMany(req.body);
                res.status(201).json({ message: 'Inserted done successfully', books });
        }
        catch (error) {
                res.status(500).json({ message: 'Failed to insert book', error: error.message });
        }
}

// PATCH YEAR ===> BY TITLE 
export const patchBook = async (req, res, next) => {
        try {
                const b_title = req.params.title;

                const result = await bookModel.updateOne(
                        { b_title: b_title },
                        { $set: { b_year: 2022 } }
                );

                if (result.matchedCount === 0) {
                        return res.status(404).json({ message: "No book found with this title" });
                }
                res.status(200).json({ message: "Document updated successfully", result });

        } catch (error) {
                res.status(500).json({
                        message: 'Failed to update', error: error.message
                });
        }
};

// GET BOOK BY TITLE
export const bookByTitle = async (req, res, next) => {
        try {
                const bookTitle = req.params.title
                const book = await bookModel.find({ b_title: bookTitle }).toArray();

                if (!book) {
                        res.status(400).json({ message: "Book not found" });
                }

                res.status(200).json({ message: 'done', book });
        } catch (error) {
                res.status(500).json({ message: 'Failed to insert book', error: error.message });
        }
}

// GET BOOKS BY YEAR
export const booksByYear = async (req, res, next) => {
        try {
                const { year_1, year_2 } = req.params;

                const y1 = Number(year_1);
                const y2 = Number(year_2);
                // Y1  >  Y2
                const result = await bookModel.find({
                        $or: [
                                { b_year: { $lte: y1 } },
                                { b_year: { $gte: y2 } }
                        ]
                }).toArray();
                res.status(200).json({ message: "done", result });
        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
};

export const bookByGenre = async (req, res, next) => {
        try {
                const { genre } = req.query;
                const result = await bookModel.find({
                        b_genres: genre
                }).toArray();
                res.status(200).json({ message: "done", result });

        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
}

export const skipLimit = async (req, res, next) => {
        try {

                const result = await bookModel.aggregate([
                        { $skip: 2 },
                        { $limit: 3 }
                ]).toArray();
                res.status(200).json({ message: "done", result });

        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
}

export const yearInteger = async (req, res, next) => {
        try {
                const result = await bookModel.find(
                        { b_year: { $type: 16 } }

                ).toArray();
                res.status(200).json({ message: "done", result });
        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
}

export const excludeGenres = async (req, res, next) => {
        try {
                const result = await bookModel.find({
                        b_genres: { $nin: ["drama", "advanyure"] }
                }).toArray();
                res.status(200).json({ message: "done", result });
        } catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
}

export const deleteBook = async (req, res, next) => {
        try {
                const year = Number(req.query.year);
                const books = await bookModel.find({
                        b_year: { $lte: year }
                }).toArray();
                const deletedBooks = await bookModel.deleteMany(books);
                res.status(200).json({ message: "done", deletedBooks });
        } catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
}

export const bookAgregate1 = async (req, res, next) => {
        try {
                const books = await bookModel.aggregate([
                        { $match: { b_year: { $gt: 2000 } } },
                        { $sort: { b_year: -1 } }
                ]).toArray();
                res.status(200).json({ message: "done", books });
        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
};

export const bookAgregate2 = async (req, res, next) => {
        try {
                const books = await bookModel.aggregate([
                        { $match: { b_year: { $gt: 2000 } } },
                        {  $project: {
                                        _id: 0,
                                        b_title: 1,
                                        b_author: 1,
                                        b_year: 1
                                }  }
                ]).toArray();
                res.status(200).json({ message: "done", books });
        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
};

export const bookAgregate3 = async (req, res, next) => {
       try {
    const books = await bookModel.aggregate([
  { $unwind: "$genres" },
  {
    $project: {
      _id: 0,
      b_title: 1,
      b_genres: "$genres"
    }
  }
]).toArray();

                res.status(200).json({ message: "done", books });
        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
};

export const bookAgregate4 = async (req, res, next) => {
       try {
    const result = await bookModel.aggregate([
  {
    $lookup: {
      from: "logs",       
      localField: "_id",      
      foreignField: "bookId", 
      as: "logs"
    }
  }
]).toArray();

                res.status(200).json({ message: "done", result });
        }
        catch (error) {
                res.status(500).json({ message: 'Error in server', error: error.message });
        }
};


