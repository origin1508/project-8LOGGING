const ApiError = require("../utils/ApiError");
const dateToString = require("../utils/dateToString");
const { sendEmail } = require("../utils/EmailDelivery");

// 모델 불러오기
const { User, Channel, WaitList } = require("../models");

module.exports = {
  /**
   * 새로운 채널 생성
   *
   * @param {String} title
   * @param {String} userId
   * @param {String} locationDist
   * @param {String} locationCity
   * @param {Number} memberNum
   * @param {String} spec
   * @param {String} location
   * @returns
   */
  async createChannel(
    title,
    userId,
    locationDist,
    locationCity,
    memberNum,
    spec,
    location
  ) {
    // 중복된 제목 체크
    const exChannel = await Channel.findOne({ title });
    if (exChannel) {
      throw ApiError.badRequest("이미 존재하는 채널명입니다.");
    }

    // 채널 생성
    const channel = await Channel.create({
      title,
      ownerId: userId,
      locationDist,
      locationCity,
      memberNum,
      spec,
      img: location,
      members: [userId],
      status: 0,
    });

    // WaitList 생성
    const waitList = await WaitList.create({
      channelId: channel._id,
      ownerId: userId,
    });

    // 생성한 user의 channels, waitResList 정보 update
    const user = await User.findOne({ _id: userId });
    const updatedUser = await User.findByIdAndUpdate(userId, {
      channels: [...user.channels, channel._id],
      waitResList: [...user.waitReqList, waitList._id],
    });

    return channel._id;
  },

  /**
   * 모집 중인 채널 목록 반환
   *
   * @returns
   */
  // async getRecruitChannels() {
  //   const channels = await Channel.find({status: 0});

  //   const recruitChannels = await Promise.all(channels.map( async (channel) => {
  //     // ownerId에 해당되는 nickname 찾기용
  //     const user = await User.findById(channel.ownerId)

  //     return {
  //       _id: channel._id,
  //       title: channel.title,
  //       imgUrl: channel.img,
  //       locationDist: channel.locationDist,
  //       locationCity: channel.locationCity,
  //       memberNum: channel.memberNum,
  //       curMemberNum: channel.members.length,
  //       ownerNickname: user.nickname
  //     }
  //   }));

  //   return recruitChannels
  // },

  async getChannelList(page, status) {
    const perPage = 12; // 페이지당 9개씩 보여주기
    const allChannelsCount = await Channel.find({}).count();
    let totalPages = null;
    if (allChannelsCount % perPage === 0) {
      totalPages = allChannelsCount / perPage;
    } else {
      totalPages = Math.floor(allChannelsCount / perPage + 1);
    }

    const channels = await Channel.find({ status })
      .sort({ _id: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
    const channelItems = channels.map((channel) => {
      channel.createdAt = dateToString(channel.createdAt);
      return channel;
    });
    return {
      channelItems,
      totalPages,
    };
  },

  /**
   * 채널 검색하기
   *
   * @param {Number} page
   * @param {Number} status
   * @param {String} keyword
   * @param {String} filter
   * @returns
   */
  async searchChannel(page, status, keyword, filter) {
    const perPage = 12; // 페이지당 9개씩 보여주기
    const allChannels = await Channel.find({ status });

    // 필터 설정하기
    const filterTitle = (channel, keyword) => {
      return channel.title.includes(keyword);
    };
    const filterRegion = (channel, keyword) => {
      const l1Incl = channel.locationDist.includes(keyword);
      const l2Incl = channel.locationCity.includes(keyword);
      const lBothIncl =
        `${channel.locationDist} ${channel.locationCity}`.includes(keyword);
      return l1Incl || l2Incl || lBothIncl;
    };

    const filteredChannels = allChannels.filter((channel) => {
      if (filter == "title") {
        return filterTitle(channel, keyword);
      } else if (filter == "region") {
        return filterRegion(channel, keyword);
      } else {
        return filterTitle(channel, keyword) || filterRegion(channel, keyword);
      }
    });

    let totalPages = null;
    if (filteredChannels.length % perPage === 0) {
      totalPages = filteredChannels.length / perPage;
    } else {
      totalPages = Math.floor(filteredChannels.length / perPage + 1);
    }
    const channels = filteredChannels.slice(
      (page - 1) * perPage,
      page * perPage
    );
    const channelItems = channels.map((channel) => {
      channel.createdAt = dateToString(channel.createdAt);
      return channel;
    });

    return {
      channelItems,
      totalPages,
    };
  },

  /**
   * 채널 정보 확인
   *
   * @param {String} channelId
   */
  async getChannelInfo(channelId) {
    const channel = await Channel.findById(channelId);
    const owner = await User.findById(channel.ownerId);

    // 멤버들 정보 불어오기
    const membersInfo = await Promise.all(
      channel.members.map(async (memberId) => {
        const member = await User.findById(memberId);
        return {
          memberId,
          memberNickname: member.nickname,
          memberPic: member.profPic,
        };
      })
    );

    // 채널 정보 모으기
    const channelInfo = {
      _id: channel._id,
      title: channel.title,
      ownerInfo: {
        ownerId: channel.ownerId,
        ownerNickname: owner.nickname,
        ownerPic: owner.profPic,
      },
      locationDist: channel.locationDist,
      locationCity: channel.locationCity,
      imgUrl: channel.img,
      spec: channel.spec,
      memberNum: channel.memberNum,
      membersInfo,
    };

    return channelInfo;
  },

  /**
   * 채널 상태 변경
   *
   * @param {String} userId
   * @param {String} channelId
   * @param {Number} newStatus
   * @returns
   */
  async updateChannelInfo(userId, channelId, toUpdate) {
    // 채널 소유권 확인
    const channel = await Channel.findById(channelId);
    if (channel.ownerId != userId) {
      throw ApiError.badRequest("채널의 수정 권한이 없습니다.");
    }

    // 채널 정보 수정
    const { title, status, spec, locationDist, locationCity, img } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(status && { status }),
      ...(spec && { spec }),
      ...(locationDist && { locationDist }),
      ...(locationCity && { locationCity }),
      ...(img && { img }),
    };

    const updatedChannel = await Channel.findByIdAndUpdate(
      channelId,
      newValues
    );

    return updatedChannel._id;
  },

  /**
   * 채널 입장 신청
   *
   * @param {String} userId
   * @param {String} channelId
   * @returns
   */
  async requestEnter(userId, channelId) {
    // 채널 소유권 확인
    const channel = await Channel.findById(channelId);
    if (channel.ownerId == userId) {
      throw ApiError.badRequest("본인이 개설한 채널에 가입할 수 없습니다.");
    }

    // 채널 가입 여부 확인
    if (channel.members.includes(userId)) {
      throw ApiError.badRequest("이미 채널에 가입 돼있습니다.")
    }

    // waitList 수정
    const waitList = await WaitList.findOne({ channelId });
    if (waitList.waiting.includes(userId)) {
      throw ApiError.badRequest("이미 가입 신청한 채널입니다.");
    }
    await WaitList.findOneAndUpdate(
      { channelId },
      {
        waiting: [...waitList.waiting, userId],
      }
    );

    // user channels, waitReqList 수정
    const user = await User.findById(userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        waitReqList: [...user.waitReqList, waitList._id],
        channels: [...user.channels, channel._id],
      },
      { new: true }
    );

    // 이메일 전송
    const owner = await User.findById(channel.ownerId);

    const from = '"8LOGGING" <wnsdml0120@gmail.com>';
    const to = owner.email;
    const subject = "8LOGGING 채널 입장 신청이 들어왔습니다!";
    const text = `${user.nickname} 님께서 회원님의 채널 [ ${channel.title} ]에 입장 신청하였습니다. 입장을 수락 혹은 거절해주세요!`;
    const html = `<b>${user.nickname}</b>님께서 회원님의 채널 <b>[ ${channel.title} ]</b>에 입장 신청하였습니다.<br/><br/>입장을 수락 혹은 거절해주세요!`;
    await sendEmail(from, to, subject, text, html);

    // 채널 정보 반환
    const channels = await Promise.all(
      updatedUser.channels.map(async (channelId) => {
        const channel = await Channel.findById(channelId);
        return (({ _id, title, img }) => ({ _id, title, img }))(channel);
      })
    );
    return channels;
  },

  /**
   * 채널 입장 신청 취소
   *
   * @param {String} userId
   * @param {String} channelId
   * @returns
   */
  async cancelEnter(userId, channelId) {
    // waitList 수정
    const waitList = await WaitList.findOne({ channelId });
    if (!waitList.waiting.includes(userId)) {
      throw ApiError.badRequest("가입 신청한 적이 없는 채널입니다.");
    }
    await WaitList.findOneAndUpdate(
      { channelId },
      {
        waiting: waitList.waiting.filter((id) => String(id) != String(userId)),
      }
    );

    // user channels, waitReqList 수정
    const user = await User.findById(userId);
    const newWaitReqList = user.waitReqList.filter(
      (id) => String(id) !== String(waitList._id)
    );
    console.log("newWaitreqlist:",newWaitReqList);
    const newChannels = user.channels.filter((id) => String(id) != String(channelId));
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        waitReqList: newWaitReqList,
        channels: newChannels,
      },
      { new: true }
    );

    // 이메일 전송
    const channel = await Channel.findById(channelId);
    const owner = await User.findById(channel.ownerId);

    const from = '"8LOGGING" <wnsdml0120@gmail.com>';
    const to = owner.email;
    const subject = "8LOGGING 채널 입장 신청이 취소되었습니다!";
    const text = `${user.nickname} 님께서 회원님의 채널 [ ${channel.title} ] 입장 신청을 취소하였습니다.`;
    const html = `<b>${user.nickname}</b>님께서 회원님의 채널 <b>[ ${channel.title} ]</b> 입장 신청을 취소하였습니다.`;
    await sendEmail(from, to, subject, text, html);

    // 채널 정보 반환
    const channels = await Promise.all(
      updatedUser.channels.map(async (channelId) => {
        const channel = await Channel.findById(channelId);
        return (({ _id, title, img }) => ({ _id, title, img }))(channel);
      })
    );
    return channels;
  },

  /**
   * 채널 입장 신청 목록 확인
   *
   * @param {String} userId
   * @param {String} channelId
   * @returns
   */
  async getWaitList(userId, channelId) {
    // 권한 확인
    const channel = await Channel.findById(channelId);
    if (channel.ownerId !== userId) {
      throw ApiError.badRequest("조회 권한이 없습니다.");
    }

    // waitList 조회
    const rawWaitList = await WaitList.findOne({ channelId });

    // waitList에 있는 user 정보들 반환
    const waitList = await Promise.all(
      rawWaitList.waiting.map(async (id) => {
        const user = await User.findById(id);
        return { userId: id, nickname: user.nickname, profPic: user.profPic };
      })
    );

    return waitList;
  },

  /**
   * 채널 입장 수락
   *
   * @param {String} userId
   * @param {String} channelId
   * @param {String} waitingId
   */
  async acceptEnter(userId, channelId, waitingId) {
    // 권한 확인
    const channel = await Channel.findById(channelId);
    if (channel.ownerId !== userId) {
      throw ApiError.badRequest("수락 권한이 없습니다.");
    }

    // waitList 수정
    const waitList = await WaitList.findOne({ channelId });
    await WaitList.findOneAndUpdate(
      { channelId },
      {
        waiting: waitList.waiting.filter((id) => id != waitingId),
      }
    );

    // channel member 수정하기
    const newMembers = [...channel.members, waitingId];
    await Channel.findByIdAndUpdate(channelId, { members: newMembers });

    // waiting user waitReqList 수정
    const user = await User.findById(waitingId);
    const newWaitReqList = user.waitReqList.filter(
      (id) => id.str !== waitList._id.str
    );
    await User.findByIdAndUpdate(waitingId, { waitReqList: newWaitReqList });

    // 이메일 전송
    const owner = await User.findById(channel.ownerId);
    const from = '"8LOGGING" <wnsdml0120@gmail.com>';
    const to = user.email;
    const subject = "8LOGGING 채널 입장 신청이 수락되었습니다!";
    const text = `${owner.nickname} 님께서 채널 [ ${channel.title} ] 입장 신청을 수락하였습니다. 즐거운 플로깅하세요!`;
    const html = `<b>${owner.nickname}</b>님께서 채널 <b>[ ${channel.title} ]</b> 입장 신청을 수락하였습니다.<br/><br/> 즐거운 플로깅하세요!`;
    await sendEmail(from, to, subject, text, html);
  },

  /**
   * 채널 입장 거절
   *
   * @param {String} userId
   * @param {String} channelId
   * @param {String} waitingId
   */
  async rejectEnter(userId, channelId, waitingId) {
    // 권한 확인
    const channel = await Channel.findById(channelId);
    if (channel.ownerId !== userId) {
      throw ApiError.badRequest("거절 권한이 없습니다.");
    }

    // waitList 수정
    const waitList = await WaitList.findOne({ channelId });
    await WaitList.findOneAndUpdate(
      { channelId },
      {
        waiting: waitList.waiting.filter((id) => id != waitingId),
      }
    );

    // waiting user channels, waitReqList 수정
    const user = await User.findById(waitingId);
    const newWaitReqList = user.waitReqList.filter(
      (id) => id.str !== waitList._id.str
    );
    const newChannels = user.channels.filter((id) => id != channelId);
    await User.findByIdAndUpdate(waitingId, {
      waitReqList: newWaitReqList,
      channels: newChannels,
    });

    // 이메일 전송
    const owner = await User.findById(channel.ownerId);
    const from = '"8LOGGING" <wnsdml0120@gmail.com>';
    const to = user.email;
    const subject = "8LOGGING 채널 입장 신청이 수락되었습니다!";
    const text = `${owner.nickname} 님께서 채널 [ ${channel.title} ] 입장 신청을 거절하였습니다.`;
    const html = `<b>${owner.nickname}</b>님께서 채널 <b>[ ${channel.title} ]</b> 입장 신청을 거절하였습니다.`;
    await sendEmail(from, to, subject, text, html);
  },

  /**
   * 유저와 채널의 관계
   *
   * @param {String} userId
   * @param {String} channelId
   * @returns
   */
  async checkUserChannelRelation(userId, channelId) {
    const channel = await Channel.findById(channelId);
    // 채널 owner 여부 확인
    if (channel.ownerId == userId) return 0;
    // 채널 입장 대기 여부 확인
    const waitList = await WaitList.findOne({ channelId });
    if (waitList.waiting.includes(userId)) return 2;
    // 채널 소속 여부 확인
    if (channel.members.includes(userId)) return 1;
    // 상기 모두 해당 없으면
    return 3;
  },

  /**
   * 채널 떠나기
   *
   * @param {String} userId
   * @param {String} channelId
   * @returns
   */
  async quitChannel(userId, channelId) {
    const channel = await Channel.findById(channelId);
    // 채널 owner 여부 확인
    if (channel.ownerId == userId) {
      throw ApiError.badRequest("채널 개설자는 채널에서 나갈 수 없습니다.");
    }
    // 채널 member 여부 확인
    if (!channel.members.includes(userId)) {
      throw ApiError.badRequest("채널 소속 멤버만 채널을 나갈 수 있습니다.");
    }

    // user의 채널 정보, channel의 멤버 정보 수정
    const user = await User.findById(userId);
    const updatedChannels = user.channels.filter((id) => id != channelId);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      channels: updatedChannels,
    });

    const updatedMembers = channel.members.filter((id) => id != userId);
    await Channel.findByIdAndUpdate(channelId, { members: updatedMembers });

    // 채널 정보 반환
    const channels = await Promise.all(
      updatedUser.channels.map(async (channelId) => {
        const channel = await Channel.findById(channelId);
        return (({ _id, title, img }) => ({ _id, title, img }))(channel);
      })
    );
    return channels;
  },

  /**
   * 채널 삭제하기
   *
   * @param {String} userId
   * @param {String} channelId
   * @returns
   */
  async deleteChannel(userId, channelId) {
    const channel = await Channel.findById(channelId);
    // 채널 owner 여부 확인
    if (channel.ownerId != userId) {
      throw ApiError.badRequest("채널 개설자만 채널을 삭제할 수 있습니다.");
    }

    // 각 멤버의 채널 정보 수정
    await Promise.all(
      channel.members.map(async (memberId) => {
        const user = await User.findById(memberId);
        const updatedChannels = user.channels.filter((id) => id != channelId);
        await User.findByIdAndUpdate(memberId, { channels: updatedChannels });
      })
    );

    // waitResList 수정
    const waitList = await WaitList.findOne({ channelId });
    const owner = await User.findById(userId);
    const updatedWaitResList = owner.waitResList.filter(
      (waitListId) => waitListId != waitList._id
    );
    const updatedUser = await User.findByIdAndUpdate(userId, {
      waitResList: updatedWaitResList,
    });

    // waitReqList 수정
    await Promise.all(
      waitList.waiting.map(async (userId) => {
        const user = await User.findById(userId);
        const updatedWaitReqList = user.waitReqList.filter(
          (waitListId) => waitListId != waitList._id
        );
        await User.findByIdAndUpdate(userId, {
          waitReqList: updatedWaitReqList,
        });
      })
    );

    // channel, waitList 삭제
    await Channel.findByIdAndDelete(channelId);
    await WaitList.findByIdAndDelete(waitList._id);

    // 채널 정보 반환
    const channels = await Promise.all(
      updatedUser.channels.map(async (channelId) => {
        const channel = await Channel.findById(channelId);
        return (({ _id, title, img }) => ({ _id, title, img }))(channel);
      })
    );
    return channels;
  },
};
