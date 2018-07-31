const formatAddress = (user) => {
  return `${user.street} ${user.city} ${user.state} ${user.zip}`;
};

// compares two arrays, then compares each object in arrays
const isEqualVotes = (oldVotes, newVotes) => {
  if (oldVotes.length !== newVotes.length) return false;
  for (let i = 0; i < newVotes.length; i++) {
    for (const key in oldVotes[i]) {
      if (oldVotes[i][key] !== newVotes[i][key]) {
        return false;
      }
    }
  }
  return true;
};

export {formatAddress, isEqualVotes};
