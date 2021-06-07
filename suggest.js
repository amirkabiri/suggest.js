(function(root){
  function editDistance(word1, word2){
    const table = [];
    const rows = word1.length + 1;
    const cols = word2.length + 1;
    for(let i = 0; i < rows; i ++){
      table.push(Array.from({ length: cols }, () => 0));
    }

    for(let i = 0; i < cols; i ++){
      table[0][i] = i;
    }
    for(let i = 0; i < rows; i ++){
      table[i][0] = i;
    }

    for(let r = 1; r < rows; r ++){
      for(let c = 1; c < cols; c ++){
        table[r][c] = Math.min(
          table[r - 1][c] + 1,
          table[r][c - 1] + 1,
          table[r - 1][c - 1] + (word1[r - 1] === word2[c - 1] ? 0 : 1)
        );
      }
    }

    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
  }

  function Node(value){
    this.value = value;
    this.children = {};
  }

  function BKTree(){

  }
  BKTree.prototype.insert = function(word){
    if(this.tree === undefined){
      this.tree = new Node(word)
      return this;
    }

    let node = this.tree;
    let distance, exists;

    do{
      distance = editDistance(word, node.value);
      exists = node.children[distance] !== undefined;
      if(exists) node = node.children[distance];
    }while (exists);

    node.children[distance] = new Node(word);
    return this;
  }
  BKTree.prototype.find = function* (word, tolerance = 2){
    const stack = [];
    if(this.tree !== undefined) {
      stack.push(this.tree);
    }

    while(stack.length){
      const node = stack.pop();
      const distance = editDistance(node.value, word);

      if(distance <= tolerance){
        yield {
          ...node,
          distance
        };
      }

      for(const d of Object.keys(node.children)){
        if(d > distance - tolerance && d < distance + tolerance){
          stack.push(node.children[d]);
        }
      }
    }
  }

  function SuggestJS(){
    this.bkTree = new BKTree();
  }
  SuggestJS.prototype.loadWords = function(){
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const words = {};
        const file = xhr.response.split('\n').slice(4);

        for(let i = 0; i < file.length; i ++){
          let word = file[i].split(' ')[2];
          if(!word) continue;
          word = word.toLowerCase();

          if(words[word] !== undefined) continue;
          words[word] = 1;
          this.addWord(word);
        }

        resolve();
      }
      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.open('GET', 'https://asterics.github.io/predictionary/demo/words_en.txt');
      xhr.send();
    })
  }
  SuggestJS.prototype.addWord = function (word){
    this.bkTree.insert(word);
    return this;
  }
  SuggestJS.prototype.suggest = function(target){
    let words = [...this.bkTree.find(target, 10)]
      .sort((a, b) => a.distance - b.distance);
    return words
      .filter(word => word.distance === words[0].distance || word.distance === words[0].distance + 1)
      .map(word => word.value)
      .filter(word => word.length >= target.length)
      // .sort((a, b) => a.length - b.length)
      .slice(0, 10)
      .filter(word => word !== target);
  }

  if (typeof module === 'object' && module.exports) {
    module.exports = SuggestJS;
  } else {
    root.SuggestJS = SuggestJS;
  }
})(typeof self !== 'undefined' ? self : this);