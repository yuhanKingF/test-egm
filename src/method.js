// 数据库函数
const {sql_data} = require('./Sql');

let sql = null;
let allData = null;
// 新闻类别的储存
let category = {
  domestic:{},
  inter:{},
  entert:{},
  sports:{},
  focus:{},
  military:{},
  more:{}
}



// 获取post的数据
getPostData = function (ctx) {
  return new Promise(function (resolve,reject) {
    try {
      let str='';
      ctx.req.on('data',function(chunk){
        str += chunk;
      })
      
      ctx.req.on('end',function(){
        resolve(str.split(';').slice(-4))
      })
    }catch(err) {
      reject(err)
    }
  })
}

// 封装获取热点新闻方法
getRankData = () => {
  return new Promise ((resolve,reject) => {
    try {
      sql = `SELECT * FROM news ORDER BY click DESC limit 15`;
      allData = sql_data(sql);
      resolve(allData);
    }catch (err) {
      reject(err);
    }
  })
}

// 封装类别新闻方法
GetCategory = () => {
  return new Promise((resolve,reject) => {
    try {
      sql = `Select  *  From  news WHERE category = '要闻'  Order  By  rand()  Limit  10;
      Select  *  From  news WHERE category = '国内'  Order  By  rand()  Limit  10;
      Select  *  From  news WHERE category = '国际'  Order  By  rand()  Limit  10;
      Select  *  From  news WHERE category = '娱乐'  Order  By  rand()  Limit  10;
      Select  *  From  news WHERE category = '军事'  Order  By  rand()  Limit  10;
      Select  *  From  news WHERE category = '体育'  Order  By  rand()  Limit  10;
      Select  *  From  news WHERE category = '更多'  Order  By  rand()  Limit  10`;

      allData = sql_data(sql);

      resolve(allData);
    }catch (err) {
      reject(err);
    }
  })
}

// 封装数据分装方法
SplitData = (allData) => {
  category.focus = allData[0];
  category.domestic = allData[1];
  category.inter = allData[2];
  category.entert = allData[3];
  category.military = allData[4];
  category.sports = allData[5];
  category.more = allData[6];

  return category
}

// 封装时间截取方法
TimeData = (time) => {
  time.forEach((index,value) => {
    // 利用JSON.stringify将Object转成字符串
   index.cre_date = JSON.stringify(index.cre_date).slice(1,11);
  })  
  return time
}
// 封装截取用户登录and用户注册信息方法
PostData = (data) => {
  let postdata = data.split("-")[0].split('"')[2].split("\n")[2].split("\r")[0];
  return postdata
}
// 封装截取注册数据类型方法
PosetType = (data) => {
  let typedata = data.split('"')[1];
  return typedata
}
// 封装数据查询去重方法
WipeRepetition = (data) => {
  let num = [];

  // 获取SQL查询获得数据并遍历
  data.forEach((index,value) => {
    if (index == '') {
      num[value] = null;
    } else {
      num[value] = value;
    }
  })

  return num

}

module.exports = {getPostData,getRankData,GetCategory,SplitData,TimeData,PostData,PosetType,WipeRepetition};