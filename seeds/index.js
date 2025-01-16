const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB接続OK");
  })
  .catch((err) => {
    console.log("MongoDB接続失敗");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

//データの挿入
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 2000) + 1000;
    const camp = new Campground({
      author: "676bee56aefb08aabb72a33c",
      location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
      title: `${sample(descriptors)}・${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[randomCityIndex].longitude,
          cities[randomCityIndex].latitude,
        ],
      },
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dmzhrtuc9/image/upload/v1735722249/YelpCamp/hb6mjnbt1k2ltmselerp.png",
          filename: "YelpCamp/hb6mjnbt1k2ltmselerp",
        },
      ],
      description:
        "木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。名高い桟も、",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("接続を終了");
});
