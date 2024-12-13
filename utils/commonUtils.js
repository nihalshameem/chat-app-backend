const commonResJson = (data = null, message = "", status = "e") => {
  switch (status) {
    case "s":
      status = "success";
      break;
    case "a":
      status = "unauthorized";
      break;
    case "e":
      status = "error";
      break;

    default:
      status = "error";
      break;
  }
  return {
    data: data,
    message: message,
    status: status,
  };
};

module.exports = { commonResJson };
