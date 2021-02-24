window.onload = function () {
// ------------------------------------------------------------------------
  let Unique_div = document.querySelector('#unique');
  let Unique_p = document.querySelector('#unique').querySelector('p');
  let Comm_input = document.querySelector('.comment_input');

  function Judge_Login() {
    if (localStorage.getItem("user")) {
      Unique_div.style.display = 'inline-block';
      Comm_input.style.display = 'inline-block';
      Unique_p.innerText = localStorage.getItem("user");
    } else {
      Unique_div.style.display = 'none';
      Comm_input.style.display = 'none';
    }
  }
  
  Judge_Login();
// ------------------------------------------------------------------------
  let Comm_ul = document.querySelector('.comment_ul');
  let Tem_li = Comm_ul.querySelector('.temporary');

  if (Comm_ul.childNodes.length === 2) {
    Tem_li.classList.add("block");
  }

// ------------------------------------------------------------------------
}

