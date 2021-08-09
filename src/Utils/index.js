import { timestampToJalaali } from "./jalali";

class Utils {
  get_currency(currency) {
    let str = "";
    switch (currency) {
      case "IRT":
        str = "تومان";
        break;
      case "IRR":
        str = "ریال";
        break;
    }
    return str;
  }
  cama_for_digit(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  }
  timestampToJalaali(timestamp, format = undefined) {
    return timestampToJalaali(timestamp, format);
  }
  shamsi_str(time, timer = true) {
    var str = "";
    let arra_date = [];
    var date = new Date();
    date.setTime(time * 1000);
    arra_date = this.gregorian_to_jalali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    if (!timer) {
      str = str =
        (arra_date[0] >= 10 ? arra_date[0] : "0" + arra_date[0]) +
        "/" +
        (arra_date[1] >= 10 ? arra_date[1] : "0" + arra_date[1]) +
        "/" +
        (arra_date[2] >= 10 ? arra_date[2] : "0" + arra_date[2]);
    } else {
      str =
        (arra_date[0] >= 10 ? arra_date[0] : "0" + arra_date[0]) +
        "/" +
        (arra_date[1] >= 10 ? arra_date[1] : "0" + arra_date[1]) +
        "/" +
        (arra_date[2] >= 10 ? arra_date[2] : "0" + arra_date[2]) +
        "-" +
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    }
    return str;
  }
  JalaaliToTimestamp(str) {
    if (str == null) return null;
    let j = str.split("/");

    // eslint-disable-next-line no-unused-vars
    let g = this.jalali_to_gregorian(
      parseInt(j[0]),
      parseInt(j[1]),
      parseInt(j[2])
    );

    let gregorian = new Date();
    gregorian.setFullYear(g[0]);
    gregorian.setMonth(g[1] - 1);
    gregorian.setDate(g[2]);

    return Math.floor(gregorian.getTime() / 1000);
  }
  jalali_to_gregorian(jy, jm, jd) {
    let sal_a, gy, gm, gd, days;
    jy += 1595;
    days =
      -355668 +
      365 * jy +
      parseInt(jy / 33) * 8 +
      parseInt(((jy % 33) + 3) / 4) +
      jd +
      (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    gy = 400 * parseInt(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * parseInt(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * parseInt(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += parseInt((days - 1) / 365);
      days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [
      0,
      31,
      (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ];
    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
    return [gy, gm, gd];
  }
  gregorian_to_jalali(gy, gm, gd) {
    let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = gy <= 1600 ? 0 : 979;
    gy -= gy <= 1600 ? 621 : 1600;
    let gy2 = gm > 2 ? gy + 1 : gy;
    let days =
      365 * gy +
      parseInt((gy2 + 3) / 4) -
      parseInt((gy2 + 99) / 100) +
      parseInt((gy2 + 399) / 400) -
      80 +
      gd +
      g_d_m[gm - 1];
    jy += 33 * parseInt(days / 12053);
    days %= 12053;
    jy += 4 * parseInt(days / 1461);
    days %= 1461;
    jy += parseInt((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    let jm =
      days < 186 ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    let jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
    return [jy, jm, jd];
  }
  makeToast(append = false, title, message, color, self) {
    self.toastCount++;
    self.$bvToast.toast(`${message}`, {
      title: title,
      autoHideDelay: 5000,
      appendToast: append,
      variant: color,
      solid: true
    });
  }
  resolvePaymentMethod(payment) {
    let text = "";
    switch (payment) {
      case 1:
        text = "نقدی";
        break;
      case 2:
        text = "کارت خوان";
        break;
      case 3:
        text = "آنلاین";
        break;
    }
    return text;
  }
  resolveDeliveryMethod(delivery_method) {
    console.log(delivery_method);
    return "test";
  }
  resolveOrderStatus(order_status) {
    let text = "";
    switch (order_status) {
      case 3:
        text = "تایید مشتری";
        break;

      case 4:
        text = "تایید سفارش";
        break;

      case 5:
        text = "کنسل شده";
        break;

      case 6:
        text = "پایان یافته";
        break;

      case 7:
        text = "ارسال شده";
        break;

      case 8:
        text = "تحویل داده شد";
        break;

      case 9:
        text = "برگشت خورده";
        break;

      case 10:
        text = "در حال بررسی";
        break;

      case 201:
        text = "ارسال به الوپیک";
        break;

      case 202:
        text = "الوپیک دستور گرفته";
        break;

      case 203:
        text = "الوپیک در جستجو";
        break;

      case 204:
        text = "الوپیک در راه فروشگاه";
        break;

      case 205:
        text = "الوپیک به فروشگاه رسیده";
        break;

      case 206:
        text = "الوپیک تحویل گرفته";
        break;

      case 207:
        text = "الوپیک در راه خریدار";
        break;

      case 208:
        text = "الوپیک تحویل داده";
        break;

      case 209:
        text = "پایان ارسال";
        break;

      case 211:
        text = "مشکل در ارتباط با الوپیک";
        break;

      case 212:
        text = "الوپیک پیدا نشده";
        break;

      case 210:
        text = "در حال بروز رسانی وضعیت";
        break;

      case 213:
        text = "الوپیک کنسل شده";
        break;

      case 250:
        text = "ارسال به حامی";
        break;

      case 251:
        text = "خطا در ارسال به حامی";
        break;

      case 252:
        text = "حامی - دریافت سفارش";
        break;

      case 253:
        text = "حامی - سفارش ثبت شد";
        break;

      case 254:
        text = "حامی - سفارش رد شد";
        break;

      case 255:
        text = "حامی - سفارش به پیک داده شد";
        break;

      case 256:
        text = "حامی - سفارش در شعبه ثبت شد";
        break;

      case 257:
        text = "حامی - سفارش نیاز به تماس با رستوران";
        break;

      case 258:
        text = "حامی - سفارش در شعبه رد شد";
        break;

      case 259:
        text = "حامی - سفارش در حال بررسی در سایت";
        break;

      case 260:
        text = "حامی - سفارش در شعبه دریافت شد";
        break;

      case 261:
        text = "حامی - سفارش ابطال شد";
        break;

      case 262:
        text = "حامی - سفارش در شعبه باز شد";
        break;

      case 263:
        text = "حامی - سفارش به شعبه ارسال شد";
        break;

      case 264:
        text = "حامی - سفارش در مرکز تماس رد شد";
        break;

      default:
        text = "نامشخص";
        break;
    }

    return text;
  }
  day_week(time) {
    let d = new Date();
    d.setTime(time * 1000);
    let n = d.getDay();
    let str = "";
    switch (n) {
      case 0:
        str = "یکشنبه";
        break;
      case 1:
        str = "دوشنبه";
        break;
      case 2:
        str = "سه شنبه ";
        break;
      case 3:
        str = "چهارشنبه ";
        break;
      case 4:
        str = "پنجشنبه";
        break;
      case 5:
        str = "جمعه";
        break;
      case 6:
        str = "شنبه";
        break;
    }
    return str;
  }
  short_string(x) {
    if (x.length > 30) return x.substr(0, 29) + "...";
    else return x;
  }
  wallet_operation(operation) {
    let text = "";
    if (operation == "sharj") {
      text = "شارژ";
    } else if (operation == "afzayesh") {
      text = "افزایش توسط مدیر";
    } else if (operation == "buy") {
      text = "خرید";
    } else if (operation == "system") {
      text = "افزایش توسط مدیر";
    } else if (operation == "cancel_order") {
      text = "لغو سفارش";
    }
    return text;
  }
}
export const utils = new Utils();
