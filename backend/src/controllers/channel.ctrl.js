const ApiError = require("../utils/ApiError");
const { channelService } = require("../services");

module.exports = {
  async makeChannel(req, res, next) {
    const userId = req.userId;
    // location은 upload middleware 통해서 얻은 imageUrl임을 유의
    const { location } = req.file; 
    const { title, locationDist, locationCity, memberNum, spec } = req.body;
    try {
      const channelId = await channelService.createChannel(
        title, userId, locationDist, locationCity, memberNum, spec, location
      );

      res.status(201).json({
        success: true,
        message: "Channel create success.",
        datas: {
          _id: channelId,
        }
      });
    } catch (err) {
      next(err);
    }
  }
};
