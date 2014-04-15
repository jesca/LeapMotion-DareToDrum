 

function state() {
  //create arrow types
  this.types=
  [
{
  "name": "right",
  "type":"single",
  "points":"1"

  },
  {
  "name":"left",
  "type":"single",
  "points":"1"
  },
  {
  "name":"both",
  "type":"double",
  "points":"2"
  }
];


  this.points=0;
}


function updatepoint(p){
document.getElementById("pts").innerHTML="POINTS: " + p + "";
}

function arrow() {
  $('#arrow').addClass('animated slideInDown');

}

    function move(node, posX, posY, posZ, rotX, rotY, rotZ) {
      var style = node.style;
      style.transform =
      style.webkitTransform = 'translate3d(' + posX + 'px, ' + posY + 'px, ' + posZ + 'px) ' +
                              'rotate3d(1, 0, 0, ' + rotX + 'deg) rotate3d(0, 0, 1, ' + rotZ + 'deg)';
    }

    function getNode(id, templateNode) {
      var node  = pool[id];

      if (!node) {
        node  = templateNode.cloneNode(true);
        node.id = id;
        node.style.backgroundColor = randomColor();

        scene.appendChild(node);
        pool[id] = node;
      }

      return node;
    }

    function randomColor() {
      return '#' + Math.floor(Math.random() * 0x1000000).toString(16);
    }

    var app = document.getElementById('app');
    var scene = document.getElementById('scene');
    var sphereTemplate = document.getElementById('sphere');
    var fingerTemplate = document.getElementById('finger');

    var pool = {};

    Leap.loop(function(frame) {
      var ids = {};
      var hands = frame.hands;
      var pointables = frame.pointables;

     

      for (var i = 0, pointable; pointable = pointables[i++];) {
        var posX = (pointable.tipPosition[0] * 3);
        var posY = (pointable.tipPosition[2] * 3) - 200;
        var posZ = (pointable.tipPosition[1] * 3) - 400;
        var dirX = -(pointable.direction[1] * 90);
        var dirY = -(pointable.direction[2] * 90);
        var dirZ = (pointable.direction[0] * 90);

        node = getNode(pointable.id, fingerTemplate);

        move(node, posX, posY, posZ, dirX, dirY, dirZ);

        ids[pointable.id] = true;
      }

      for (var id in pool) {
        if (!ids[id]) {
          scene.removeChild(pool[id]);
          delete pool[id];
        }
      }

  
    });
