const helper = require('../helper.js');

class BestellformularDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM bestellformular WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM bestellformular';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM bestellformular WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(name = '', vorname = '', email = '', land = '', ort = '', strasse_hausnummer = '', tel , plz, hinweis = '', basket = '') {
        var sql = 'INSERT INTO bestellformular (name,vorname,email,land,ort,strasse_hausnummer,tel,plz,hinweis,basket) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [name, vorname, email, land, ort, strasse_hausnummer, tel, plz, hinweis, basket];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name = '', vorname = '', email = '', land = '', ort = '', strasse_hausnummer = '', tel , plz, hinweis = '', basket = '') {
        var sql = 'UPDATE bestellformular SET name=?,vorname=?,email=?,land=?,ort=?,strasse_hausnummer=?,tel=?,plz=?,hinweis=?,basket=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [id, name, vorname, email, land, ort, strasse_hausnummer, tel, plz, hinweis, basket];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM bestellformular WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('bestellformularDao [_conn=' + this._conn + ']');
    }
}

module.exports = BestellformularDao;