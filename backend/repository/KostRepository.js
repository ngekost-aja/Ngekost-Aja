import connectionPool from "../core/Database.js"


const getAllKostData = async () => {
    try {
        const [result] = await connectionPool.execute(`
            SELECT * 
            FROM kost
        `)

        return result
    } catch (error) {
        console.log(error)
    }
}

const getSingleKostDataByID = async (itemID) => {
    try {
        const [result] = await connectionPool.execute(`
            SELECT * 
            FROM kost 
            WHERE kode_kost = ?
        `, [itemID])

        return result
    } catch (error) {
        throw error
    }
}

const getAllKostByKeyword = async (keyword) => {
    try {
        const [result] = await connectionPool.execute(`
            SELECT *
            FROM kost
            WHERE alamat LIKE ?
        `, [`%${keyword}%`]);
        

        return result
    } catch (error) {
        throw new error
    }
}

export { 
    getAllKostData,
    getSingleKostDataByID,
    getAllKostByKeyword
}
