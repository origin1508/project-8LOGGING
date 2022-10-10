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
  },

  async showRecruitChannels(req, res, next) {
    try {
      const { page, perPage } = req.query;

      const recruitChannels = await channelService.getRecruitChannels(page, perPage);

      res.status(200).json({
        success: true,
        message: "Channel list load success",
        datas: recruitChannels
      });
    } catch (err) {
      next(err);
    }
  },

  async showChannelInfo(req, res, next) {
    const { channelId }= req.params;
    try {
      const channelInfo = await channelService.getChannelInfo(channelId)

      res.status(200).json({
        success: true,
        message: "Channel info load success.",
        datas: channelInfo
      });
    } catch (err) {
      next(err);
    }
  },

  async changeChannelInfo(req, res, next) {
    const userId = req.userId;
    const channelId = req.params.channelId;
    var location = null;
    if(req.file) {
      var { location } = req.file;
    }
    const { newTitle, newStatus, newSpec, newLocationDist, newLocationCity } = req.body;
    const toUpdate = { 
      title: newTitle,
      status: newStatus,
      spec: newSpec,
      locationDist: newLocationDist,
      locationCity: newLocationCity,
      img: location
    }
    try {
      const updatedChannelId = await channelService.updateChannelInfo(userId, channelId, toUpdate);

      res.status(201).json({
        success: true,
        message: "Channel info change success",
        datas: {
          _id: updatedChannelId,
        }
      });
    } catch (err) {
      next(err);
    }
  },
};
