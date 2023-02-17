exports.register = async (req, res, next) => {
  try {
    // get data from body
    const data = req.body;

    // response with success message
    res.status(201).json({ message: "account was successfully created" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // get data from body
    const data = req.body;

    // response with accessToken
    res.status(200).json({ accessToken: "no access token for now" });
  } catch (err) {
    next(err);
  }
};
