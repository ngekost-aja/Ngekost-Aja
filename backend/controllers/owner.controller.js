const viewDashboard = (req, res) => {
    res.render('owner/dashboard')
}

const viewPengelola = (req, res) => {
    res.render('owner/pengelola')
}

const viewTambahAset = (req, res) => {
    res.render('owner/tambah-aset')
}

const viewDetailAsetKost = (req, res) => {
    res.render('owner/detail-aset-kost')
}

const viewTambahPengelola = (req, res) => {
    res.render('owner/tambah-pengelola')
}

export {
    viewDashboard,
    viewPengelola,
    viewTambahAset,
    viewDetailAsetKost,
    viewTambahPengelola
}
