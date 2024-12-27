import connectionPool from '../core/Database.js';


const getUserByEmail = async (email) => {
    try {
        const [result] = await connectionPool.execute(`
            SELECT email, nama, password
            FROM penyewa
            WHERE email = ?
            UNION
            SELECT email, nama, password
            FROM pemilik
            WHERE email = ?
            UNION
            SELECT email, nama, password
            FROM pengelola
            WHERE email = ?
            `, [email, email, email])

        return result
    } catch (error) {
        throw error
    }
}

export {
    getUserByEmail
}