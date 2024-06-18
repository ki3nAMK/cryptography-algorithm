function gcd(a, b) {
  if (a < b) return gcd(b, a);
  if (a % b == 0) return b;
  return gcd(b, a % b);
}

function power(x, y, mod) {
  if (y == 0) return 1;

  let temp = power(x, parseInt(y / 2, 10), mod) % mod;
  temp = (temp * temp) % mod;

  if (y % 2 == 1) temp = (temp * x) % mod;

  return temp;
}

function isCarmichaelNumber(n) {
  for (let b = 2; b < n; b++) {
    if (gcd(b, n) == 1)
      if (power(b, n - 1, n) != 1)
        return 0;
  }
  return 1;
}

const result = isCarmichaelNumber(11);
console.log(result);

// [
//     3,   5,   7,  11,  13,  17,  19,  23,  29,  31,  37,  41,
//    43,  47,  53,  59,  61,  67,  71,  73,  79,  83,  89,  97,
//   101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157,
//   163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227,
//   229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
//   293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367,
//   373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439,
//   443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509,
//   521, 523, 541, 547,
//   ... 2 more items
// ]