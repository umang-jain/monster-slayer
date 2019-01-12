var vm = new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = []
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage
      });
      this.monsterAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for ' + damage
      });
      this.monsterAttacks();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage
      });
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });
      this.monsterAttacks();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage
      });
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.playerHealth = 0;
      this.turns=[]
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(3, 10);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits player for ' + damage
      });
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * 10 + 1, min));
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game..?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost! New Game..?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
