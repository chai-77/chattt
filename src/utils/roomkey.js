
// generate room key

function generateRoomKey(userId1, userId2) {
  return [userId1.toString(), userId2.toString()]
    .sort()
    .join("_");
}

module.exports = { generateRoomKey };