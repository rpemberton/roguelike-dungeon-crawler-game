let playerYX = [];

const rows = 40;
const cols = 40;
const rooms = 5;
const minSize = 5;
const maxSize = 9;
const padding = 5;

const attempts = 1000;

const enemiesTotal = 8;
const healthTotal = 10;

const wall = {
  type: 'wall',
  name: 'wall'
}

const floor = {
  type: 'floor',
  name: 'floor'
}

const health = {
  type: 'health',
  name: 'health',
  value: 100
}

const player = {
  type: 'player',
  name: 'player'
}

const enemy = {
  type: 'enemy',
  name: 'enemy',
  health: 100,
  attack: 10,
  xp: 5
}

const dagger = {
  type: 'weapon',
  name: 'dagger',
  damage: 10
}

export function mapGenerator() {
  let floorMap = [];
  // create blank floorMap
  for (let i = 0; i < cols; i++) {
    floorMap.push(Array(rows).fill(wall));
  }
  
  // check room + width/height does not fall outside map
  function isNotOutsideMap(floorMap, room) {
    // top and bottom
    if (room.y < padding || room.y + room.h > rows - padding) {
      return false;
    }
    // left and right
    if (room.x < padding || room.x + room.w > cols - padding) {
      return false;
    }
    return true;
  }
  
  // check room doesn't overlap with another
  function isNotOverlapping(floorMap, room) {
    for (let i = room.y - 1; i <= room.y + room.h; i++) {
      for (let j = room.x - 1; j <= room.x + room.w; j++) {
        if (floorMap[i][j] === floor) {
          return false;
        }
      }
    }
    return true;
  }
  
  // generate random size wall
  function randomWallSize(min, max) {
    if (min === max) return max;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // adds room to map
  function addRoom(floorMap) {
    let newRoom = {};
    let room = {
      h: randomWallSize(minSize, maxSize),
      w: randomWallSize(minSize, maxSize),
      y: Math.floor(Math.random() * (cols - 1 - 1)) + 1,
      x: Math.floor(Math.random() * (rows - 1 - 1)) + 1
    }
    if (isNotOutsideMap(floorMap, room) && isNotOverlapping(floorMap, room)) {
      for (let i = room.y; i < room.y + room.h; i++) {
        for (let j = room.x; j < room.x + room.w; j++) {
          floorMap[i][j] = floor;
        }
      }
      newRoom = room;
      return newRoom;
    }
  }

  // call addRoom until there are enough rooms
  let i = 0;
  let roomsArr = [];
  while (roomsArr.length < rooms && i < attempts) {
    let newRoom = addRoom(floorMap);
    if (newRoom) {
      roomsArr.push(newRoom);
    }
    i++
  }
  
  // draw hallways between two room origins
  function linkRooms(r1, r2) {
    if (r1.y < r2.y) {
      for (i = r1.y; i < r2.y; i++) {
        floorMap[i][r1.x] = floor;
      }
    } else {
      for (i = r1.y; i > r2.y; i--) {
        floorMap[i][r1.x] = floor;
      }
    }
    
    if (r1.x < r2.x) {
      for (i = r1.x; i < r2.x; i++) {
        floorMap[r2.y][i] = floor;
      }
    } else {
      for (i = r1.x; i > r2.x; i--) {
        floorMap[r2.y][i] = floor;
      }
    }
  }
  
  // iterate through rooms and link each pair until all are linked
  let count = 0;
  while (count < rooms - 1) {
    linkRooms(roomsArr[count], roomsArr[count + 1]);
    count++;
  }

  floorMap = addItem(floorMap, enemy, enemiesTotal);
  floorMap = addItem(floorMap, health, healthTotal);
  floorMap = addItem(floorMap, dagger, 1);
  floorMap = addItem(floorMap, player, 1);

  // return final floorMap array
  return {
    floorMap: floorMap,
    playerYX: playerYX,
    enemiesTotal: enemiesTotal
  };
}

// handles attempts to add item to map - calls placeItem
export function addItem(map, itemType, itemTotal) {
  let newMap = JSON.parse(JSON.stringify(map));
  // randomly choose location for item
  function placeItem(itemType) {
    const y = Math.floor(Math.random() * (cols - 1 - 1)) + 1;
    const x = Math.floor(Math.random() * (rows - 1 - 1)) + 1;
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (newMap[i][j].type !== 'floor') {
          return false;
        }
      }
    }
    newMap[y][x] = itemType;
    return [y, x];
  }

  let i = 0;
  let newItem = false;
  let itemAttempts = 0;
  while (i < itemTotal && itemAttempts < attempts) {
    newItem = placeItem(itemType);
    if (newItem) {
      i++
      if (itemType === player) {
        playerYX = newItem
      }
    }
    itemAttempts++
  }
  return newMap;
}