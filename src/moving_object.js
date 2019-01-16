const Circle = require('./circle');
const Line = require('./line');

class MovingObject {
  constructor(options) {
    this.date = Date.now()
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.game = options.game;
    this.demo = options.demo;
    
    this.arr = this.populate(options.nums)
    this.org = this.arr.length
    
    if (!this.demo) {
      this.crl = new Circle ({ ctx: this.ctx, canvas: this.canvas, ball_x: 500, ball_y: 100, radius: 5, color: "#00FFFF", red: false });
      this.line = new Line({ cursor: this.crl, ctx: this.ctx})
      this.canvas.addEventListener('mousemove', this.updateMousePos.bind(this));
    }
    
    this.refreshId = setInterval(this.incr.bind(this), 1000 / 2);
    this.update = this.update.bind(this)
  }

  updateMousePos(event) {
    let rect = this.canvas.getBoundingClientRect();
    let root = document.documentElement;
    let x = event.clientX - rect.left - root.scrollLeft;
    let y = event.clientY - rect.top - root.scrollTop;
    
    this.crl.ball_x = x
    this.crl.ball_y = y
  }

  collision(red_bl) {
    if (Date.now() - this.date <= 1000) {
      return null;
    }

    let dif_x = Math.pow((red_bl.ball_x - this.crl.ball_x), 2);
    let dif_y = Math.pow((red_bl.ball_y - this.crl.ball_y), 2);
    let dis = Math.sqrt(dif_x + dif_y);
    let both_rds = red_bl.radius + this.crl.radius


    if (dis <= both_rds) {
      this.game.life -= 1;
      this.date = Date.now();
      document.getElementById('lifes').innerHTML = 'lifes: ' + this.game.life
      }
  }
  
  
  incr() {
    if (this.arr.length >= (this.org * this.org)) {
      clearInterval(this.refreshId);
    }
    let num = Math.round(this.arr.length / 10)
    if (num  < 1) {
      num = 1
    }
    this.arr = this.arr.concat(this.populate(num))
  }
  
  
  update() {
    this.move(this.arr)
    if (!this.demo) {
      // debugger
      this.crl.draw()
      this.line.draw(this.crl.ball_x, this.crl.ball_y)
    }
  }
  
  move(arr) {
    for (let i = 0; i < arr.length; i++) {
      const circl = arr[i];
      circl.move();
      if (!this.demo) {
        this.collision(circl)
      }
    }
  }
  
  populate(nums) {
    const xs = this.getRandom(1, this.canvas.width, nums / 2);
    const ys = this.getRandom(1, this.canvas.height, Math.floor(nums / 2));
    
    let arr = [];
    let obj;
    let circle;
    let radius;
    if (this.demo === 'left_canvas') {
      radius = 2.5;
    } else {
      radius = 5;
    }

    
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i];
      obj = {
        ctx: this.ctx,
        canvas: this.canvas,
        ball_x: x,
        ball_y: 0,
        radius: radius,
        color: "#DC143C", //red,
        red: true
      };
      circle = new Circle(obj);
      arr.push(circle);
    }
    
    for (let j = 0; j < ys.length; j++) {
      const y = ys[j];
      obj = {
        ctx: this.ctx,
        canvas: this.canvas,
        ball_x: this.canvas.width,
        ball_y: y,
        radius: radius,
        color: "#DC143C", // red
        red: true
      };
      circle = new Circle(obj);
      arr.push(circle);
    }
    return arr;
  }
  
  
  getRandom(start, end, nums) {
    var arr = [];
    while (arr.length < nums) {
      var r = Math.floor(Math.random() * end) + start;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }
}

module.exports = MovingObject;