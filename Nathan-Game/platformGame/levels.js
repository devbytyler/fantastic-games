const TOWER = `
..##################..
..##......##......##..
..##..............##..
..##.....o........##..
..##.....###o.....##..
..##......###.....##..
..##......##......##..
..##o.....##......##..
..###..|..##.....o##..
..##......##.....###..
..##......##...|..##..
..##.....o##......##..
..##.....###o.....##..
..##......###.....##..
..##......##......##..
..##o.....##......##..
..###.....##.....o##..
..##......##.....###..
..##......##......##..
..##.....o##o.....##..
..##.....####.....##..
..##......##......##..
..##......##...|.o##..
..##o.....##.....###..
..###..|..##......##..
..##......##..........
..##......##o.........
..##.....o###.........
.........###.......o..
..........##......####
..........##++++++##..
@.##++++++##++++++##..
####################..
`;

const CAVE = `
.........................................................
..............#########################################..
..............#+++++++++++++++++++++++++++++++++++++++#..
..............######v######v#########v###########v#####..
..............#.......................................#..
..............#.......................................#..
..............#.......................................#..
..............#............................=..........#..
..............#..........................o...o.......o#..
..............#.......................#########.....###..
..............#.......................................#..
..............#...........=...........................#..
..............#.......o....o....o.....................#..
..............#......#############....................#..
..............#.......................................#..
..............#o............................o........o#..
.............o###..............===..........#........##..
.............####..............===..........#.........#..
..............###..............===..........#.........#..
..............###############################........o#..
.............o###############################........##..
.............##+++++++++++++++++++++++++++++#.........#..
..............############################+##.........#..
..............#..........................#+##........o#..
.............o#..........................#+##........##..
.............##..........................#+##.........#..
..........................o..............#v##.........#..
.........##...............#..............#.##........o#..
..........................#..........................##..
...@................o.....#...........................#..
###############.....#.....#.....o......################..
..#############+++++#+++++#+++++#++++++################..
..#############+++++#+++++#+++++#++++++################..
..#############+++++#+++++#+++++#++++++################..
..#############+++++#+++++#+++++#++++++################..
..#####################################################..
.........................................................
`;

const MOONLIGHT = `
.............................................................................................
..#o|........................................................................................
..##.........................................................................................
..#.......................................................................................###
..#.......................................................................................#..
..#o......................................................................................#..
..##.....................................................................................o#..
..#........................................................................#.............##..
..#........................................#..o...o...o...o...o...o...o.=.o#####....#....#...
..#o....................o..................#################################...#+++++++++#...
..##...............................###..+++++++++++++++++++++++++++++++++++#...#+++++++++#...
..#..........................###.......###################v#######+###v##+##...###########...
..#........................................#.....................#v#....#v##.................
..#o.......................o........o......................................#.................
..##.......................#...............................................#.................
..#............=...####....###.............#..|..............#.............#.................
..#.........o.o....#..#++++#.#=..o.....o...#....o..o..o.....=#.............#.................
..#.@......#####...#..######.#..###...###..####################............#.................
..#####............#.........#+++++++++++++#.................#.............#.................
......#++++++++++++#.........###############.................#.............#.................
......##############.........................................#ooooooooooooo#.................
.............................................................###############.................
.............................................................................................
`;

const THE_GUANTLET = `
...........................................................................................
...........................................................................................
...........................................................................................
........................................................................................###
.....................................................................o.........o.......o#..
...............o.................o.........................####....#####.....#####.....##..
.............#####.............#####..........................#+++++++++++++++++++++++++#..
......................................................o.......##+#######+#######+###v####..
.......................o............................#####.....##+#.....#v#o....#+#......#..
...........o.........#####.................o..................##v#.............#v#......#..
..#......#####...........................#####................#.........................#..
..#..............................o............................#.........................#..
..#.@..........................#####..........................#.........................#..
..###.....=..........=..........=..........=..........=.......#.........................#..
..#...........................................................#...............#.........#..
..#...........................................................#.........................#..
..#.....o.....o.....o.....o.....o.....o.....o.....o.....o.....#.........................#..
..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#........#................#..
..#..#.....#.....#.....#.....#.....#.....#.....#.....#.....#..#.........................#..
..#.......=..........=..........=..........=..........=.......#.........................#..
..##.........................................................##.........................#..
..#...........................................................#............#.....#......#..
..#.....o.....o.....o.....o.....o.....o.....o.....o.....o.....#.........................#..
..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#.......................#.#..
..#..#.....#.....#.....#.....#.....#.....#.....#.....#.....#..#.........................#..
..#.......=..........=..........=..........=..........=.......#.........................#..
..##.........................................................##.........................#..
..#...........................................................#.....................#...#..
..#.....o.....o.....o.....o.....o.....o.....o.....o.....o...........#.....#.....#.......#..
..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o..#..o............................#..
..#..#.....#.....#.....#.....#.....#.....#.....#.....#.....######.......................#..
..###.........##..........##...........##........##......###..#+++++++++++++++++++++++++#..
..#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#+++++++++++++++++++++++++#..
..#######################################################################################..
`;

const MONDAY = `
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
..................................................................###...........
...................................................##......##....##+##..........
....................................o.o......##..................#+++#..........
.................................................................##+##..........
...................................#####..........................#v#...........
............................................................................##..
..##......................................o.o................................#..
..#.....................o....................................................#..
..#......................................#####.............................o.#..
..#..........####.......o....................................................#..
..#..@.......#..#................................................#####.......#..
..############..###############...####################.....#######...#########..
..............................#...#..................#.....#....................
..............................#+++#..................#+++++#....................
..............................#+++#..................#+++++#....................
..............................#####..................#######....................
................................................................................
................................................................................
`;

const DRACULAS_CASTLE = `
................................................................................
................................................................................
....###############################.............................................
...##.............................##########################################....
...#.......................................................................##...
...#....o...................................................................#...
...#................................................=.......................#...
...#.o........################...................o..o...........|........o..#...
...#.........................#..............................................#...
...#....o....................##########.....###################....##########...
...#..................................#+++++#.................#....#............
...###############....oo......=o.o.o..#######.###############.#....#............
.....#...............o..o.............#.......#......#........#....#............
.....#....................#############..######.####.#.########....########.....
.....#.............########..............#...........#.#..................#.....
.....#..........####......####...#####################.#..................#.....
.....#........###............###.......................########....########.....
.....#.......##................#########################......#....#............
.....#.......#................................................#....#............
.....###......................................................#....#............
.......#...............o...........................................#............
.......#...............................................o...........#............
.......#########......###.....############.........................##...........
.............#..................#........#####....#######.o.........########....
.............#++++++++++++++++++#............#....#.....#..................#....
.............#++++++++++++++++++#..........###....###...####.o.............#....
.............####################..........#........#......#.....|.........#....
...........................................#++++++++#......####............#....
...........................................#++++++++#.........#........@...#....
...........................................#++++++++#.........##############....
...........................................##########...........................
................................................................................
`;

const GONE_MAD = `
......................................#++#........................#######....................................#+#..
......................................#++#.....................####.....####.................................#+#..
......................................#++##########...........##...........##................................#+#..
......................................##++++++++++##.........##.............##...............................#+#..
.......................................##########++#.........#....................................o...o...o..#+#..
................................................##+#.........#.....o...o....................................##+#..
.................................................#+#.........#................................###############++#..
.................................................#v#.........#.....#...#........................++++++++++++++##..
.............................................................##..|...|...|..##............#####################...
..............................................................##+++++++++++##............v........................
...............................................................####+++++####......................................
...............................................#.....#............#######........###.........###..................
...............................................#.....#...........................#.#.........#.#..................
...............................................#.....#.............................#.........#....................
...............................................#.....#.............................##........#....................
...............................................##....#.............................#.........#....................
...............................................#.....#......o..o.....#...#.........#.........#....................
...............#######........###...###........#.....#...............#...#.........#.........#....................
..............##.....##.........#...#..........#.....#.....######....#...#...#########.......#....................
.............##.......##........#.o.#..........#....##...............#...#...#...............#....................
.....@.......#.........#........#...#..........#.....#...............#...#...#...............#....................
....###......#.........#........#...#..........#.....#...............#...#####...######......#....................
....#.#......#.........#.......##.o.##.........#.....#...............#.....o.....#.#.........#....................
++++#.#++++++#.........#++++++##.....##++++++++##....#++++++++++.....#.....=.....#.#.........#....................
++++#.#++++++#.........#+++++##.......##########.....#+++++++##+.....#############.##..o.o..##....................
++++#.#++++++#.........#+++++#....o.................##++++++##.+....................##.....##.....................
++++#.#++++++#.........#+++++#.....................##++++++##..+.....................#######......................
++++#.#++++++#.........#+++++##.......##############++++++##...+..................................................
++++#.#++++++#.........#++++++#########++++++++++++++++++##....+..................................................
++++#.#++++++#.........#++++++++++++++++++++++++++++++++##.....+..................................................
`;

const VISTA = `
..............................................................................................................
..............................................................................................................
..............................................................................................................
..............................................................................................................
..............................................................................................................
........................................o.....................................................................
..............................................................................................................
........................................#.....................................................................
........................................#.....................................................................
........................................#.....................................................................
........................................#.....................................................................
.......................................###....................................................................
.......................................#.#.................+++........+++..###................................
.......................................#.#.................+#+........+#+.....................................
.....................................###.###................#..........#......................................
......................................#...#.................#...oooo...#.......###............................
......................................#...#.................#..........#......#+++#...........................
......................................#...#.................############.......###............................
.....................................##...##......#...#......#................................................
......................................#...#########...########..............#.#...............................
......................................#...#...........#....................#+++#..............................
......................................#...#...........#.....................###...............................
.....................................##...##..........#.......................................................
......................................#...#=.=.=.=....#............###........................................
......................................#...#...........#...........#+++#.......................................
......................................#...#....=.=.=.=#.....o......###.......###..............................
.....................................##...##..........#.....................#+++#.............................
..............................o...o...#...#...........#.....#................##v........###...................
......................................#...#...........#..............#.................#+++#..................
.............................###.###.###.###.....o.o..#++++++++++++++#...................v#...................
.............................#.###.#.#.###.#..........#++++++++++++++#........................................
.............................#.............#...#######################........................................
.............................##...........##.........................................###......................
..###.........................#.....#.....#.........................................#+++#................###..
..#.#.........................#....###....#..........................................###.................#.#..
..#...........................#....###....#######........................#####.............................#..
..#...........................#...........#..............................#...#.............................#..
..#...........................##..........#..............................#.#.#.............................#..
..#.......................................#.......|####|....|####|.....###.###.............................#..
..#................###.............o.o....#..............................#.........###.....................#..
..#...............#####.......##..........#.............................###.......#+++#..........#.........#..
..#...............o###o.......#....###....#.............................#.#........###..........###........#..
..#................###........#############..#.oo.#....#.oo.#....#.oo..##.##....................###........#..
..#......@..........#.........#...........#++#....#++++#....#++++#....##...##....................#.........#..
..#############################...........#############################.....################################..
..............................................................................................................
..............................................................................................................
`;

const NATIVE = `
..................................................................................................###.#.......
......................................................................................................#.......
..................................................................................................#####.......
..................................................................................................#...........
..................................................................................................#.###.......
..........................o.......................................................................#.#.#.......
.............................................................................................o.o.o###.#.......
...................###................................................................................#.......
.......+..o..+................................................#####.#####.#####.#####.#####.#####.#####.......
.......#.....#................................................#...#.#...#.#...#.#...#.#...#.#...#.#...........
.......#=.o..#............#...................................###.#.###.#.###.#.###.#.###.#.###.#.#####.......
.......#.....#..................................................#.#...#.#...#.#...#.#...#.#...#.#.....#.......
.......+..o..+............o..................................####.#####.#####.#####.#####.#####.#######.......
..............................................................................................................
..........o..............###..............................##..................................................
..............................................................................................................
..............................................................................................................
......................................................##......................................................
...................###.........###............................................................................
..............................................................................................................
..........................o.....................................................#......#......................
..........................................................##.....##...........................................
.............###.........###.........###.................................#..................#.................
..............................................................................................................
.................................................................||...........................................
..###########.................................................................................................
..#.........#.o.#########.o.#########.o.##................................................#...................
..#.........#...#.......#...#.......#...#.................||..................#.....#.........................
..#..@......#####...o...#####...o...#####.....................................................................
..#######.....................................#####.......##.....##.....###...................................
........#=..................=................=#...#.....................###...................................
........#######################################...#+++++++++++++++++++++###+++++++++++++++++++++++++++++++++++
..................................................############################################################
..............................................................................................................
`;
const YOUWIN = `
....................o........
.............................
.............................
.............................
.............................
.............................
.............................
.............................
.............................
.............................
....o.....o..................
....o.....o..................
....o.....o..................
.....ooooo...ooo...o.o.......
#......o.....o.o...o.o......#
#......o.....ooo...ooo......#
#....###################....#
#....o......o...............#
#....o......o...............#
#.....o....o....o...ooo.....#
####..o.oo.o....o...o.o..####
#......o..o.....o...o.o.....#
#.............@.............#
#############################
`;
var GAME_LEVELS = [
    YOUWIN,
    CAVE,
    TOWER,
    MOONLIGHT,
    THE_GUANTLET,
    MONDAY,
    DRACULAS_CASTLE,
    GONE_MAD,
    VISTA,
    NATIVE,
]

if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = GAME_LEVELS;
if (typeof global != "undefined" && !global.GAME_LEVELS)
  global.GAME_LEVELS = GAME_LEVELS;
