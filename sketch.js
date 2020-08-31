let numberOfIterations;
let minx;
let maxx;
let miny;
let maxy;
function setup()
{
    let size = min(windowWidth, windowHeight);
    let canv = createCanvas(floor(size * 0.9), floor(size*0.9));    
    canv.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
    numberOfIterations = 50;

    minx = -1.5;
    maxx = 0.5;
    miny = -1.2
    maxy = 1.2
    step = 0.1;

    paintPixels(calcData());
    canv.mousePressed(mouseClick);
}

function mouseClick()
{
    let x = map(mouseX, 0, width, minx, maxx);
    let y = map(mouseY, 0, height, miny, maxy);

    let xLengthHalf = abs(maxx - minx)/4;
    let yLengthHalf = abs(maxy - miny)/4;

    minx = x - xLengthHalf;
    maxx = x + xLengthHalf;
    miny = y - yLengthHalf;
    maxy = y + yLengthHalf;

    paintPixels(calcData());
}

function paintPixel(x, y, r, g, b)
{   
    let index = 4*(y*width + x);
    pixels[index] = r;
    pixels[index+1] = g;
    pixels[index+2] = b;
    pixels[index+3] = 255;
}

function paintPixels(data)
{
    loadPixels();

    for(let item of data)
    {
        let color = item[2];        
        paintPixel(item[0], item[1], color, 0, color/4);
    }

    updatePixels();
}

function calcMandelbrot(x, y)
{
    let xp = 0;
    let yp = 0;

    let n = 0;

    for(; n <= numberOfIterations; ++n)
    {
        let xn = xp * xp - yp * yp + x;
        let yn = 2 * xp * yp + y;

        if(xn * xn + yn * yn > 4)
            break;

        xp = xn;
        yp = yn;
    }

    return map(n, 0, numberOfIterations, 0, 255);
}

function calcData()
{
    let data = [];
    for(let x = 0; x < width; ++x)
        for(let y = 0; y < height; ++y)
        {
            let nx = map(x, 0, width, minx, maxx);
            let ny = map(y, 0, height, miny, maxy);

            let color = calcMandelbrot(nx, ny);
            data.push([x, y, color]);
        }
    return data;
}