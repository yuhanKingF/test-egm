const koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const static = require("koa-static");
const crypto = require("crypto");
const md5 = require("md5-node");

// 数据库函数
const {sql_data} = require('./src/Sql');
const common = require('./src/method');

// 初始化
const app = new koa();  
// 实例化路由
const router = new Router();

// sql语句存储
let sql = [];
// 新闻载体存储
let allData = [];
// 新闻存储
let newsData = [];
// 热点排行新闻存储
let rankingData = [];
// id新闻评论存储
let commentData =[];
// 新闻类别
let category = null;
// 用户信息
let userdata = [];
// 注册信息
let register = [];
// 注册信息类型
let type_Register = [];
// where_SQL语句存储
let sql_where = '';
// 注册去重信息存储
let register_where = [];


// 模板加载(app级别的中间件)
app.use(views(__dirname + "/views"),{
  map:{
    html:"pug"
  }
});
// 静态资源(app级别的中间件)
app.use(static(__dirname + "/static"));
// ------------------------------------------------------------------------
// 路由级别中间件
// get请求：/
router.get('/',async (ctx,next) => {
  // 获取热点新闻
  rankingData = await common.getRankData();
  // 获取新闻类别
  allData = await common.GetCategory();
  // 新闻类别数据分装
  category = common.SplitData(allData);

  // 配置sql语句
  sql = `SELECT * FROM news`;
  // 执行数据库操作
  allData = await sql_data(sql);
  // 分装数据
  newsData = allData;

  // 截取时间
  newsData = common.TimeData(newsData);

  // 跳转页面并传输数据
  await ctx.render("home.pug",{
    newsData,
    rankingData,
    category
  }) 
})
// ------------------------------------------------------------------------
// get请求：/id
  .get('/cate/:id',async(ctx,next) => {   

    rankingData = await common.getRankData();
    allData = await common.GetCategory();
    category = common.SplitData(allData);

    sql = `SELECT * FROM news WHERE news_id = ${Number(ctx.params.id)} ; 
    SELECT * FROM comment WHERE news_id = ${Number(ctx.params.id)}`;

    allData = await sql_data(sql);

    newsData = allData[0];
    commentData = allData[1];

    newsData = common.TimeData(newsData);
    commentData = common.TimeData(newsData);

    await ctx.render("category.pug",{
      newsData,
      rankingData,
      commentData,
      category
    })
  })
// ------------------------------------------------------------------------
  .post('/login', async(ctx,next) => {
    let data = await common.getPostData(ctx);
    data.split(';').forEach((index,value) => {
      switch(value) {
        case 1:
          userdata[0] = common.PostData(index);
          break;
        case 2:
          userdata[1] = common.PostData(index);
          break;
      }
    });

    sql = `SELECT * FROM user WHERE account = ${userdata[0]}`;

    allData = await sql_data(sql);

    if (!allData) {
      ctx.body = ['账户不存在'];
    }else if (md5(userdata[1] + allData[0].salt) == allData[0].password) {
      ctx.body = ['登录成功',allData[0].username];
    }
  })
// ------------------------------------------------------------------------
  .get('/exit',async (ctx,next) => {
    ctx.redirect('/');
  })
// ------------------------------------------------------------------------
  .get('/register',async (ctx,next) => {
    await ctx.render("register.pug")
  })
// ------------------------------------------------------------------------
  .post('/register/write',async (ctx) => {
    let data_write = await common.getPostData(ctx);

    data_write.forEach((index,value) => {
      register[value] = common.PostData(index);
      type_Register[value] = common.PosetType(index);
    });

    sql = `SELECT * FROM user WHERE email = '${register[0]}';SELECT * FROM user WHERE account = '${register[1]}';SELECT * FROM user WHERE username = '${register[3]}';`;

    register_where = WipeRepetition(await sql_data(sql));

    register_where.forEach (async (index) => {
      if (index == null) {
        register[2] = md5(register[2] + 'iTca');
        await sql_data(`INSERT INTO 
        user(${type_Register[0]},${type_Register[1]},${type_Register[3]},${type_Register[2]},salt)
        VALUES('${register[0]}','${register[1]}','${register[2]}','${register[3]}')`);
        ctx.body = [true,register_where];
      }else {
        ctx.body = [false,register_where];
      }
    })
  })

// 路由中间件挂载
app.use(router.routes());
// 监听端口
app.listen(8080);