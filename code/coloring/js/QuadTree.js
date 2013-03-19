
/**
* A QuadTree implementation in JavaScript, a 2d spatial subdivision algorithm.
* @module QuadTree
**/

(function(window) {

	/*
	function log(msg) {
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
	*/

	/****************** QuadTree ****************/

	/**
	* QuadTree data structure.
	* @class QuadTree
	* @constructor
	* @param {Object} An object representing the bounds of the top level of the QuadTree. The object 
	* should contain the following properties : x, y, width, height
	* (width / height)(false). Default value is false.
	* @param {Number} maxDepth The maximum number of levels that the quadtree will create. Default is 4.
	* @param {Number} maxChildren The maximum number of children that a node can contain before it is split into sub-nodes.
	**/
	function QuadTree(bounds, _maxDepth, _maxChildren)
	{	
		var node;
		
		node = new Node(bounds, 0, _maxDepth, _maxChildren);

		this.root = node;

		// this.bal = 'balance';
		this.coloring_algo = 'greedy';
		this.maxChildren = 1;
		this.maxDepth = 8;
		this.maxColors = 5;

		// colors, histogram
		this.c0 = 0;
		this.c1 = 0;
		this.c2 = 0;
		this.c3 = 0;
		this.c4 = 0;
		this.c5 = 0;
		this.c6 = 0;
	}

	/**
	* The root node of the QuadTree which covers the entire area being segmented.
	* @property root
	* @type Node
	**/
	QuadTree.prototype.root = null;


	/**
	* Inserts an item into the QuadTree.
	* @method insert
	* @param {Object|Array} item The item or Array of items to be inserted into the QuadTree. The item should expose x, y 
	* properties that represents its position in 2D space.
	**/
	QuadTree.prototype.insert = function(item)
	{
		if(item instanceof Array)
		{
			var len = item.length;
		
			for(var i = 0; i < len; i++)
			{
				this.root.insert(item[i]);
			}
		}
		else
		{
			this.root.insert(item);
		}
	}

	/**
	* Clears all nodes and children from the QuadTree
	* @method clear
	**/
	QuadTree.prototype.clear = function()
	{
		this.root.clear();
		// clear out the histogram as well ...
		this.c0 = 0;
		this.c1 = 0;
		this.c2 = 0;
		this.c3 = 0;
		this.c4 = 0;
		this.c5 = 0;
		this.c6 = 0;

	}

	/**
	* Retrieves all items / points in the same node as the specified item / point. If the specified item
	* overlaps the bounds of a node, then all children in both nodes will be returned.
	* @method retrieve
	* @param {Object} item An object representing a 2D coordinate point (with x, y properties), or a shape
	* with dimensions (x, y, width, height) properties.
	**/
	QuadTree.prototype.retrieve = function(item)
	{
		//get a copy of the array of items
		var out = this.root.retrieve(item).slice(0);
		return out;
	}

	/**
	* Enforces 2:1 balance on the quadtree 
	**/
	QuadTree.prototype.balance = function() 
	{
		this.root.balance(this.root);
	}

	/**
	* Compute the degree of each quadrant.
	* 
	* The degree is defined as the number of neighbors that any quadrant has.
	**/ 
	QuadTree.prototype.compute_colors = function()
	{
		// clear out the histogram 
		this.c0 = 0;
		this.c1 = 0;
		this.c2 = 0;
		this.c3 = 0;
		this.c4 = 0;
		this.c5 = 0;
		this.c6 = 0;
		// clear variables 
		this.root.clear_node_variables();
  
		// compute 
		switch (this.coloring_algo) {
			case 'greedy':
			this.root.compute_colors_greedy(this);
			break;
			case 'LDF':
			var nelem = this.root.morton_index(0);
			this.root.find_neighbors(this);
			this.color_ldf(this);
			break;
			case 'SDL':
			var nelem = this.root.morton_index(0);
			this.root.find_neighbors(this);
			break;
		};
	}

	QuadTree.prototype.color_ldf = function(root) 
	{
		var skipped = 100;

		while (skipped) {
			// traverse tree, if degree=d -- color_single
			skipped = this.root.color_by_degree(root, 0);
			// alert(skipped.toString());
		}
	}

	QuadTree.prototype.color_sdl = function(root) 
	{
	}

	/************** Node ********************/


	function Node(bounds, depth, maxDepth, maxChildren)
	{
		this._bounds = bounds;
		this.children = [];
		this.nodes = [];

		// for coloring ...
		this.index = -1;
		this.degree = -1;
		this.weight = 0;
		this.color = -1;
	
		if(maxChildren)
		{
			this._maxChildren = maxChildren;
		
		}
	
		if(maxDepth)
		{
			this._maxDepth = maxDepth;
		}
	
		if(depth)
		{
			this._depth = depth;
		}
	}

	//subnodes
	Node.prototype.nodes = null;
	Node.prototype._classConstructor = Node;

	//children contained directly in the node
	Node.prototype.children = null;
	Node.prototype._bounds = null;

	//read only
	Node.prototype._depth = 0;

	Node.prototype._maxChildren = 1;
	Node.prototype._maxDepth = 8;

	Node.TOP_LEFT = 0;
	Node.TOP_RIGHT = 1;
	Node.BOTTOM_LEFT = 2;
	Node.BOTTOM_RIGHT = 3;


	Node.prototype.insert = function(item)
	{
		if(this.nodes.length)
		{
			var index = this._findIndex(item);
		
			this.nodes[index].insert(item);
		
			return;
		}


		this.children.push(item);

		var len = this.children.length;
		if(!(this._depth >= this._maxDepth) && 
		len > this._maxChildren)
		{
			// test and split the neighbors 
			this.subdivide();

			for(var i = 0; i < len; i++)
			{
				this.insert(this.children[i]);
			}
		
			this.children.length = 0;
    
			// this.balance(root);
		}
	}

	Node.prototype.balance = function(root) 
	{
		// depth first traversal 
		var len = this.nodes.length;
		if(len)
		{
			for(var i = 0; i < len; i++)
			{
				this.nodes[i].balance(root);
			}
		} else {
			// reached leaf ... search based on leaf number 
			var d = this._depth;
			if (d < 3) return;
			var b = this._bounds;
			var oddx = ( b.x  / b.width) % 2;
			var oddy = ( b.y  / b.height ) % 2;
			var cnum = oddx + 2*oddy;
			var sx,sy;
			var nb;

			switch (cnum) {
				case 0: 
				// left 
				sx = b.x - b.width + 1.0/this._maxDepth;
				sy = b.y + 1.0/this._maxDepth;
				if ( (sx < 0) || (sy < 0) ) return;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// bottom
				sx = b.x  + 1.0/this._maxDepth;
				sy = b.y - b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// left-bottom
				sx = b.x - b.width  + 1.0/this._maxDepth;
				sy = b.y - b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				break;
				case 1: 
				// right 
				sx = b.x + b.width + 1.0/this._maxDepth;
				sy = b.y + 1.0/this._maxDepth;
				if ( (sx < 0) || (sy < 0) ) return;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// bottom
				sx = b.x  + 1.0/this._maxDepth;
				sy = b.y - b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// right-bottom
				sx = b.x + b.width  + 1.0/this._maxDepth;
				sy = b.y - b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				break;
				case 2: 
				// left 
				sx = b.x - b.width + 1.0/this._maxDepth;
				sy = b.y + 1.0/this._maxDepth;
				if ( (sx < 0) || (sy < 0) ) return;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// top
				sx = b.x  + 1.0/this._maxDepth;
				sy = b.y  + b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// left-top
				sx = b.x - b.width  + 1.0/this._maxDepth;
				sy = b.y + b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				break;
				case 3: 
				// right 
				sx = b.x + b.width + 1.0/this._maxDepth;
				sy = b.y + 1.0/this._maxDepth;
				if ( (sx < 0) || (sy < 0) ) return;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// top
				sx = b.x + 1.0/this._maxDepth;
				sy = b.y + b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				// right-top
				sx = b.x + b.width  + 1.0/this._maxDepth;
				sy = b.y + b.height + 1.0/this._maxDepth;
				nb = root.retrieve({x:sx , y:sy});
				nb.balanceDivide(d);
				break;
			};
		}
	}

	function sort_and_unique( my_array ) {
		my_array.sort();
		for ( var i = 1; i < my_array.length; i++ ) {
			if ( my_array[i] === my_array[ i - 1 ] ) {
				my_array.splice( i--, 1 );
			}
		}
		return my_array;
	}

	Node.prototype.clear_node_variables = function()
	{
		// depth first traversal 
		var len = this.nodes.length;
		if(len)
		{
			for(var i = 0; i < len; i++)
			{
				this.nodes[i].clear_node_variables();
			}
		} else {
			// reached leaf ... clear variables 
			this.index = -1;
			this.degree = -1;
			this.weight = 0;
			this.color = -1;
			this.nbors = [];
		}
	}

	Node.prototype.morton_index = function(idx)
	{
		// depth first traversal 
		var len = this.nodes.length;
		if(len)
		{
			for(var i = 0; i < len; i++)
			{
				idx = this.nodes[i].morton_index(idx);
			}
			return idx;
		} else {
			// reached leaf ... set index
			this.index = idx;
    
			// testing ...
			// this.color = (idx%7);
			return (idx + 1);
		}
	}

	Node.prototype.find_neighbors = function(root)
	{
		// depth first traversal 
		var len = this.nodes.length;
		if(len)
		{
			for(var i = 0; i < len; i++)
			{
				this.nodes[i].find_neighbors(root);
			}
		} else {
			// reached leaf ... find neighbors ... assume its balanced
			// search for 12 child sized neighbors 
			var d = this._depth;
			var b = this._bounds;
			var lmax = 512;
			var w = b.width/2 ;
			var h = b.height/2 ;

			var sx,sy;
			var nb;
    
			nbrs = [];

			// 1
			sx = b.x - w  + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 2
			sx = b.x + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 3
			sx = b.x - w  + 1;
			sy = b.y + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 4
			sx = b.x - w + 1;
			sy = b.y + h + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 5
			sx = b.x + w + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 6
			sx = b.x + b.width + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 7
			sx = b.x - w + 1;
			sy = b.y + b.height + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 8
			sx = b.x + 1;
			sy = b.y + b.height + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 9
			sx = b.x + w + 1;
			sy = b.y + b.height + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 10
			sx = b.x + b.width + 1;
			sy = b.y  + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 11
			sx = b.x + b.width + 1;
			sy = b.y + h + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// 12
			sx = b.x + b.width + 1;
			sy = b.y + b.height + 1;
			if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.index != -1) nbrs.push(nb.index);
			}
			// got all neighbors ... sort, make unique, compute degree 
			this.nbors = sort_and_unique(nbrs);
			this.degree = this.nbors.length;
			this.weight = Math.random();
			// testing
			// this.color = this.degree - 5;
		}
	}

	Node.prototype.color_by_degree = function(root, skipped) {
		// depth first traversal 
		var len = this.nodes.length;
		if(len)
		{
			for(var i = 0; i < len; i++)
			{
				skipped = this.nodes[i].color_by_degree(root, skipped);
			}
		} else {
			// reached leaf ... color single ...
			if (this.color == -1)
			skipped = this.color_single_JP(root, skipped);
		}
		return skipped;
	}


	function getBestColor(root, clrs) {

		return clrs[0];
  
		var vals = new Array();
		for (var i=0; i<clrs.length; i++) {
			switch(clrs[i]) {
				case 0: vals.push(root.c0); break;
				case 1: vals.push(root.c1); break;
				case 2: vals.push(root.c2); break;
				case 3: vals.push(root.c3); break;
				case 4: vals.push(root.c4); break;
				case 5: vals.push(root.c5); break;
			}
		}

		var minv = vals[0];
		var mini = 0;
		for (var i=0; i<vals.length; i++) {
			if (vals[i] < minv) {
				minv = vals[i];
				mini = i;
			}
		}
		return clrs[mini];
	}

	Node.prototype.color_single_JP = function(root, skipped) {
		var d = this._depth;
		var b = this._bounds;
		var lmax = 512;
		var w = b.width/2 ;
		var h = b.height/2 ;

		var sx,sy;
		var nb;
    
		clrs = [];

		// 1
		sx = b.x - w  + 1;
		sy = b.y - h + 1;
		it ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 2
		sx = b.x + 1;
		sy = b.y - h + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 3
		sx = b.x - w  + 1;
		sy = b.y + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 4
		sx = b.x - w + 1;
		sy = b.y + h + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 5
		sx = b.x + w + 1;
		sy = b.y - h + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 6
		sx = b.x + b.width + 1;
		sy = b.y - h + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 7
		sx = b.x - w + 1;
		sy = b.y + b.height + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 8
		sx = b.x + 1;
		sy = b.y + b.height + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax) ) 
		{
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 9
		sx = b.x + w + 1;
		sy = b.y + b.height + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 10
		sx = b.x + b.width + 1;
		sy = b.y  + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 11
		sx = b.x + b.width + 1;
		sy = b.y + h + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
		// 12
		sx = b.x + b.width + 1;
		sy = b.y + b.height + 1;
		if ( (sx >= 0) && (sy >= 0) && (sx < lmax) && (sy < lmax)) {
			nb = root.root.retrieve({x:sx , y:sy});
			if ( (nb.color == -1) && ((nb.degree < this.degree) || ((nb.degree == this.degree) && (nb.weight > this.weight))) )
			return (skipped+1);
			if (nb.color != -1) clrs.push(nb.color);
		}
    
		uclrs = sort_and_unique(clrs);
		var vals = new Array();
		for (var c=0; c<6; c++) {
			if (uclrs.indexOf(c) == -1) {
				vals.push(c);
			} 
		}
		if (vals.length) { 
			this.color = getBestColor(root, vals);
			switch(this.color) {
				case 0: root.c0 = root.c0 + 1; break;
				case 1: root.c1 = root.c1 + 1; break;
				case 2: root.c2 = root.c2 + 1; break;
				case 3: root.c3 = root.c3 + 1; break;
				case 4: root.c4 = root.c4 + 1; break;
				case 5: root.c5 = root.c5 + 1; break;
			};
			// alert(this.color.toString());
		} else {
			this.color = 0;
			root.c0 = root.c0 + 1;
		}
		return skipped;
	}

	Node.prototype.compute_colors_greedy = function(root) 
	{
		// depth first traversal 
		var len = this.nodes.length;
		if(len)
		{
			for(var i = 0; i < len; i++)
			{
				this.nodes[i].compute_colors_greedy(root);
			}
		} else {
			// reached leaf ... search previous (morton order) quadrants. 
			// 6 searches in all
			var d = this._depth;
			var b = this._bounds;
    
			var w = b.width/2 ;
			var h = b.height/2 ;

			var sx,sy;
			var nb;
    
			clrs = [];

			// 1
			sx = b.x - w  + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) ) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.color != -1) clrs.push(nb.color);
			}
			// 2
			sx = b.x + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) ) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.color != -1) clrs.push(nb.color);
			}
			// 3
			sx = b.x - w  + 1;
			sy = b.y + 1;
			if ( (sx >= 0) && (sy >= 0) ) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.color != -1) clrs.push(nb.color);
			}
			// 4
			sx = b.x - w + 1;
			sy = b.y + h + 1;
			if ( (sx >= 0) && (sy >= 0) ) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.color != -1) clrs.push(nb.color);
			}
			// 5
			sx = b.x + w + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) ) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.color != -1) clrs.push(nb.color);
			}
			// 6
			sx = b.x + b.width + 1;
			sy = b.y - h + 1;
			if ( (sx >= 0) && (sy >= 0) ) {
				nb = root.root.retrieve({x:sx , y:sy});
				if (nb.color != -1) clrs.push(nb.color);
			}

			// assign colors ...
			if (!clrs.length) {
				this.color = 0;
				root.c0 = root.c0 + 1;
				// alert('color 0');
				return; 
			}
			uclrs = sort_and_unique(clrs);
			var vals = new Array();
			for (var c=0; c<6; c++) {
				if (uclrs.indexOf(c) == -1) {
					vals.push(c);
				} 
			}
			if (vals.length) { 
				this.color = getBestColor(root, vals);
				switch(this.color) {
					case 0: root.c0 = root.c0 + 1; break;
					case 1: root.c1 = root.c1 + 1; break;
					case 2: root.c2 = root.c2 + 1; break;
					case 3: root.c3 = root.c3 + 1; break;
					case 4: root.c4 = root.c4 + 1; break;
					case 5: root.c5 = root.c5 + 1; break;
				};
				// alert(this.color.toString());
			} else {
				this.color = 6;
				root.c6 = root.c6 + 1;
			}
		} // else
	}

	Node.prototype.balanceDivide = function(d) {
		if ( this._depth < (d-1) ) {
			var len = this.children.length;
			this.subdivide();

			for(var i = 0; i < len; i++) {
				this.insert(this.children[i]);
			}

			this.children.length = 0;
		}
	}

	Node.prototype.retrieve = function(item)
	{
		if(this.nodes.length)
		{
			var index = this._findIndex(item);
		
			return this.nodes[index].retrieve(item);
		}
	
		return this;
		// return this.children;
	}

	Node.prototype._findIndex = function(item)
	{
		var b = this._bounds;
		var left = (item.x > b.x + b.width / 2)? false : true;
		var top = (item.y > b.y + b.height / 2)? false : true;
	
		//top left
		var index = Node.TOP_LEFT;
		if(left)
		{
			//left side
			if(!top)
			{
				//bottom left
				index = Node.BOTTOM_LEFT;
			}
		}
		else
		{
			//right side
			if(top)
			{
				//top right
				index = Node.TOP_RIGHT;
			}
			else
			{
				//bottom right
				index = Node.BOTTOM_RIGHT;
			}
		}
	
		return index;
	}


	Node.prototype.subdivide = function()
	{
		var depth = this._depth + 1;
	
		var bx = this._bounds.x;
		var by = this._bounds.y;
	
		//floor the values
		var b_w_h = (this._bounds.width / 2)|0;
		var b_h_h = (this._bounds.height / 2)|0;
		var bx_b_w_h = bx + b_w_h;
		var by_b_h_h = by + b_h_h;

		//top left
		this.nodes[Node.TOP_LEFT] = new this._classConstructor({
			x:bx, 
			y:by, 
			width:b_w_h, 
			height:b_h_h
		}, 
		depth);
	
		//top right
		this.nodes[Node.TOP_RIGHT] = new this._classConstructor({
			x:bx_b_w_h,
			y:by,
			width:b_w_h, 
			height:b_h_h
		},
		depth);
	
		//bottom left
		this.nodes[Node.BOTTOM_LEFT] = new this._classConstructor({
			x:bx,
			y:by_b_h_h,
			width:b_w_h, 
			height:b_h_h
		},
		depth);
	
	
		//bottom right
		this.nodes[Node.BOTTOM_RIGHT] = new this._classConstructor({
			x:bx_b_w_h, 
			y:by_b_h_h,
			width:b_w_h, 
			height:b_h_h
		},
		depth);	
	}

	Node.prototype.clear = function()
	{	
		this.children.length = 0;
	
		var len = this.nodes.length;
		for(var i = 0; i < len; i++)
		{
			this.nodes[i].clear();
		}
	
		this.nodes.length = 0;
	}



	window.QuadTree = QuadTree;

	/*
	//http://ejohn.org/blog/objectgetprototypeof/
	if ( typeof Object.getPrototypeOf !== "function" ) {
		if ( typeof "test".__proto__ === "object" ) {
			Object.getPrototypeOf = function(object){
				return object.__proto__;
			};
		} else {
			Object.getPrototypeOf = function(object){
				// May break if the constructor has been tampered with
				return object.constructor.prototype;
			};
		}
	}
	*/

}(window));
