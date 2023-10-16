song1 = "";
song2 = "";
songstat1 = "";
songstat2 = "";
lwx = 0;
lwy = 0;
rwy = 0;
rwx = 0;
stat = "";
scorelw = 0;
scorerw = 0;


function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(450, 300);
    canvas.position();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    song1.play();
    document.getElementById('song_name').innerHTML = "Song Name:Harry Potter Theme Song"

}


function draw() {
    image(video, 0, 0, 450, 300);
    songstat1 = song1.isPlaying();
    songstat2 = song2.isPlaying();


    if (scorerw > 0.2) {
        song2.stop();
        if (songstat1 == false) {
song1.play();
document.getElementById('song_name').innerHTML = "Song Name: Harry Potter Theme Song"
        }
    }

    if (scorelw > 0.2) {
        song1.stop();
        if( songstat2 == false){
            song2.play();
            document.getElementById('song_name').innerHTML = "Song Name: Peter Pan Theme Song";
        }

    }

}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        scorelw = results[0].pose.keypoints[9].score;
        scorerw = results[0].pose.keypoints[10].score;

        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;

    }
}

