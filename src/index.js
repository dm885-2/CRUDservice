import rapid from "@ovcina/rapidriver";
import {host, 
        getTokenData, 
        query, 
        connection,
        subscriber
        } from "./helpers.js";

let createTable = `CREATE TABLE if not exists files(
                    fileId INT AUTO_INCREMENT, 
                    filename varchar(50) not null,
                    data text, 
                    userId int,
                    filetype varchar(5) not null,
                    PRIMARY KEY (fileId))`; 

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
                        publish('create-file-response', {error: true, message: error.code});
                        return;
                    }
                    publish('create-file-response', {error: false, message: "File created successfully.", filename: filename, filetype: filetype})
                });                              
            }
        },
        {
            river: "CRUD",
            event: "read-file",
            work: (msg, publish) => { 
                let fileId = msg.fileId;

                let query = 'SELECT * FROM files WHERE fileId=?';

                connection.query(query, [fileId], (error, results) => {
                    if(error || Object.keys(results).length === 0) {
                        publish('read-file-response', {error: true, message: "File not found", errormessage: error.code});
                        return;
                    }
                    publish('read-file-response', {error: false, filename: results[0].filename, filetype: results[0].filetype, data: results[0].data})
                });
            }
        },
        {
            river: "CRUD",
            event: "update-file",
            work: (msg, publish) => {
                let fileId = msg.fileId;
                let data = msg.data;
                
                    
                let query = `UPDATE files
                             SET data = ?
                             WHERE fileId = ?`;
                let params = [data, fileId];

                connection.query(query, params, (error, results) => {
                    if(error) {
                        publish('update-file-response', {error: true, message: "File not found", errormessage: error.code});
                        return;
                    }

                    publish('update-file-response', {error: false, message: "File updated successfully"})
                });            
            }
        },
        {
            river: "CRUD",
            event: "delete-file",
            work: (msg, publish) => {
                let fileId = msg.fileId;
                
                let query = `DELETE FROM files WHERE fileId = ?`

                connection.query(query, [fileId], (error, results) => {
                    if(error) {
                        publish('delete-file-response', {error: true, message: error.code});
                        return;
                    }

                    publish('delete-file-response', {error: false, message: "File deleted succesfully"})
                });
            }
        },
        {
            river: "CRUD",
            event: "get-all-files",
            work: (msg, publish) => {
                let userId = msg.userId;
                let filetype = msg.filetype;

                let query = 'SELECT * FROM files WHERE userId=? AND filetype = ?';

                connection.query(query, [userId, filetype], (error, results) => {
                    if(error) {
                        publish('get-all-files-response', {error: true, message: error.code});
                        return;
                    }

                    var files = [];
                    results.forEach(element => {
                        files.push(omit("data", element));
                    });

                    publish('get-all-files-response', {error: false, results: files});
                });                
            }
        },
    ]);
}

function omit(key, obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
  }