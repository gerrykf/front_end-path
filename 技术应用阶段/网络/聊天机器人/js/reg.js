(function () {
  const doms = {
    form: $('form'),
    txtLoginId: $('#txtLoginId'),
    txtLoginIdErr: $('#txtLoginId~.err'),
    txtNickname: $('#txtNickname'),
    txtNicknameErr: $('#txtNickname~.err'),
    txtLoginPwd: $('#txtLoginPwd'),
    txtLoginPwdErr: $('#txtLoginPwd~.err'),
    txtLoginPwdConfirm: $('#txtLoginPwdConfirm'),
    txtLoginPwdConfirmErr: $('#txtLoginPwdConfirm~.err'),
  };

  const validators = [
    new FieldValidator(doms.txtLoginId, doms.txtLoginIdErr, async (val) => {
      val = val.trim();
      if (!val) {
        return '请填写账号';
      }
      const resp = await fetch(
        `${BASE_URL}/api/user/exists?loginId=${val}`
      ).then((resp) => resp.json());
      if (resp.data) {
        return '账号已存在';
      }
    }),
    new FieldValidator(doms.txtNickname, doms.txtNicknameErr, (val) => {
      val = val.trim();
      if (!val) {
        return '请填写昵称';
      }
    }),
    new FieldValidator(doms.txtLoginPwd, doms.txtLoginPwdErr, (val) => {
      if (!val) {
        return '请填写密码';
      }
    }),
    new FieldValidator(
      doms.txtLoginPwdConfirm,
      doms.txtLoginPwdConfirmErr,
      (val) => {
        if (!val) {
          return '请确认密码';
        }
        if (val !== doms.txtLoginPwd.value) {
          return '两次密码不一致';
        }
      }
    ),
  ];

  doms.form.onsubmit = async (e) => {
    e.preventDefault();
    const result = await FieldValidator.validate(validators);
    if (!result) {
      return;
    }
    const formData = new FormData(doms.form);
    const info = Object.fromEntries(formData.entries());

    const resp = await fetch(`${BASE_URL}/api/user/reg`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(info),
    }).then((resp) => resp.json());
    if (resp.code) {
      doms.txtLoginIdErr.innerText = resp.msg;
    } else {
      location.href = './login.html';
    }
  };
})();
