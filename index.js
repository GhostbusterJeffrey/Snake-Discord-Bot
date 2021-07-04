// Discord Code //

const keep_alive = require('./keep_alive.js');

var board = [];
var originalPlayerId = 0;
var originalPlayerTag = "";

var quitVotes = 0;
var quitVotesIds = [];

var timesToRepeat = 0, timesToRepeat2 = 0, timesToRepeat3 = 0, timesToRepeat4 = 0, timesToRepeat5 = 0, timesToRepeat6 = 0, timesToRepeat7 = 0, timesToRepeat8 = 0, timesToRepeat9 = 0, timesToRepeat10 = 0, timesToRepeat11 = 0, timesToRepeat12 = 0, timesToRepeat13 = 0, timesToRepeat14 = 0, timesToRepeat15 = 0, timesToRepeat16 = 0, timesToRepeat17 = 0, timesToRepeat18 = 0, timesToRepeat19 = 0, timesToRepeat20 = 0, timesToRepeat21 = 0, timesToRepeat22 = 0, timesToRepeat23 = 0, timesToRepeat24 = 0, timesToRepeat25 = 0, timesToRepeat26 = 0, timesToRepeat27 = 0, timesToRepeat28 = 0, timesToRepeat29 = 0, timesToRepeat30 = 0, timesToRepeat31 = 0, timesToRepeat32 = 0, timesToRepeat33 = 0, timesToRepeat34 = 0, timesToRepeat35 = 0, timesToRepeat36 = 0;

function resetRepeaters() {
  timesToRepeat = 0;
  timesToRepeat2 = 0;
  timesToRepeat3 = 0;
  timesToRepeat4 = 0;
  timesToRepeat5 = 0;
  timesToRepeat6 = 0; 
  timesToRepeat7 = 0; 
  timesToRepeat8 = 0;
  timesToRepeat9 = 0;
  timesToRepeat10 = 0;
  timesToRepeat11 = 0;
  timesToRepeat12 = 0;
  timesToRepeat13 = 0;
  timesToRepeat14 = 0;
  timesToRepeat15 = 0;
  timesToRepeat16 = 0;
  timesToRepeat17 = 0;
  timesToRepeat18 = 0;
  timesToRepeat19 = 0;
  timesToRepeat20 = 0;
  timesToRepeat21 = 0;
  timesToRepeat22 = 0;
  timesToRepeat23 = 0;
  timesToRepeat24 = 0;
  timesToRepeat25 = 0;
  timesToRepeat26 = 0;
  timesToRepeat27 = 0;
  timesToRepeat28 = 0;
  timesToRepeat29 = 0;
  timesToRepeat30 = 0;
  timesToRepeat31 = 0;
  timesToRepeat32 = 0;
  timesToRepeat33 = 0;
  timesToRepeat34 = 0;
  timesToRepeat35 = 0;
  timesToRepeat36 = 0;
}

const Discord = require('discord.js');

var head = "<:head:828634070766321694>";
var apple = "<:myap:828634070661595178>";
var dead = "<:dead:828636075785453648>";
var body = "<:mygr:828633601859256371>";
var tile = "<:tile:828634070815866900>";
var border = "<:brdr:830403461987958786>";

var topBorder = [1, 2, 3, 4, 5, 6];
var leftBorder = [1, 7, 13, 19, 25, 31];
var rightBorder = [6, 12, 18, 24, 30, 36];
var bottomBorder = [31, 32, 33, 34, 35, 36];

var isPlaying = false;
var noGame = "There is currently no game in progress.";
var startPosition, applePosition, previousHeadPosition;
var score = 0;
var previousScore = 0;

const client = new Discord.Client();
const prefix = '%';

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

client.once('ready', () => {
	console.log('Logged in as ' + client.user.tag + '!');
  client.user.setActivity('Snake (%help)', { type: 'PLAYING' })
});

client.on('message', message => {
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.mentions.has(client.user.id)) {
      message.reply(`My command prefix is \`${prefix}\`. Use the help command to see a list of commands.`);
  };

  if (command === 'help') {
    message.channel.send("Here is a list of commands!\n\nUp: Moves up\nDown: Moves down\nLeft: Moves left\nRight: Moves right\nPlay: Starts the game\nQuit: Exits the game")
  }

  if (command === 'ping') {
    message.channel.send('Pong!');
  } else if (command === 'prefix') {
    message.reply(`you can either ping me or use \`${prefix}\` as my prefix.`);
  } else if (command === 'play') {
    if (isPlaying === false) {
      isPlaying = true;

      originalPlayerId = message.member.id;
      originalPlayerTag = message.member.tag;

      score = 0;
      previousSpriteOnTile = tile;
      for (i = 0; i < 36; i++) {
        board[i] = tile;
      }

      resetRepeaters();

      startPosition = Math.floor((Math.random() * 36) + 1);
      applePosition = generateFirstApple();

      board[startPosition - 1] = head;
      board[applePosition - 1] = apple;

       printBoard(message);

    } else {
      message.channel.send("A game is already in progress.");
    }
  } else if (command === 'up') {
    goUp(message);
  } else if (command === 'down') {
    goDown(message);
  } else if (command === 'left') {
    goLeft(message);
  } else if (command === 'right') {
    goRight(message);

  } else if (command === "quit") {
    if (isPlaying === true) {
      if(message.member.id === originalPlayerId) {
        isPlaying = false;
        message.channel.send("Game exited! Total Score: " + score.toString());
        quitVotes = 0;
        quitVotesIds = [0, 0, 0];
      } else if(quitVotes === 3) {
        isPlaying = false;
        message.channel.send("Game exited! Total Score: " + score.toString());
        quitVotes = 0;
        quitVotesIds = [0, 0, 0];
      } else {
        if(quitVotesIds.includes(message.member.id)) {
          message.reply("you have already voted to quit!");
        } else {
          quitVotes++;
          quitVotesIds[quitVotes - 1] = message.member.id;
          message.reply("vote to quit added! (" + quitVotes.toString() + "/3 votes)");
        }
      }
    } else {
      message.channel.send(noGame)
    }
  } else if (command === "updateboard") {
    board[previousHeadPosition - 1] = tile;
    printBoard(message);
  }
});

function goUp(message) {
  if (isPlaying === true) {
    if (topBorder.includes(startPosition)) {
      board[startPosition - 1] = dead;
      isPlaying = false;
      message.channel.send("You Lost! Total Score: " + score.toString());
         
    } else {
      previousHeadPosition = startPosition;
      startPosition -= 6;
      updateBody(message);
      board[startPosition - 1] = head;
         
    }
  } else {
    message.channel.send(noGame);
  }
}

function goDown(message) {
  if (isPlaying === true) {
    if (bottomBorder.includes(startPosition)) {
      board[startPosition - 1] = dead;
      isPlaying = false;
      message.channel.send("You Lost! Total Score: " + score.toString());
         
    } else {
      previousHeadPosition = startPosition;
      startPosition += 6;
      updateBody(message);
      board[startPosition - 1] = head;
         
    }
  } else {
    message.channel.send(noGame);
  }
}

function goLeft(message) {
  if (isPlaying === true) {
    if (leftBorder.includes(startPosition)) {
      board[startPosition - 1] = dead;
      isPlaying = false;
      message.channel.send("You Lost! Total Score: " + score.toString());
       
    } else {
      previousHeadPosition = startPosition;
      startPosition -= 1;
      updateBody(message);
      board[startPosition - 1] = head;
         
    }
  } else {
    message.channel.send(noGame);
  }
}

function goRight(message) {
  if (isPlaying === true) {
    if (rightBorder.includes(startPosition)) {
      board[startPosition - 1] = dead;
      isPlaying = false;
      message.channel.send("You Lost! Total Score: " + score.toString());
         
    } else {
      previousHeadPosition = startPosition;
      startPosition += 1;
      updateBody(message);
      board[startPosition - 1] = head;
         
    }
  } else {
    message.channel.send(noGame);
  }
}

function generateFirstApple() {
  applePosition = Math.floor((Math.random() * 36) + 1);
  if(applePosition === startPosition || board[applePosition - 1] === body) {
    generateFirstApple();
  } else {
    return applePosition;
  }
}

function ifTouchingApple(message) {
  if (applePosition === startPosition) {
    score++;
    generateFirstApple();
    board[applePosition - 1] = apple;
  } else {
    board[applePosition - 1] = apple;
  }
}

function printBoard(message) {
  const boardEmbed = new Discord.MessageEmbed()
  .setTitle("Snake on Discord")
  .setDescription(border + border + border + border + border + border + border + border + "\n" + border + board[0] + board[1] + board[2] + board[3] + board[4] + board[5] + border + "\n" + border + board[6] + board[7] + board[8] + board[9] + board[10] + board[11] + border + "\n" + border + board[12] + board[13] + board[14] + board[15] + board[16] + board[17] + border + "\n" + border + board[18] + board[19] + board[20] + board[21] + board[22] + board[23] + border + "\n" + border+ board[24] + board[25] + board[26] + board[27] + board[28] + board[29] + border + "\n" + border + board[30] + board[31] + board[32] + board[33] + board[34] + board[35] + border + "\n" + border + border + border + border + border + border + border + border + "\n\nUse the up, down, left and right commands to move")
  .setFooter('Current score: ' + score.toString());

  message.channel.send(boardEmbed);
}

function updateRepeaters() {
  if(!timesToRepeat === 0) {
    timesToRepeat++;
  }
  if(!timesToRepeat2 === 0) {
    timesToRepeat2++;
  }
  if(!timesToRepeat3 === 0) {
    timesToRepeat3++
  }
  if(!timesToRepeat4 === 0) {
    timesToRepeat4++;
  }
  if(!timesToRepeat5 === 0) {
    timesToRepeat5++;
  }
  if(!timesToRepeat6 === 0) {
    timesToRepeat6++;
  }
  if(!timesToRepeat7 === 0) {
    timesToRepeat7++
  }
  if(!timesToRepeat8 === 0) {
    timesToRepeat8++;
  }
  if(!timesToRepeat9 === 0) {
    timesToRepeat9++;
  }
  if(!timesToRepeat10 === 0) {
    timesToRepeat10++;
  }
  if(!timesToRepeat11 === 0) {
    timesToRepeat11++;
  }
  if(!timesToRepeat12 === 0) {
    timesToRepeat12++;
  }
  if(!timesToRepeat13 === 0) {
    timesToRepeat13++;
  }
  if(!timesToRepeat14 === 0) {
    timesToRepeat14++;
  }
  if(!timesToRepeat15 === 0) {
    timesToRepeat15++;
  }
  if(!timesToRepeat16 === 0) {
    timesToRepeat16++;
  }
  if(!timesToRepeat17 === 0) {
    timesToRepeat17++;
  }
  if(!timesToRepeat18 === 0) {
    timesToRepeat18++;
  }
  if(!timesToRepeat19 === 0) {
    timesToRepeat19++;
  }
  if(!timesToRepeat20 === 0) {
    timesToRepeat20++;
  }
  if(!timesToRepeat21 === 0) {
    timesToRepeat21++;
  }
  if(!timesToRepeat22 === 0) {
    timesToRepeat22++;
  }
  if(!timesToRepeat23 === 0) {
    timesToRepeat23++;
  }
  if(!timesToRepeat24 === 0) {
    timesToRepeat24++;
  }
  if(!timesToRepeat25 === 0) {
    timesToRepeat25++;
  }
  if(!timesToRepeat26 === 0) {
    timesToRepeat26++;
  }
  if(!timesToRepeat27 === 0) {
    timesToRepeat27++;
  }
  if(!timesToRepeat28 === 0) {
    timesToRepeat28++;
  }
  if(!timesToRepeat29 === 0) {
    timesToRepeat29++;
  }
  if(!timesToRepeat30 === 0) {
    timesToRepeat30++;
  }
  if(!timesToRepeat31 === 0) {
    timesToRepeat31++;
  }
  if(!timesToRepeat32 === 0) {
    timesToRepeat32++;
  }
  if(!timesToRepeat33 === 0) {
    timesToRepeat33++;
  }
  if(!timesToRepeat34 === 0) {
    timesToRepeat34++;
  }
  if(!timesToRepeat35 === 0) {
    timesToRepeat35++;
  }
  if(!timesToRepeat36 === 0) {
    timesToRepeat3++;
  }
}

function updateBody(message) {
  if(!previousScore === score) {
    previousScore = score;
    updateRepeaters();
  } else {
    previousScore = score;
  }
  if(score === 0) {
    board[previousHeadPosition - 1] = tile;
  } else {  
    tile1();
    tile2();
    tile3();
    tile4();
    tile5();
    tile6();
    tile7();
    tile8();
    tile9();
    tile10();
    tile11();
    tile12();
    tile13();
    tile14();
    tile15();
    tile16();
    tile17();
    tile18();
    tile19();
    tile20();
    tile21();
    tile22();
    tile23();
    tile24();
    tile25();
    tile26();
    tile27();
    tile28();
    tile29();
    tile30();
    tile31();
    tile32();
    tile33();
    tile34();
    tile35();
    tile36();
  }

  setTimeout(() => ifTouchingApple(message), 10);
  setTimeout(() => printBoard(message), 15);
}

function tile1() {
  timesToRepeat;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 1) {
    timesToRepeat = score + 1;
  } 

  if(timesToRepeat >= 1) {
    board[0] = body;
    timesToRepeat--;
  }
  if(timesToRepeat === 0) {
    board[0] = tile;
  }
}

function tile2() {
  timesToRepeat2;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 2) {
    timesToRepeat2 = score + 1;
  } 

  if(timesToRepeat2 >= 1) {
    board[1] = body;
    timesToRepeat2--;
  }
  if(timesToRepeat2 === 0) {
    board[1] = tile;
  }
}

function tile3() {
  timesToRepeat3;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 3) {
    timesToRepeat3 = score + 1;
  } 

  if(timesToRepeat3 >= 1) {
    board[2] = body;
    timesToRepeat3--;
  }
  if(timesToRepeat3 === 0) {
    board[2] = tile;
  }
}

function tile4() {
  timesToRepeat4;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 4) {
    timesToRepeat4 = score + 1;
  } 

  if(timesToRepeat4 >= 1) {
    board[3] = body;
    timesToRepeat4--;
  }
  if(timesToRepeat4 === 0) {
    board[3] = tile;
  }
}

function tile5() {
  timesToRepeat5;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 5) {
    timesToRepeat5 = score + 1;
  } 

  if(timesToRepeat5 >= 1) {
    board[4] = body;
    timesToRepeat5--;
  }
  if(timesToRepeat5 === 0) {
    board[4] = tile;
  }
}

function tile6() {
  timesToRepeat6;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 6) {
    timesToRepeat6 = score + 1;
  } 

  if(timesToRepeat6 >= 1) {
    board[5] = body;
    timesToRepeat6--;
  }
  if(timesToRepeat6 === 0) {
    board[5] = tile;
  }
}

function tile7() {
  timesToRepeat7;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 7) {
    timesToRepeat7 = score + 1;
  } 

  if(timesToRepeat7 >= 1) {
    board[6] = body;
    timesToRepeat7--;
  }
  if(timesToRepeat7 === 0) {
    board[6] = tile;
  }
}

function tile8() {
  timesToRepeat8;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 8) {
    timesToRepeat8 = score + 1;
  } 

  if(timesToRepeat8 >= 1) {
    board[7] = body;
    timesToRepeat8--;
  }
  if(timesToRepeat8 === 0) {
    board[7] = tile;
  }
}

function tile9() {
  timesToRepeat9;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 9) {
    timesToRepeat9 = score + 1;
  } 

  if(timesToRepeat9 >= 1) {
    board[8] = body;
    timesToRepeat9--;
  }
  if(timesToRepeat9 === 0) {
    board[8] = tile;
  }
}

function tile10() {
  timesToRepeat10;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 10) {
    timesToRepeat10 = score + 1;
  } 

  if(timesToRepeat10 >= 1) {
    board[9] = body;
    timesToRepeat10--;
  }
  if(timesToRepeat10 === 0) {
    board[9] = tile;
  }
}

function tile11() {
  timesToRepeat11;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 11) {
    timesToRepeat11 = score + 1;
  } 

  if(timesToRepeat11 >= 1) {
    board[10] = body;
    timesToRepeat11--;
  }
  if(timesToRepeat11 === 0) {
    board[10] = tile;
  }
}

function tile12() {
  timesToRepeat12;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 12) {
    timesToRepeat12 = score + 1;
  } 

  if(timesToRepeat12 >= 1) {
    board[11] = body;
    timesToRepeat12--;
  }
  if(timesToRepeat12 === 0) {
    board[11] = tile;
  }
}

function tile13() {
  timesToRepeat13;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 13) {
    timesToRepeat13 = score + 1;
  } 

  if(timesToRepeat13 >= 1) {
    board[12] = body;
    timesToRepeat13--;
  }
  if(timesToRepeat13 === 0) {
    board[12] = tile;
  }
}

function tile14() {
  timesToRepeat14;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 14) {
    timesToRepeat14 = score + 1;
  } 

  if(timesToRepeat14 >= 1) {
    board[13] = body;
    timesToRepeat14--;
  }
  if(timesToRepeat14 === 0) {
    board[13] = tile;
  }
}

function tile15() {
  timesToRepeat15;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 15) {
    timesToRepeat15 = score + 1;
  } 

  if(timesToRepeat15 >= 1) {
    board[14] = body;
    timesToRepeat15--;
  }
  if(timesToRepeat15 === 0) {
    board[14] = tile;
  }
}

function tile16() {
  timesToRepeat16;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 16) {
    timesToRepeat16 = score + 1;
  } 

  if(timesToRepeat16 >= 1) {
    board[15] = body;
    timesToRepeat16--;
  }
  if(timesToRepeat16 === 0) {
    board[15] = tile;
  }
}

function tile17() {
  timesToRepeat17;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 17) {
    timesToRepeat17 = score + 1;
  } 

  if(timesToRepeat17 >= 1) {
    board[16] = body;
    timesToRepeat17--;
  }
  if(timesToRepeat17 === 0) {
    board[16] = tile;
  }
}

function tile18() {
  timesToRepeat18;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 18) {
    timesToRepeat18 = score + 1;
  } 

  if(timesToRepeat18 >= 1) {
    board[17] = body;
    timesToRepeat18--;
  }
  if(timesToRepeat18 === 0) {
    board[17] = tile;
  }
}

function tile19() {
  timesToRepeat19;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 19) {
    timesToRepeat19 = score + 1;
  } 

  if(timesToRepeat19 >= 1) {
    board[18] = body;
    timesToRepeat19--;
  }
  if(timesToRepeat19 === 0) {
    board[18] = tile;
  }
}

function tile20() {
  timesToRepeat20;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 20) {
    timesToRepeat20 = score + 1;
  } 

  if(timesToRepeat20 >= 1) {
    board[19] = body;
    timesToRepeat20--;
  }
  if(timesToRepeat20 === 0) {
    board[19] = tile;
  }
}

function tile21() {
  timesToRepeat21;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 21) {
    timesToRepeat21 = score + 1;
  } 

  if(timesToRepeat21 >= 1) {
    board[20] = body;
    timesToRepeat21--;
  }
  if(timesToRepeat21 === 0) {
    board[20] = tile;
  }
}

function tile22() {
  timesToRepeat22;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 22) {
    timesToRepeat22 = score + 1;
  } 

  if(timesToRepeat22 >= 1) {
    board[21] = body;
    timesToRepeat22--;
  }
  if(timesToRepeat22 === 0) {
    board[21] = tile;
  }
}

function tile23() {
  timesToRepeat23;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 23) {
    timesToRepeat23 = score + 1;
  } 

  if(timesToRepeat23 >= 1) {
    board[22] = body;
    timesToRepeat23--;
  }
  if(timesToRepeat23 === 0) {
    board[22] = tile;
  }
}

function tile24() {
  timesToRepeat24;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 24) {
    timesToRepeat24 = score + 1;
  } 

  if(timesToRepeat24 >= 1) {
    board[23] = body;
    timesToRepeat24--;
  }
  if(timesToRepeat24 === 0) {
    board[23] = tile;
  }
}

function tile25() {
  timesToRepeat25;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 25) {
    timesToRepeat25 = score + 1;
  } 

  if(timesToRepeat25 >= 1) {
    board[24] = body;
    timesToRepeat25--;
  }
  if(timesToRepeat25 === 0) {
    board[24] = tile;
  }
}

function tile26() {
  timesToRepeat26;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 26) {
    timesToRepeat26 = score + 1;
  } 

  if(timesToRepeat26 >= 1) {
    board[25] = body;
    timesToRepeat26--;
  }
  if(timesToRepeat26 === 0) {
    board[25] = tile;
  }
}

function tile27() {
  timesToRepeat27;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 27) {
    timesToRepeat27 = score + 1;
  } 

  if(timesToRepeat27 >= 1) {
    board[26] = body;
    timesToRepeat27--;
  }
  if(timesToRepeat27 === 0) {
    board[26] = tile;
  }
}

function tile28() {
  timesToRepeat28;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 28) {
    timesToRepeat28 = score + 1;
  } 

  if(timesToRepeat28 >= 1) {
    board[27] = body;
    timesToRepeat28--;
  }
  if(timesToRepeat28 === 0) {
    board[27] = tile;
  }
}

function tile29() {
  timesToRepeat29;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 29) {
    timesToRepeat29 = score + 1;
  } 

  if(timesToRepeat29 >= 1) {
    board[28] = body;
    timesToRepeat29--;
  }
  if(timesToRepeat29 === 0) {
    board[28] = tile;
  }
}

function tile30() {
  timesToRepeat30;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 30) {
    timesToRepeat30 = score + 1;
  } 

  if(timesToRepeat30 >= 1) {
    board[29] = body;
    timesToRepeat30--;
  }
  if(timesToRepeat30 === 0) {
    board[29] = tile;
  }
}

function tile31() {
  timesToRepeat31;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 31) {
    timesToRepeat31 = score + 1;
  } 

  if(timesToRepeat31 >= 1) {
    board[30] = body;
    timesToRepeat31--;
  }
  if(timesToRepeat31 === 0) {
    board[30] = tile;
  }
}

function tile32() {
  timesToRepeat32;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 32) {
    timesToRepeat32 = score + 1;
  } 

  if(timesToRepeat32 >= 1) {
    board[31] = body;
    timesToRepeat32--;
  }
  if(timesToRepeat32 === 0) {
    board[31] = tile;
  }
}

function tile33() {
  timesToRepeat33;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 33) {
    timesToRepeat33 = score + 1;
  } 

  if(timesToRepeat33 >= 1) {
    board[32] = body;
    timesToRepeat33--;
  }
  if(timesToRepeat33 === 0) {
    board[32] = tile;
  }
}

function tile34() {
  timesToRepeat34;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 34) {
    timesToRepeat34 = score + 1;
  } 

  if(timesToRepeat34 >= 1) {
    board[33] = body;
    timesToRepeat34--;
  }
  if(timesToRepeat34 === 0) {
    board[33] = tile;
  }
}

function tile35() {
  timesToRepeat35;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 35) {
    timesToRepeat35 = score + 1;
  } 

  if(timesToRepeat35 >= 1) {
    board[34] = body;
    timesToRepeat35--;
  }
  if(timesToRepeat35 === 0) {
    board[34] = tile;
  }
}

function tile36() {
  timesToRepeat36;
  if(score >= 1 && board[previousHeadPosition - 1] === head && previousHeadPosition === 36) {
    timesToRepeat36 = score + 1;
  } 

  if(timesToRepeat36 >= 1) {
    board[35] = body;
    timesToRepeat36--;
  }
  if(timesToRepeat36 === 0) {
    board[35] = tile;
  }
}

client.login(process.env.TOKEN);