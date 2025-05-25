import validate from "../../utils/validation.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import prisma from "../../services/db/prismaClient.js";
const updateFineInfo = async (req, res) => {
    const fineId = req.params.id;
    const validatedData = validate(req.body, updatefineSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid fine data", 422, Exceptions.INVALID_DATA);
    }
    const fine = await prisma.fine.findUnique({
        where: {
            id: fineId,
        },
    });
    if (!fine) {
        throw new HttpExeception("Fine not found", 404, Exceptions.NOT_FOUND);
    }
    await prisma.fine.update({
        where: {
            id: fine.id
        },
        data: {
            ...validatedData
        }
    });
    res.status(201).json({
        ok: true,
        msg: "fine updated successfully",
    });
};
export default updateFineInfo;
