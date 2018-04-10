var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

// database URL
const uri = 'mongodb://140.112.28.194';
// Database Name
const dbName = 'CSX2003_01_HW2';

var obj;
fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    // console.log(obj);
});

// url : connect url, function(...){...} : callbackfunction
MongoClient.connect(uri, (error, client) => {
    if (error) {
        console.log('資料庫連接失敗');
    } else {
        console.log('資料庫連接成功');

        //use dbName
        const db = client.db(dbName);
        db.collection('ntnu_40371231h', (error, collection) => {
            if (error) {
                console.log('資料庫內無名為 ntnu_40371231h 的 collection');
                db.createCollection('ntnu_40371231h');
            } else {
                console.log('資料庫中有名為 ntnu_40371231h 的 collection，等待連線中');
            }

            collection.insert(obj, (error, result) => {
                if (error) {
                    console.log('資料插入失敗');
                    return;
                }
                console.log('插入 ' + result.insertedCount + ' 筆資料');
            });
            // collection.find().toArray((error, docs) => {
            //     if (error) {
            //         console.log('查詢 student 資料失敗');
            //         return;
            //     }
            //     for (let i = 0; i < docs.length; i++) {
            //         console.log(docs[i]);
            //     }
            // });
            // 確定動作完畢才可將 client 關閉
            client.close();
            console.log('資料庫中斷連線');
        });
    }
});