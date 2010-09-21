# Basic git commands
git status
git add .
git commit -a -m 'message'
git commit -am 'message'
git commit -a -v (view after commit)

git push --all
git push --tags
git push origin master

git pull --all
git pull origin master

git clone <repository>
git remote add origin <repository>

git tag -a v1.2 -m 'version 1.2'
git tag v1.2-lw (lightweight version)
git tag
git tag -l
git tag -l v1.2.*
git show v1.2
git push origin :refs/tags/mytag (delete a remote tag)

git show-branch
git branch
git branch newbranch1
git merge newbranch1
git branch -d newbranch1
git checkout -b newbranch2 (start a new branch and switch to it)
http://github.com/guides/remove-a-remote-branch
git push origin :remotebranchname

git config --global user.name "Langley Zhu"
git config --global user.email "zonovo@gmail.com"
git config --global color.branch auto
git conifg --global color.status auto
git config
git config --list
cat .git/config

$ git config user.name
$ git config user.email
cat ~/.gitconfig
[user]
	name = Scott Chacon
	email = schacon@gmail.com

git log
git help
git help <command>
cat <filename>
ls
git mv
git rm

empty branch
git rm --cached -r
rm *
rm -Rf lib/
git commit --allow-empty -m 'initial empty branch'

pwd
find .

http://learn.github.com/p/undoing.html
git reset HEAD filename
git checkout -- filename (discard changes in working directory)
git log --pretty=oneline
git reset --hard <commit message or sha of the commit>
