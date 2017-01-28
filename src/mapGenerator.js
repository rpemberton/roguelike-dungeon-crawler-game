const rows = 49;
const cols = 49;
const rooms = 13;
const minSize = 5;
const maxSize = 11;
const attempts = 500;
const wall = 0;
const floor = 1;

function mapGenerator() {
  let floorMap = [];
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
    for (let i = room.y - 1; i < room.y + room.h + 1; i++) {
      for (let j = room.x - 1; j < room.x + room.w + 1; j++) {
        if (floorMap[i][j] === floor) {
          return false;
        }
      }
    }
    return true;
  }
  
  function randomWall(min, max) {
    if (min === max) return max;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function addRoom(floorMap) {
    let newRoom = {};
    let room = {
      h: randomWall(minSize, maxSize),
      w: randomWall(minSize, maxSize),
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
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
  let roomsToLink = [];
  while (roomsToLink.length < rooms && i < attempts) {
    let newRoom = addRoom(floorMap);
    if (newRoom) {
      roomsToLink.push(newRoom);
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
    linkRooms(roomsToLink[count], roomsToLink[count + 1]);
    count++;
  }
  
  return floorMap;
}

export default mapGenerator;