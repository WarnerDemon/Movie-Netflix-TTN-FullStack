const Ratings = require('../Model/ratingModel.js');

const ratingCtrl = {
  async getAllRating(req, res) {
    try {
      const ratings = await Ratings.find({}).populate('user').populate('film');

      return res.status(200).json({
        status: 200,
        success: true,
        msg: `Get all ratings successfully`,
        data: ratings,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: 'Failed to get all ratings',
      });
    }
  },

  //Đánh giá sao cho bộ phim
  async ratingFilm(req, res) {
    try {
      const userId = req.user.id;
      const filmId = req.params.filmId;
      const { score } = req.body;

      const newRating = new Ratings({
        user: userId,
        film: filmId,
        score,
      });

      await newRating.save();

      return res.status(200).json({
        status: 200,
        success: true,
        msg: 'Rated film successfully',
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: 'Failed to rate film',
      });
    }
  },
};

module.exports = ratingCtrl;
