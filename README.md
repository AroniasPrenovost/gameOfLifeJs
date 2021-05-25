# Conway's Game of Life
 
Revamping an old repo to do something new, inspired by this implementation seen here https://bitstorm.org/gameoflife/
 
## Installation 

```sh
npm install 
```
```sh
npm start
```

## Rules

For a space that is 'populated':
```
- Each cell with one or no neighbors dies, as if by solitude. 
- Each cell with four or more neighbors dies, as if by overpopulation. 
- Each cell with two or three neighbors survives. 
```

For a space that is 'empty' or 'unpopulated':
```
- Each cell with three neighbors becomes populated
- Dead cells that would become living don't count as living at the current turn
- Living cells that would die don't count as dead at the current turn
```