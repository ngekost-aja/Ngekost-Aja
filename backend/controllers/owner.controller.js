export const viewDashboard = (req, res) => {
    res.render('owner/dashboard', {
        user: req.session.user
    })
}

export const viewPengelola = (req, res) => {
    res.render('owner/pengelola', {
        user: req.session.user
    })
}

export const viewTambahAset = (req, res) => {
    res.render('owner/tambah-aset', {
        user: req.session.user
    })
}

export const viewDetailAsetKost = (req, res) => {
    res.render('owner/detail-aset-kost', {
        user: req.session.user
    })
}

export const viewTambahRuang = (req, res) => {
    res.render('owner/tambah-ruang', {
        user: req.session.user
    })
}

export const viewStatisticsRoomKost = (req, res) => {
    res.render('owner/statistics-room-kost', {
        user: req.session.user
    })
}

export const viewTambahPengelola = (req, res) => {
    res.render('owner/tambah-pengelola', {
        user: req.session.user
    })
}
