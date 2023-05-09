document.addEventListener("keydown", function(event) {
  var moved = true;
  if (event.key === "ArrowUp" || event.key === "w") {
    up = true;
  } else if (event.key === "ArrowDown" || event.key === "s") {
    down = true;
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    left = true;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    right = true;
  } else {
    moved = false;
  }
  if (moved && notStarted >= 20) {
    notStarted = -1;
    document.getElementById("text-1").innerText = "";
    document.getElementById("text-2").innerText = "";
  }
});
document.addEventListener("keyup", function(event) {
  if (event.key === "ArrowUp" || event.key === "w") {
    up = false;
  } else if (event.key === "ArrowDown" || event.key === "s") {
    down = false;
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    left = false;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    right = false;
  }
});

var c = document.getElementById("canvas").getContext("2d");

var keysImg = new Image();
keysImg.src = "assets/keys.png";

var up = false;
var down = false;
var left = false;
var right = false;

var accuratePlayerX = 50;
var accuratePlayerY = 50;
var playerX = 50;
var playerY = 50;

var objects = [];
var notStarted = 21;
var frameCount = 0;

var noHit = false;

function frame() {
  if (notStarted >= 0) {
    notStarted++;
    if (notStarted == 20) {
      document.getElementById("text-1").innerText = "YOU LOST!\nSCORE: " + Math.floor(frameCount / 20);
      document.getElementById("text-2").innerText = "MOVE TO START...";
      accuratePlayerX = 50;
      accuratePlayerY = 50;
      objects = [];
      frameCount = 0;
    }
    if (notStarted >= 20) {
      c.fillStyle = "#FFF";
      c.fillRect(0, 0, 100, 100);
      c.clearRect(1, 1, 98, 98);
      c.drawImage(keysImg, 3, 66);
    }
    return;
  }
  movePlayer();
  if (frameCount % 50 == 0 && frameCount < 500) {
    var y = Math.random() * 50 + 20;
    spawnLeftwardsTopPipe(y);
    spawnLeftwardsBottomPipe(y + 10);
  } else if (frameCount % 50 == 0 && frameCount < 1000) {
    var y = Math.random() * 50 + 20;
    if (frameCount % 100 == 0) {
      spawnLeftwardsTopPipe(y);
      spawnLeftwardsBottomPipe(y + 10);
    } else {
      spawnRightwardsTopPipe(y);
      spawnRightwardsBottomPipe(y + 10);
    }
  } else if (frameCount % 50 == 0 && frameCount < 2000) {
    var y = Math.random() * 50 + 20;
    if (frameCount % 100 == 0) {
      spawnLeftwardsTopPipe(y);
      spawnLeftwardsBottomPipe(y + 10);
      spawnRightwardsTopPipe(y);
      spawnRightwardsBottomPipe(y + 10);
    } else {
      spawnUpwardsLeftPipe(y);
      spawnUpwardsRightPipe(y + 10);
      spawnDownwardsLeftPipe(y);
      spawnDownwardsRightPipe(y + 10);
    }
  }
  if (frameCount % 20 == 0 && frameCount >= 1500 && frameCount < 2000) {
    if (frameCount % 100 == 0) {
      spawnUpwardsBar();
      spawnDownwardsBar();
    } else {
      spawnLeftwardsBar();
      spawnRightwardsBar();
    }
  }
  if (frameCount >= 2050 && frameCount < 2570) {
    var x = Math.sin(frameCount / 45) * 45 + 45;
    if (frameCount >= 2200) {
      spawnDownwardsLeftPipe(x);
    }
    spawnDownwardsRightPipe(x + 10);
  } else if (frameCount < 2750) {
    if (frameCount % 12 == 0) {
      spawnVerticalBeam(1400 - frameCount / 2);
    }
  } else if (frameCount < 3200) {
    if (frameCount % 20 == 0) {
      spawnVerticalBeam();
    }
  } else if (frameCount < 3500) {
    if (frameCount % 20 == 0) {
      spawnVerticalBeam();
      spawnHorizontalBeam();
    }
  } else if (frameCount < 4000) {
    if ((frameCount - 4000) % 15 == 0) {
      spawnVerticalBeam();
      spawnHorizontalBeam();
    }
  } else if (frameCount < 5200) {
    if (frameCount < 4400) {
      if (frameCount % 10 == 0) {
        if (frameCount % 400 < 100) {
          spawnBullet(frameCount % 100, -1);
        } else if (frameCount % 400 < 200) {
          spawnBullet(101, frameCount % 100);
        } else if (frameCount % 400 < 300) {
          spawnBullet(100 - frameCount % 100, 101);
        } else if (frameCount % 400 < 400) {
          spawnBullet(-1, 100 - frameCount % 100);
        }
      }
    } else if (frameCount < 4800) {
      if (frameCount % 5 == 0) {
        if (frameCount % 400 < 100) {
          spawnBullet(frameCount % 100, -1);
        } else if (frameCount % 400 < 200) {
          spawnBullet(101, frameCount % 100);
        } else if (frameCount % 400 < 300) {
          spawnBullet(100 - frameCount % 100, 101);
        } else if (frameCount % 400 < 400) {
          spawnBullet(-1, 100 - frameCount % 100);
        }
      }
    } else {
      if (frameCount % 2 == 0) {
        if (frameCount % 400 < 100) {
          spawnBullet(frameCount % 100, -1);
        } else if (frameCount % 400 < 200) {
          spawnBullet(101, frameCount % 100);
        } else if (frameCount % 400 < 300) {
          spawnBullet(100 - frameCount % 100, 101);
        } else if (frameCount % 400 < 400) {
          spawnBullet(-1, 100 - frameCount % 100);
        }
      }
    }
    if (frameCount % 10 == 0) {
      if (frameCount % 400 < 100) {
        spawnBullet(frameCount % 100, -1);
      } else if (frameCount % 400 < 200) {
        spawnBullet(101, frameCount % 100);
      } else if (frameCount % 400 < 300) {
        spawnBullet(100 - frameCount % 100, 101);
      } else if (frameCount % 400 < 400) {
        spawnBullet(-1, 100 - frameCount % 100);
      }
      if (frameCount % 40 == 0 && frameCount >= 4400) {
        spawnLeftwardsBar();
        spawnRightwardsBar();
        spawnUpwardsBar();
        spawnDownwardsBar();
      }
      if (frameCount >= 4800) {
        if (frameCount % 100 == 0) {
          spawnHorizontalBeam(0);
          spawnHorizontalBeam(50);
          spawnHorizontalBeam(100);
          spawnVerticalBeam(0);
          spawnVerticalBeam(50);
          spawnVerticalBeam(100);
        } else if (frameCount % 50 == 0) {
          spawnHorizontalBeam(25);
          spawnHorizontalBeam(75);
          spawnVerticalBeam(25);
          spawnVerticalBeam(75);
        }
      }
    }
  } else if (frameCount == 5300) {
    for (var i = 0; i < 5; i++) {
      spawnBullet(i * 20, -1);
      spawnBullet(101, i * 20);
      spawnBullet(100 - i * 20, 101);
      spawnBullet(-1, 100 - i * 20);
    }
  }
  draw();
  frameCount++;
}

function movePlayer() {
  var horizontal = (left || right) && !(left && right);
  var vertical = (up || down) && !(up && down);
  if (horizontal && vertical) {
    accuratePlayerX += left ? -.707 : .707;
    accuratePlayerY += up ? -.707 : .707;
  } else if (horizontal) {
    accuratePlayerX += left ? -1 : 1;
  } else if (vertical) {
    accuratePlayerY += up ? -1 : 1;
  }
  if (accuratePlayerX < 2) {
    accuratePlayerX = 2;
  } else if (accuratePlayerX > 98) {
    accuratePlayerX = 98;
  }
  if (accuratePlayerY < 2) {
    accuratePlayerY = 2;
  } else if (accuratePlayerY > 98) {
    accuratePlayerY = 98;
  }
  playerX = Math.round(accuratePlayerX);
  playerY = Math.round(accuratePlayerY);
}

function spawnHorizontalBeam(beamY = Math.floor(Math.random() * 99 + 1)) {
  objects.push({
    type: "horizontalBeam",
    y: Math.round(beamY),
    stage: 0
  });
}

function spawnVerticalBeam(beamX = Math.floor(Math.random() * 99 + 1)) {
  objects.push({
    type: "verticalBeam",
    x: Math.round(beamX),
    stage: 0
  });
}

function spawnLeftwardsBar(barY = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "leftwardsBar",
    y: Math.round(barY),
    stage: 0
  });
}

function spawnRightwardsBar(barY = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "rightwardsBar",
    y: Math.round(barY),
    stage: 0
  });
}

function spawnUpwardsBar(barX = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "upwardsBar",
    x: Math.round(barX),
    stage: 0
  });
}

function spawnDownwardsBar(barX = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "downwardsBar",
    x: Math.round(barX),
    stage: 0
  });
}

function spawnLeftwardsTopPipe(pipeY = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "leftwardsTopPipe",
    y: Math.round(pipeY),
    stage: 0
  });
}

function spawnLeftwardsBottomPipe(pipeY = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "leftwardsBottomPipe",
    y: Math.round(pipeY),
    stage: 0
  });
}

function spawnRightwardsTopPipe(pipeY = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "rightwardsTopPipe",
    y: Math.round(pipeY),
    stage: 0
  });
}

function spawnRightwardsBottomPipe(pipeY = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "rightwardsBottomPipe",
    y: Math.round(pipeY),
    stage: 0
  });
}

function spawnUpwardsLeftPipe(pipeX = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "upwardsLeftPipe",
    x: Math.round(pipeX),
    stage: 0
  });
}

function spawnUpwardsRightPipe(pipeX = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "upwardsRightPipe",
    x: Math.round(pipeX),
    stage: 0
  });
}

function spawnDownwardsLeftPipe(pipeX = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "downwardsLeftPipe",
    x: Math.round(pipeX),
    stage: 0
  });
}

function spawnDownwardsRightPipe(pipeX = Math.floor(Math.random() * 98 + 1)) {
  objects.push({
    type: "downwardsRightPipe",
    x: Math.round(pipeX),
    stage: 0
  });
}

function spawnBullet(bulletX = Math.floor(Math.random() * 98 + 1), bulletY = Math.floor(Math.random() * 98 + 1)) {
  var bulletVelX = accuratePlayerX - bulletX;
  var bulletVelY = accuratePlayerY - bulletY;
  var mult = 1 / Math.sqrt(bulletVelX * bulletVelX + bulletVelY * bulletVelY);
  objects.push({
    type: "bullet",
    accurateX: Math.round(bulletX),
    accurateY: Math.round(bulletY),
    x: 0,
    y: 0,
    velX: bulletVelX * mult,
    velY: bulletVelY * mult,
    stage: 0
  });
}

function draw() {
  c.fillStyle = "#FFF";
  c.fillRect(0, 0, 100, 100);
  c.clearRect(1, 1, 98, 98);
  var hit = false;
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    switch (object.type) {
      case "horizontalBeam": {
        object.stage++;
        if (object.stage == 24) {
          objects.splice(i, 1);
          i--;
        } else if (object.stage < 10) {
          c.fillStyle = "#FFF8";
          c.fillRect(0, object.y - 1, 100, 2);
        } else if (object.stage < 18) {
          c.fillStyle = "#FFF";
          c.fillRect(0, object.y - object.stage + 8, 100, (object.stage - 8) * 2);
          if (playerY >= object.y - object.stage + 8 && playerY <= object.y + object.stage - 8) {
            hit = true;
          }
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(0, object.y - 24 + object.stage, 100, (24 - object.stage) * 2);
          if (playerY >= object.y - 24 + object.stage && playerY <= object.y + 24 - object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "verticalBeam": {
        object.stage++;
        if (object.stage == 24) {
          objects.splice(i, 1);
          i--;
        } else if (object.stage < 10) {
          c.fillStyle = "#FFF8";
          c.fillRect(object.x - 1, 0, 2, 100);
        } else if (object.stage < 18) {
          c.fillStyle = "#FFF";
          c.fillRect(object.x - object.stage + 8, 0, (object.stage - 8) * 2, 100);
          if (playerX >= object.x - object.stage + 8 && playerX <= object.x + object.stage - 8) {
            hit = true;
          }
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.x - 24 + object.stage, 0, (24 - object.stage) * 2, 100);
          if (playerX >= object.x - 24 + object.stage && playerX <= object.x + 24 - object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "leftwardsBar": {
        object.stage++;
        if (object.stage == 110) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(100 - object.stage, object.y, 10, 2);
          if (playerX >= 100 - object.stage && playerX <= 110 - object.stage && playerY >= object.y && playerY <= object.y + 2) {
            hit = true;
          }
        }
        break;
      }
      case "rightwardsBar": {
        object.stage++;
        if (object.stage == 110) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.stage - 10, object.y, 10, 2);
          if (playerX >= object.stage - 10 && playerX <= object.stage && playerY >= object.y && playerY <= object.y + 2) {
            hit = true;
          }
        }
        break;
      }
      case "upwardsBar": {
        object.stage++;
        if (object.stage == 110) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.x, 100 - object.stage, 2, 10);
          if (playerX >= object.x && playerX <= object.x + 2 && playerY >= 100 - object.stage && playerY <= 110 - object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "downwardsBar": {
        object.stage++;
        if (object.stage == 110) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.x, object.stage - 10, 2, 10);
          if (playerX >= object.x && playerX <= object.x + 2 && playerY >= object.stage - 10 && playerY <= object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "leftwardsTopPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(100 - object.stage, 0, 2, object.y);
          if (playerX >= 100 - object.stage && playerX <= 102 - object.stage && playerY <= object.y) {
            hit = true;
          }
        }
        break;
      }
      case "leftwardsBottomPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(100 - object.stage, object.y, 2, 100 - object.y);
          if (playerX >= 100 - object.stage && playerX <= 102 - object.stage && playerY >= object.y) {
            hit = true;
          }
        }
        break;
      }
      case "rightwardsTopPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.stage - 1, 0, 2, object.y);
          if (playerX >= object.stage - 1 && playerX <= 1 + object.stage && playerY <= object.y) {
            hit = true;
          }
        }
        break;
      }
      case "rightwardsBottomPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.stage - 1, object.y, 2, 100 - object.y);
          if (playerX >= object.stage - 1 && playerX <= 1 + object.stage && playerY >= object.y) {
            hit = true;
          }
        }
        break;
      }
      case "upwardsLeftPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(0, 100 - object.stage, object.x, 2);
          if (playerX <= object.x && playerY >= 100 - object.stage && playerY <= 102 - object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "upwardsRightPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.x, 100 - object.stage, 100 - object.x, 2);
          if (playerX >= object.x && playerY >= 100 - object.stage && playerY <= 102 - object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "downwardsLeftPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(0, object.stage - 1, object.x, 2);
          if (playerX <= object.x && playerY >= object.stage - 1 && playerY <= 1 + object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "downwardsRightPipe": {
        object.stage++;
        if (object.stage == 102) {
          objects.splice(i, 1);
          i--;
        } else {
          c.fillStyle = "#FFF";
          c.fillRect(object.x, object.stage - 1, 100 - object.x, 2);
          if (playerX >= object.x && playerY >= object.stage - 1 && playerY <= 1 + object.stage) {
            hit = true;
          }
        }
        break;
      }
      case "bullet": {
        object.stage++;
        if (object.accurateX <= -10 || object.accurateX >= 110 || object.accurateY <= -10 || object.accurateY >= 110) {
          objects.splice(i, 1);
          i--;
        } else {
          object.accurateX += object.velX;
          object.accurateY += object.velY;
          object.x = Math.round(object.accurateX);
          object.y = Math.round(object.accurateY);
          if (playerX >= object.x && playerX <= object.x + 2 && playerY >= object.y && playerY <= object.y + 2) {
            hit = true;
          }
          object.accurateX += object.velX;
          object.accurateY += object.velY;
          object.x = Math.round(object.accurateX);
          object.y = Math.round(object.accurateY);
          c.fillStyle = "#FFF";
          c.fillRect(object.x, object.y, 2, 2);
          if (playerX >= object.x && playerX <= object.x + 2 && playerY >= object.y && playerY <= object.y + 2) {
            hit = true;
          }
        }
        break;
      }
    }
  }
  if (noHit) {
    c.fillStyle = "#F00";
    if (hit) {
      c.fillStyle = "#0D0";
    }
  } else {
    c.fillStyle = "#F00";
    if (hit) {
      notStarted = 0;
    }
  }
  c.fillRect(playerX - 1, playerY - 1, 2, 2);
}

setInterval(frame, 50);
