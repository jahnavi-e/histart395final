let text = document.getElementById('text')
let input = ""
let help = document.getElementById('help')
let stopwords = ["to", "in", "i", "me", "a", "an", "the", "from", "on", "at", "by", "with", "up", "hi", "hello", "wassup"];

let inventory = [];
let textNode = 1

function startGame() {
  inventory = [];
  textNode = 1;
  showTextNode(textNode);
};

const handleSubmit = function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    input = document.getElementById("userInput").value.toLowerCase();
    help.innerText = "";
    selectOption(input, textNode);
    document.getElementById("userInput").value = "";
  }
};

function showTextNode(textNodeIndex) {
  textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  text.innerText = textNode.text;
  //TODO: Display correct picture
  //TODO: Display current inventory
  console.log(inventory)
  let invList = document.getElementById("inv-list");
  invList.innerHTML = '';
  let ul = document.createElement("ul");
  inventory.forEach(function(item) {
    if (item.trim() !== '') {
      let li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    }
  });
  invList.appendChild(ul);
  document.getElementById("userInput").removeEventListener("keydown", handleSubmit);
  document.getElementById("userInput").addEventListener("keydown", handleSubmit);
};

function selectOption(input, textNode) {
  let origInput = input 
  input = input.split(' ');
  input = input.filter(word => !stopwords.includes(word));
  input = input.join(' ');
  option = textNode.options.find(option => option.text.toLowerCase() === input);
  if (option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
      return startGame();
    }
    if (option.setInv) {
      inventory.push(option.setInv);
    }
    showTextNode(nextTextNodeId);
  }
  else {
    if (input === 'help') {
      console.log("TODO help") //TODO
    }
    else if (input === 'restart') {
      startGame();
    }
    else {
      help.innerText = "You can't '" + origInput + "'.";
    }
  }
};

const textNodes = [
  {
    id: 1,
    text: "You wake up in a dark cave with no memory of your surroundings and current predicament. You see an object on the ground near you. You can also just barely make out a light to the East.",
    options: [
      {
        text: 'Sample',
        setInv: "haveObject",
        nextText: 0
      },
      {
        text: 'Go east',
        nextText: 2
      },
      {
        text: 'Go light',
        nextText: 2
      },
      {
        text: 'East',
        nextText: 2
      },
      {
        text: 'E',
        nextText: 2
      },
      {
        text: 'Pick object',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Take object',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Get object',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Examine object',
        nextText: 4
      },
      {
        text: 'Exa object',
        nextText: 4
      },
      {
        text: 'Look object',
        nextText: 4
      }
    ]
  },
  {
    id: 2,
    text: "You are standing in front of the cave's exit. Sitting on the ground next to the cave exit is a goblin fighter holing up a torch. The goblin looks like he's seen better days.",
    options: [
      {
        text: 'Sample',
        //requiredInv: (currentInv) => currentInv.hasObject, IDK IF THIS WORKS
        //setInv: { hasObject: false, newObject: true }, DOES NOT WORK
        nextText: 0
      },
      {
        text: 'Talk goblin',
        nextText: 5
      },
      {
        text: 'Talk',
        nextText: 5
      },
      {
        text: 'Speak goblin',
        nextText: 5
      },
      {
        text: 'Speak',
        nextText: 5
      },
      {
        text: 'Say',
        nextText: 5
      },
      {
        text: 'Take torch',
        nextText: 6
      },
      {
        text: 'Fight goblin',
        nextText: 7
      },
      {
        text: 'Attack goblin',
        nextText: 7
      },
      {
        text: 'Kill goblin',
        nextText: 7
      },
      {
        text: 'Punch goblin',
        nextText: 7
      },
      {
        text: 'N',
        nextText: 8
      },
      {
        text: 'North',
        nextText: 8
      },
      {
        text: 'Leave cave',
        nextText: 8
      },
      {
        text: 'Exit cave',
        nextText: 8
      },
      {
        text: 'Go forward',
        nextText: 8
      },
      {
        text: 'Forward',
        nextText: 8
      }
    ]
  },
  {
    id: 3,
    text: "You now have a d20 dice.",
    options: [
      {
        text: 'Go east',
        nextText: 2
      },
      {
        text: 'Go light',
        nextText: 2
      },
      {
        text: 'East',
        nextText: 2
      },
      {
        text: 'E',
        nextText: 2
      }
    ]
  },
  {
    id: 4,
    text: "The object on the ground is a d20 dice.",
    options: [
      {
        text: 'Go east',
        nextText: 2
      },
      {
        text: 'Go light',
        nextText: 2
      },
      {
        text: 'East',
        nextText: 2
      },
      {
        text: 'E',
        nextText: 2
      },
      {
        text: 'Pick object',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Take object',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Get object',
        setInv: "d20",
        nextText: 3
      }
    ]
  },
  {
    id: 5,
    text: "The goblin doesn't want to talk to you.",
    options: [
      {
        text: 'Take torch',
        nextText: 6
      },
      {
        text: 'Fight goblin',
        nextText: 7
      },
      {
        text: 'Attack goblin',
        nextText: 7
      },
      {
        text: 'Kill goblin',
        nextText: 7
      },
      {
        text: 'Punch goblin',
        nextText: 7
      },
      {
        text: 'N',
        nextText: 8
      },
      {
        text: 'North',
        nextText: 8
      },
      {
        text: 'Leave cave',
        nextText: 8
      },
      {
        text: 'Exit cave',
        nextText: 8
      },
      {
        text: 'Go forward',
        nextText: 8
      },
      {
        text: 'Forward',
        nextText: 8
      }
    ]
  },
  {
    id: 6,
    text: "The goblin really doesn't appreciate you taking his things without asking. In fact, it makes him really mad and he swings the torch, hitting you in the face. You end up succumbing to your injuries.\nType 'Restart' to play again.",
    options: [

    ]
  },
  {
    id: 7,
    text: "You probably shouldn't be fighting monsters unarmed. The goblin, despite looking tired, kills you immediately.\nType 'Restart' to play again.",
    options: [

    ]
  },
  {
    id: 8,
    text: "Forest",
    options: [
      {
        text: 'TODO',
        nextText: -1
      }
    ]
  },
  {
    id: 99,
    text: 'Sample.',
    options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  }
]

startGame()