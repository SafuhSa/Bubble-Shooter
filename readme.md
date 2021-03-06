
# Table of Contents
- [Background and Overview](#background-and-overview)
  - [Demo](#demo)
- [Technologies](#technologies)
- [Site](#site)
  - [Landing Page](#landing-page)
  - [In-Game](#in-game)
  - [Game Over](#game-over)
- [Feature Highlights](#feature-highlights)
  - [Collision Detection](#collision-detection)
  - [Animate a line in after effects by mouse movement](#animate-a-line-in-after-effects-mouse-movement)
  - [canvas on different screen sizes](#canvas-on-different-screen-sizes)

## Background and Overview

 Sinuous is a game that show the power of Javascript. focus isnavigate through a field of red spots that are moving towards you in ever-increasing quantities and speed. The game uses HTML5 canvas for the graphics.

Use your mouse to guide your serpentine cursor safely through the field of red dots, snagging power ups to get various boosts and increase that all-powerful high-score. The longer you play, the more green dots will appear on your trail, which will let you sustain more direct hits.


Instructions
1. Avoid red dots.
2. Hit other blue dots for boosts.
3. Score extra points by moving around a lot.
4. Stay alive.


### Demo
[Sinuous Live](https://safuhsa.github.io/Sinuous-Js-game/)

## Technologies

Sinuous was built with pure `Javascript` and no external libraries. All game rendering and styling was done with `HTML5 Canvas`

## Site

### Landing Page

Sinuous is currently work on all modern browsers and Ipads as well .

![](./images/start.png)

### In Game

While playing, red dots will flash and they increase speed with time through incrementing the velocity of moving objects.

![](./images/ingame.png)

### Game Over

Upon game death, red dots will explodes flashing, the menu will reappear with your score.

![](./images/gameover.png)

## Feature Highlights

### Collision Detection

The game detects Serpentine and red dots Collied by comparing the distance between the two objects by the sum of their square radius then square rooting the result. If the result is greater than the distance, the method collision(red_ball) would take one live of the user game session and would draw an explosion. Also this.date is update it to give the user a free short time before he collide with another object.

```Javascript
  collision(red_bl) {
    if (Date.now() - this.date <= 700) {
      this.drawExplosion(red_bl.ball_x, red_bl.ball_y, 5, "#FFD700");
      return null;
    }

    let dif_x = Math.pow(red_bl.ball_x - this.crl.ball_x, 2);
    let dif_y = Math.pow(red_bl.ball_y - this.crl.ball_y, 2);
    let dis = Math.sqrt(dif_x + dif_y);
    let both_rds = red_bl.radius + this.crl.radius;

    if (dis <= both_rds) {
      this.game.live -= 1;
      this.date = Date.now();
      this.audio.play()
      this.drawExplosion(red_bl.ball_x, red_bl.ball_y, 5, "#FFD700");
    }
  }

```
### draw explosion on collisions
 When Serpentine collide with any red dots the game will draw a flashing explosion by adding shadowoffset by x and y of the dot!!
```Javascript
 drawExplosion(x, y, radius, color) {
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = "gold";
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = -3;

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

```

### Animate a line in after effects (mouse movement)
Game will render the players trail as an array of small lines connected together. drawline function will draw each small line then their positions get updated by updatePos function as it map over the array of lines.

```Javascript
  drawline(fromx, fromy, toX, toY) {
    this.ctx.strokeStyle = "#4abaa3";
    this.ctx.lineWidth = 3;
    
    const sdb =  this.ctx.shadowBlur;
    const sdc =  this.ctx.shadowColor;
    const sdx = this.ctx.shadowOffsetX;
    const sdy = this.ctx.shadowOffsetY;

    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = "blue";
    this.ctx.shadowOffsetX = 5;
    this.ctx.shadowOffsetY = 5;

    this.ctx.beginPath();
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(toX, toY);
    this.ctx.stroke();
  }
}

 updatePos() {
      this.xs = this.xs.map(val => val - 2)
      this.ys = this.ys.map(val => val + 1.2)

      this.xs.push(this.crl.ball_x)
      this.ys.push(this.crl.ball_y)
    
    
    if (this.xs.length > 50) {
      this.xs.shift()
      this.ys.shift()
    }
  }
```

### Canvas on different screen sizes
 Canvas adjust on different users screen size by giving the canvas a height and width as a portion of user window size
```Javascript
const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = window.innerWidth / 1.68;
  canvasEl.height = window.innerHeight / 1.58;
```
### Start, pause, restart!!
The Game have one EventListener for any clicks on any buttons wether it was mutes, pause, or even restart the game with multiple if statements to determine the appropriate action. 
```Javascript
document.addEventListener('click', function (event) {
    if (event.target.classList.contains("start")) {}
    else if (event.target.classList.contains("fa-play") || event.target.id === "pause") {}
    else if (event.target.classList.contains("fa-volume-mute") || event.target.classList.contains("fa-volume-up") ) {}
    ..
```

[Back to Top](#)
