# Getting Started

# Setup

Before you begin the challenge, it is important that you have the necessary starter code! You can retrieve the starter code we provide by following the instructions for **Cloning the repository** and **Creating a new branch + switching branches** near the bottom of this document. You can start cloning the repository after you accepted the GitHub invite via email.

We use GitHub for all of our projects, and it will also be where you will submit your solution. If you are brand new or need a refresher to Git/GitHub, then you can check out the documentation all about that below in the Git and Github section.

Once you have cloned the starter code and made a new branch, you can start using your favorite IDE or text editor as you will to familiarize yourself with the starter code before moving onto the problem statement. (Hint:  `index.js` is a good starting place!)

This is an *open-ended* problem, so don't worry if your answer is not perfect. We are assessing the design of your code in addition to the correctness. Treat this as a learning opportunity to showcase your fundamentals!

This take-home challenge should be completed in the next 7 days. You have as much time as you need, but please do not overwork yourself. Good luck!

# Git and Github

Git is a version-control manager. In a nutshell, it allows you to manage and track the edits you make to your code. GitHub then allows you to share code between people and across teams. You can read more about it on [Wikipedia](https://en.wikipedia.org/wiki/Git) or on the [official website](https://git-scm.com/about).

## 0. Install Git

Windows:

You can download Git for Windows [here](https://git-scm.com/download/win).

Mac:

There are various ways to install git for Mac, detailed [here](https://git-scm.com/download/mac). 

Linux:

Use your distribution’s package manager. For example, if you have Debian or Ubuntu, run `apt-get install git` in a Terminal.

## 1. Make a GitHub Account

First, make sure you have a GitHub account. Ideally, your placement in this track means that you already provided us with a GitHub account and have received an invitation for a repository Sandbox. If not, go make one here: [https://github.com](https://github.com). Then, visit the invite link included via email, and accept the invite.

>‼️ If you’re never worked with Git before, here’s a good video to get you started: [https://www.youtube.com/watch?v=HkdAHXoRtos](https://www.youtube.com/watch?v=HkdAHXoRtos)
>
>Additionally, you may have to connect your local machine to your GitHub account via SSH. Here’s a guide for that: [https://docs.github.com/en/authentication/connecting-to-github-with-ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

</aside>

## 4. Cloning the repository

Next, you'll need to "clone" the repository, which basically means download the files. Please note, you can only clone your repo *after you've accepted your GitHub invitation*. Navigate to the shared repository on GitHub. Select the `Code` dropdown, select `SSH` as your cloning option, and copy the generated link below. 

Now, choose a local directory you’d like to keep your challenge in. Navigate to that directory through the command line and enter the following command: `git clone your_link_here`

## 5. Creating a new branch + switching branches

New branches can be checked out with the commands: `git checkout -b branch_name_here`

You can switch between branches using: `git switch branch_to_switch_to`

It is considered good practice to implement changes on a project on a new branch, instead of working directly on `main`. For the purposes of this challenge, make sure to checkout a new branch, and name it whatever you’d like. 

## 6. Adding files to the repository

To add your files, it's as simple putting them in the repository folder on your computer. Just navigate to the directory you chose to put the project in at the very beginning, and paste the files there! 

## 7. Committing and pushing files

After you're satisfied editing your files in your favorite editor, open the terminal at the project directory. To view all changes made compared to most recently committed version available: `git status`

You can add the files you want to commit through the command `git add file_name`. All files can be added by the command `git add .`. You can then commit your changes locally using `git commit -m “message describing changes”`.To push your changes to the remote repository, use the following command: `git push`.

Congratulations! By pushing to origin, you've updated the server with your changes.

## 8. Opening a Pull Request on GitHub

You can create a Pull Request on GitHub browser by navigating to the repository, and clicking on `Pull Requests`. Here, you can select a branch under the two drop-downs: `base` and `compare`. Select `main` for `base`, and the branch with all your changes for `compare`. Now, there should be another button, "Create pull request". Click on that button, and you're good to go!

## Tips

- If you want to learn more about Git, there's a ton of great documentation [here](https://git-scm.com/book/en/v2)
- Git is a commonly used source-control management tool used by many companies. If you just used Git for the first time, rest assured that you will most likely use it again.
