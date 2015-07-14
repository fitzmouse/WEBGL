var gl;
var points = [];
var SubDivisionLevel = 12;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert("WebGL isn't available");
    }

        
    var vertices = [

            vec2(-0.86, -0.5),
            vec2(0, 1),
            vec2(0.86, -0.5)
        
      ];

    

    SubDivision(vertices[0], vertices[1], vertices[2], SubDivisionLevel);

    
    function triangle(a, b, c) {
        points.push(a, b, c);
    }


    function SubDivision(a, b, c, count) {

        if (count === 0) {
            triangle(a, b, c);
        }
        else {
            
            var ab = mix(a, b, 0.5);
            var bc = mix(b, c, 0.5);
            var ca = mix(a, c, 0.5);
            --count;

            
            SubDivision(a, ab, ca, count - 1);
            SubDivision(c, ca, bc, count - 1);
            SubDivision(b, bc, ab, count - 1);
            SubDivision(ca, ab, bc, count - 1);

            
            
            }
    }


  
    //initialization


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

   
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
