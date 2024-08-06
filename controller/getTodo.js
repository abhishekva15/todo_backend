

const List = require("../models/list");
const jwt = require('jsonwebtoken');

exports.getTodo = async (req, res) => {
    try {
      
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const decodedToken = jwt.decode(token);
        if (!decodedToken ) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token",
            });
        }

        const userId = decodedToken.id;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const todos = await List.find({ userId }).skip(skip).limit(limit);
        const totalTodos = await List.countDocuments({ userId });

        res.status(200).json({
            success: true,
            data: todos,
            totalPages: Math.ceil(totalTodos / limit),
            currentPage: page,
            message: "Todos fetched successfully",
        });
    } catch (error) {
        console.error('Error fetching todo data:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Server error",
        });
    }
};
