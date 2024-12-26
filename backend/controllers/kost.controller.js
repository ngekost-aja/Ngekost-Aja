import { getAllKostData } from "../repository/KostRepository.js"


const getAllKost = async (req, res) => {
    const data = await getAllKostData()
    res.json(data)
}

export { getAllKost }
