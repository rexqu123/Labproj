// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

// Declare shared variables at the top so all methods can access them
let score = 0
let scoreText
let food
let cursors
let player 

function preload () {
  // Load assets
  game.load.image('grid', 'grid.png')
  game.load.image('food', 'food.png')
  game.load.image('snakeball', 'circle.png')
  game.load.image('snakeball2', 'circle2.png')
}

function create () {
    //  Enable ARCADE physics
  game.physics.startSystem(Phaser.Physics.ARCADE)

    //  backround titleSprite so the picture repeats itself
  game.add.tileSprite(0, 0,1920,1080, 'grid')

    // spawn player
  
  player = game.add.sprite(400,300, 'snakeball')
  
  player.scale.setTo(0.5, 0.5)
    
  //  physics for player
  game.physics.arcade.enable(player)
  player.body.collideWorldBounds = true

    //  spawn food
  food = game.add.group()
  food.enableBody = true
  for (var i = 0; i < 12; i++) {
    food.create(game.world.randomX, game.world.randomY, 'food');
  }

    //  create scoreboard
  scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#238' })

    //  Enable arrowkeys
  cursors = game.input.keyboard.createCursorKeys()
}

function update () {

    //  Call callectionfood() if player overlaps with food ball
  game.physics.arcade.overlap(player, food, collectfood, null, this)

    // controls
  if (cursors.left.isDown) 
  {
    player.body.velocity.x = -150
  }
    else if (cursors.right.isDown) 
  {
    player.body.velocity.x = 150
  } 
  else if (cursors.up.isDown) 
  {
    player.body.velocity.y = -150
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = 150
  }
  else {
  }
  // increase in size based on score
  player.scale.setTo(0.5+0.025*score, 0.5+0.025*score)

  function collectfood (player, foods) {
    // Removes the food
  foods.kill()
  food.create(game.world.randomX, game.world.randomY, 'food');
    // updates score
  score += 10
  scoreText.text = 'Score:' + score
}

if (score == 500){
  alert ("winner is you")
  score = 0
}
}