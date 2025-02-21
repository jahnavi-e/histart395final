let text = document.getElementById('text')
let input = ""
let help = document.getElementById('help')

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
};

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  text.innerText = textNode.text;
  //TODO: Display correct picture
  //TODO: Display current inventory
  document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      input = document.getElementById("userInput").value.toLowerCase();
      help.innerText = "";
      selectOption(input, textNode);
      document.getElementById("userInput").value = "";
    }
  });
};

function selectOption(input, textNode) {
  option = textNode.options.find(option => option.text.toLowerCase() === input);
  if (option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
      return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
  }
  else {
    if (input === 'help') {
      console.log("help") //TODO
    }
    else {
      help.innerText = "I don't understand " + input + ".";
    }
  }
}

const textNodes = [
  {
    id: 1,
    text: "You wake up in a dark cave with no memory of your surroundings and current predicament. You see an object on the ground near you. You can also just barely make out the cave's exit to the East.",
    options: [
      {
        text: 'DONOTHING',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'DOESNTDOANYTHING',
        nextText: 2
      }
    ]
  }
]

startGame()