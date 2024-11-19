<?php

namespace NgekostAjaBackend\Models;

use NgekostAjaBackend\Core\Model;


class KostData extends Model {
    public function getSomeKostData(): array {
        $query = <<<SQL
            SELECT k.nama, km.nama_kamar, km.harga, k.alamat, u.rating
            FROM kost k
            INNER JOIN kamar km ON k.kode_kost = km.kode_kost
            LEFT JOIN sewa w ON w.kode_kamar = km.kode_kamar
            LEFT JOIN ulasan u ON u.kode_sewa = w.kode_sewa
        SQL;

        $stmt = $this->query($query);
        return $this->getAllData($stmt);
    }
}