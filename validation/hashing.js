const bc = require("bcrypt");

function hashing(password) {
  const salt = bc.genSaltSync(10);
  const hash = bc.hashSync(password, salt);
  return hash;
}
function comparing(password) {
    return bc.compare(password,hashing(password, 10));
}

exports.hashing = hashing;
exports.comparing = comparing;
