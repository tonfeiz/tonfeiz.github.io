---
title: MapReduce
date: "2021-01-25"
summary: "MapReduce"
draft: true
---

Let's use an example to illustrate how MapReduce came up. 

## An Example: Word Count

This is an very classical example. Suppose you have multiple files, and you want to know how many times each word in the files appears. How would you do it?

At first, the solution may seems very easy: just read the file in order, and use a map whose key is the word and value is the count to accumulate. 

However, let's say the files are really too many that the solution above is too slow. Are there any ways to speed up the process? 

Parallelism! Yes, we can parallel the task by replicate the computation and partition the input data. 

Let's start with only one machine. 

## Threads

At first, we can use multi-threads to speed up the process. 

We can start multiple threads in our program, and use a global map to count the words. The bad news is that as the map is shared by all our threads, we have to use lock or any other mechanisms to solve the concurrent problem.

Another problem is that we have multiple files and multiple threads now, how to map the file to the thread? That is, how should the thread know which file it should process? This is actually a load-balancing problem, so we need a load balancer to solve it. 

So our architecture is basically as the graph below now. 

image1

## MapReduce

Now suppose we have thousands of files with every one's size is at Gigabytes to Terabytes. With only one machine, we may need to wait for days to get the result, which is obviously too slow. 

So we add more machines to solve the problem. 

image2

An obvious problem raised by adding more machine is: how should we merge the map in different machines? 

