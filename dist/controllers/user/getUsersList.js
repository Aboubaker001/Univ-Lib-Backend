import prisma from "../../services/db/prismaClient.js";
const getUsersList = async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json({
        ok: true,
        data: users,
    });
};
export default getUsersList;