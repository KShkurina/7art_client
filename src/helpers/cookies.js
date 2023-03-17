export function setCookie(name, value, hoursExpire) {
  var expires;
  if (hoursExpire) {
    let date = new Date();
    // 60 * 60 * 10 = 36000000
    date.setTime(date.getTime() + hoursExpire * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

export function getCookie(cookieName) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(cookieName + "=");
    if (c_start !== -1) {
      c_start = c_start + cookieName.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return document.cookie.substring(c_start, c_end);
    }
  }
  return "";
}
