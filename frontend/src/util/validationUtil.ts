// 참고: google
// email 정규식, password 정규식

class ValidationUtil {
  static checkEmailValidate(email: string) {
    const isValid = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!isValid) return false;
    return true;
  }

  static checkPasswordValidate(password: string) {
    if (password.includes(" ")) return false;
    // 8 ~ 15 영문, 특수문자, 숫자 조합
    const isValid = password.match(
      /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
    );
    if (!isValid) return false;
    return true;
  }

  static checkNicknameValidate(nickname: string) {
    const myNicnkname = nickname.trim();
    if (myNicnkname.length < 4) return false;
    return true;
  }
}

Object.freeze(ValidationUtil);
export default ValidationUtil;
