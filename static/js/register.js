window.addEventListener('load',() => {
// ------------------------------------------------------------------------
  let Text_div = document.querySelectorAll('.text_div');
  let Text_p = document.querySelectorAll('.text_appear');

  Text_div.forEach((index,value) => {
    index.addEventListener("click",() => {
      for (let j =0;j<Text_div.length;j++) {
        Text_div[j].style.border = '1px solid #CBCBCB';
        Text_p[j].style.display = 'none';
      }
      index.style.cssText = 'border:1px solid #3b78dd;';
      Text_p[value].style.display = 'block';
    })
  })
// ------------------------------------------------------------------------
  let Bot_submin = document.querySelector('.bot_div_submit').querySelector('input');
  let Html = document.querySelector('html');
  let Text_input = document.querySelectorAll('.text_input');
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  let Label_input = document.querySelector('.top_label_input');
  let data = new FormData();

  Text_input.forEach((index,value) => {
    switch(value) {
      case 0:
        index.value = "963852741@qq.com";
        break;
      case 1:
        index.value = "963852741";
        break;
      case 2:
        index.value = "147258369";
        break;
      case 3:
        index.value = "kaiwen";
        break;
    }
  })

  Bot_submin.disabled = true;
  Label_input.checked = false;
  Bot_submin.value='条件未达到无法注册';
  Html.addEventListener('click',() => {
    let email = Text_input[0].value;
    if(!(reg.test(email)) || Text_input[1].value.length <=6 || Text_input[1].value.length >=16 || Text_input[2].value.length <=6 || Text_input[2].value.length >=16 || Text_input[3].value.length <=3 || Text_input[3].value.length >=10 || !(Label_input.checked)){
      Bot_submin.disabled=true;
      Bot_submin.value='条件未达到无法注册';
      Bot_submin.style.background = 'red';
    }else {
      Bot_submin.disabled=false;
      Bot_submin.value='立即注册';
      Bot_submin.style.background='#3B78DD';
    }
  })

  Bot_submin.addEventListener('click',() => {
    Text_input.forEach((index,value) => {
      switch(value) {
        case 0:
          data.append("email",index.value);
          break;
        case 1:
          data.append("account",index.value);
          break;
        case 2:
          data.append("password",index.value);
          break;
        case 3:
          data.append("username",index.value);
          break;
      }
    })

    axios.post('http://localhost:8080/register/write',data).then((ret) => {
      if (ret.data[0]) {
        console.log('注册中');
      }else {
        ret.data[1].forEach((index) => {
          switch(index) {
            case 0:
              alert('邮箱已被注册');
              break;
            case 1:
              alert('账号已被注册');
              break;
            case 2:
              alert('用户名已被注册');
              break;
          }
        })
      }
    })
    
  })

})