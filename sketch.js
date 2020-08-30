let numberOfIterations;
let data = [];
function setup()
{
    createCanvas(800, 800);    
    numberOfIterations = 20;
    translate(width/2, height/2);
    data = calcData();
    paintPixels(data);
}

function draw()
{
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

        if(abs(xn + yn) >= 4)
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
            let nx = map(x, 0, width, -1.5, 0.5);
            let ny = map(y, 0, height, -1.2, 1.2);

            let color = calcMandelbrot(nx, ny);
            data.push([x, y, color]);
        }
    return data;
}