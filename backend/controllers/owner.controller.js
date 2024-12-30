const viewDashboard = (req, res) => {
    res.render('owner/dashboard', {
        user: req.session.user
    })
}

const viewPengelola = (req, res) => {
    res.render('owner/pengelola', {
        user: req.session.user
    })
}

const viewTambahAset = (req, res) => {
    res.render('owner/tambah-aset', {
        user: req.session.user
    })
}

const viewDetailAsetKost = (req, res) => {
    res.render('owner/detail-aset-kost', {
        user: req.session.user
    })
}

const viewTambahRuang = (req, res) => {
    res.render('owner/tambah-ruang', {
        user: req.session.user
    })
}

const viewStatisticsRoomKost = (req, res) => {
    res.render('owner/statistics-room-kost', {
        user: req.session.user
    })
}

const viewTambahPengelola = (req, res) => {
    res.render('owner/tambah-pengelola', {
        user: req.session.user
    })
}

export {
    viewDashboard,
    viewPengelola,
    viewTambahAset,
    viewDetailAsetKost,
    viewTambahRuang,
    viewStatisticsRoomKost,
    viewTambahPengelola
}
