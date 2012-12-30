var quad;
var canvas;
var stage;
var shape;
var drawColor;

function init()
{
	if(!(!!document.createElement('canvas').getContext))
	{
		var d = document.getElementById("canvasContainer");
		d.innerHTML = "This example requires a browser that supports the HTML5 Canvas element."
		return;
	}	
	

	canvas = document.getElementById("canvas");
	
	//prevent doublclicking on canvas from selecting text on the
	//page
	canvas.onselectstart = function () { return false; }
	
	stage = new Stage(canvas);
	shape = new Shape();
	stage.addChild(shape);

  this.color_quadrants = true;
  this.show_points = true;

  
  this.point_distribution = 'normal';

	drawColor = Graphics.getRGB(0,0,0);
	fillColor = Graphics.getRGB(255,0,0);

	stage.onMouseUp = onMouseUp;
	
	// var isPointQuad = true;
	quad = new QuadTree({
		x:0,
		y:0,
		width:canvas.width,
		height:canvas.height
	}); 
  // , isPointQuad);

  // GUI stuff 
  var gui = new dat.GUI( );
  // var gui = new dat.GUI({ autoPlace: false });
  var fdisp = gui.addFolder('Display');
  var clrEvent = fdisp.add(this, "color_quadrants");
  var ptsEvent = fdisp.add(this, "show_points");
  gui.add(this, 'point_distribution', ['uniform', 'normal', 'circle']);  
  // gui.add(quad, 'maxChildren', 1, 8).step(1);
  // gui.add(quad, 'maxDepth', 3, 8).step(1);
  // gui.add(quad, 'maxColors', 4, 8).step(1);
  gui.add(this, 'add_points');
  gui.add(this, 'qt_balance');
  gui.add(quad, 'coloring_algo', ['greedy', 'LDF', 'SDL']);
  var colorEvent = gui.add(this, 'qt_color');
  var f1 = gui.addFolder('Histogram');
  f1.add(quad, 'c0', 0, 400).step(1);
  f1.add(quad, 'c1', 0, 400).step(1);
  f1.add(quad, 'c2', 0, 400).step(1);
  f1.add(quad, 'c3', 0, 400).step(1);
  f1.add(quad, 'c4', 0, 400).step(1);
  f1.add(quad, 'c5', 0, 400).step(1);
  f1.add(quad, 'c6', 0, 400).step(1);
  
  var clearEvent = gui.add(quad, 'clear');

  colorEvent.onChange(function(value) {
    quad.compute_colors();
    
    // Iterate over all controllers
    for (var i in f1.__controllers) {
      f1.__controllers[i].updateDisplay();
    }

    renderQuad();
    stage.update();
  });
  
  ptsEvent.onChange(function(value) {
    renderQuad();
    stage.update();
  });
  clrEvent.onChange(function(value) {
    renderQuad();
    stage.update();
  });

  clearEvent.onChange(function(value) {
    quad.clear();
   // Iterate over all controllers
   for (var i in f1.__controllers) {
      f1.__controllers[i].updateDisplay();
    }
    shape.graphics.clear();
    stage.update();
  });
	
  // var customContainer = document.getElementById('guiContainer');
  // customContainer.appendChild(gui.domElement);
}

function onMouseUp(e)
{
  // if (e.target == document.getElementById("canvas")) 
  if (stage.mouseInBounds ) {
    quad.insert({x:e.stageX, y:e.stageY});
    renderQuad();
    stage.update();
  } 
}

function nrand() {
  var r = 0.0;

  for (var i=0; i<9; i++) {
    r = r + Math.random();
  }
  return r/9.0;
}

function add_points() 
{
  var ll = 512.0;
  var rx, ry;
  switch (this.point_distribution) {
    case 'normal':
      for (var i=0; i<256; i++) {
        rx = ll * nrand() ;
        ry = ll * nrand() ;
        quad.insert({x:rx, y:ry});
      }
      break;
    case 'uniform':
      for (var i=0; i<256; i++) {
        rx = ll * Math.random() ;
        ry = ll * Math.random();
        quad.insert({x:rx, y:ry});
      }
      break;
    case 'circle':
      for (var i=0; i<256; i++) {
        var t = 2 * Math.PI * Math.random();
        var u = Math.random() + Math.random();
        var r;
        if (u>1) 
          r = 2-u; 
        else 
          r = u;
        r = r * ll/3;
        rx = r * Math.cos(t) + ll/2; 
        ry = r * Math.sin(t) + ll/2;
        quad.insert({x:rx, y:ry});
      }
      break;
  }
  renderQuad();
  stage.update();
}

function qt_balance() {
    for (var i=0; i<8; i++)
      quad.balance();

    renderQuad();
    stage.update();

}

function qt_color() {
}


function renderQuad()
{
  var g = shape.graphics;
  g.clear();
  g.setStrokeStyle(1);
	g.beginStroke(drawColor);
	
	drawNode(quad.root);
}

function getColor (node) {
  // var COLORS = [ '#E0E4CC', '#D38630', '#A7DBA8', '#69D2E7', '#FA6900', '#FF4E50', '#F9D423' ];
  // var COLORS = [ '#F9AD81', '#C4DF9B', '#8493CA', '#BC8DBF', '#7BCDC8', '#F6989D', '#222222', '#111111', '#333333' ];  // pastels
  var COLORS = [ '#F9AD81', '#C4DF9B', '#8493CA', '#BC8DBF', '#7BCDC8', '#F6989D', '#AA2222', '#22AA22', '#2222AA', '#AAAA22', '#22AAAA', '#AA22AA'];


  if (node.color != -1) 
    return COLORS[node.color];
  else 
    return '#DDDDDD'; // '#FFECB0';
	
  var quad = node._bounds;
  // depth of the element
  var dd = Math.ceil(Math.log(1024/quad.width)/Math.LN2) - 1;
  var oddx = ( quad.x  / quad.width) % 2;
  var oddy = ( quad.y  / quad.height ) % 2;
  var cnum = oddx + 2*oddy;
  
  var px = quad.x;
  var py = quad.y;
  var psz = 2*quad.width;

  if (oddx) px = px - quad.width; 
  if (oddy) py = py - quad.height; 
  


  var pnum = (px/psz)%2 + 2*((py/psz)%2);


  switch ( dd ) {
    case 0: 
      switch (cnum) {
        case 0 : cnum=0; break;
        case 1 : cnum=1; break;
        case 2 : cnum=2; break;
        case 3 : cnum=3; break;
      }; break;
    case 1:
      switch (cnum) {
        case 0 : cnum=3; break;
        case 1 : cnum=2; break;
        case 2 : cnum=1; break;
        case 3 : cnum=0; break;
      }; break;
    case 2:
      switch (cnum) {
        case 0 : cnum=2; break;
        case 1 : cnum=3; break;
        case 2 : cnum=4; break;
        case 3 : cnum=5; break;
      }; break;
    case 3:
      switch (cnum) {
        case 0 : cnum=4; break;
        case 1 : cnum=5; break;
        case 2 : cnum=0; break;
        case 3 : cnum=1; break;
      }; break;
      
  };

  return COLORS[cnum ];
}


function drawNode(node)
{
	var bounds = node._bounds;
	var g = shape.graphics;

  // g.fillStyle = random( COLORS );
	// g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
	g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

	// g.beginFill( random (COLORS)  );
  if (color_quadrants) {
    g.beginFill( getColor (node)  );
    g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
    g.endFill();
  } else {
    g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  if (show_points) {
	var cLen = node.children.length;
	var childNode;
	if(cLen)
	{
		for(var j = 0; j < cLen; j++)
		{
			childNode = node.children[j];
			g.beginFill(fillColor);
			g.drawCircle(childNode.x, childNode.y,2);
      g.endFill();
			g.beginStroke(drawColor);
			g.drawCircle(childNode.x, childNode.y,2);
      // fillText("x", childNode.x, childNode.y);
		}
	}
  }
	
	var len = node.nodes.length;
	
	for(var i = 0; i < len; i++)
	{
		drawNode(node.nodes[i]);
	}	
}

window.onload = init;


