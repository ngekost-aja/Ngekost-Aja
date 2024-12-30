import connectionPool from "../core/Database.js"


export const getAllKostData = async () => {
    try {
        const [result] = await connectionPool.execute(`
            SELECT
                kode_kost,
                nama,
                alamat
            FROM kost
        `)

        return result
    } catch (error) {
        throw error
    }
}

export const getSingleKostDataByID = async (itemID) => {
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

export const getAllKostByKeyword = async (keyword) => {
    try {
        const [result] = await connectionPool.execute(`
            SELECT *
            FROM kost
            WHERE alamat LIKE ?
        `, [`%${keyword}%`]);
        

        return result
    } catch (error) {
        throw error
    }
}
