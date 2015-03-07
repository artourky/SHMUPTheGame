
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

  create: function () {

    this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');

    this.setupBackground();
    this.setupPlayers();
    this.setupEnemies();
    this.setupBullets();
    this.setupExplosions();
    this.setupText();
    this.setupPlayerIcons();
    this.setupAudio();

    this.cursors = this.input.keyboard.createCursorKeys();

  },

  setupAudio: function () {
    this.explosionSFX = this.add.audio('explosion');
    this.playerExplosionSFX = this.add.audio('playerExplosion');
    this.enemyFireSFX = this.add.audio('enemyFire');
    this.playerFireSFX = this.add.audio('playerFire');
    this.powerUpSFX = this.add.audio('powerUp');
  },

  checkCollisions: function () {
    this.physics.arcade.overlap(this.bulletPool, this.enemyPool, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.bulletPool, this.shooterPool, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.bulletPool, this.enemyPool2, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.bulletPool, this.shooterPool2, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.bulletPool2, this.enemyPool, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.bulletPool2, this.enemyPool2, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.bulletPool2, this.shooterPool, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.bulletPool2, this.shooterPool2, this.enemyHit, null, this);

    this.physics.arcade.overlap(this.player, this.enemyPool, this.playerHit, null, this);

    this.physics.arcade.overlap(this.player, this.shooterPool, this.playerHit, null, this);

    this.physics.arcade.overlap(this.player, this.enemyBulletPool, this.playerHit, null, this);

    this.physics.arcade.overlap(this.player, this.powerUpPool, this.playerPowerUp, null, this);

    this.physics.arcade.overlap(this.player, this.enemyPool2, this.playerHit, null, this);

    this.physics.arcade.overlap(this.player, this.shooterPool2, this.playerHit, null, this);

    this.physics.arcade.overlap(this.player, this.enemyBulletPool2, this.playerHit, null, this);

    this.physics.arcade.overlap(this.player2, this.enemyPool, this.playerHit2, null, this);

    this.physics.arcade.overlap(this.player2, this.shooterPool, this.playerHit2, null, this);

    this.physics.arcade.overlap(this.player2, this.enemyBulletPool, this.playerHit2, null, this);

    this.physics.arcade.overlap(this.player2, this.enemyPool2, this.playerHit2, null, this);

    this.physics.arcade.overlap(this.player2, this.shooterPool2, this.playerHit2, null, this);

    this.physics.arcade.overlap(this.player2, this.enemyBulletPool2, this.playerHit2, null, this);

    this.physics.arcade.overlap(this.player2, this.powerUpPool, this.playerPowerUp2, null, this);



    if (this.bossApproaching === false) {
      this.physics.arcade.overlap(this.bulletPool, this.bossPool, this.enemyHit, null, this);

      this.physics.arcade.overlap(this.player, this.bossPool, this.playerHit, null, this);

      this.physics.arcade.overlap(this.bulletPool2, this.bossPool, this.enemyHit, null, this);

      this.physics.arcade.overlap(this.player2, this.bossPool, this.playerHit2, null, this);
    }
  },

  spawnEnemies: function () {
    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      // spawn at a random location top of the screen with health ENEMY_HEALTH
      enemy.reset(this.rnd.integerInRange(50, this.game.width - 20), 0, BasicGame.ENEMY_HEALTH);    
      // also randomize the speed
      enemy.body.velocity.y = this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
      enemy.play('fly');
    }

    // flipped enemies
    if (this.nextEnemy2At < this.time.now && this.enemyPool2.countDead() > 0) {
      this.nextEnemy2At = this.time.now + this.enemy2Delay;
      var enemy = this.enemyPool2.getFirstExists(false);
      var target = this.rnd.integerInRange(20, this.game.height - 50);
      // spawn at a random location top of the screen
      enemy.reset(this.game.width, target, 2);
      enemy.rotation = this.physics.arcade.moveToXY(enemy, 0, target) - Math.PI / 2;
      // also randomize the speed
      enemy.body.velocity.x = -this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
      enemy.play('fly');
    }

    if (this.nextShooterAt < this.time.now && this.shooterPool.countDead() > 0) {
      this.nextShooterAt = this.time.now + this.shooterDelay;
      var shooter = this.shooterPool.getFirstExists(false);

      // spawn at a random location at the top  
      shooter.reset(this.rnd.integerInRange(50, this.game.width - 20), 0, BasicGame.SHOOTER_HEALTH);

      // choose a random target location at the bottom
      var target = this.rnd.integerInRange(50, this.game.width - 20);

      // move to target and rotate the sprite accordingly  
      shooter.rotation = this.physics.arcade.moveToXY(shooter, target, this.game.height,
        this.rnd.integerInRange(BasicGame.SHOOTER_MIN_VELOCITY, BasicGame.SHOOTER_MAX_VELOCITY)
      ) - Math.PI / 2;

      shooter.play('fly');

      // each shooter has their own shot timer 
      shooter.nextShotAt = 0;
    }

    // Make them Roll White Shooters (rotated)
    if (this.nextShooter2At < this.time.now && this.shooterPool2.countDead() > 0) {
      this.nextShooter2At = this.time.now + this.shooter2Delay;
      var shooter = this.shooterPool2.getFirstExists(false);

      // spawn at a random location at the top  
      shooter.reset(this.game.width, this.rnd.integerInRange(20, this.game.height - 50), 5);

      // choose a random target location at the bottom
      var target = this.rnd.integerInRange(20, this.game.height - 50);

      // move to target and rotate the sprite accordingly  
      shooter.rotation = this.physics.arcade.moveToXY(shooter, 0, target,
        this.rnd.integerInRange(BasicGame.SHOOTER_MIN_VELOCITY, BasicGame.SHOOTER_MAX_VELOCITY)) - Math.PI / 2;

      shooter.play('fly');

      // each shooter has their own shot timer 
      shooter.nextShot2At = 0;
    }
  },

  processPlayerInput: function () {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
    }

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.player.speed;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.player.speed;
    }

    //using wasd for the 2nd player arrow keys
    this.player2.body.velocity.x = 0;
    this.player2.body.velocity.y = 0;

    if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.player2.body.velocity.x = -this.player.speed;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
        this.player2.body.velocity.x = this.player.speed;
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.W)) {
        this.player2.body.velocity.y = -this.player.speed;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
        this.player2.body.velocity.y = this.player.speed;
    }
      //end using wasd for the 2nd player arrow keys

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fire();
      }  
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.G)) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fire2();
      }  
    }
  },

  processDelayedEffects: function () {
    if (this.instructions.exists && this.time.now > this.instExpire) {
      this.instructions.destroy();
   }

   if (this.ghostUntil && this.ghostUntil < this.time.now) {
      this.ghostUntil = null;
      this.player.play('fly');
      this.player2.play('fly');
    }

    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 20, 
        'Press CTRL or G to go back to Main Menu', 
        { font: '16px sans-serif', fill: '#fff'}
      );
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }

    if (this.bossApproaching && this.boss.y > 80) {
      this.bossApproaching = false;
      this.boss.nextShotAt = 0;

      this.boss.body.velocity.y = 0;
      this.boss.body.velocity.x = BasicGame.BOSS_X_VELOCITY + 10;
      // allow bouncing off world bounds
      this.boss.body.bounce.x = 1;
      this.boss.body.collideWorldBounds = true;
    }
  },

  explode: function (sprite) {
    if (this.explosionPool.countDead() === 0) {
     return;
    }
    var explosion = this.explosionPool.getFirstExists(false);
    explosion.reset(sprite.x, sprite.y);
    explosion.play('boom', 15, false, true);
    // add the original sprite's velocity to the explosion
    explosion.body.velocity.x = sprite.body.velocity.x;
    explosion.body.velocity.y = sprite.body.velocity.y;
  },

  fire: function() {

    if (!this.player.alive || this.nextShotAt > this.time.now) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;
    this.playerFireSFX.play();
    
    var bullet;
    if (this.weaponLevel === 0) {
      if (this.bulletPool.countDead() === 0) {
        return;
      }
      bullet = this.bulletPool.getFirstExists(false);
      bullet.reset(this.player.x, this.player.y - 20);
      bullet.body.velocity.y = -BasicGame.BULLET_VELOCITY;
    } else {
      if (this.bulletPool.countDead() < this.weaponLevel * 2) {
        return;
      }
      for (var i = 0; i < this.weaponLevel; i++) {
        bullet = this.bulletPool.getFirstExists(false);
        // spawn left bullet slightly left off center
        bullet.reset(this.player.x - (10 + i * 6), this.player.y - 20);
        // the left bullets spread from -95 degrees to -135 degrees
        this.physics.arcade.velocityFromAngle(
          -95 - i * 10, BasicGame.BULLET_VELOCITY, bullet.body.velocity
        );

        bullet = this.bulletPool.getFirstExists(false);
        // spawn right bullet slightly right off center
        bullet.reset(this.player.x + (10 + i * 6), this.player.y - 20);
        // the right bullets spread from -85 degrees to -45
        this.physics.arcade.velocityFromAngle(
          -85 + i * 10, BasicGame.BULLET_VELOCITY, bullet.body.velocity
        );
      }
    }
  },

  fire2: function() {

    if (!this.player2.alive || this.nextShot2At > this.time.now) {
      return;
    }

    this.nextShot2At = this.time.now + this.shot2Delay;
    this.playerFireSFX.play();
    
    var bullet;
    if (this.weapon2Level === 0) {
      if (this.bulletPool2.countDead() === 0) {
        return;
      }
      bullet = this.bulletPool2.getFirstExists(false);
      bullet.reset(this.player2.x + 20, this.player2.y);
      bullet.body.velocity.x = BasicGame.BULLET_VELOCITY;
    } else {
      if (this.bulletPool2.countDead() < this.weapon2Level * 2) {
        return;
      }
      for (var i = 0; i < this.weapon2Level; i++) {
        bullet = this.bulletPool2.getFirstExists(false);
        // spawn left bullet slightly left off center
        bullet.reset(this.player2.x + 20 + (10 + i * 6), this.player2.y);
        // the left bullets spread from -95 degrees to -135 degrees
        this.physics.arcade.velocityFromAngle(
          -5 - i * 10, BasicGame.BULLET_VELOCITY, bullet.body.velocity
        );

        bullet = this.bulletPool2.getFirstExists(false);
        // spawn right bullet slightly right off center
        bullet.reset(this.player2.x + 20 + (10 + i * 6), this.player2.y);
        // the right bullets spread from -85 degrees to -45
        this.physics.arcade.velocityFromAngle(
          5 + i * 10, BasicGame.BULLET_VELOCITY, bullet.body.velocity
        );
      }
    }
  },

  update: function () {
    this.checkCollisions();
    this.spawnEnemies();
    this.enemyFire();
    this.processPlayerInput();
    this.processDelayedEffects();
  },

  //set function for the death of the player
  playerHit: function (player, enemy) {
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }

    this.playerExplosionSFX.play();

    // crashing into an enemy only deals 5 damage
    this.damageEnemy(enemy, BasicGame.CRASH_DAMAGE);

    var life = this.lives.getFirstAlive();
    if (life !== null) {
      life.kill();
      this.weaponLevel = 0;
      this.ghostUntil = this.time.now + BasicGame.PLAYER_GHOST_TIME;
      this.player.play('ghost');
    } else {
      this.explode(player);
      player.kill();
      this.bulletPool.destroy();
      this.sea.autoScroll(-BasicGame.SEA_SCROLL_SPEED, 0);
      if(!this.player2.alive)
        this.displayEnd(false);
    }
  },

  playerHit2: function (player, enemy) {
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }

    this.playerExplosionSFX.play();

    // crashing into an enemy only deals 5 damage
    this.damageEnemy(enemy, BasicGame.CRASH_DAMAGE);

    var life = this.lives2.getFirstAlive();
    if (life !== null) {
      life.kill();
      this.weapon2Level = 0;
      this.ghostUntil = this.time.now + BasicGame.PLAYER_GHOST_TIME;
      this.player2.play('ghost');
    } else {
      this.explode(player);
      player.kill();
      this.bulletPool2.destroy();
      this.sea.autoScroll(0, BasicGame.SEA_SCROLL_SPEED);
      if(!this.player.alive)
        this.displayEnd(false);
    }
  },

  enemyHit: function (bullet, enemy) {
     bullet.kill();
     this.damageEnemy(enemy, BasicGame.BULLET_DAMAGE); 
  },

  damageEnemy: function (enemy, damage) {
    enemy.damage(damage);
    if (enemy.alive) {
      enemy.play('hit');
    } else {
      this.explode(enemy);
      this.explosionSFX.play();
      this.addToScore(enemy.reward);
      this.spawnPowerUp(enemy);

      if (enemy.key === 'boss') {
        this.enemyPool.destroy();
        this.shooterPool.destroy();
        this.bossPool.destroy();
        this.enemyBulletPool.destroy();
        this.displayEnd(true);
      }
    }
  },

  addToScore: function (score) {
    this.score += score;
    this.scoreText.text = this.score;
    
    // this approach prevents the boss from spawning again upon winning
    if (this.score >= 2000 && this.bossPool.countDead() == 1) {
      this.spawnBoss();
    }
  },

  setupPlayerIcons: function () {

    this.powerUpPool = this.add.group();
    this.powerUpPool.enableBody = true;
    this.powerUpPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.powerUpPool.createMultiple(5, 'powerup1');
    this.powerUpPool.setAll('anchor.x', 0.5);
    this.powerUpPool.setAll('anchor.y', 0.5);
    this.powerUpPool.setAll('outOfBoundsKill', true);
    this.powerUpPool.setAll('checkWorldBounds', true);
    this.powerUpPool.setAll('reward', BasicGame.POWERUP_REWARD, false, false, 0, true);

    this.lives = this.add.group();
    // calculate location of first life icon
    var firstLifeIconX = this.game.width - 10 - (BasicGame.PLAYER_EXTRA_LIVES * 30);
    for (var i = 0; i < BasicGame.PLAYER_EXTRA_LIVES; i++) {
      var life = this.lives.create(firstLifeIconX + (30 * i), 30, 'player');
      life.scale.setTo(0.5, 0.5);
      life.anchor.setTo(0.5, 0.5);
    }

    this.lives2 = this.add.group();
      // calculate location of first life icon
    var firstLifeIconX = 100;
    for (var i = 0; i < BasicGame.PLAYER_EXTRA_LIVES; i++) {
        var life = this.lives2.create(firstLifeIconX - (30 * i), 30, 'player2');
        life.scale.setTo(0.5, 0.5);
        life.anchor.setTo(0.5, 0.5);
    }
  },

  render: function() {
     // this.game.debug.body(this.player);
     // this.game.debug.body(this.player2);
  },

  setupBackground: function () {
    this.sea = this.add.tileSprite(0, 0, this.game.width , this.game.height, 'sea');
    this.sea.autoScroll(-BasicGame.SEA_SCROLL_SPEED, BasicGame.SEA_SCROLL_SPEED);
  },

  setupPlayers: function () {
    this.player = this.add.sprite(this.game.width/2, this.game.height - 50, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [ 0, 1, 2 ], 20, true);
    this.player.animations.add('ghost', [ 3, 0, 3, 1 ], 20, true);
    this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = BasicGame.PLAYER_SPEED;
    this.player.body.collideWorldBounds = true;
    // 20 x 20 pixel hitbox, centered a little bit higher than the center
    this.player.body.setSize(20, 20, 0, -5);

    //Player 2
    this.player2 = this.add.sprite(50, this.game.height / 2, 'player2');
    this.player2.rotation = Math.PI / 2
    this.player2.anchor.setTo(0.5, 0.5);
    this.player2.animations.add('fly', [ 0, 1, 2 ], 20, true);
    this.player2.animations.add('ghost', [ 3, 0, 3, 1 ], 20, true);
    this.player2.play('fly');
    this.physics.enable(this.player2, Phaser.Physics.ARCADE);
    this.player2.speed = BasicGame.PLAYER_SPEED;
    this.player2.body.collideWorldBounds = true;
    
    this.player2.body.setSize(20, 20, 5, 0);
    //weapon lvl for player 1;
    this.weaponLevel = 0;
    //weapon lvl for player 2 "i think";
    this.weapon2Level = 0;
  },

  setupEnemies: function () {
    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(50, 'greenEnemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('reward', BasicGame.ENEMY_REWARD, false, false, 0, true);
    this.enemyPool.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true);

    // Set the animation for each sprite
    this.enemyPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {e.play('fly');}, this);
    });
    
    this.nextEnemyAt = 0;
    this.enemyDelay = BasicGame.SPAWN_ENEMY_DELAY;

    // Tougher Enemy
    this.shooterPool = this.add.group();
    this.shooterPool.enableBody = true;
    this.shooterPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.shooterPool.createMultiple(20, 'whiteEnemy');
    this.shooterPool.setAll('anchor.x', 0.5);
    this.shooterPool.setAll('anchor.y', 0.5);
    this.shooterPool.setAll('outOfBoundsKill', true);
    this.shooterPool.setAll('checkWorldBounds', true);
    this.shooterPool.setAll('dropRate', BasicGame.SHOOTER_DROP_RATE, false, false, 0, true);
    this.shooterPool.setAll('reward', BasicGame.SHOOTER_REWARD, false, false, 0, true);

    // Set the animation for each sprite
    this.shooterPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add( function (e) {e.play('fly');}, this);
    });

    // start spawning 5 seconds into the game
    this.nextShooterAt = this.time.now + Phaser.Timer.SECOND * 5;
    this.shooterDelay = BasicGame.SPAWN_SHOOTER_DELAY;

    //Player 2 enemies 

    this.enemyPool2 = this.add.group();
    this.enemyPool2.enableBody = true;
    this.enemyPool2.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool2.createMultiple(50, 'greenerEnemy');
    this.enemyPool2.setAll('anchor.x', 0.5);
    this.enemyPool2.setAll('anchor.y', 0.5);
    this.enemyPool2.setAll('outOfBoundsKill', true);
    this.enemyPool2.setAll('checkWorldBounds', true);
    this.enemyPool2.setAll('reward', BasicGame.ENEMY_REWARD, false, false, 0, true);
    this.enemyPool2.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true);

    // Set the animation for each sprite
    this.enemyPool2.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {e.play('fly');}, this);
    });
    
    this.nextEnemy2At = 0;
    this.enemy2Delay = BasicGame.SPAWN_ENEMY_DELAY;

    // Tougher Enemy
    this.shooterPool2 = this.add.group();
    this.shooterPool2.enableBody = true;
    this.shooterPool2.physicsBodyType = Phaser.Physics.ARCADE;
    this.shooterPool2.createMultiple(20, 'whiterEnemy');
    this.shooterPool2.setAll('anchor.x', 0.5);
    this.shooterPool2.setAll('anchor.y', 0.5);
    this.shooterPool2.setAll('outOfBoundsKill', true);
    this.shooterPool2.setAll('checkWorldBounds', true);
    this.shooterPool2.setAll('dropRate', BasicGame.SHOOTER_DROP_RATE, false, false, 0, true);
    this.shooterPool2.setAll('reward', BasicGame.SHOOTER_REWARD, false, false, 0, true);

    // Set the animation for each sprite
    this.shooterPool2.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add( function (e) {e.play('fly');}, this);
    });

    // start spawning 5 seconds into the game
    this.nextShooter2At = this.time.now + Phaser.Timer.SECOND * 5;
    this.shooter2Delay = BasicGame.SPAWN_SHOOTER_DELAY;

    this.bossPool = this.add.group();
    this.bossPool.enableBody = true;
    this.bossPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bossPool.createMultiple(1, 'boss');
    this.bossPool.setAll('anchor.x', 0.5);
    this.bossPool.setAll('anchor.y', 0.5);
    this.bossPool.setAll('outOfBoundsKill', true);
    this.bossPool.setAll('checkWorldBounds', true);
    this.bossPool.setAll('reward', BasicGame.BOSS_REWARD, false, false, 0, true);
    this.bossPool.setAll('dropRate', BasicGame.BOSS_DROP_RATE, false, false, 0, true);

    // Set the animation for each sprite
    this.bossPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add( function (e) {
        e.play('fly');
      }, this);
    });

    this.boss = this.bossPool.getTop();
    this.bossApproaching = false;
  },

  enemyFire: function() {
    this.shooterPool.forEachAlive(function (enemy) {
      if (this.time.now > enemy.nextShotAt && this.enemyBulletPool.countDead() > 0) {
        var bullet = this.enemyBulletPool.getFirstExists(false);
        //console.log("1 " + bullet.key);
        bullet.reset(enemy.x, enemy.y);
        this.physics.arcade.moveToObject(bullet, this.player, BasicGame.ENEMY_BULLET_VELOCITY);
        enemy.nextShotAt = this.time.now + BasicGame.SHOOTER_SHOT_DELAY;
        this.enemyFireSFX.play();
      }
    }, this);

    this.shooterPool2.forEachAlive(function (enemy) {
      if (this.time.now > enemy.nextShot2At && this.enemyBulletPool2.countDead() > 0) {
        var bullet = this.enemyBulletPool2.getFirstExists(false);
        //console.log("2 " + bullet.key);
        bullet.reset(enemy.x, enemy.y);
        this.physics.arcade.moveToObject(bullet, this.player2, BasicGame.ENEMY_BULLET_VELOCITY);
        enemy.nextShot2At = this.time.now + BasicGame.SHOOTER_SHOT_DELAY;
        this.enemyFireSFX.play();
      }
    }, this);

    if (this.bossApproaching === false && this.boss.alive && 
        this.boss.nextShotAt < this.time.now &&
        this.enemyBulletPool.countDead() >= 10) {

      this.boss.nextShotAt = this.time.now + BasicGame.BOSS_SHOT_DELAY;
      this.enemyFireSFX.play();

      for (var i = 0; i < 5; i++) {
        // process 2 bullets at a time
        var leftBullet = this.enemyBulletPool.getFirstExists(false);
        leftBullet.reset(this.boss.x - 10 - i * 10, this.boss.y + 20);
        var rightBullet = this.enemyBulletPool.getFirstExists(false);
        rightBullet.reset(this.boss.x + 10 + i * 10, this.boss.y + 20);

        if (this.boss.health > BasicGame.BOSS_HEALTH / 2) {
          // aim directly at the player
          if(this.player2.alive)
            this.physics.arcade.moveToObject(leftBullet, this.player2, BasicGame.ENEMY_BULLET_VELOCITY);
          else
            this.physics.arcade.moveToObject(leftBullet, this.player, BasicGame.ENEMY_BULLET_VELOCITY);
          if(this.player2.alive)
            this.physics.arcade.moveToObject(rightBullet, this.player2, BasicGame.ENEMY_BULLET_VELOCITY);
          else
            this.physics.arcade.moveToObject(rightBullet, this.player, BasicGame.ENEMY_BULLET_VELOCITY);
        } else {
          // aim slightly off center of the player
          if(this.player.alive)
            this.physics.arcade.moveToXY(leftBullet, this.player.x - i * 100, this.player.y, BasicGame.ENEMY_BULLET_VELOCITY);
          else
            this.physics.arcade.moveToXY(leftBullet, this.player2.x - i * 100, this.player2.y, BasicGame.ENEMY_BULLET_VELOCITY);
          
          if(this.player2.alive)
            this.physics.arcade.moveToXY(rightBullet, this.player2.x + i * 100, this.player2.y, BasicGame.ENEMY_BULLET_VELOCITY);
          else
            this.physics.arcade.moveToXY(rightBullet, this.player.x + i * 100, this.player.y, BasicGame.ENEMY_BULLET_VELOCITY);

        }
      }
    }
  },

  setupBullets: function () {

    //setting up enemy bullets
    this.enemyBulletPool = this.add.group();
    this.enemyBulletPool.enableBody = true;
    this.enemyBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBulletPool.createMultiple(100, 'enemyBullet');
    this.enemyBulletPool.setAll('anchor.x', 0.5);
    this.enemyBulletPool.setAll('anchor.y', 0.5);
    this.enemyBulletPool.setAll('outOfBoundsKill', true);
    this.enemyBulletPool.setAll('checkWorldBounds', true);
    this.enemyBulletPool.setAll('reward', 0, false, false, 0, true);


    //setting up enemy bullets (rotated)
    this.enemyBulletPool2 = this.add.group();
    this.enemyBulletPool2.enableBody = true;
    this.enemyBulletPool2.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBulletPool2.createMultiple(100, 'enemyBullet2');
    this.enemyBulletPool2.setAll('anchor.x', 0.5);
    this.enemyBulletPool2.setAll('anchor.y', 0.5);
    this.enemyBulletPool2.setAll('outOfBoundsKill', true);
    this.enemyBulletPool2.setAll('checkWorldBounds', true);
    this.enemyBulletPool2.setAll('reward', 0, false, false, 0, true);

    // Add an empty sprite group into our game
    this.bulletPool = this.add.group();

    // Enable physics to the whole sprite group
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;

    // Add 100 'bullet' sprites in the group.
    // By default this uses the first frame of the sprite sheet and
    //   sets the initial state as non-existing (i.e. killed/dead)
    this.bulletPool.createMultiple(100, 'bullet');

    // Sets anchors of all sprites
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);

    // Automatically kill the bullet sprites when they go out of bounds
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);

    this.nextShotAt = 0;
    this.shotDelay = BasicGame.SHOT_DELAY;

    // Player 2
    // Add an empty sprite group into our game
    this.bulletPool2 = this.add.group();

    // Enable physics to the whole sprite group
    this.bulletPool2.enableBody = true;
    this.bulletPool2.physicsBodyType = Phaser.Physics.ARCADE;

    // Add 100 'bullet' sprites in the group.
    // By default this uses the first frame of the sprite sheet and
    //   sets the initial state as non-existing (i.e. killed/dead)
    this.bulletPool2.createMultiple(100, 'bullet');

    // Sets anchors of all sprites
    this.bulletPool2.setAll('anchor.x', 0.5);
    this.bulletPool2.setAll('anchor.y', 0.5);

    // Automatically kill the bullet sprites when they go out of bounds
    this.bulletPool2.setAll('outOfBoundsKill', true);
    this.bulletPool2.setAll('checkWorldBounds', true);

    this.nextShot2At = 0;
    this.shot2Delay = BasicGame.SHOT_DELAY;
  },

  setupExplosions: function () {
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function (explosion) {
      explosion.animations.add('boom');
    });
  },

  spawnPowerUp: function (enemy) {
    if (this.powerUpPool.countDead() === 0 || this.weaponLevel === 5) { 
      return;
    }

    if (this.rnd.frac() < enemy.dropRate) {
      var powerUp = this.powerUpPool.getFirstExists(false);
      powerUp.reset(enemy.x, enemy.y);
      powerUp.body.velocity.y = 0;
    }
  },

  playerPowerUp: function (player, powerUp) {
    this.addToScore(powerUp.reward);
    powerUp.kill();
    this.powerUpSFX.play();
    if (this.weaponLevel < 3) {
      this.weaponLevel++;
    }
  },

  playerPowerUp2: function (player, powerUp) {
    this.addToScore(powerUp.reward);
    powerUp.kill();
    this.powerUpSFX.play();
    if (this.weapon2Level < 3) {
      this.weapon2Level++;
    }
  },

  spawnBoss: function () {
    this.bossApproaching = true;
    this.boss.reset(this.game.width / 2, 0, BasicGame.BOSS_HEALTH);
    this.physics.enable(this.boss, Phaser.Physics.ARCADE);
    this.boss.body.velocity.y = BasicGame.BOSS_Y_VELOCITY;
    this.boss.play('fly');
  },

  setupText: function () {
    this.instructions = this.add.text( this.game.width/2, this.game.height - 100, 
      'Player 1 Use Arrow Keys to Move, Press SPACE to Fire\n' + 
      'Player 2 Use WASD Keys to Move, Press G to Fire', 
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + BasicGame.INSTRUCTION_EXPIRE;

    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2, 30, '' + this.score, 
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.scoreText.anchor.setTo(0.5, 0.5);
  },

  displayEnd: function (win) {
    // you can't win and lose at the same time
    if (this.endText && this.endText.exists) {
      return;
    }

    var msg = win ? 'You Win!!!' : 'Game Over!';
    this.endText = this.add.text(this.game.width / 2, this.game.height / 2 - 60, msg, { font: '72px serif', fill: '#fff' });
    this.endText.anchor.setTo(0.5, 0);

    this.dispScore = this.add.text(this.game.width / 2, this.game.height / 2 + 40, "Your Score: " + this.score, { font: '36px sans-serif', fill: '#fff' });
    this.dispScore.anchor.setTo(0.5, 0);

    this.showReturn = this.time.now + BasicGame.RETURN_MESSAGE_DELAY + 1000;
  },

  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    this.sea.destroy();
    this.player.destroy();
    this.player2.destroy();
    this.enemyPool.destroy();
    this.enemyPool2.destroy();
    this.bulletPool.destroy();
    this.bulletPool2.destroy();
    this.explosionPool.destroy();
    this.shooterPool.destroy();
    this.enemyBulletPool.destroy();
    this.powerUpPool.destroy();
    this.bossPool.destroy();
    this.instructions.destroy();
    this.scoreText.destroy();
    this.endText.destroy();
    this.returnText.destroy();

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');
  }

};
