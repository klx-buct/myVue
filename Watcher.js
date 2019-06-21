class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }

  update() {
    this.run();
  }

  run() {
    let oldValue = this.value;
    if(oldValue !== this.vm[this.exp]) {
      this.value = this.vm[this.exp];

      this.cb(this.value);
    }
  }

  get() {
    Dep.target = this;
    let value = this.vm[this.exp];
    Dep.target = null;
    return value;
  }
}