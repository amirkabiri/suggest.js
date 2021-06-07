const fs = require('fs');

const words = {};
const file = fs.readFileSync('words_en.txt').toString().split('\n').slice(4);
let result = ``;

for(let i = 0; i < file.length; i ++){
let word = file[i].split(' ')[2];
  if(!word) continue;
  word = word.toLowerCase();

  console.log(result)
  break;

  if(!word.match(/^[a-z]+$/)) continue;
  if(words[word] !== undefined) continue;

  // result += word + '\n';

  words[word] = 1;
}

fs.writeFileSync('complete.txt')

process.exit();
//
// function editDistance(word1, word2){
//   const table = [];
//   const rows = word1.length + 1;
//   const cols = word2.length + 1;
//   for(let i = 0; i < rows; i ++){
//     table.push(Array.from({ length: cols }, () => 0));
//   }
//
//   for(let i = 0; i < cols; i ++){
//     table[0][i] = i;
//   }
//   for(let i = 0; i < rows; i ++){
//     table[i][0] = i;
//   }
//
//   for(let r = 1; r < rows; r ++){
//     for(let c = 1; c < cols; c ++){
//       table[r][c] = Math.min(
//         table[r - 1][c] + 1,
//         table[r][c - 1] + 1,
//         table[r - 1][c - 1] + (word1[r - 1] === word2[c - 1] ? 0 : 1)
//       );
//     }
//   }
//
//   // return table
//   const lastRow = table[table.length - 1];
//   return lastRow[lastRow.length - 1];
// }
//
// class Node{
//   constructor(value){
//     this.value = value;
//     this.children = {};
//   }
// }
//
// class BKTree{
//   insert(word){
//     if(this.tree === undefined){
//       this.tree = new Node(word)
//       return this;
//     }
//
//     let node = this.tree;
//     let distance, exists;
//
//     do{
//       distance = editDistance(word, node.value);
//       exists = node.children[distance] !== undefined;
//       if(exists) node = node.children[distance];
//     }while (exists);
//
//     node.children[distance] = new Node(word);
//     return this;
//   }
//
//   *find(word, tolerance = 2){
//     const stack = [];
//     if(this.tree !== undefined) {
//       stack.push(this.tree);
//     }
//
//     while(stack.length){
//       const node = stack.pop();
//       const distance = editDistance(node.value, word);
//
//       if(distance <= tolerance){
//         yield {
//           ...node,
//           distance
//         };
//       }
//
//       for(const d of Object.keys(node.children)){
//         if(d > distance - tolerance && d < distance + tolerance){
//           stack.push(node.children[d]);
//         }
//       }
//     }
//   }
// }
//
// function shuffleArray(array) {
//   for (var i = array.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
//   return array;
// }
//
//
//
// const fs = require('fs');
//
// function parseWords(){
//   const words = {};
//   const file = fs.readFileSync('words_en.txt').toString().split('\n').slice(4);
//
//   for(let i = 0; i < file.length; i ++){
//     let word = file[i].split(' ')[2];
//     if(!word) continue;
//     word = word.toLowerCase();
//     words[word] = i + 1;
//   }
//
//   return words;
// }
//
// const bkTree = new BKTree;
// const words = parseWords();
//
// // for(let word of Object.keys(words)){
// //   bkTree.insert(word);
// // }
// // fs.writeFileSync('bktree.json', JSON.stringify(bkTree.tree))
// bkTree.tree = JSON.parse(fs.readFileSync('bktree.json'))
//
// const target = 'fusk';
// let suggestedWords = [...bkTree.find(target, 2)]
//   .sort((a, b) => a.distance - b.distance);
// suggestedWords = suggestedWords.filter(word => word.distance === suggestedWords[0].distance)
//   .map(word => ({
//     ...word,
//     place: words[word.value]
//   }))
//   .sort((a, b) => a.place - b.place);
//   // .sort((a, b) => Math.abs(target.length - a.length) - Math.abs(target.length - b.place));
//
// for(let word of suggestedWords){
//   console.log(word.value, `(distance=${word.distance} place=${word.place})`)
//   // console.log(word.value, word.distance)
// }
//
// process.exit();
// // let wordsObj = JSON.parse(fs.readFileSync('words.json'));
// // let words = Object.keys(wordsObj)/*.sort((a, b) => a[1]  - b[1])*/
// // console.log(words)
// // process.exit()
//
// // for(let word of shuffleArray(words)){
// //   bkTree.insert(word);
// // }
//
// // console.log('BKTrie created');
// // console.log(JSON.stringify(bkTree.tree, null, 2))
//
//
// // const target = 'babe';
// // let suggestedWords = [...bkTree.find(target, 2)]
// //   .sort((a, b) => a.distance - b.distance);
// // suggestedWords = suggestedWords.filter(word => word.distance === suggestedWords[0].distance)
// //   .map(word => ({
// //     ...word,
// //     place: wordsObj[word.value]
// //   }))
// //   // .sort((a, b) => a.place - b.place);
// //   .sort((a, b) => Math.abs(target.length - a.length) - Math.abs(target.length - b.place));
// //
// // for(let word of suggestedWords){
// //   console.log(word.value, `(distance=${word.distance} place=${word.place})`)
// //   // console.log(word.value, word.distance)
// // }