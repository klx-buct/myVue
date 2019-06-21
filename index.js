class MyVue {
  constructor(option) {
    this.data = option.data;
    this.el = option.el;

    new Observer(this.data);
    new Compile(this, this.el);
  }
}