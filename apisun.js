const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/api/sun", async (req, res) => {
    try {
        const response = await axios.get("https://sunlaymaynkx.hacksieucap.pro/ttsunver2");
        const data = response.data;

        // Đổi key
        if (data.du_doan_van_sau) {
            data.du_doan = data.du_doan_van_sau;
            delete data.du_doan_van_sau;
        }

        if (data.phien_dudoan) {
            data.phien_hien_tai = data.phien_dudoan;
            delete data.phien_dudoan;
        }

        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Lỗi khi gọi API" });
    }
});

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
