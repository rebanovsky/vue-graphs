<template>
  <div class="hero-content">
    <div class="large-header">
      <canvas ref="demoCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { TweenLite, Circ } from "gsap";

export default {
  setup() {
    const demoCanvas = ref(null);
    let width,
      height,
      largeHeader,
      canvas,
      ctx,
      points,
      target,
      animateHeader = true;

    onMounted(() => {
      initHeader();
      initAnimation();
      addListeners();
    });

    onUnmounted(() => {
      // Remove event listeners when component is unmounted
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
    });

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      largeHeader = demoCanvas.value.parentNode;
      largeHeader.style.height = height + "px";

      canvas = demoCanvas.value;
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");

      // create points
      points = [];
      for (var x = 0; x < width; x = x + width / 10) {
        for (var y = 0; y < height; y = y + height / 20) {
          var px = x + (Math.random() * width) / 10;
          var py = y + (Math.random() * height) / 10;
          var p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // for each point find the 5 closest points
      for (var i = 0; i < points.length; i++) {
        var closest = [];
        var p1 = points[i];
        for (var j = 0; j < points.length; j++) {
          var p2 = points[j];
          if (!(p1 == p2)) {
            var placed = false;
            for (var k = 0; k < 3; k++) {
              if (!placed) {
                if (closest[k] == undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (var k = 0; k < 3; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      // assign a circle to each point
      for (var i in points) {
        var c = new Circle(
          points[i],
          2 + Math.random() * 2,
          "rgba(45, 189, 111,0.3)"
        );
        points[i].circle = c;
      }
    }

    function addListeners() {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    }

    function mouseMove(e) {
      let posx = 0,
        posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + "px";
      canvas.width = width;
      canvas.height = height;
    }

    // animation
    function initAnimation() {
      animate();
      for (var i in points) {
        shiftPoint(points[i]);
      }
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (var i in points) {
          // detect points in range
          if (Math.abs(getDistance(target, points[i])) < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: function () {
          shiftPoint(p);
        },
      });
    }

    // Canvas manipulation
    function drawLines(p) {
      if (!p.active) return;
      for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = "rgba(45, 189, 111," + p.active + ")";
        ctx.stroke();
      }
    }

    function Circle(pos, rad, color) {
      var _this = this;

      // constructor
      (function () {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
      })();

      this.draw = function () {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 4 * Math.PI, false);
        ctx.fillStyle = "rgba(45, 189, 111," + _this.active + ")";
        ctx.fill();
      };
    }

    // Util
    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    let lastTime = 0;
    let vendors = ["ms", "moz", "webkit", "o"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[vendors[x] + "CancelAnimationFrame"] ||
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

    // MIT license

    return {
      demoCanvas,
    };
  },
};
</script>

<style scoped>
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}

body {
  background: #ffffff;
}

#demo-canvas {
  background: #ffffff;
}

a {
  color: #ffffff;
  text-decoration: none;
}

a:hover,
a:focus {
  color: #fa9480;
}

section {
  padding: 1em;
  text-align: center;
}
</style>
