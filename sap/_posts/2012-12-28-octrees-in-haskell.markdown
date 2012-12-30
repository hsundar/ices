---
title: Octrees in Haskell
excerpt: actually nD abstractions of octrees implemented in Haskell. 
location: Austin, Texas
layout: sap-post
---

So one fine day I decided to implement octrees in Haskell. For those of you who dont know, Haskell is a pure functional programming language.

{% highlight haskell %}
-- Node with Morton Ordering 
data Node   = Node {
  	anchor    :: [Int] ,
  	depth     ::  Int   ,
  	maxDepth  ::  Int
} deriving (Show, Eq)
{% endhighlight %}	

and what did we end up with ? Fermat's last theorem ? 
\[
x^n + y^n = z^n
\]
