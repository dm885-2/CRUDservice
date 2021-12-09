import rapid from "@ovcina/rapidriver";
import {host, 
        getTokenData, 
        query, 
        connection,
        subscriber
        } from "./helpers.js";

let createTable = `create table if not exists files(
                    id int primary key auto_increment,
                    filename varchar(50) not null,
                    data text, 
                    userid int)`;

connection.query(createTable, (error, results) => {
    if(error) {
        throw error;
    }
});

if(process.env.RAPID)
{
    subscriber(host, [
        {
            river: "CRUD", 
            event: "create-file", 
            work: (msg, publish) => {
                let filename = msg.filename;
                let data = msg.data;
                let userId = msg.userId;

                let query = `INSERT INTO files(filename,data,userid)
                             VALUES(?,?,?)`;
                
                let params = [filename, data, userId];

                connection.query(query, params, (error, results) => {
                    if (error) {
                        publish('create-file-response', {error: true, message: error});
                        return;
                    }
                    publish('create-file-response', {error: false, message: "File created successfully."})
                });                              
            }
        },
        {
            river: "CRUD",
            event: "read-file",
            work: (msg, publish) => {
                //burde det ikke være navn og userid ? 
                let userId = msg.userId;
                let filename = msg.filename;

                let query = 'SELECT * FROM files WHERE userId=? AND filename=?';

                connection.query(query, [userId, filename], (error, results) => {
                    if(error || Object.keys(results).length === 0) {
                        publish('read-file-response', {error: true, message: "File not found", errormessage: error});
                        return;
                    }
                    publish('read-file-response', {error: false, filename: results[0].filename, data: results[0].data, userid: results[0].userid})
                });
            }
        },
        {
            river: "CRUD",
            event: "update-file",
            work: (msg, publish) => {
                let fileId = msg.fileId.toString();
                let data = msg.data.toString();

                let query = `UPDATE files
                             SET data = ?
                             WHERE id = ?`;
                let params = [data, fileId];

                connection.query(query, params, (error, results) => {
                    if(error) {
                        publish('update-file-response', error.message);
                        return;
                    }

                    publish('update-file-response', `File with id ${results.insertId} updated succesfully.`)
                });            
            }
        },
        {
            river: "CRUD",
            event: "delete-file",
            work: (msg, publish) => {
                let fileId = msg.fileId.toString();
                
                let query = `DELETE FROM files WHERE id = ?`

                connection.query(query, fileId, (error, results) => {
                    if(error) {
                        publish('delete-file-response', error.message);
                        return;
                    }

                    publish('delete-file-response', `File with id ${results,insertId} deleted succesfully.`)
                });
            }
        },
        {
            river: "CRUD",
            event: "get-all-files",
            work: (msg, publish) => {
                let userId = msg.userId.toString();

                let query = 'SELECT * FROM files where userid=?'

                connection.query(query, userId, (error, results) => {
                    if(error) {
                        publish('get-all-files-response', error.message);
                        return;
                    }
                    let payload = JSON.stringify(results);
                    publish('get-all-files-response', payload);
                });                
            }
        },
    ]);
}
