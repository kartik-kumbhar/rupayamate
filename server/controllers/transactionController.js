import Transaction from "../models/transactionModel.js"

export const addTransaction = async (req, res) => {
    try {
        const { type, category, amount, date, description } = req.body;
        const userId = req.user.id;

        if (!type || !category || !amount || !date || !description) {
            return res.status(400).json({ message: "missing data" });
        }

        const add = await Transaction.create({
            userId,
            type,
            category,
            amount,
            date,
            description
        });

        return res.status(201).json({ message: "Data added successfully.", data: add });
    } catch (error) {
        return res.status(500).json({ errormeasage: error.message + "error" });

    }
}

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errormeasage: error.message });

    }
}

export const updateTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
            new: true, // return the updated document
            runValidators: true, // ensure model validation rules apply
        });

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({
            message: "Transaction updated successfully",
            transaction: updatedTransaction,
        });

    } catch (error) {
        return res.status(500).json({ errormeasage: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        await Transaction.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ errormeasage: error.message });
    }
}

export const getTransactionsById = async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json({ errormeasage: error.message });
    }
}