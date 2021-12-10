import rapid from "@ovcina/rapidriver";
import {host, 
        getTokenData, 
        query, 
        connection,
        subscriber
        } from "./helpers.js";

let createTable = `CREATE TABLE if not exists files(
                    filename varchar(50) not null,
                    data text, 
                    userid int,
                    filetype varchar(5) not null,
                    PRIMARY KEY (userid, filename))`;

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
                let filetype = msg.filetype;

                let query = `INSERT INTO files(filename,data,userid,filetype)
                             VALUES(?,?,?,?)`;
                
                let params = [filename, data, userId, filetype];

                connection.query(query, params, (error, results) => {
                    if (error) {
                        publish('create-file-response', {error: true, message: error});
                        return;
                    }
                    publish('create-file-response', {error: false, message: "File created successfully.", filename: filename, filetype: filetype, userId: userId})
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

                let query = 'SELECT * FROM files WHERE userid=? AND filename=?';

                connection.query(query, [userId, filename], (error, results) => {
                    if(error || Object.keys(results).length === 0) {
                        publish('read-file-response', {error: true, message: "File not found", errormessage: error});
                        return;
                    }
                    publish('read-file-response', {error: false, filename: results[0].filename, filetype: results[0].filetype, data: results[0].data, userId: results[0].userid})
                });
            }
        },
        {
            river: "CRUD",
            event: "update-file",
            work: (msg, publish) => {
                let userId = msg.userId;
                let filename = msg.filename;
                let data = msg.data;
                let filetype = msg.filetype;
                    
                let query = `UPDATE files
                             SET data = ?
                             WHERE userid = ? AND filename = ?`;
                let params = [data, userId, filename];

                connection.query(query, params, (error, results) => {
                    if(error) {
                        publish('update-file-response', {error: true, message: "File not found", errormessage: error});
                        return;
                    }

                    publish('update-file-response', {error: false, message: "File updated successfully", filename: filename, filetype: filetype, userId: userId})
                });            
            }
        },
        {
            river: "CRUD",
            event: "delete-file",
            work: (msg, publish) => {
                let userId = msg.userId;
                let filename = msg.filename;
                let filetype = msg.filetype;
                
                let query = `DELETE FROM files WHERE userid = ? AND filename = ?`

                connection.query(query, [userId, filename], (error, results) => {
                    if(error) {
                        publish('delete-file-response', {error: true, message: error.message});
                        return;
                    }

                    publish('delete-file-response', {error: false, message: "File deleted succesfully", filename: filename, filetype: filetype, userId: userId})
                });
            }
        },
        {
            river: "CRUD",
            event: "get-all-files",
            work: (msg, publish) => {
                let userId = msg.userId;
                let filetype = msg.filetype;
                let query = 'SELECT * FROM files WHERE userid=? AND filetype = ?';

                connection.query(query, [userId, filetype], (error, results) => {
                    if(error) {
                        publish('get-all-files-response', {error: true, message: error});
                        return;
                    }
                    publish('get-all-files-response', {error: false, files: results});
                });                
            }
        },
    ]);
}
