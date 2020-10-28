interface ISql {
    [index : string] : string;
}

const Tsql = {} as ISql;
Tsql['KtgFindAll'] = "select * from tbl_kategori;";
Tsql['KtgFindByKode'] = "select * from tbl_kategori where kode = $1;";
Tsql['KtgFindInKode'] = "select * from tbl_kategori where kode in($1, $2, $3);";
Tsql['BlogInfoFindAll'] = "select * from tbl_bloginfo;";

export default Tsql;