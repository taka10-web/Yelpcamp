const User = require("../models/users");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerdUser = await User.register(user, password);
    req.login(registerdUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Yelp Campへようこそ！");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.login = async (req, res) => {
  const redirectUrl = req.session.returnTo || "/campgrounds";
  req.flash("success", "おかえりなさい！");
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "ログアウトしました");
    res.redirect("/campgrounds");
  });
};
