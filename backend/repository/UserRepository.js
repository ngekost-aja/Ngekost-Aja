import connectionPool from '../core/Database.js';


const getUserByEmail = async (email) => {
    try {
        const [result] = await connectionPool.execute(`
            SELECT email, nama, password, 'penyewa' AS role
            FROM penyewa
            WHERE email = ?
            UNION
            SELECT email, nama, password, 'pemilik' AS role
            FROM pemilik
            WHERE email = ?
            UNION
            SELECT email, nama, password, 'pengelola' AS role
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
