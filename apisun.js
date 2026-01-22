
const http = require("http");

const SUN_API = "https://sunlaymaynkx.hacksieucap.pro/ttsunver2";

// ===== HÀM GỌI API SUN =====
async function getSunFull() {
  try {
    const res = await fetch(SUN_API);
    const data = await res.json();

    return {
      // ===== PHIÊN =====
      phien_hien_tai: data.phien_dudoan, // đổi tên
      phien_truoc: data.phien,

      // ===== DỰ ĐOÁN =====
      du_doan: data.du_doan_van_sau, // đổi tên
      ket_qua_hien_tai: data.ket_qua_hien_tai,
      do_tin_cay: data.do_tin_cay,

      // ===== CẦU =====
      cau_truc_cau: data.cau_truc_cau,

      // ===== PATTERN =====
      pattern_full: data.pattern_full,
      pattern_length: data.pattern_length,
      pattern_recent_20: data.pattern_recent_20,
      pattern_recent_50: data.pattern_recent_50,
      pattern_recent_100: data.pattern_recent_100,

      // ===== GIẢI THÍCH =====
      giai_thich: data.giai_thich,
      giai_thich_chi_tiet: data.giai_thich_chi_tiet,

      // ===== THỐNG KÊ =====
      thong_ke: data.thong_ke,

      // ===== HỆ THỐNG =====
      he_thong: data.he_thong,
      model_info: data.model_info,
      tinh_nang: data.tinh_nang,
      ty_le_thanh_cong: data.ty_le_thanh_cong,

      // ===== META =====
      id: @tiendataox
    };
  } catch (err) {
    return { error: "Sun API lỗi hoặc die", detail: err.toString() };
  }
}

// ===== SERVER HTTP =====
const server = http.createServer(async (req, res) => {
  if (req.url === "/api/sundaicho") {
    const data = await getSunFull();

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify(data, null, 2));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// ===== START SERVER =====
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server chạy: http://localhost:${PORT}/api/sun`);
});