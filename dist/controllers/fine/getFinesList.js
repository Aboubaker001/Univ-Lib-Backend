import prisma from "../../services/db/prismaClient.js";
const getFinesList = async (req, res) => {
    const fines = await prisma.fine.findMany({
        
    });
    res.status(200).json({
        ok: true,
        data: books,
    });
};
export default getFinesList;
