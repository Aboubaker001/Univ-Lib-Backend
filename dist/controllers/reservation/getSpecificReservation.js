import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
const getSpecificReservation = async (req, res) => {
    const id = req.params.id;
    const reservation = await prisma.reservation.findUnique({
        where: {
            id: id
        }
    });
    if (!reservation) {
        throw new HttpExeception("Reservation not found", 404, Exceptions.NOT_FOUND);
    }
    res.status(200).json({
        ok: true,
        data: reservation,
    });
};
export default getSpecificReservation;
