import prisma from "../../services/db/prismaClient.js";
const getReservationsList = async (req, res) => {
    const reservations = await prisma.reservation.findMany({
        include : {
            user : {
                select : {
                    firstName : true,
                    familyName : true,
                }
            },
            book : {
                select : {
                    title : true
                }
            }
        }
    });
    res.status(200).json({
        ok: true,
        data: reservations,
    });
};
export default getReservationsList;
