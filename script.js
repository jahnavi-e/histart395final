let text = document.getElementById('text')
let input = ""
let help = document.getElementById('help')
let stopwords = ["to", "in", "i", "me", "a", "an", "the", "from", "on", "at", "by", "with", "up", "hi", "hello", "you", "your", "my", "mine"];

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

function showOption(option) {
  if (option) {
    return option.requiredInv == null || option.requiredInv.every(item => inventory.includes(item));
  }
  return false;
};

function selectOption(input, textNode) {
  let origInput = input 
  input = input.split(' ');
  input = input.filter(word => !stopwords.includes(word));
  input = input.join(' ');
  option = textNode.options.filter(option => option.text.toLowerCase() === input);
  if (option.length === 1) {
    if (showOption(option[0])) {
      option = option[0];
    }
    else {
      option = null;
    }
  }
  else {
    if (showOption(option[0])) {
      option = option[0];
    }
    else {
      option = option[1];
    }
  }
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
      help.innerText = "Try typing what you want to do in the [verb] [noun] or the [verb] format. Navigate your surroundings by using the cardinal directions of “north,” “south,” “east,” or “west” when possible.";
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
        text: 'Samples',
        requiredInv: ["d20"],
        nextText: 5
      },
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
    text: "You are standing in front of the cave's exit. Sitting on the ground next to the cave exit is a goblin fighter holding up a torch. The goblin looks like he's seen better days.",
    options: [
      {
        text: 'Sample',
        requiredInv: ["d20"],
        nextText: 1
      },
      {
        text: 'Sample',
        nextText: 5
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
        text: 'Go north',
        nextText: 8
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
      },
      {
        text: 'Pick d20 dice',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Take d20 dice',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Get d20 dice',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Pick dice',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Take dice',
        setInv: "d20",
        nextText: 3
      },
      {
        text: 'Get dice',
        setInv: "d20",
        nextText: 3
      }
    ]
  },
  {
    id: 5,
    text: "The goblin doesn't want to talk to you. Regardless, it's not like you can speak goblin.",
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
        text: 'Go north',
        nextText: 8
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
    text: "You find yourself standing in an overgrown forest. Sunlight flicks through the gaps in the trees overhead. Unfortunately, as you made your exit you accidentally kicked a loose rock and the entrance to the cave crashed in trapping the poor goblin inside and rendering it inaccessible. Maybe you should feel bad.",
    options: [
      {
        text: 'Go north',
        nextText: 12
      },
      {
        text: 'North',
        nextText: 12
      },
      {
        text: 'N',
        nextText: 12
      },
      {
        text: 'Go east',
        nextText: 10
      },
      {
        text: 'East',
        nextText: 10
      },
      {
        text: 'E',
        nextText: 10
      },
      {
        text: 'Go south',
        nextText: 9
      },
      {
        text: 'South',
        nextText: 9
      },
      {
        text: 'S',
        nextText: 9
      },
      {
        text: 'Go west',
        nextText: 11
      },
      {
        text: 'West',
        nextText: 11
      },
      {
        text: 'W',
        nextText: 11
      }
    ]
  },
  {
    id: 9,
    text: "A large river flows in front of you. A fisherman sits at the riverbank and beside him his catch. The fish seems to have been sitting out there for a while creating a, for lack of a better word, fishy smell.",
    options: [
      {
        text: 'Go north',
        nextText: 15
      },
      {
        text: 'North',
        nextText: 15
      },
      {
        text: 'N',
        nextText: 15
      },
      {
        text: 'Talk fisherman',
        requiredInv: ["fish"],
        nextText: 13
      },
      {
        text: 'Speak fisherman',
        requiredInv: ["fish"],
        nextText: 13
      },
      {
        text: 'Talk',
        requiredInv: ["fish"],
        nextText: 13
      },
      {
        text: 'Speak',
        requiredInv: ["fish"],
        nextText: 13
      },
      {
        text: 'Say',
        requiredInv: ["fish"],
        nextText: 13
      },
      {
        text: 'Sample',
        nextText: 5
      },
      {
        text: 'Talk fisherman',
        nextText: 14
      },
      {
        text: 'Speak fisherman',
        nextText: 14
      },
      {
        text: 'Talk',
        nextText: 14
      },
      {
        text: 'Speak',
        nextText: 14
      },
      {
        text: 'Say',
        nextText: 14
      }
    ]
  },
  {
    id: 10,
    text: "You find yourself in a forest clearing. The sun shines brightly overhead and you can hear the chirping of birds. You spot the perfect spot to lie down and soak in the sun.",
    options: [
      {
        text: 'Take nap',
        nextText: 16
      },
      {
        text: 'Nap',
        nextText: 16
      },
      {
        text: 'Lie down',
        nextText: 16
      },
      {
        text: 'Rest',
        nextText: 16
      },
      {
        text: 'Sleep',
        nextText: 16
      },
      {
        text: 'Go sleep',
        nextText: 16
      },
      {
        text: 'Go north',
        nextText: 17
      },
      {
        text: 'North',
        nextText: 17
      },
      {
        text: 'N',
        nextText: 17
      },
      {
        text: 'Go south',
        requiredInv: ["sword"],
        nextText: 26
      },
      {
        text: 'South',
        requiredInv: ["sword"],
        nextText: 26
      },
      {
        text: 'S',
        requiredInv: ["sword"],
        nextText: 26
      },
      {
        text: 'Go south',
        nextText: 18
      },
      {
        text: 'South',
        nextText: 18
      },
      {
        text: 'S',
        nextText: 18
      },
      {
        text: 'Go west',
        nextText: 15
      },
      {
        text: 'West',
        nextText: 15
      },
      {
        text: 'W',
        nextText: 15
      }
    ]
  },
  {
    id: 11,
    text: "You come across a decrepit hut in the middle of the woods. The hut emits an ominous aura.",
    options: [
      {
        text: 'Go inside',
        requiredInv: ["fish"],
        setInv: "cloak",
        nextText: 34
      },
      {
        text: 'Enter hut',
        requiredInv: ["fish"],
        setInv: "cloak",
        nextText: 34
      },
      {
        text: 'Open door',
        requiredInv: ["fish"],
        setInv: "cloak",
        nextText: 34
      },
      {
        text: 'Enter',
        requiredInv: ["fish"],
        setInv: "cloak",
        nextText: 34
      },
      {
        text: 'Go inside',
        nextText: 19
      },
      {
        text: 'Enter hut',
        nextText: 19
      },
      {
        text: 'Open door',
        nextText: 19
      },
      {
        text: 'Enter',
        nextText: 19
      },
      {
        text: 'Go east',
        nextText: 15
      },
      {
        text: 'East',
        nextText: 15
      },
      {
        text: 'E',
        nextText: 15
      }
    ]
  },
  {
    id: 12,
    text: "You are standing in front of the ruins of a once-great shrine. All that remains at the center of the crumbling is a mossy throne. It beckons you to sit on it.",
    options: [
      {
        text: 'Sit throne',
        requiredInv: ["sword", "cloak", "shield"],
        nextText: 21
      },
      {
        text: 'Sit',
        requiredInv: ["sword", "cloak", "shield"],
        nextText: 21
      },
      {
        text: 'Go throne',
        requiredInv: ["sword", "cloak", "shield"],
        nextText: 21
      },
      {
        text: 'Sit throne',
        nextText: 20
      },
      {
        text: 'Sit',
        nextText: 20
      },
      {
        text: 'Go throne',
        nextText: 20
      },
      {
        text: 'Go south',
        nextText: 15
      },
      {
        text: 'South',
        nextText: 15
      },
      {
        text: 'S',
        nextText: 15
      },
      {
        text: 'Go east',
        nextText: 17
      },
      {
        text: 'East',
        nextText: 17
      },
      {
        text: 'E',
        nextText: 17
      }
    ]
  },
  {
    id: 13,
    text: "The fisherman has nothing more to say to you.",
    options: [
      {
        text: 'Go north',
        nextText: 15
      },
      {
        text: 'North',
        nextText: 15
      },
      {
        text: 'N',
        nextText: 15
      }
    ]
  },
  {
    id: 14,
    text: "The fisherman is glad to have someone to talk to. He gives you one of the fish he caught as a token of appreciation for listening to him ramble on. While it would be rude to decline, the fish smells really bad.\n 'Accept' or 'Decline' the fish.",
    options: [
      {
        text: 'Accept',
        setInv: "fish",
        nextText: 36
      },
      {
        text: 'Decline',
        nextText: 35
      },
      {
        text: 'Go north',
        nextText: 15
      },
      {
        text: 'North',
        nextText: 15
      },
      {
        text: 'N',
        nextText: 15
      }
    ]
  },
  {
    id: 15,
    text: "You are standing in an overgrown forest near the blocked cave entrance. Sunlight flicks through the gaps in the trees overhead.",
    options: [
      {
        text: 'Go north',
        nextText: 12
      },
      {
        text: 'North',
        nextText: 12
      },
      {
        text: 'N',
        nextText: 12
      },
      {
        text: 'Go east',
        nextText: 10
      },
      {
        text: 'East',
        nextText: 10
      },
      {
        text: 'E',
        nextText: 10
      },
      {
        text: 'Go south',
        nextText: 9
      },
      {
        text: 'South',
        nextText: 9
      },
      {
        text: 'S',
        nextText: 9
      },
      {
        text: 'Go west',
        nextText: 11
      },
      {
        text: 'West',
        nextText: 11
      },
      {
        text: 'W',
        nextText: 11
      }
    ]
  },
  {
    id: 16,
    text: "You feel well-rested and at peace.",
    options: [
      {
        text: 'Go north',
        nextText: 17
      },
      {
        text: 'North',
        nextText: 17
      },
      {
        text: 'N',
        nextText: 17
      },
      {
        text: 'Go south',
        nextText: 18
      },
      {
        text: 'South',
        nextText: 18
      },
      {
        text: 'S',
        nextText: 18
      },
      {
        text: 'Go west',
        nextText: 15
      },
      {
        text: 'West',
        nextText: 15
      },
      {
        text: 'W',
        nextText: 15
      }
    ]
  },
  {
    id: 17,
    text: "You are standing in front of a small tavern. It doesn't look too busy inside.",
    options: [
      {
        text: 'Go inside',
        requiredInv: ["shield"],
        nextText: 27
      },
      {
        text: 'Enter',
        requiredInv: ["shield"],
        nextText: 27
      },
      {
        text: 'Enter tavern',
        requiredInv: ["shield"],
        nextText: 27
      },
      {
        text: 'Open door',
        requiredInv: ["shield"],
        nextText: 27
      },
      {
        text: 'Go inside',
        nextText: 28
      },
      {
        text: 'Enter',
        nextText: 28
      },
      {
        text: 'Enter tavern',
        nextText: 28
      },
      {
        text: 'Open door',
        nextText: 28
      },
      {
        text: 'Go south',
        nextText: 10
      },
      {
        text: 'South',
        nextText: 10
      },
      {
        text: 'S',
        nextText: 10
      }
    ]
  },
  {
    id: 18,
    text: "You stumble upon a campsite occupied by familiar faces. It's your old adventuring party. Having thought you were dead, they are ecstatic to see you alive and well. While you are also happy to see them again you find yourself questioning whether you want to rejoin them or leave to forge your own path.",
    options: [
      {
        text: 'Rejoin',
        nextText: 24
      },
      {
        text: 'Rejoin them',
        nextText: 24
      },
      {
        text: 'Rejoin party',
        nextText: 24
      },
      {
        text: 'Rejoin adventuring party',
        nextText: 24
      },
      {
        text: 'Rejoin team',
        nextText: 24
      },
      {
        text: 'Join',
        nextText: 24
      },
      {
        text: 'Join party',
        nextText: 24
      },
      {
        text: 'Join adventuring party',
        nextText: 24
      },
      {
        text: 'Join team',
        nextText: 24
      },
      {
        text: 'Join them',
        nextText: 24
      },
      {
        text: 'Leave to forge your own path',
        setInv: "sword",
        nextText: 25
      },
      {
        text: 'Leave',
        setInv: "sword",
        nextText: 25
      },
      {
        text: 'Forge own path',
        setInv: "sword",
        nextText: 25
      },
      {
        text: 'Leave them',
        setInv: "sword",
        nextText: 25
      },
      {
        text: 'Leave party',
        setInv: "sword",
        nextText: 25
      },
      {
        text: 'Leave adventuring party',
        setInv: "sword",
        nextText: 25
      },
      {
        text: 'Leave team',
        setInv: "sword",
        nextText: 25
      },
      {
        text: 'Go north',
        nextText: 10
      },
      {
        text: 'North',
        nextText: 10
      },
      {
        text: 'N',
        nextText: 10
      }
    ]
  },
  {
    id: 19,
    text: "A haggard old witch is in the middle of cooking up a potion. She doesn't appreciate the intrusion and lunges at you. You succumb to her spell.\nType 'Restart' to play again.",
    options: [
      
    ]
  },
  {
    id: 20,
    text: "Nothing happens.",
    options: [
      {
        text: 'Go south',
        nextText: 15
      },
      {
        text: 'South',
        nextText: 15
      },
      {
        text: 'S',
        nextText: 15
      },
      {
        text: 'Go east',
        nextText: 17
      },
      {
        text: 'East',
        nextText: 17
      },
      {
        text: 'E',
        nextText: 17
      },
      {
        text: 'Stand',
        nextText: 12
      },
      {
        text: 'Stand up',
        nextText: 12
      },
      {
        text: 'Get throne',
        nextText: 12
      },
      {
        text: 'Get up',
        nextText: 12
      }
    ]
  },
  {
    id: 21,
    text: "Having collected all three relics of the forest you feel its power surge through you. You have gained the power of the forest and taken your place on the throne as its ruler.\nType 'Restart' to play again.",
    options: [
    
    ]
  },
  {
    id: 22,
    text: "You are standing outside the decrepit witch's hut. You feel a little safer knowing that the evil has been vanquished.",
    options: [
      {
        text: 'Go inside',
        nextText: 23
      },
      {
        text: 'Enter hut',
        nextText: 23
      },
      {
        text: 'Open door',
        nextText: 23
      },
      {
        text: 'Enter',
        nextText: 23
      },
      {
        text: 'Go east',
        nextText: 15
      },
      {
        text: 'East',
        nextText: 15
      },
      {
        text: 'E',
        nextText: 15
      }
    ]
  },
  {
    id: 23,
    text: "You are standing inside the witch's hut.",
    options: [
      {
        text: 'Leave',
        nextText: 22
      },
      {
        text: 'Exit',
        nextText: 22
      },
      {
        text: 'Go outside',
        nextText: 22
      }
    ]
  },
  {
    id: 24,
    text: "You rejoin your adventuring party and end the day by reminiscing on your past adventures. You feel safe and happy ending the day surrounded by your friends and look forward to a new adventure tomorrow. \nType 'Restart' to play again.",
    options: [
      
    ]
  },
  {
    id: 25,
    text: "Your adventuring party is sad to see you go. They tell you they will cherish your time together and wish you the best on your journey. As a final token of goodwill, they give you the sword of the forest. It's very rusty and won't do much damage.",
    options: [
      {
        text: 'Go north',
        nextText: 10
      },
      {
        text: 'North',
        nextText: 10
      },
      {
        text: 'N',
        nextText: 10
      }
    ]
  },
  {
    id: 26,
    text: "Your old friends have packed up their campsite and left. All that remains are the embers from their fire.",
    options: [
      {
        text: 'Go north',
        nextText: 10
      },
      {
        text: 'North',
        nextText: 10
      },
      {
        text: 'N',
        nextText: 10
      }
    ]
  },
  {
    id: 27,
    text: "The tavern is closed for the day and you cannot enter anymore.",
    options: [
      {
        text: 'Go south',
        nextText: 10
      },
      {
        text: 'South',
        nextText: 10
      },
      {
        text: 'S',
        nextText: 10
      }
    ]
  },
  {
    id: 28,
    text: "You are standing inside a rustic tavern. It's empty except for a bored-looking bartender. There is a cool-looking shield lying in a corner.",
    options: [
      {
        text: 'Pick shield',
        setInv: "shield",
        nextText: 31
      },
      {
        text: 'Take shield',
        setInv: "shield",
        nextText: 31
      },
      {
        text: 'Get shield',
        setInv: "shield",
        nextText: 31
      },
      {
        text: 'Talk bartender',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Speak bartender',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Talk',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Speak',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Say',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Talk bartender',
        nextText: 30
      },
      {
        text: 'Speak bartender',
        nextText: 30
      },
      {
        text: 'Talk',
        nextText: 30
      },
      {
        text: 'Speak',
        nextText: 30
      },
      {
        text: 'Say',
        nextText: 30
      },
      {
        text: 'Leave',
        nextText: 17
      },
      {
        text: 'Leave tavern',
        nextText: 17
      },
      {
        text: 'Exit',
        nextText: 17
      },
      {
        text: 'Exit tavern',
        nextText: 17
      },
      {
        text: 'Go outside',
        nextText: 17
      }
    ]
  },
  {
    id: 29,
    text: "The bartender can see that you're an expert adventurer right away. He has a quest he would like for you to help him with that'll have you exploring strange lands.\n You are welcome to 'Accept' or 'Decline' the quest.",
    options: [
      {
        text: 'Accept',
        nextText: 33
      },
      {
        text: 'Decline',
        nextText: 32
      }
    ]
  },
  {
    id: 30,
    text: "The bartender offers you a drink, and another, and another until you have passed out. When you wake up, you decide to retire from your life of adventuring and learn the craft of bartending. The bartender agrees to take you on as an apprentice.\nType 'Restart' to play again.",
    options: [
      
    ]
  },
  {
    id: 31,
    text: "You take the shield.",
    options: [
      {
        text: 'Talk bartender',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Speak bartender',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Talk',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Speak',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Say',
        requiredInv: ["d20"],
        nextText: 29
      },
      {
        text: 'Talk bartender',
        nextText: 30
      },
      {
        text: 'Speak bartender',
        nextText: 30
      },
      {
        text: 'Talk',
        nextText: 30
      },
      {
        text: 'Speak',
        nextText: 30
      },
      {
        text: 'Say',
        nextText: 30
      },
      {
        text: 'Leave',
        nextText: 17
      },
      {
        text: 'Leave tavern',
        nextText: 17
      },
      {
        text: 'Exit',
        nextText: 17
      },
      {
        text: 'Exit tavern',
        nextText: 17
      },
      {
        text: 'Go outside',
        nextText: 17
      }
    ]
  },
  {
    id: 32,
    text: "The bartender is disappointed you have turned down his offer. You feel bad, but explain that you have decided to retire from your life of adventuring and learn the craft of bartending. The bartender agrees to take you on as an apprentice.\nType 'Restart' to play again.",
    options: [
      
    ]
  },
  {
    id: 33,
    text: "The bartender offers you a drink and somewhere to sleep for the night. You end your day excited at the prospect of going on a new adventure in a faraway land.\nType 'Restart' to play again.",
    options: [
      
    ]
  },
  {
    id: 34,
    text: "A haggard old witch is in the middle of cooking up a potion. She doesn't appreciate the intrusion and lunges at you. However, the spell of the fish you have been carrying around with you is enough and so overpowering that her attack is in vain. She succumbs to the smell leaving behind her cloak. You take the cloak.",
    options: [
      {
        text: 'Leave',
        nextText: 22
      },
      {
        text: 'Leave hut',
        nextText: 22
      },
      {
        text: 'Exit',
        nextText: 22
      },
      {
        text: 'Exit hut',
        nextText: 22
      },
      {
        text: 'Go outside',
        nextText: 22
      }
    ]
  },
  {
    id: 35,
    text: "The fisherman is sad you won't take his fish. He hopes to one day catch a fish worthy of your approval.",
    options: [
      {
        text: 'Go north',
        nextText: 15
      },
      {
        text: 'North',
        nextText: 15
      },
      {
        text: 'N',
        nextText: 15
      }
    ]
  },
  {
    id: 36,
    text: "You are now the owner of a fish. However, you're not sure what you would use it for and it makes you reek slightly.",
    options: [
      {
        text: 'Go north',
        nextText: 15
      },
      {
        text: 'North',
        nextText: 15
      },
      {
        text: 'N',
        nextText: 15
      }
    ]
  }
]

startGame()