const {User} = require('./models')

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
      const newNode = {
        value
      };
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

const testArray = [ 
    {question: 'BOOOM', answer: 'ans1'},
    {question: 'ques2', answer: 'ans2'},
    {question: 'ques3', answer: 'ans3'}
]

  const convertArray = (array) => {
    for (let i =0; i < array.length; i++) {
      list.insert(i, array[i])
    }
    return list
  }

  console.log('USERRRRRRRR', testArray)
  // console.log('LISTTTTTTT', convertArray(user.words))
  


  const algorithm = (question, userAnswer, correctAnswer, score, wordsArray=testArray) => {

    convertArray(wordsArray)
    console.log('LISTTTTTTT', list)

    if (userAnswer === correctAnswer) {
      // score ++
      // call get method to retrieve value
      // call end method to get correct nth position
      // call insert method with value/position from last two steps
      // call remove to remove head
      // call question 0 again
    }
    else {
      // call get for value
      // call insert with value and standard position
      // call remove to remove head
    }

    // list.insert(0, 'question1');

    // console.log('hello list', list)
    // console.log('this is the Q at the head o\' the node', question)
    // console.log('this is the A at the head o\' the node', answer)
    // console.log('this is the score', score)

  }

  //func algorithm (ques, ans) {if submitted val for ques1 = ans1, then node = node.next  return node}
  //SCORE, WORDMATCH, NODEHEAD, QUESTION_ID STORED (is this question repeated)
// if correct/true, score++    move to next question
//if wrong,false, this word becomes node.next.next,   move to next question
// array = [wrong answers] [correct answers]



module.exports = { algorithm };


//in server, need -> const { Algorithm } = require('./Algorithm'); and const list = new LinkedList();


