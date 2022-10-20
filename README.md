# 🚶 우리 같이 플로깅 할까요?
<br />
<br />

![plogging_logo](/uploads/a50fc68f184b86dc759f5a43dd311d49/plogging_logo.png)

<br />

## 📃 개요

- 서비스명 : 플로깅 매칭 커뮤니티 8LOGGING
- 개발 기간 : 2022.10.03 ~ 2022.10.22
- 주제 : 플로깅 활동가들을 위한 사용자 매칭 커뮤니티
- 목표 : 플로깅 활동을 하고자 하는 사람들에게 매칭 및 커뮤니티 서비스 제공
- api 문서 : [바로 가기](http://kdt-ai5-team08.elicecoding.com:3002/docs/)
- 테스트 페이지 : [바로 가기](http://kdt-ai5-team08.elicecoding.com/)

<br />

## 👪 팀원 소개


**김대운**
- Front-End
- Gmail : eodnsdlekd@gmail.com
- Github : [@dlzagu](https://github.com/dlzagu)

**김준호**
- Front-End
- Gmail : foxmon1524@gmail.com
- Github : [@foxmon](https://github.com/foxmon)

**윤태경**
- Front-End
- Gmail : origin1508@gmail.com
- Github : [@origin1508](https://github.com/origin1508)

**이준의**
- Back-End, Data-Analytics
- Gmail : wnsdml0120@gmail.com
- Github : [@ee-juni](https://github.com/ee-juni)

**황현성**
- Back-End
- Gmail : hhs950120@gmail.com
- Github : [@iHateAI](https://github.com/iHateAI)

<br />

## 🔧 기술 스택

### Front-End

<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<br />
<img src="https://img.shields.io/badge/Recoil-61DAFB?style=flat-square&logo=Recoil&logoColor=white"/>
<img src="https://img.shields.io/badge/styled_components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>

</div>

<br />

### Back-End

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/mongoDB-47A248?style=flat-square&logo=mongoDB&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white"/>
<br />
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</div>

<br />

### Data-Anlytics

<div>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
<img src="https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=Pandas&logoColor=white"/>
<img src="https://img.shields.io/badge/Matplotlib-ffffff?style=flat-square&logo=Matplotlib&logoColor=black"/>
</div>

<br />

### Server-Infra
<div>
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/pm2-2B037A?style=flat-square&logo=pm2&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/>
</div>

<br />

## 📁 프로젝트 구조

### Front-End

```
📦frontend
 ┣ 📂public
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜notfound-img.png
 ┃ ┃ ┣ 📜plogging-about-1.png
 ┃ ┃ ┣ 📜plogging_logo.png
 ┃ ┃ ┣ 📜popup-cancel.png
 ┃ ┃ ┣ 📜popup-icon.png
 ┃ ┃ ┣ 📜preview-form-img.png
 ┃ ┃ ┗ 📜welcome-img.png
 ┃ ┣ 📜123.jpeg
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜mainBg.png
 ┃ ┣ 📜mainPloggingImg.png
 ┃ ┣ 📜mainPloggingImg2.png
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂rule
 ┃ ┗ 📜RULE.md
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜aboutFetcher.ts
 ┃ ┃ ┣ 📜authFetcher.ts
 ┃ ┃ ┗ 📜channelFetcher.ts
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┣ 📜aboutPloggingComponent.tsx
 ┃ ┃ ┃ ┗ 📜AboutWrapperComponent.tsx
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜AuthEmailVerification.tsx
 ┃ ┃ ┃ ┣ 📜AuthLogin.tsx
 ┃ ┃ ┃ ┗ 📜AuthRegister.tsx
 ┃ ┃ ┣ 📂channel
 ┃ ┃ ┃ ┣ 📜ChannelEdit.tsx
 ┃ ┃ ┃ ┣ 📜ChannelHeader.tsx
 ┃ ┃ ┃ ┣ 📜ChannelSendButton.tsx
 ┃ ┃ ┃ ┗ 📜MemberList.tsx
 ┃ ┃ ┣ 📂channelDetail
 ┃ ┃ ┃ ┣ 📜ChannelDetail.tsx
 ┃ ┃ ┃ ┗ 📜ChannelInfo.tsx
 ┃ ┃ ┣ 📂chart
 ┃ ┃ ┃ ┣ 📜BarChart.tsx
 ┃ ┃ ┃ ┗ 📜MultiLineChart.tsx
 ┃ ┃ ┣ 📂commonLayout
 ┃ ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┃ ┗ 📜Footer.tsx
 ┃ ┃ ┃ ┗ 📂sidebars
 ┃ ┃ ┃ ┃ ┣ 📜Channel.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SidebarComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜sidebarData.ts
 ┃ ┃ ┣ 📂contextMenu
 ┃ ┃ ┃ ┗ 📜ContextMenu.tsx
 ┃ ┃ ┣ 📂errorBoundary
 ┃ ┃ ┃ ┣ 📜CommonErrorBoundary.tsx
 ┃ ┃ ┃ ┗ 📜CustomErrorComponent.tsx
 ┃ ┃ ┣ 📂hoc
 ┃ ┃ ┃ ┣ 📜BaseCardContainer.tsx
 ┃ ┃ ┃ ┣ 📜BaseChannelComponent.tsx
 ┃ ┃ ┃ ┣ 📜BaseChartContainer.tsx
 ┃ ┃ ┃ ┣ 📜BaseErrorBoundaryContainer.tsx
 ┃ ┃ ┃ ┣ 📜BaseGridPageComponent.tsx
 ┃ ┃ ┃ ┣ 📜BaseInputContainer.tsx
 ┃ ┃ ┃ ┣ 📜BasePageComponent.tsx
 ┃ ┃ ┃ ┗ 📜BaseValidateTextContainer.tsx
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┗ 📜CustomIcon.tsx
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┃ ┗ 📜LoadingCycle.tsx
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📜AboutPlogging.tsx
 ┃ ┃ ┃ ┣ 📜Auth.tsx
 ┃ ┃ ┃ ┣ 📜Channel.tsx
 ┃ ┃ ┃ ┣ 📜ChannelForm.tsx
 ┃ ┃ ┃ ┣ 📜ChannelList.tsx
 ┃ ┃ ┃ ┣ 📜ErrorPage.tsx
 ┃ ┃ ┃ ┣ 📜Main.tsx
 ┃ ┃ ┃ ┣ 📜NotFound.tsx
 ┃ ┃ ┃ ┗ 📜Profile.tsx
 ┃ ┃ ┣ 📂paginate
 ┃ ┃ ┃ ┗ 📜PaginateButton.tsx
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┣ 📜ChannelHistory.tsx
 ┃ ┃ ┃ ┣ 📜ChannelHistoryCard.tsx
 ┃ ┃ ┃ ┣ 📜ChannelHistoryDetail.tsx
 ┃ ┃ ┃ ┣ 📜Follow.tsx
 ┃ ┃ ┃ ┣ 📜FollowList.tsx
 ┃ ┃ ┃ ┣ 📜User.tsx
 ┃ ┃ ┃ ┣ 📜UserCard.tsx
 ┃ ┃ ┃ ┣ 📜UserDeleteAccount.tsx
 ┃ ┃ ┃ ┣ 📜UserEdit.tsx
 ┃ ┃ ┃ ┣ 📜UserImageUpdate.tsx
 ┃ ┃ ┃ ┣ 📜UserInfoEditForm.tsx
 ┃ ┃ ┃ ┗ 📜UserPsEditForm.tsx
 ┃ ┃ ┗ 📂recruitingChannel
 ┃ ┃ ┃ ┣ 📜ChannelCard.tsx
 ┃ ┃ ┃ ┣ 📜ChannelEnter.tsx
 ┃ ┃ ┃ ┣ 📜ChannelFormCard.tsx
 ┃ ┃ ┃ ┗ 📜channelListData.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useChartData.ts
 ┃ ┃ ┣ 📜useCheckDuplication.ts
 ┃ ┃ ┣ 📜useEditForm.ts
 ┃ ┃ ┣ 📜useLoginForm.ts
 ┃ ┃ ┣ 📜useModal.ts
 ┃ ┃ ┣ 📜usePaginate.ts
 ┃ ┃ ┣ 📜usePsEditForm.ts
 ┃ ┃ ┣ 📜useRegisterForm.ts
 ┃ ┃ ┗ 📜useScroll.ts
 ┃ ┣ 📂recoil
 ┃ ┃ ┗ 📂atoms
 ┃ ┃ ┃ ┣ 📜authState.ts
 ┃ ┃ ┃ ┗ 📜channelState.ts
 ┃ ┣ 📂router
 ┃ ┃ ┗ 📜CustomRouter.tsx
 ┃ ┣ 📂storage
 ┃ ┃ ┣ 📜cookie.ts
 ┃ ┃ ┗ 📜storage.ts
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┣ 📜EliceDigitalBaeumOTF_Bold.otf
 ┃ ┃ ┃ ┗ 📜EliceDigitalBaeumOTF_Regular.otf
 ┃ ┃ ┣ 📜commonAboutStyle.ts
 ┃ ┃ ┣ 📜commonStyle.ts
 ┃ ┃ ┣ 📜Dots.tsx
 ┃ ┃ ┣ 📜globalStyle.ts
 ┃ ┃ ┗ 📜theme.ts
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜authTypes.ts
 ┃ ┃ ┃ ┗ 📜validationTypes.ts
 ┃ ┃ ┣ 📂channel
 ┃ ┃ ┃ ┗ 📜channelTypes.ts
 ┃ ┃ ┣ 📂chart
 ┃ ┃ ┃ ┗ 📜chartDataType.ts
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜baseChartPropsType.ts
 ┃ ┃ ┃ ┗ 📜baseComponentType.ts
 ┃ ┃ ┗ 📂error
 ┃ ┃ ┃ ┗ 📜errorType.ts
 ┃ ┣ 📂util
 ┃ ┃ ┣ 📜chartOption.ts
 ┃ ┃ ┣ 📜customAxios.ts
 ┃ ┃ ┣ 📜customSocket.ts
 ┃ ┃ ┣ 📜imageResizeUtil.ts
 ┃ ┃ ┣ 📜scrollToTop.ts
 ┃ ┃ ┗ 📜validationUtil.ts
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜fontTypes.d.ts
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜setupTests.js
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜craco.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.paths.json
 ┗ 📜yarn.lock
```

### Back-End

```
📦backend
 ┣ 📂.vscode
 ┃ ┗ 📜settings.json
 ┣ 📂public
 ┃ ┣ 📂apiDocs
 ┃ ┃ ┣ 📜auth.docs.yaml
 ┃ ┃ ┣ 📜channels.docs.yaml
 ┃ ┃ ┣ 📜chat.docs.yaml
 ┃ ┃ ┣ 📜data.docs.yaml
 ┃ ┃ ┣ 📜error.docs.yaml
 ┃ ┃ ┣ 📜follow.docs.yaml
 ┃ ┃ ┗ 📜user.docs.yaml
 ┃ ┗ 📂data
 ┃ ┃ ┣ 📜korea_sea_monitor.json
 ┃ ┃ ┣ 📜microplastic.json
 ┃ ┃ ┗ 📜trash_rot.json
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜mongoose.js
 ┃ ┃ ┣ 📜socket.js
 ┃ ┃ ┗ 📜swagger.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜auth.ctrl.js
 ┃ ┃ ┣ 📜channel.ctrl.js
 ┃ ┃ ┣ 📜chat.ctrl.js
 ┃ ┃ ┣ 📜data.ctrl.js
 ┃ ┃ ┣ 📜error.ctrl.js
 ┃ ┃ ┣ 📜follow.ctrl.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜user.ctrl.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜error.js
 ┃ ┃ ┣ 📜jwtVerification.js
 ┃ ┃ ┗ 📜upload.js
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜channel.model.js
 ┃ ┃ ┣ 📜chatLog.model.js
 ┃ ┃ ┣ 📜chatRoom.model.js
 ┃ ┃ ┣ 📜emailAuth.model.js
 ┃ ┃ ┣ 📜follow.model.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜refreshToken.model.js
 ┃ ┃ ┣ 📜user.model.js
 ┃ ┃ ┗ 📜waitList.model.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜auth.route.js
 ┃ ┃ ┣ 📜channel.route.js
 ┃ ┃ ┣ 📜chat.route.js
 ┃ ┃ ┣ 📜data.route.js
 ┃ ┃ ┣ 📜error.route.js
 ┃ ┃ ┣ 📜follow.route.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜user.route.js
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜auth.service.js
 ┃ ┃ ┣ 📜channel.service.js
 ┃ ┃ ┣ 📜chat.service.js
 ┃ ┃ ┣ 📜data.service.js
 ┃ ┃ ┣ 📜email.service.js
 ┃ ┃ ┣ 📜follow.service.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜user.service.js
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜ApiError.js
 ┃ ┃ ┣ 📜AsyncWrapper.js
 ┃ ┃ ┣ 📜dateToString.js
 ┃ ┃ ┗ 📜EmailDelivery.js
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜yarn.lock
```

<br />

## 💾 DB 컬렉션 구조
<br />
![er_다이어그램](/uploads/8045fe23308bd879a06678336c9b977e/er_다이어그램.PNG)
