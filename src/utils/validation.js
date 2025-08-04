const isUpdateAllowed = (data) => {
  const updationAllowed = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(data).every((key) =>
    updationAllowed.includes(key)
  );

  return isAllowed;
};

module.exports = { isUpdateAllowed };
