window.addEventListener("load",() => {
// ------------------------------------------------------------------------
  // TOP选项卡的鼠标单击效果
  let Li_top = document.querySelector('.left').querySelectorAll('li');

  // top栏单击导航栏移动效果
  Li_top.forEach((index,value) => {
    index.onclick = () => {
      window.scrollTo(0,value * 436 - value * 23);
    }
  })

// ------------------------------------------------------------------------

  let Rank_li = document.querySelector('.ranking_ul').querySelectorAll('li');
  let Line_li = document.getElementsByClassName('line_li');
  let Rank_img = document.querySelector('.ranking_ul').querySelectorAll('.ranking_img');
  let Text_a = document.querySelectorAll('.text_a');
  let right_url = document.querySelector('.bot_div').querySelector('.right');
  let News_a = document.querySelectorAll('.distinguish');

  let Rank_img_time = null;

  // 设置图片
  setTimeout(function () {
    Rank_img.forEach((index,value) => {
      index.classList.add("block");
    })

    News_a.forEach((index) => {
      index.classList.add("block");
    })

    // 生成热点排行的....
    Text_a.forEach((index,value) => {
      if (index.innerText.length > 12) {
        index.classList.add("block")
        TextSubstring = index.innerText.substring(0,12);
        TextSubstring += '....';
        index.innerText = TextSubstring;
      };
    });
    right_url.classList.add("block");
  },500);

  Rank_li.forEach((index,value) => {
    Line_li[value].style.height = '0px';
    Rank_img[value].style.cssText = 'width:0px;height:0px;';
    index.onmouseover = () => {
      for (let u = 0;u<Rank_li.length;u++) {
        Line_li[u].style.height = '0px';
        Rank_li[u].className = null;
        Rank_img[u].style.cssText = 'width:0px;height:0px;';
      };
      Line_li[value].style.height = '20px';
      index.classList.add("color_bot");
      Rank_img_time = setTimeout(function () {
        Rank_img[value].style.cssText = 'width:225px;height:120px';
      },500);
    };
    index.onmouseout = () => {
      Line_li[value].style.height = '0px';
      index.className = null;
      window.clearInterval(Rank_img_time);
      Rank_img[value].style.cssText = 'width:0px;height:0px';
    }
  })

  News_a.forEach((index,value) => {
    if (index.innerText.length > 18) {
      index.innerText = index.innerText.substring(0,16) + '...';
    }
    index.onmouseover = () => {
      index.classList.add("color_text");
    }
    index.onmouseout = () => {
      index.classList.remove("color_text");
    }
  })
// ------------------------------------------------------------------------




})