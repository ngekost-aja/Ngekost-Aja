import { getAllKostData, getSingleKostData } from '../repository/KostRepository.js'


export const getAllKost = async (req, res) => {
    let data = null
    try {
        data = await getAllKostData()
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "data not found"
        })
    }

    res.status(200).json(data)
}

export const getSingleKost = async (req, res) => {
    let data = null
    try {
        data = await getSingleKostData(req.params.id)
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "data not found"
        })
    }

    res.status(200).json(data)
}
