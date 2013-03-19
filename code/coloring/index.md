---
layout: name
section: Code
title: Quadtree Coloring Demo
---
Quadtree Coloring Demo
=======================

This is a simple JavaScript implementation of octree construction and
balancing as well as coloring.

<div id="canvasContainer">
<canvas height="512" width="512" id="canvas"></canvas>
</div>
<div id="guiContainer">
</div>

<div>
	<script src="js/QuadTree.js" type="text/javascript"> </script>
	<script src="js/easel.js" type="text/javascript"> </script>          
	<script src="js/dat.gui.min.js" type="text/javascript"> </script>  
	<script src="js/colorQt.js" type="text/javascript"> </script>	
</div>

Click to start adding points or use the gui to add point distributions.

The initial quadtree construction is based on [Mike Chamber](http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/)'s implementation. The GUI is built using [gui.dat](http://code.google.com/p/dat-gui/).