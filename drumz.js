(function () {

    var mainRoutine = function (frame) { // Runs on every frame
        
        gestureHandler(frame);  // routine for handling takeoff, landing and rotations
        // handPos(frame); // all other actions
        // document.getElementById("drum1").src="d2dbig.png";
        // document.getElementById("drum2").src="d2dbigright.png";
    }


    var gestureHandler = function (frame) { // handles keyTap
        var gestures = frame.gestures;
        if (gestures && gestures.length > 0) {
            stopped = false;
            for (var i = 0; i < gestures.length; i++ ) {
                var gesture = gestures[i];
                if (gesture.type === 'keyTap') {
                    if (gesture.position[0] > 0) { // y-axis
                        // play right drum sound
                        document.getElementById('right').play();
                        // document.getElementById("drum2").src="d2dcr.png";
                        if (curarrow.name == "right") {
                            points += 2
                            document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
                        } else {
                            points -= 1
                            document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
                        }
                        drawArrow()
                        console.log("right")
                    } else if (gesture.position[0] < 0) { // y-axis
                        // play left drum sound
                        document.getElementById('left').play();
                        // document.getElementById("drum1").src="d2dcl.png";
                        if (curarrow.name == "left") {
                            points += 2
                            document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
                        } else {
                            points -= 1
                            document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
                        }
                        drawArrow()
                        console.log("left")
                    }
                }
            }
        }
    };

    var handPos = function (frame) {
        var VELOCITY_THRESHOLD = -600 //  m/s
        var pointables = frame.pointables 
        fingerdict = {}

        // if (frame.pointables.length > 0) {
        //     for (var i = 0; i < pointables.length; i++) {
        //         if (pointable.tipVelocity[1] < VELOCITY_THRESHOLD) {
        //             continue;
        //         }
        //         return 
        //     }
        //     if (gesture.position[0] > 0) { // y-axis
        //         // play right drum sound
        //         document.getElementById('right').play();
        //         if (curarrow.name == "right") {
        //             points += 1
        //             document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
        //         }
        //         drawArrow()
        //         console.log("right")
        //     } else if (gesture.position[0] < 0) { // y-axis
        //         // play left drum sound
        //         document.getElementById('left').play();
        //         if (curarrow.name == "left") {
        //             points += 1
        //             document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
        //         }
        //         drawArrow()
        //         console.log("left")
        //     }

        // }
        
        if (pointables.length > 0) {
            for (var i = 0; i < pointables.length; i++) {
                pointable = pointables[i]
                if (pointable.tipVelocity[1] < VELOCITY_THRESHOLD) {
                    fingerdict[pointable.id] = pointable.tipPosition
                }
            }
        }

        var keys = Object.keys(fingerdict)

        for (var i = 0; i < keys.length; i++) {
            var hit = fingerdict[keys[i]]
            var pointable = frame.pointable(keys[i])
            var pointable_old = controller.frame(1).pointable(keys[i])
            
            if (pointable.valid) {
                if (pointable_old.valid && pointable.tipVelocity[1] - pointable_old.tipVelocity[1] > VELOCITY_THRESHOLD/3) {
                 
                    if (pointable.tipPosition[0] > 0) {
                        // play right drum
                        document.getElementById('right').play();
                        if (curarrow.name == "right") {
                            points += 1
                            document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
                        }
                        drawArrow()
                        console.log("right")
                    } else if (pointable.tipPosition[0] < 0) {
                        // play left drum
                        document.getElementById('left').play();
                        if (curarrow.name == "left") {
                            points += 1
                            document.querySelector('#points').innerHTML = "POINTS: " + points.toString();
                        }
                        drawArrow()
                        console.log("left")
                    }
                }
            } 
        }
    
        fingerdict = {}
        
    };

    var types=
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
      }
      ]

    function getRandomInt() {
        return Math.floor((Math.random()*2));
    }

    function drawArrow() {

              /*initalize command 
              if user strikes right/left, add point
              else, you get 2 seconds until next command (lose points?)
              stopwhen you reach 100 seconds? time limit?
        */
        // if (next==true) {
        curarrow = types[getRandomInt()];

        console.log(curarrow);

        if (curarrow.name=="right") {
            document.getElementById("arrow").src = "r.png"
        } else {
            document.getElementById("arrow").src = "l.png";
        }
        // next=false;
        // }
          
    }
    var curarrow
    var points = 0
    drawArrow()
    controller = new Leap.Controller({enableGestures: true});
    controller.connect();
    controller.on('frame', function (data) {
        mainRoutine(data)
    });

}).call(this);