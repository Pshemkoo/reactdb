import { openDatabase } from "expo-sqlite";

export default class Sqlite {
    initialize() {
        const sqlite = openDatabase("raports");
        sqlite.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Raports 
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name,
                        imgUrl,
                        type,
                        burningRate,
                        date)`
            );
        });
    }

    addRaport({ name, imgUrl, type, burningRate, date }) {
        const sqlite = openDatabase("raports");
        sqlite.transaction(tx => {
            tx.executeSql(
                `INSERT INTO Raports (name, imgUrl, type, burningRate, date)
                    VALUES (?, ?, ?, ?, ?)`, [name, imgUrl, type, burningRate, date], 
                    () => {console.log("success")}, () => {console.log("error")}
            );
        });
    }

    removeRaport(id) {
        const sqlite = openDatabase('raports');
        sqlite.transaction(tx => {
            tx.executeSql('DELETE FROM Raports WHERE id=?', [id], 
            () => {console.log("success")}, () => console.log("error"));
        });
    }

    fetchRaports(onRaportsFetched) {
        const sqlite = openDatabase('raports');
        sqlite.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Raports;',
                [],
                (_, { rows: { _array } }) => {
                    onRaportsFetched(_array);
                    console.log(_array);
                },
                () => console.log('error')
            );
        });
    }
}