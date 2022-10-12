const ApiError = require("../utils/ApiError");
const { channelService } = require("../services");

module.exports = {
  async makeChannel(req, res, next) {
    const userId = req.userId;
    // location은 upload middleware 통해서 얻은 imageUrl임을 유의
    var location = "https://elice-8seconds.s3.ap-northeast-2.amazonaws.com/plogging_cover.png";
    if(req.file) {
      var { location } = req.file;
    }
    const { title, locationDist, locationCity, memberNum, spec } = req.body;
    try {
      const channelId = await channelService.createChannel(
        title,
        userId,
        locationDist,
        locationCity,
        memberNum,
        spec,
        location
      );

      res.status(201).json({
        success: true,
        status: 201,
        message: "Channel create success.",
        datas: {
          _id: channelId,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async showChannelList(req, res, next) {
    try {
      // status == 0 : 모집 중인 채널
      // status == 1 : 모집 완료된 채널
      // status == 2 : 활동 종료된 채널
      const { page, status } = req.query;

      const channels = await channelService.getChannelList(page, status);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Channel list load success",
        totalPages: channels.totalPages,
        datas: channels.channelItems,
      });
    } catch (err) {
      next(err);
    }
  },

  async showChannelInfo(req, res, next) {
    const { channelId } = req.params;
    try {
      const channelInfo = await channelService.getChannelInfo(channelId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Channel info load success.",
        datas: channelInfo,
      });
    } catch (err) {
      next(err);
    }
  },

  async changeChannelInfo(req, res, next) {
    const userId = req.userId;
    const channelId = req.params.channelId;
    var location = null;
    if (req.file) {
      var { location } = req.file;
    }
    const { newTitle, newStatus, newSpec, newLocationDist, newLocationCity } =
      req.body;
    const toUpdate = {
      title: newTitle,
      status: newStatus,
      spec: newSpec,
      locationDist: newLocationDist,
      locationCity: newLocationCity,
      img: location,
    };
    try {
      const updatedChannelId = await channelService.updateChannelInfo(
        userId,
        channelId,
        toUpdate
      );

      res.status(201).json({
        success: true,
        status: 201,
        message: "Channel info change success",
        datas: {
          _id: updatedChannelId,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async requestChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
    const { message } = req.body;
    console.log(message);

    try {
      await channelService.requestEnter(userId, channelId);

      res.status(201).json({
        success: true,
        message: "Channel enter request success",
      });
    } catch (err) {
      next(err);
    }
  },

  async cancelChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
  
    try {
      await channelService.cancelEnter(userId, channelId);

      res.status(201).json({
        success: true,
        message: "Channel enter cancel success"
      });
    } catch (err) {
      next(err);
    }
  },

  async showWaitList(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
  
    try {
      const waitList = await channelService.getWaitList(userId, channelId);

      res.status(200).json({
        success: true,
        message: "Wait list get success",
        datas: waitList
      });
    } catch (err) {
      next(err);
    }
  },

  async acceptChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
    const { waitingId } = req.body;
  
    try {
      await channelService.acceptEnter(userId, channelId, waitingId);

      res.status(200).json({
        success: true,
        message: "channel enter accept success",
      });
    } catch (err) {
      next(err);
    }
  },

  async rejectChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
    const { waitingId } = req.body;
  
    try {
      await channelService.rejectEnter(userId, channelId, waitingId);

      res.status(200).json({
        success: true,
        message: "channel enter reject success",
      });
    } catch (err) {
      next(err);
    }
  },
};
