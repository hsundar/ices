---
layout: name
section: Code
title: Code
---

<img class='inset right' src='/images/hari.png' title='Hari Sundar' alt='hs' width='140px' />

Code
====
Eventually this page will contain links to most of the research and non-research
related programming I've done.

<div class="section" markdown="1">
Parallel
========	
[Dendro][]
: A C++ library for constructing and balancing octrees in parallel. It also generates hexahedral meshes from the octrees and extends [PETSc][petsc]'s distributed array framework to support octree-based meshing. Basic routines for solving PDEs on such meshes using the finite element method are also provided. 

[ParSort](/code/sort)
: A scalable parallel sorting code that scales to millions of cores. The code is highly tuned and provides parallelism using MPI, OpenMP and SIMD vectorization.
</div>	

<div class="section" markdown="1">
Matlab
========	
[High-order Multigrid](/code/homg)
: A geometric multigrid framework built using Matlab that supports high-order discretizations on 2D/3D hexahedral meshes. 

[Cardiac Electrophysiology](/code/ep)
: A simple implementation of the bidomain equations coupled with the Luo-Rudy model for cellular activation. Implemented in Matlab using the psuedospectral method.
 
</div>	

<div class="section" markdown="1">
Demos
=====
[Quadtree Coloring](/code/coloring/)
:	This JavaScript demo allows you to generate (balanced) quadtrees from points, and color the resulting quadtree using different coloring algorithms.
</div>

<div class="section" markdown="1">
Tools
=====
[dcmConvert](/code/dcmConvert.html)
:	This is a simple Qt application that converts DICOM images to analyze/MetaIO formats. It allows for stacking of 3D and 4D images.


[Mark Tags](/code/mark-tags.html)
: This is a simple Qt application that allows (dicom/analyze) images to be annotated with points. Initial goal was to mark tags in tagged cardiac MR images. 	

</div>

[Dendro]: http://www.cc.gatech.edu/csela/dendro/html/index.html
[petsc]: http://www.mcs.anl.gov/petsc/