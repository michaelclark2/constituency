const formatAddress = (user) => {
  return `${user.street} ${user.city} ${user.state} ${user.zip}`;
};

export default formatAddress;
