/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    // Return new Array  by splitting a string into an array of substrings
    // Use of regular expressions - split it on spaces and linebreak char to make a list of words 
    let words = text.split(/[ \r\n]+/);
    // Filter the words and check if pass the test implemented
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }
  

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    
    // Return an Object of [key, value] for each iteration
    let chains = new Map()
    
    // Loop through of the filter's words 
    for(let i = 0; i < this.words.length; i += 1){
      // Actual word
      let word  = this.words[i]
      // Pass to the next word 
      let nextWord = this.words[i + 1] || null;

      // If the actual element exist -> It will get the specified element and will push to the nextWord
      if(chains.has(word)) chains.get(word).push(nextWord)
      // If the actual element does not exist -> It will add/update the actual word with the actual nextWord as a value 
      else chains.set(word, [nextWord])
    }
    //return the actual chain object
    this.chains = chains
  }

  /** Pick random choice from array */

  static choice(ar){
    return ar[Math.floor(Math.random() * ar.length)]
  }


  /** return random text from chains */

  makeText(numWords = 50) {
    
    //create new  array instance from the chains object with only the keys 
    let keys = Array.from(this.chains.keys())
    // choice random key from the keys array
    let key = MarkovMachine.choice(keys)
    let out = []

    // While the out length is less that the numWords and the key is not null
    //  the key will be add to the out arr
    while (out.length < numWords && key != null) {
      out.push(key)
      key = MarkovMachine.choice(this.chains.get(key))
    }

    return out.join(" ")
  }
}

module.exports = {
  MarkovMachine,
}


