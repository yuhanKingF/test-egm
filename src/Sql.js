const mysql = require("mysql");
// 数据库操作属于异步操作
const connection = mysql.createPool({
  connectionLimit:10,
  user:'root',
  password:'root',
  database:'release',
  multipleStatements: true
});

let sql_data=(sql)=> {
  // console.log(sql);
  return new Promise((resolve,reject) => {
    // 使用MySQL连接池(getConnection)节省性能
    connection.getConnection((err,connection) => {
      if (err) {
        // 抛出连接错误
        reject(err);
      } else {
        connection.query(sql,(err,rfesult)=>{
          if (rfesult) {
            // 发送数据
            resolve(rfesult);
            // 关闭数据库
            connection.release();
          }else if (err) {
            // 发送错误
            console.log('发送错误');
            reject(err);
          }
        })
      }
    })
  })
}
module.exports = {sql_data}
