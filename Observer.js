class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    })
  }
}

class Observer {
  constructor(data) {
    this.dep = new Dep();
    this.observerAll(data);
  }

  observer(data, key, value) {
    this.observerAll(value);
    Object.defineProperty(data, key, {
      configurable:true,
      enumerable:true,
      //第二处更改
      get: () => {
        //第三处修改
        if(Dep.target) {
          this.dep.addSub(Dep.target);
        }
        return value;
      },
      set: (newVal) => {
        value = newVal;
        this.dep.notify();
      }
    })
  }

  observerAll(data) {
    if(Object.prototype.toString.call(data) !== '[object Object]') return ;

    Object.keys(data).forEach((key) => {
      this.observer(data, key, data[key]);
    })
  }
}