import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
const getFine = async (req, res) => {
    const id = req.params.id;
    const fine = await prisma.fine.findUnique({
        where: {
            id: id
        }
    });
    if (!fine) {
        throw new HttpExeception("Fine not found", 404, Exceptions.NOT_FOUND);
    }
    res.status(200).json({
        ok: true,
        data: fine,
    });
};
export default getFine;
