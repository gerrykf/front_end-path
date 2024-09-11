(function () {
  const doms = {
    form: $('form'),
    txtLoginId: $('#txtLoginId'),
    txtLoginIdErr: $('#txtLoginId~.err'),
    txtLoginPwd: $('#txtLoginPwd'),
    txtLoginPwdErr: $('#txtLoginPwd~.err'),
  };

  const validators = [
    new FieldValidator(doms.txtLoginId, doms.txtLoginIdErr, async (val) => {
      val = val.trim();
      if (!val) {
        return '请填写账号';
      }
    }),
    new FieldValidator(doms.txtLoginPwd, doms.txtLoginPwdErr, (val) => {
      if (!val) {
        return '请填写密码';
      }
    }),
  ];

  doms.form.onsubmit = async (e) => {
    e.preventDefault();
    const result = await FieldValidator.validate(validators);
    if (!result) {
      return;
    }
    const formData = new FormData(doms.form);
    const info = Object.fromEntries(formData.entries());

    const resp = await fetch(`${BASE_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(info),
    });
    const respData = await resp.json();
    if (respData.code) {
      doms.txtLoginIdErr.innerText = respData.msg;
    } else {
      const token = resp.headers.get('authorization');
      localStorage.setItem('token', token);
      location.href = './index.html';
    }
  };
})();
