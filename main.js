noseX = 0;
noseY = 0;
difference = 0;
left_wrist_x = 0;
right_wrist_x = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);
    canvas = createCanvas(550,550);
    canvas.position(560,150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);
        left_wrist_x = results[0].pose.leftWrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        difference = floor(left_wrist_x - right_wrist_x);
        console.log("left_wrist_x = " + left_wrist_x + "right_wrist_x = " + right_wrist_x + "difference = " + difference);
    }
}

function draw(){
    background("#969A97");
    fill("#F90093");
    document.getElementById("square_side").innerHTML = "width and height of a square will be " + difference + " px"
    stroke("#F90093");
    square(noseX, noseY, difference);
}