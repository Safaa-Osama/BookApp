import { bookModel } from "../../DB/models/book.models.js";
import { logModel } from "../../DB/models/log.models.js";


export const addLog = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const book = await bookModel.findOne({ _id: bookId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const collectedData = { bookId: book._id,  title: book.b_title, ...req.body,  };
    const log = await logModel.insertOne(collectedData);
    res.status(200).json({ message: "Log inserted", log });

  } catch (error) {
    res.status(500).json({ message: 'Failed to insert log', error: error.message });
  }
};