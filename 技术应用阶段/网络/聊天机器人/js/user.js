class FieldValidator {
  constructor(inpDom, errDom, callback) {
    this.inpDom = inpDom;
    this.errDom = errDom;
    this.callback = callback;
    this.inpDom.onblur = () => {
      this.validate();
    };
  }

  async validate() {
    const errMsg = await this.callback(this.inpDom.value);
    if (errMsg) {
      this.errDom.innerText = errMsg;
      return false;
    } else {
      this.errDom.innerText = '';
      return true;
    }
  }

  static async validate(validators) {
    const result = await Promise.all(
      validators.map((validator) => validator.validate())
    );
    return result.every((r) => r);
  }
}
