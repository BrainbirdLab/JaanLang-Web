## Introduction

Let's explore the basics of JaanLang to do simple tasks.

## Starting program

Programs must start with `hi jaan` and end with `bye jaan`:

```jaan
hi jaan
    # Your code here
bye jaan
```

## Variable Declaration

To declare a variable, you can use the `dhoro` keyword followed by the variable name and its value:


For example:
```jaan
dhoro tmrCG holo 3.2
dhoro amrCG holo 3.8
```

## Conditional Statements

### If condition
To perform a task if a condition is true, you can use the `jodi` keyword and end the block with `huh`:


For example:
```jaan
amrCG jodi tmrCG er beshi hoy tahole
    bolo "I love you"
huh
```
Here, if the value of `tmrCG` is greater than `amrCG`, the program will run code inside the block. In this case, it will print "I love you".


na hoy|hoy|er beshi na hoy|er kom na hoy|er beshi hoy|er kom hoy|er soman na hoy|er soman hoy

#### Comparison operators
You can use the following comparison operators to compare two values:
- `hoy` for equal to. Used with value on the right side. 
Example: `tmrCG jodi 3.2 hoy` - if `tmrCG` is equal to `3.2`.
- `er soman hoy` for equal to. Used with variable on the left side. 
Example: `tmrCG jodi amrCG er soman hoy` - if `tmrCG` is equal to `amrCG`.
- `er beshi hoy` for greater than. Used with both value and variable. 
Example: `tmrCG jodi 3.2 er beshi hoy` - if `tmrCG` is greater than `3.2`.
- `er kom hoy` for less than. Used with both value and variable. 
Example: `tmrCG jodi 3.2 er kom hoy` - if `tmrCG` is less than `3.2`.

#### Negation operators:

Use `na` before `hoy` word to negate the condition. 
Example: `tmrCG jodi 3.2 na hoy` - if `tmrCG` is not equal to `3.2`.

#### Multiple conditions
Use `and` or `or` to check for multiple conditions. 
Example: `tmrCG jodi 3.2 er beshi hoy and amrCG jodi 3.8 er kom hoy` - if `tmrCG` is greater than `3.2` and `amrCG` is less than `3.8`.

### Else condition
To perform a task if a condition is false, you can use the `nahole` keyword and end the block with `huh`. But you must use `jodi` before using `nahole`:

For example:
```jaan
amrCG jodi tmrCG er beshi hoy tahole
    bolo "I love you"
nahole
    bolo "Breakup!!"
huh
```

### Else if condition
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

## Looping

To repeat a task multiple times, you can use the `bar` keyword followed by the number of times you want to repeat the task:

For example:
```jaan
5 bar
    bolo "Sorry"
huh
```
Output:
```txt
Sorry
Sorry
Sorry
Sorry
Sorry
```

Here, the program will print "Sorry" 5 times.

To use a counter variable, you can use the `$` symbol. It will automatically increment with each iteration starting from 1:

For example:
```jaan
5 bar
    bolo "Sorry " + $
huh
```
Output:
```txt
Sorry 1
Sorry 2
Sorry 3
Sorry 4
Sorry 5
```

Here, the program will print "Sorry" followed by the counter variable 5 times.

## Conclusion

This is a simple programming language designed for beginners to understand the basics of conditional statements and looping. It can be used to perform simple tasks and comparisons.