function init() {
  console.info("initialized");
  const canvas = document.getElementById("game");

  let stage = new createjs.Stage(canvas);
  let shape = new createjs.Shape();
  shape.graphics
      .beginFill('#FF00FF')
      .rect(-10, -10, 20, 20);
  shape.x = 100;
  shape.y = 100;
  shape.rotation = 30;
  stage.addChild(shape);

  let ss = new createjs.SpriteSheet({
    images: ["balls-boom.png"],
    frames: {
      width: 16,
      height: 16,
      count: 544,
      regX: 8,
      regY: 8
    },
    animations: {
      one: 42,
      small: [0, 33, "small"],
      big: [0, 543 - 34, "big"],
      boom : [544 - 34, 543]
    }
  });

  let sprite = new createjs.Sprite(ss);
  sprite.x = 200;
  sprite.y = 200;
  sprite.gotoAndPlay("big");
  stage.addChild(sprite);
  stage.update();

  createjs.Ticker.framerate = 30;
  createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  createjs.Ticker.on("tick", tick);

  function tick() {
    sprite.x += 1;
    if (sprite.x > 300)
      sprite.x = 10;
    stage.update();
  }

  sprite.on("click", boomClick);

  function boomClick() {
    sprite.gotoAndPlay("boom");
    console.log("boom");
    sprite.on("animationend", function() {
      console.log("boom finished");
      stage.removeChild(sprite);
    });
  }

  let container = new createjs.Container();
  let triangle = new createjs.Shape();
  let sq = new createjs.Shape();
  container.addChild(triangle);
  container.addChild(sq);
  stage.addChild(container);

  triangle.graphics
      .beginFill('green')
      .moveTo(0, 0)
      .lineTo(40, 0)
      .lineTo(20, 20)
      .endFill();
  sq.graphics
      .beginFill('red')
      .rect(0, 0, 30, 30);
  triangle.x = 20;
  container.x = 100;
  container.y = 240;

  stage.aaa = 'stage';
  sq.aaa = 'sq';
  triangle.aaa = 'triangle';
  container.aaa = 'container';

  stage.on("click", function(e) {
    console.log('stage click', showEvent(e));
  });
  container.on("click", function(e) {
    console.log('container click', showEvent(e));
  });
  sq.on("click", function(e) {
    console.log('sq click', showEvent(e));
  });
  triangle.on("click", function(e) {
    console.log('triangle click', showEvent(e));
  });

  function showEvent(e) {
    return {
      localX: e.localX,
      localY: e.localY,
      stageX: e.stageX,
      stageY: e.stageY,
      target: e.target.aaa,
      currentTarget: e.currentTarget.aaa
    }
  }

  function clickListener(e) {
    console.log('click', showEvent(e));
  }
  stage.addEventListener('click', clickListener, true);
  sq.addEventListener('click', clickListener, true);
  triangle.addEventListener('click', clickListener, true);
  container.addEventListener('click', clickListener, true);

  stage.enableMouseOver();
  container.on("rollover", function() {
    console.log("container rollover");
  });
  container.on("mouseover", function() {
    console.log("container mouseover");
  });
  container.on("rollout", function() {
    console.log("container rollout");
  });
  container.on("mouseout", function() {
    console.log("container mouseout");
  });
  let square = new createjs.Shape();
  square.graphics
      .beginFill('navy')
      .rect(0, 0, 50, 50);
  stage.addChild(square);

  createjs.Tween.get(square, {})
      .to({x : 400}, 1000)
      .to({y: 200}, 2000)
      .wait(500) 
      .call(function () {
        console.log('here')
      })
      .to({x: 0, alpha: 0.5}, 3000,
          createjs.Ease.elasticInOut);
}