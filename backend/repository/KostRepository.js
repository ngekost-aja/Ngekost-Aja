import connectionPool from "../core/Database.js"


const getAllKostData = async () => {
    try {
        const [rows, fields] = await connectionPool.execute(`
            SELECT * FROM kost
        `)
        return rows
    } catch (error) {
        console.log(error)
    }
}

export { getAllKostData }
