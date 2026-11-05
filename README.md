# 🔞 NV-Addon (AVDB 18+ Nuvio Provider)

Plugin Scraper xem phim 18+ Châu Á & JAV trực tiếp từ **AVDB** dành cho ứng dụng **Nuvio Streaming** (Android TV, Google TV, Android Mobile, Tablet, iOS).

> [!TIP]
> **Hoạt động trực tiếp trên thiết bị (Client-Side - Không cần Server trung gian):**
> * Không tốn chi phí thuê máy chủ / VPS.
> * Luồng phát m3u8 được ký theo chính dải IP của thiết bị người xem, giải quyết triệt để lỗi lệch IP gây **"Source error"**.
> * Tự động gắn cặp Header chống chặn (`Referer: https://upload18.org/` và `Origin: https://upload18.org`) vượt tường lửa Cloudflare 403.

---

## 📲 Link cài đặt vào Nuvio

Sao chép đường dẫn bên dưới để dán vào ứng dụng Nuvio:

```text
https://raw.githubusercontent.com/9000000/NV-Addon/main/manifest.json
```

---

## 🛠️ Hướng dẫn cài đặt từng bước trên Nuvio

1. Mở ứng dụng **Nuvio** trên TV hoặc điện thoại của bạn.
2. Điều hướng tới menu: **Cài đặt (Settings)** ➔ **Plugins** (hoặc **Content & Discovery** ➔ **Plugins**).
3. Nhấp vào nút **"Add Plugin"** (hoặc biểu tượng dấu `+` ở góc trên màn hình).
4. Dán đường dẫn sau vào ô nhập:
   ```text
   https://raw.githubusercontent.com/9000000/NV-Addon/main/manifest.json
   ```
5. Nhấn **Xác nhận (Confirm / Add)**.
6. Plugin **AVDB 18+** sẽ hiển thị trong danh sách Scrapers của Nuvio. Khi bạn chọn một phim, Nuvio sẽ tự động bóc tách link phát trực tiếp `AVDB Direct 🚀` để xem mượt mà!

---

## ✨ Tính năng nổi bật

* 🚀 **1080p Full HD HLS**: Tự động giải mã nguồn m3u8 chất lượng cao nhất từ Upload18 / Helvid CDN.
* 🛡️ **Chống chặn Cloudflare**: Tích hợp sẵn headers chuẩn của trình duyệt.
* ⚡ **Tốc độ tải tức thì**: Kết nối trực tiếp giữa thiết bị người dùng và CDN, không có độ trễ do server trung gian.
* 📱 **Tương thích cao**: Đã được biên dịch & tối ưu cho engine JavaScript **Hermes** của React Native trên Nuvio.

---

## ⚖️ Tuyên bố từ chối trách nhiệm (Disclaimer)

* Plugin này không lưu trữ, phân phối hay tải lên bất kỳ tệp video nào.
* Toàn bộ nội dung video được bóc tách và phát trực tiếp từ các nhà cung cấp nguồn công khai của bên thứ ba.
