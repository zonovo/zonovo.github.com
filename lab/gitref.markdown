# Git Reference #

## INTRODUCTION TO THE GIT REFERENCE

This is the Git reference site. This is meant to be a quick reference for learning and remembering the most important and commonly used Git commands. The commands are organized into sections of the type of operation you may be trying to do, and will preset the common options and commands needed to accomplish these common tasks.

Each section will link to the next section, so it can be used as a tutorial. Every page will also link to more in-depth Git documentation such as the offical manual pages and relevant sections in the Pro Git book, so you can learn more about any of the commands. First, we'll start with thinking about source code management like Git does.

## HOW TO THINK LIKE GIT

This first thing that is important to understand about Git is that it thinks about version control very differently than Subversion or Perforce or whatever SCM you may be used to. It is often easier to learn Git by trying to forget your assumptions about how version control works and try to think about it in the Git way.

Let's start from scratch. Assume you are designing a new source code management system. How do you do basic version control before you used a tool for it? Chances are that you simply copied your project directory to save what it looked like at that point.

 $ cp -R project project.bak 
That way, you can easily revert files that get messed up later, or see what you have changed by comparing what the project looks like now to what it looked like when you copied it.

If you are really paranoid, you may do this often, maybe putting the date in the name of the backup:

 $ cp -R project project.2010-06-01.bak 
In that case, you may have a bunch of snapshots of your project that you can compare and inspect from. You can even use this model to fairly effectively share changes with someone. If you zip up your project at a known state and put it on your website, other developers can download that, change it and send you a patch pretty easily.

## Markdown Sample

* list1
  * list1-1
  * list1-2
* list2
* list3

This is a `code`

    This is a <pre>

> This is a blockquote
> blockquote2
> blockquote3

This is a link to [Google](http://www.google.com)

This is a link to ![Image of Google Logo](http://www.google.com/intl/en_ALL/images/srpr/logo1w.png)


*****
The above is a <hr>

*****

