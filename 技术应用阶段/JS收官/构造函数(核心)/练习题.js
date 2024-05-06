/**
 * 创建一副扑克牌
 * @param {number} number
 * @param {number} color
 */
function Poker(number, color) {
  this.number = number;
  this.color = color;
  this.print = function () {
    if (this.number === 14) {
      console.log("SJoker");
      return;
    }
    if (this.number === 15) {
      console.log("BJoker");
      return;
    }

    var colors = ["♠", "♥", "♣", "♦"];
    var color = colors[this.color - 1];

    var numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    var number = numbers[this.number - 1];

    console.log(color + number);
  };
}

/**
 * 一叠扑克牌
 */
function Deck() {
  this.pokers = [];

  for (var i = 1; i <= 13; i++) {
    for (var j = 1; j <= 4; j++) {
      this.pokers.push(new Poker(i, j));
    }
  }
  this.pokers.push(new Poker(14, 0));
  this.pokers.push(new Poker(15, 0));

  this.print = function () {
    for (var i = 0; i < this.pokers.length; i++) {
      this.pokers[i].print();
    }
  };
}

var deck = new Deck();
deck.print();
console.log(deck.pokers.length);
