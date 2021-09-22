import { gameContextApi } from "./context/GameContext";
import Phaser from "phaser";
import { UI_STATE } from "./pages/constants";
import { updateCounter } from "./pages/PlayingUI";

const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const PIPE_DISTANCE = 290;
const PIPE_GAP = 633;
const PIPES_MAX_AMOUNT = 3;
const PIPES_MAX_INDEX_AMOUNT = 2;
const BIRD_JUMP_POWER = -9;
const PIPE_WIDTH = 66;
const PIPE_DEATH_X = -PIPE_WIDTH / 2;
const PIPE_SPAWN_X = SCREEN_WIDTH + PIPE_WIDTH / 2;
const BOUND_LOW = 0;
const BOUND_TOP = -200;
const MAX_STEP_BEFORE_ROTATE = 22;
const MAX_ROTATE_ANGLE = 90;
const ROTATE_INCREMENT = 1;
const BIRD_ANGLE = -14;
const ZERO = 0;
const PIPE_CONFIG = { isStatic: true };
const PIPE_SPEED = 0.22;
const PLAYER_X = 100;
const TIME_STEP = 16.6;
const BACKGROUND_TILE_SPEED = 0.01 * TIME_STEP;
const NEW_SPEED = PIPE_SPEED * TIME_STEP;
const ANGLE_ACCUMULATOR_SPEED = 0.022 * TIME_STEP;

let ACCUMULATOR = 0;
let BOUNDS;
let BOUNDS_INDEX;
let MAX_INDEX = 150;

const configurations = {
  type: Phaser.AUTO,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  fps: {
    smoothStep: true,
    target: 30,
  },
  physics: {
    default: "matter",
    matter: {
      positionIterations: 1,
      velocityIterations: 1,
      constraintIterations: 0,
      plugins: {
        collisionevents: false,
      },
      gravity: {
        y: 2,
      },
      autoUpdate: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    fullscreenTarget: document.body,
  },
  audio: {
    context: AUDIO_CONTEXT,
  },
};

let player;
let lastPipeGroupIndexPassed = 0;
let pipesContainer = [];
let angleAccumulator = 0;
let stepBeforeRotate = 0;
let pipesPassed = 0;
let gameOver = false;
let startGame = true;
let scene;
let jumpSound;
let pointSound;
let hitSound;
let sprite2;
let sprite1;

new Phaser.Game(configurations);

function preload() {
  this.load.image("pipeBottom", "assets/pipeBottom.png");
  this.load.image("pipeTop", "assets/pipeTop.png");
  this.load.image("ground", "assets/ground.png");
  this.load.image("background", "assets/BackgroundSea.png");
  this.load.spritesheet("bird", "assets/defaultBirdSpritesheet.png", {
    frameWidth: 50,
    frameHeight: 39,
    spacing: 0,
  });
  this.load.audio("jump", "assets/wing.mp3");
  this.load.audio("point", "assets/counter.mp3");
  this.load.audio("hit", "assets/punch.mp3");
}

function create() {
  scene = this;
  jumpSound = this.sound.add("jump");
  jumpSound.allowMultiple = true;

  pointSound = this.sound.add("point");
  pointSound.allowMultiple = true;

  hitSound = this.sound.add("hit");
  hitSound.allowMultiple = true;

  sprite2 = this.add.tileSprite(0, 0, 800, 520, "background").setOrigin(0);
  player = this.matter.add.sprite(PLAYER_X, SCREEN_HEIGHT / 3, "bird", null, {
    isStatic: true,
  });
  this.anims.create({
    key: "fly",
    frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "dead",
    frames: [{ key: "bird", frame: 5 }],
    frameRate: 1,
  });

  player.anims.play("fly");
  sprite1 = this.add.tileSprite(400, 560, 800, 112, "ground");
  sprite1.setDepth(1);
  this.matter.add.gameObject(sprite1, { isStatic: true });
  makeBounds();
  createPipes(scene);

  this.matter.world.on("collisionstart", stopGame);
  this.input.on("pointerdown", jumpAbstractWithStopEventPropagation);

  const keys = this.input.keyboard.addKeys("UP,SPACE,W,J");
  keys.UP.on("down", jumpAbstract);
  keys.SPACE.on("down", jumpAbstract);
  keys.W.on("down", jumpAbstract);
  keys.J.on("down", jumpAbstract);
  window.toggleFullscreen = () => this.scale.toggleFullscreen();
}

function makeBounds() {
  BOUNDS = [];
  BOUNDS_INDEX = 0;
  for (let i = 0; i < MAX_INDEX; i++) {
    let topBound = getTopBound();
    BOUNDS.push({
      topBound,
      lowerBound: topBound + PIPE_GAP,
    });
  }
}

function getTopBound() {
  const bound = Phaser.Math.RND.integerInRange(BOUND_LOW, BOUND_TOP);
  return Phaser.Math.RND.integerInRange(bound, bound + 52);
}

function getNewPipePair() {
  if (BOUNDS_INDEX === MAX_INDEX) {
    let newBound = getTopBound();
    return {
      topBound: newBound,
      lowerBound: newBound + PIPE_GAP,
    };
  }
  return BOUNDS[BOUNDS_INDEX++];
}

function jumpAbstract() {
  if (gameContextApi.isPlaying) {
    jump();
  }
}

function jumpAbstractWithStopEventPropagation(event) {
  event.event.stopPropagation();
  if (gameContextApi.isPlaying) {
    jump();
  }
}

function stopGame() {
  if (!gameOver) {
    hitSound.play();
    player.anims.play("dead");
    gameOver = true;
    gameContextApi.setCount(pipesPassed);
    gameContextApi.updateRecord(pipesPassed);
    gameContextApi.setCurrentScreen(UI_STATE.TRY_AGAIN);
    makeBounds();
  }
}

function jump() {
  if (startGame) {
    restoreAudioContext();
    player.setStatic(false);
    startGame = false;
  }
  if (!gameOver) {
    player.angle = BIRD_ANGLE;
    resetPlayerAngleData();
    player.setVelocity(ZERO, BIRD_JUMP_POWER);
    jumpSound.play();
  }
  if (gameOver) {
    restartGame();
  }
}

function resetPlayerAngleData() {
  angleAccumulator = ZERO;
  stepBeforeRotate = ZERO;
}

function restoreAudioContext() {
  if (AUDIO_CONTEXT.state === "suspended") {
    AUDIO_CONTEXT.resume();
  }
}

export function restartGame() {
  gameContextApi.setCount(ZERO);
  pipesPassed = 0;
  resetPlayer();
  resetPipes();
  startGame = true;
  gameOver = false;
}

function resetPlayer() {
  player.setStatic(true);
  player.setPosition(PLAYER_X, SCREEN_HEIGHT / 3);
  resetPlayerAngleData();
  player.angle = ZERO;
  player.anims.play("fly");
}

function update(_time, delta) {
  ACCUMULATOR += delta;
  if (ACCUMULATOR >= TIME_STEP) {
    if (startGame) {
      moveBackgroundTile();
      moveGroundTile();
    } else if (!gameOver) {
      if (player.y < ZERO) stopGame();
      moveGroundTile();
      moveBackgroundTile();
      pipesContainer.movePipes();
      checkPlayerRotation();
      checkPipeGroupThatIsAboutToDisappear();
    }
    ACCUMULATOR -= TIME_STEP;
    this.matter.world.step(TIME_STEP);
  }
}

function moveGroundTile() {
  sprite1.tilePositionX += NEW_SPEED;
}
function moveBackgroundTile() {
  sprite2.tilePositionX += BACKGROUND_TILE_SPEED;
}

function checkPlayerRotation() {
  if (stepBeforeRotate < MAX_STEP_BEFORE_ROTATE) {
    stepBeforeRotate += ROTATE_INCREMENT;
  } else if (player.angle < MAX_ROTATE_ANGLE) {
    player.angle += angleAccumulator;
    angleAccumulator += ANGLE_ACCUMULATOR_SPEED;
  }
}

function checkPipeGroupThatIsAboutToDisappear() {
  if (pipesContainer[lastPipeGroupIndexPassed].checkX()) {
    lastPipeGroupIndexPassed++;
    if (lastPipeGroupIndexPassed > PIPES_MAX_INDEX_AMOUNT)
      lastPipeGroupIndexPassed = 0;
  }
}


function resetPipes() {
  pipesContainer.destroy();
  createPipes();
  lastPipeGroupIndexPassed = 0;
}

function createPipes() {
  for (let time = 1; time <= PIPES_MAX_AMOUNT; time++) {
    const { topBound, lowerBound } = getNewPipePair();
    let pipeGroup = [];
    pipeGroup.notPassedBird = true;

    let pipeTop = scene.matter.add.image(
      PIPE_SPAWN_X + PIPE_DISTANCE * time,
      topBound,
      "pipeTop",
      null,
      PIPE_CONFIG
    );

    let pipeBottom = scene.matter.add.image(
      PIPE_SPAWN_X + PIPE_DISTANCE * time,
      lowerBound,
      "pipeBottom",
      null,
      PIPE_CONFIG
    );

    pipeGroup.checkX = function () {
      if (!gameOver && pipeGroup.notPassedBird && pipeTop.x < PLAYER_X) {
        pointSound.play();
        pipesPassed++;
        updateCounter(pipesPassed);
        pipeGroup.notPassedBird = false;
      } else if (pipeTop.x < PIPE_DEATH_X) {
        pipeGroup.notPassedBird = true;
        const { topBound, lowerBound } = getNewPipePair();
        pipeTop.setPosition(PIPE_SPAWN_X, topBound);
        pipeBottom.setPosition(PIPE_SPAWN_X, lowerBound);
        return true;
      }
      return false;
    };

    pipeGroup.move = function () {
      pipeTop.x -= NEW_SPEED;
      pipeBottom.x -= NEW_SPEED;
    };

    pipeGroup.destroy = function () {
      pipeTop.destroy();
      pipeBottom.destroy();
      pipeGroup = null;
    };
    pipeGroup.push(pipeTop, pipeBottom);
    pipesContainer.push(pipeGroup);
  }

  pipesContainer.movePipes = () =>
    pipesContainer.forEach((pipeGroup) => pipeGroup.move());
  pipesContainer.destroy = () => {
    pipesContainer.forEach((pipeGroup) => pipeGroup.destroy());
    pipesContainer = [];
  };
}
