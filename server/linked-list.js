const { User } = require('./models');

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  // Insertion
  insert(nthPosition, value) {
    if (nthPosition < 0 || nthPosition > this.length) {
      throw new Error('nthPosition error');
    }
    const newNode = { value };
    if (nthPosition === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const node = this._find(nthPosition - 1);
      newNode.next = node.next;
      node.next = newNode;
    }
    this.length++;
  }
  _find(nthPosition) {
    let node = this.head;
    for (let i = 0; i < nthPosition; i++) {
      node = node.next;
    }
    return node;
  }
  // Retrieval
  get(nthPosition) {
    if (nthPosition < 0 || nthPosition >= this.length) {
      throw new Error('Index error');
    }
    return this._find(nthPosition).value;
  }
  // Removal
  remove(nthPosition) {
    if (nthPosition < 0 || nthPosition >= this.length) {
      throw new Error('Index error');
    }
    if (nthPosition === 0) {
      this.head = this.head.next;
    } else {
      const node = this._find(nthPosition - 1);
      node.next = node.next.next;
    }
    this.length--;
  }
}

const list = new LinkedList();

const convertArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    list.insert(i, array[i]);
  }
  return list.get(0);
};
// ** refactor to convert once on login, once on logout **

const algorithm = (question, userAnswer, correctAnswer, score, wordsArray) => {
  convertArray(wordsArray);
  let value = list.get(0);
  if (userAnswer === correctAnswer) {
    // call end method to get correct nth position
    let node = list.head;
    let counter = 0;
    while (node !== null) {
      counter++;
      node = node.next;
    }
    const position = counter;
    // call insert method with value/position from last two steps
    list.insert(position, value);
    // call remove to remove head
    list.remove(0);
    // call question 0 again
    console.log('current list!', list)
    score = score + 1;
    console.log('user score after getting question right', score)
    return {question: list.get(0), userScore: score, list: list};
  }
  // if (userAnswer !== correctAnswer)
  else {
    console.log('got here --->')
    console.log('user score after getting question wrong', score)
    list.insert(2, list.get(0))
    list.remove(0)
    return {question: list.get(0), userScore: score, list: list};
  }
};


const convertList = () => {
  let toArray = [];
  let node = list.head;
  while (node.next) {
    toArray.push(node.value);
      node = node.next;
  }
  return toArray;
}

//func algorithm (ques, ans) {if submitted val for ques1 = ans1, then node = node.next  return node}
//SCORE, WORDMATCH, NODEHEAD, QUESTION_ID STORED (is this question repeated)
// if correct/true, score++    move to next question
//if wrong,false, this word becomes node.next.next,   move to next question
// array = [wrong answers] [correct answers]

// console.log(
//   'algorithm: ',
//   algorithm('question', 'right', 'right', 0, testArray)
// );

module.exports = { algorithm, convertArray, convertList };

//in server, need -> const { Algorithm } = require('./Algorithm'); and const list = new LinkedList();
