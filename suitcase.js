img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage("Suitcase and TV.jpg"); 
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    ObjectDetector.detect(img, gotResults);
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for (i = 0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : objects detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);    
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}