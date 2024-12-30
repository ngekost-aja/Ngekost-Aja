const viewDashboard = (req, res) => {
    res.render('owner/dashboard')
}

const viewPengelola = (req, res) => {
    res.render('owner/pengelola')
}

const viewTambahAset = (req, res) => {
    res.render('owner/tambah-aset')
}

export {
    viewDashboard,
    viewPengelola,
    viewTambahAset
}
