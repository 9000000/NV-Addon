# 🎬 NuvioTV Community Addons

**Plugin Repository** chứa các addon (scraper) mở rộng nguồn phim/stream cho ứng dụng **NuvioTV** (Android TV, Google TV, Mobile, iOS).

> [!TIP]
> **Addon chạy hoàn toàn Client-Side (trên thiết bị của bạn):**
> * ✅ Không cần server trung gian - tiết kiệm chi phí
> * ✅ Stream được phát trực tiếp từ CDN về thiết bị
> * ✅ Tự động xử lý headers chống chặn và bypass các tường lửa
> * ✅ Tốc độ tải nhanh, không qua trung gian

---

## 📲 Cài đặt vào NuvioTV

### Bước 1: Lấy Link Repository

```text
https://raw.githubusercontent.com/9000000/NV-Addon/main/manifest.json
```

### Bước 2: Thêm vào NuvioTV

1. Mở ứng dụng **NuvioTV** trên thiết bị
2. Vào **Settings** ➔ **Plugins** (hoặc **Content & Discovery** ➔ **Plugins**)
3. Nhấp **Add Plugin** (hoặc biểu tượng `+`)
4. Paste URL manifest ở trên
5. Nhấn **Confirm/Add**
6. Các addon sẽ xuất hiện trong danh sách Scrapers

---

## 🎯 Cách sử dụng

Sau khi cài đặt:

1. **Search phim** bạn muốn xem trong NuvioTV
2. **Click vào phim** để xem chi tiết
3. **Chọn addon** từ danh sách sources có sẵn
4. NuvioTV sẽ tự động tìm và hiển thị các link stream
5. **Chọn link chất lượng** bạn muốn (1080p, 720p, etc.)
6. **Enjoy!** 🍿

---

## ✨ Tính năng

### 🚀 Performance
- **Client-side execution** - Chạy trực tiếp trên thiết bị
- **Zero latency** - Kết nối trực tiếp tới CDN
- **Optimized for Hermes** - Tối ưu cho React Native engine

### 🛡️ Security & Reliability
- **Anti-block headers** - Tự động bypass tường lửa
- **Error handling** - Xử lý lỗi gracefully
- **Sandboxed execution** - Chạy trong môi trường an toàn

### � Quality
- **Multiple resolutions** - 1080p, 720p, 480p
- **HLS streaming** - Adaptive bitrate
- **Direct CDN links** - Không qua proxy

---

## 📦 Danh sách Addon

Repository này chứa nhiều addon từ các nguồn khác nhau. Mỗi addon được tối ưu riêng cho nguồn phim của nó.

Xem file `manifest.json` để biết danh sách đầy đủ các addon có sẵn.

---

## 🔧 Cho Developer

### Cấu trúc Repository

```text
NV-Addon/
├── providers/          # Built & minified addon files
│   ├── addon1.js
│   ├── addon2.js
│   └── ...
├── manifest.json       # Addon registry (Nuvio reads this)
└── README.md
```

### Tạo Addon của riêng bạn

Nếu bạn muốn phát triển addon:

1. **Fork repository này**
2. **Tham khảo source code** trong các file `providers/*.js`
3. **Follow format chuẩn**:
   ```javascript
   // Entry point: getStreams function
   export async function getStreams(tmdbId, mediaType, season, episode, userConfig) {
     // Your logic here
     return streams; // Array of stream objects
   }
   ```
4. **Minify code** trước khi add vào `providers/`
5. **Update manifest.json** với thông tin addon mới
6. **Submit Pull Request**

### Stream Object Format

```javascript
{
  name: "Stream Name",        // Required - Tên hiển thị
  url: "https://...",         // Required - Link stream
  quality: "1080p",          // Optional - Chất lượng
  description: "Details",     // Optional - Mô tả
  provider: "Source Name",    // Optional - Tên nguồn
  headers: { ... },          // Optional - Custom headers
  behaviorHints: { ... }     // Optional - Playback hints
}
```

---

## 📱 Thiết bị hỗ trợ

- ✅ Android TV
- ✅ Google TV
- ✅ Android Mobile & Tablet
- ✅ iOS (iPhone/iPad)
- ✅ Fire TV

---

## 🐛 Báo lỗi

Nếu gặp vấn đề:

1. **Check addon có được cài đặt chưa** (Settings → Plugins)
2. **Thử addon khác** để xác định lỗi
3. **Xem logs** trong NuvioTV debug console
4. **Report issue** trên GitHub với:
   - Mô tả lỗi
   - Addon đang dùng
   - Thiết bị và version NuvioTV

---

## 🤝 Đóng góp

Contributions welcome! 

- 🐛 **Bug fixes**
- ✨ **New addons**
- 📚 **Documentation improvements**
- 🎨 **Code optimization**

### Quy trình Contribute

1. Fork repository
2. Create feature branch (`git checkout -b feature/new-addon`)
3. Commit changes (`git commit -m 'Add new addon'`)
4. Push to branch (`git push origin feature/new-addon`)
5. Open Pull Request

---

## ⚠️ Disclaimer

- Repository này **KHÔNG lưu trữ** bất kỳ nội dung video nào
- Addon **chỉ là công cụ tìm kiếm** và trích xuất link từ các nguồn công khai
- Người dùng **tự chịu trách nhiệm** về nội dung họ truy cập
- Tôn trọng **bản quyền** và **điều khoản dịch vụ** của các nguồn cung cấp

---

## 📄 License

MIT License - Free to use and modify.

---

## 🔗 Links

- **NuvioTV App**: [Download link]
- **Documentation**: [Docs link]
- **Community**: [Discord/Forum link]
- **Source Code** (Private): Available to contributors

---

## ⭐ Support

Nếu thấy hữu ích, hãy:
- ⭐ **Star repository** này
- 🔄 **Share** với bạn bè
- 🤝 **Contribute** addon mới
- 💬 **Join community** để thảo luận

---

**Made with ❤️ for NuvioTV Community**
