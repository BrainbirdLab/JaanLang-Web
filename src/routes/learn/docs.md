## Introduction 🎉

JaanLang is a language for couples. It is designed to be a fun and easy
way to communicate with your partner. It is inspired by the way couples
talk to each other and the way they express their love. It is a simple
and easy to learn language that can be used to write small programs and
scripts.

## Starting program 🚀

Programs must start with `hi jaan` and end with `bye jaan`

```jaan
hi jaan
    # Your code here
bye jaan
```

## Variables 📝
Variables are placeholder to store some data. Assuming your name is 'Alen'. Here, name is a variable and 'Alen' is its value. Similarly 'age' can be also a variable. To use a variable in your program you must have to declare it first.

To declare a variable, you can use the `dhoro` keyword followed by the variable name and its value.


For example:
```jaan
dhoro tmrCG holo 3.2
dhoro amrCG holo 3.8
```
Value is optional. If you don't provide a value, it will be set to `0` by default.

## Conditions 🤔
Conditional statements allow your program to make decisions based on certain conditions.
### If condition 🤔
To perform a task if a condition is true, you can use the `jodi` keyword and end the block with `huh`.


For example:
```jaan
amrCG jodi tmrCG er beshi hoy tahole
    bolo "I love you"
huh
```
Here, if the value of `tmrCG` is greater than `amrCG`, the program will run code inside the block. In this case, it will print "I love you".


na hoy|hoy|er beshi na hoy|er kom na hoy|er beshi hoy|er kom hoy|er soman na hoy|er soman hoy

#### Comparison operators 🤔
You can use the following comparison operators to compare two values:
##### hoy 🤜🤛
In words it means equal to. Used with value on the right side. 
Example: 
```jaan
tmrCG jodi 3.2 hoy
``` 
if `tmrCG` is equal to `3.2`.
##### er soman hoy 🤜🤛
In words it means equal to. Used with variable on the left side. 
Example: 
```jaan
tmrCG jodi amrCG er soman hoy
```
if `tmrCG` is equal to `amrCG`.
##### er beshi hoy 👍
In words it means greater than. Used with both value and variable. 
Example: 
```jaan
tmrCG jodi 3.2 er beshi hoy
```
if `tmrCG` is greater than `3.2`.
##### er kom hoy 👎
In words it means less than. Used with both value and variable. 
Example: 
```jaan
tmrCG jodi 3.2 er kom hoy
```
if `tmrCG` is less than `3.2`.

#### Negation operator ⛔
Negation means to invert values

Use `na` before `hoy` word to negate the condition. 
Example: 
```jaan
tmrCG jodi 3.2 na hoy
```
if `tmrCG` is not equal to `3.2`.

#### Multiple conditions 😐
Use `and` or `or` to check for multiple conditions. 
Example: 
```jaan
tmrCG jodi 3.2 er beshi hoy and amrCG jodi 3.8 er kom hoy
```
if `tmrCG` is greater than `3.2` and `amrCG` is less than `3.8`.

### Else 🙎‍♂️
To perform a task if a condition is false, you can use the `nahole` keyword and end the block with `huh`. But you must use `jodi` before using `nahole`:

For example:
```jaan
amrCG jodi tmrCG er beshi hoy tahole
    bolo "I love you"
nahole
    bolo "Breakup!!"
huh
```

### Else if 💁‍♂️
To check for multiple conditions, you can use the `nahole jodi` keyword like `else if` in other programming languages:

For example:
```jaan
amrCG jodi tmrCG er beshi hoy tahole
    bolo "I love you"
nahole jodi tmrCG er soman hoy tahole
    bolo "I like you"
nahole
    bolo "Breakup!!"
huh
```

## Looping ➰

To repeat a task multiple times, you can use the `bar` keyword followed by the number of times you want to repeat the task:

For example:
```jaan
5 bar
    bolo "Sorry"
huh
```
Output:

> Sorry
> Sorry
> Sorry
> Sorry
> Sorry

Here, the program will print "Sorry" 5 times.

Use a loop counter with `<variable> dhore`. Here the loop counter is `i`.
```jaan
  3 bar i dhore
    bolo "Sorry " + i
  huh
```
Output:
> Sorry 1
> Sorry 2
> Sorry 3
> Sorry 4
> Sorry 5

## Wait ⏱️ 

To️ wait for a certain amount of time, you can use the `wait koro` keyword followed by the number of seconds you want to wait:

For example:
```jaan
1 sec wait koro
bolo "Hello"
```

Use `min` for minutes and `sec` for seconds.

Output:
> Hello

Here, the program will wait for 1 second before printing "Hello".
You can also use variables to specify the time to wait but that should be a positive number.


Here, the program will print "Sorry" followed by the counter variable 5 times.
### Happy Coding! 😊


## Installation
Install Node.js and npm from [here](https://nodejs.org/en/download/).

Run `npm install -g jaan` to install JaanLang compiler globally.

You can the use `jaan` command to compile and run JaanLang programs.

Run `jaan -h` to see the help menu.
