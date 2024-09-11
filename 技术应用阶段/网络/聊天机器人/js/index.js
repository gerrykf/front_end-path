(async function () {
  let user = null;
  const doms = {
    loginId: $('#loginId'),
    nickname: $('#nickname'),
    container: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    form: $('form'),
    close: $('.close'),
  };
  /**
   * 验证用户身份
   */
  async function getProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('你未登录，请先登录');
      location.href = './login.html';
      return;
    }
    resp = await fetch(`${BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
    user = resp.data;
    if (!user) {
      // 身份验证失败
      alert('你的登录已失效，请重新登录');
      location.href = './login.html';
      return;
    }
    return true;
  }

  if (!(await getProfile())) {
    return;
  }

  function setProfile() {
    doms.loginId.innerText = user.loginId;
    doms.nickname.innerText = user.nickname;
  }
  setProfile();

  function createChat(from, content, createdAt) {
    const div = document.createElement('div');
    div.className = 'chat-item';
    if (from) {
      div.classList.add('me');
    }
    const img = document.createElement('img');
    img.className = 'chat-avatar';
    img.src = from ? './asset/avatar.png' : './asset/robot-avatar.jpg';
    div.appendChild(img);

    const divContent = document.createElement('div');
    divContent.innerText = content;
    divContent.className = 'chat-content';
    div.appendChild(divContent);

    const divDate = document.createElement('div');
    divDate.className = 'chat-date';
    divDate.innerText = formatDate(new Date(createdAt));
    div.appendChild(divDate);
    return div;
  }

  function scrollBottom() {
    const ele = doms.container.lastElementChild;
    if (ele) {
      ele.scrollIntoView();
    }
  }
  /**
   * 格式化日期
   */
  function formatDate(date) {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  /**
   * 获取历史记录
   */
  async function getHistory() {
    const token = localStorage.getItem('token');
    const resp = await fetch(`${BASE_URL}/api/chat/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json());
    const chats = resp.data;
    const frag = document.createDocumentFragment();
    chats.forEach((chat) => {
      frag.appendChild(createChat(chat.from, chat.content, chat.createdAt));
    });
    doms.container.appendChild(frag);
    scrollBottom();
  }

  getHistory();

  // 消息发送
  doms.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const content = doms.txtMsg.value;
    if (!content) {
      return;
    }
    doms.container.appendChild(createChat(user.loginId, content, Date.now()));
    doms.txtMsg.value = '';
    scrollBottom();
    const resp = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    }).then((resp) => resp.json());
    if (resp.code !== 0) {
      console.log(resp.msg);
      return;
    }
    doms.container.appendChild(
      createChat(null, resp.data.content, resp.data.createdAt)
    );
    scrollBottom();
  });

  doms.close.onclick = () => {
    localStorage.removeItem('token');
    location.href = './login.html';
  };
})();
