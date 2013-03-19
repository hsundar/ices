---
layout: name
section: Code
title: Code
---

<img class='inset right' src='/~hari/images/hari.png' title='Hari Sundar' alt='hs' width='140px' />

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
[High-order Multigrid](/~hari/code/homg)
: A geometric multigrid framework built using Matlab that supports high-order discretizations on 2D/3D hexahedral meshes. 

[Cardiac Electrophysiology](/~hari/code/ep)
: A simple implementation of the bidomain equations coupled with the Luo-Rudy model for cellular activation. Implemented in Matlab using the psuedospectral method.
 
</div>	

<div class="section" markdown="1">
Demos
=====
[Quadtree Coloring](/~hari/code/coloring/)
:	This JavaScript demo allows you to generate (balanced) quadtrees from points, and color the resulting quadtree using different coloring algorithms.
</div>

<div class="section" markdown="1">
Tools
=====
[dcmConvert](/~hari/files/code/dicomConvert.v0.1.zip)
:	This is a simple Qt application that converts DICOM images to  [Analyze][] and [MetaIO][] formats. It allows for stacking of 3D and 4D images.
[Source](/~hari/files/code/dicomConvert.v0.1.zip)

[Mark Tags](/~hari/files/code/markTags.v0.2.zip)
: The markTags program is a Graphical User Interface (GUI) written in C++ using the [Qt][] library. The programs allows the user to load 3D and 2D+time datasets and mark and manipulate landmarks. The image formats currently supported are [Analyze][] and [MetaIO][]. Support for converting DICOM images into one of these formats is provided. The [DCMTK][dcmtk] library is used for this purpose. 
<img class='inset right' src='/~hari/images/markTagsLmarks.png' title='markTags' alt='mt' width='500px' /> 
The code has been tested on Linux, Windows and Mac OS X. The Qt and DCMTK libraries need to be installed prior to installing markTags. The version requirements for these libraries are, [Qt][] > 4.x, [DCMTK][dcmtk] > 3.5.x. [Source](/~hari/files/code/markTags.v0.2.zip), [Matlab script](/~hari/files/code/readLandmarks.m) to load landmarks.

</div>

[Dendro]: http://www.cc.gatech.edu/csela/dendro/html/index.html
[petsc]: http://www.mcs.anl.gov/petsc/
[Qt]: http://qt-project.org/
[dcmtk]: http://dicom.offis.de/dcmtk.php.en
[Analyze]: http://www.grahamwideman.com/gw/brain/analyze/formatdoc.htm
[MetaIO]: http://www.itk.org/Wiki/ITK/MetaIO