import connectionPool from "../core/Database.js"


const getAllKostData = async () => {
    try {
        const [result] = await connectionPool
                                .execute(`SELECT * FROM kost`)

        return result
    } catch (error) {
        console.log(error)
    }
}

const getSingleKostData = async (itemID) => {
    try {
        const [result] = await connectionPool
                                .execute(`
                                    SELECT * 
                                    FROM kost 
                                    WHERE kode_kost = ?
                                `, [itemID])

        if (result.length === 0) {
            throw new Error("Data not found");
        }

        return result[0]
    } catch (error) {
        throw error
    }
}

export { getAllKostData, getSingleKostData }
