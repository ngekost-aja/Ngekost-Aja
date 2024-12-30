const viewDashboard = (req, res) => {
    res.render('owner/dashboard')
}

const viewPengelola = (req, res) => {
    res.render('owner/pengelola')
}

const viewTambahAset = (req, res) => {
    res.render('owner/tambah-aset')
}

const viewTambahPengelola = (req, res) => {
    res.render('owner/tambah-pengelola')
}

export {
    viewDashboard,
    viewPengelola,
    viewTambahAset,
    viewTambahPengelola
}
