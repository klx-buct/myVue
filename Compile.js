class Compile {
  constructor(vm, el) {
    this.vm = vm;
    this.el = el;
    let root = document.querySelector("#root");
    this.compile(root);
  }

  compile(root) {
    let childNodes = root.childNodes;
    let reg = /\{\{(.*)\}\}/;
    [...childNodes].forEach((node) => {
      let text = node.textContent;
      if(node.nodeType === 3 && reg.test(text)) {
          let exp = reg.exec(text)[1];
          this.addWatcher(exp, node);
          this.updateText(node, this.vm.data[exp]);
      }
      if(node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    })
  }

  addWatcher(exp, node) {
    new Watcher(this.vm, exp, (value) => this.updateText(node, value));
  }

  updateText(node, value) {
    node.textContent = value;
  }
}