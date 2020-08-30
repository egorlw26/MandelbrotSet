let numberOfIterations;
let data = [];
let minx;
let maxx;
let miny;
let maxy;
function setup()
{
    let canv = createCanvas(300, 300);    
    numberOfIterations = 50;

    minx = -1.5;
    maxx = 0.5;
    miny = -1.2
    maxy = 1.2
    step = 0.1;

    data = calcData();
    paintPixels(data);
    canv.mousePressed(onMouseClick);
}


function onMouseClick()
{
    minx += mouseX/2;
    maxx -= (width - mouseX)/2;
    miny += mouseY/2;
    maxy -= (height - mouseY)/2;
    console.log(minx, maxx);
    console.log(mouseX);
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
        paintPixel(item[0], item[1], 0, 0, item[2]);
    }

    updatePixels();
}

function calcMandelbrot(x, y)
{
    let xp = 0;
    let yp = 0;

    let n = 0;

    for(; n < numberOfIterations; ++n)
    {
        let xn = xp * xp - yp * yp + x;
        let yn = 2 * xp * yp + y;

        if(xn * xn + yn * yn >= 4)
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