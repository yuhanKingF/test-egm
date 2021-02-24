window.onload = function () {
// ------------------------------------------------------------------------
  
  let Sub_li = document.querySelector('.subject_ul').querySelectorAll('li');
  Sub_li.forEach((index,value) => {
    index.onmouseover = () => {
      for (let t=0;t<Sub_li.length;t++) {
        Sub_li[t].className = null;
      };
      index.classList.add("color_bot");
    };
    index.onmouseout = () => {
      index.className = null;
    }
  })

// ------------------------------------------------------------------------
  let Left_img = document.querySelector('.subject_ul').querySelectorAll('.left');
  let Left_a = document.querySelector('.subject_ul').querySelectorAll('a');

  Left_img.forEach((index,value) => {
    index.onclick = () => {
      index.click();
    };
    Left_a[value].onmouseover = () => {
      Left_a[value].classList.add("color_text");
    };
    Left_a[value].onmouseout = () => {
      Left_a[value].classList.remove("color_text");
    }
  });
// ------------------------------------------------------------------------
  window.onscroll=function () { 
    let Sign_div = document.getElementsByClassName('sign')[0];
    function getPageScroll() {
      let yScroll = null;
      if (self.pageYOffset) {
        yScroll = self.pageYOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
      } else if (document.body) {// all other Explorers
        yScroll = document.body.scrollTop;
      }
      arrayPageScroll = new Array(yScroll);
    };
    getPageScroll();

    if (arrayPageScroll < 76) {
      Sign_div.style.background = '#D60000';
      Sign_div.style.height = '60px';
    } else {
      Sign_div.style.background = 'none';
    };
  };
// ------------------------------------------------------------------------
  let wrap = document.querySelector(".wrap");
  let next = document.querySelector(".arrow_right");
  let prev = document.querySelector(".arrow_left");

  next.onclick = function () {
    next_pic();
  }
  prev.onclick = function () {
    prev_pic();
  }

  function next_pic () {
    let newLeft;
    if(wrap.style.left === "-3720px"){
      wrap.style.transition = 'none';
      newLeft = -620;
      setTimeout(function(){
        wrap.style.transition = '1s';
        newLeft = parseInt(wrap.style.left) - 620;
        wrap.style.left = newLeft + "px";     
      },100)
    }else{
      newLeft = parseInt(wrap.style.left) - 620;
    }
    wrap.style.left = newLeft + "px";
    // showCurrentDot();
  }

  function prev_pic () {
    let newLeft;
    if(wrap.style.left === "0px"){
      wrap.style.transition = 'none';
      newLeft = -3100;
      setTimeout(function(){
          wrap.style.transition = '1s';
          newLeft = parseInt(wrap.style.left) + 620;    
          wrap.style.left = newLeft + "px";     
      },100)
    }else{
      newLeft = parseInt(wrap.style.left) + 620;
    }
    wrap.style.left = newLeft + "px";
    // showCurrentDot();
  }

  let timer = null;
  function autoPlay () {
    timer = setInterval(function(){
      next_pic();
    },2000)
  }
  autoPlay();
  let binn_div = document.querySelector("#binner_div");
  binn_div.onmouseenter = function () {
    clearInterval(timer);
  }
  binn_div.onmouseleave = function () {
    autoPlay();
  }

  let Sign_div = document.querySelector('.sign_div');
  let Sign_a = document.querySelector('.sign');
  let html = document.querySelector("html");
  let switch_sign = null;

  Sign_a.onmouseover = function () {
    Sign_div.style.display = 'block';
    switch_sign = 1;
  };
  Sign_div.onmouseover = function () {
    switch_sign = null;
  };
  Sign_div.onmouseout = function () {
    switch_sign = 1;
  };
  html.onclick = function () {
    if (switch_sign == 1) {
      Sign_div.style.display = 'none';
    };
  };
// ------------------------------------------------------------------------
  let Unique_div = document.querySelector('#unique');
  let Unique_p = document.querySelector('#unique').querySelector('p');
  let Unique_sign = document.querySelector('.sign');

  // 判断用户是否登录过
  function Judge_Login() {
    if (localStorage.getItem("user")) {
      Unique_div.style.display = 'inline-block';
      Unique_sign.style.display = 'none';
      Sign_div.style.display = 'none';
      Unique_p.innerText = localStorage.getItem("user");
    } else {
      Unique_div.style.display = 'none';
      Unique_sign.style.display = 'inline-block';
    }
  }

  Judge_Login();

// ------------------------------------------------------------------------
  let UserName = document.querySelector('.user');
  let Password = document.querySelector('.pwd');
  let Sig_button = document.querySelector('.sign_sub');

  let data = new FormData();

  function PostUser() {
    axios.post('http://localhost:8080/login',data).then((ret) => {
      switch (ret.data[0]) {
        case '账户不存在':
          alert(ret.data[0]);
          UserName.value = null;
          Password.value = null;
          break;
        case '登录成功':
          localStorage.setItem("user",ret.data[1]);
          Judge_Login();
          alert(ret.data[0]);
          break;

      }
    })
  }

  Sig_button.addEventListener("click", () => {
    data.append("username",UserName.value);
    data.append("password",Password.value);
    PostUser();
  })
// ------------------------------------------------------------------------
  // 触摸用户name弹出
  let Li_top_eject = document.querySelector('.top_div').getElementsByClassName('eject_div')[0];
  let Li_eject = document.querySelector('.eject_div').querySelectorAll('li');
  let Li_top_right_time = null;

  Unique_div.addEventListener("mouseover",() => {
    Li_top_eject.style.display = 'inline-block';
    window.clearInterval(Li_top_right_time);
  })
  Unique_div.addEventListener("mouseout",() => {
    Li_top_right_time = setTimeout(function () {
      Li_top_eject.style.display = 'none';
    },200);
  })

  Li_top_eject.addEventListener("mouseover",() => {
    window.clearInterval(Li_top_right_time);
  })

  Li_top_eject.addEventListener("mouseout",() => {
    Li_top_right_time = setTimeout(function () {
      Li_top_eject.style.display = 'none';
    },200);
  })

  Li_eject.forEach((index,value)=>{
    index.addEventListener("mouseover",() => {
      index.classList.add("li_eject_div");
    })
    index.addEventListener("mouseout",() => {
      index.classList.remove("li_eject_div");
    })

    switch (value) {
      case 4:
        index.addEventListener("click",() => {
          localStorage.removeItem("user");
        })
        break;
    }
  })
// ------------------------------------------------------------------------







}

