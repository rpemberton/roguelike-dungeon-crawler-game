const rows = 49;
const cols = 49;
const rooms = 13;
const minSize = 5;
const maxSize = 9;
const attempts = 500;
const spritesTotal = 15;
const wall = 0;
const floor = 1;
let sprite = 2;

let floorMap = [];

function mapGenerator() {
  // create blank floorMap
  for (let i = 0; i < cols; i++) {
    floorMap.push(Array(rows).fill(wall));
  }
  
  function isNotOutsideMap(floorMap, room) {
    // top and bottom
    if (room.y < 1 || room.y + room.h > rows - 1) {
      return false;
    }
    // left and right
    if (room.x < 1 || room.x + room.w > cols - 1) {
      return false;
    }
    return true;
  }
  
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
  
  function randomWallSize(min, max) {
    if (min === max) return max;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
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
  
  let i = 0;
  let roomsArr = [];
  while (roomsArr.length < rooms && i < attempts) {
    let newRoom = addRoom(floorMap);
    if (newRoom) {
      roomsArr.push(newRoom);
    }
    i++
  }
  
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
  
  let count = 0;
  while (count < rooms - 1) {
    linkRooms(roomsArr[count], roomsArr[count + 1]);
    count++;
  }


  function addSprite() {

    const y = Math.floor(Math.random() * (cols - 1 - 1)) + 1;
    const x = Math.floor(Math.random() * (rows - 1 - 1)) + 1;

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (floorMap[i][j] !== floor) {
          return false;
        }
      }
    }

    floorMap[y][x] = sprite;

    return true;
  }

  let spriteCount = 0;
  let newSprite = false;
  let spriteAttempts = 0;

  while (spriteCount < spritesTotal && spriteAttempts < attempts) {
    newSprite = addSprite();
    if (newSprite) {
      spriteCount++
    }
    spriteAttempts++
  }
  
  return floorMap;
}



export default mapGenerator;