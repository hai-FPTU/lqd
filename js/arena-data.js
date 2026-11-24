/* =========================================================
   ĐẤU TRƯỜNG AI – dữ liệu minigame (sửa trực tiếp tại đây)
   ========================================================= */
window.ARENA = {

/* Cách tính điểm phiếu nhận thưởng (tổng 100) và quy định nhận quà */
prize: {
  weights: { tf: 30, ladder: 40, phone: 30 },
  ranks: [
    { min: 90, n: 'KIM CƯƠNG', c: '#06b6d4', ic: 'award' },
    { min: 75, n: 'VÀNG', c: '#f59e0b', ic: 'award' },
    { min: 60, n: 'BẠC', c: '#94a3b8', ic: 'award' },
    { min: 40, n: 'ĐỒNG', c: '#b45309', ic: 'award' }
  ],
  rule: 'Chơi đủ 3 thử thách, đạt hạng VÀNG trở lên (từ 75 điểm) rồi mang phiếu này lên bàn Ban tổ chức để nhận quà. Mỗi bạn nhận quà một lần.'
},

/* ---------- AI LÀ NHÀ KIẾN TẠO SỐ? (12 nấc, 3 mức khó) ---------- */
rungs: ['Người dùng mới', 'Người dùng tò mò', 'Người hỏi đúng', 'Người kiểm chứng', 'Người giữ riêng tư', 'Người chống deepfake', 'Người dùng có trách nhiệm', 'Người hiểu luật', 'Người kiểm soát AI', 'Người thiết kế có đạo đức', 'Người dẫn dắt', 'NHÀ KIẾN TẠO SỐ'],
ladder: {
  e: [
    { q: 'Chatbot trả lời bài tập rất trôi chảy. Điều đó có nghĩa là gì?', o: ['Câu trả lời chắc chắn đúng', 'Câu trả lời nghe hay nhưng vẫn có thể sai', 'AI đã tra cứu sách giáo khoa', 'AI hiểu bài như giáo viên'], a: 1, e: 'AI tạo sinh sinh ra câu chữ trôi chảy theo xác suất, không bảo đảm đúng. Luôn kiểm chứng.' },
    { q: 'Thông tin nào KHÔNG nên nhập vào chatbot?', o: ['Đề bài toán đã bỏ tên lớp', 'Số căn cước và địa chỉ nhà', 'Câu hỏi về lịch sử', 'Đoạn văn em tự viết'], a: 1, e: 'Số định danh, địa chỉ là dữ liệu cá nhân, có thể bị lưu và lộ.' },
    { q: 'Đâu là ví dụ AI có mặt trong đời sống của em?', o: ['Máy tính bỏ túi cộng 2 + 2', 'Bộ lọc thư rác trong email', 'Bóng đèn bật bằng công tắc', 'Đồng hồ cơ'], a: 1, e: 'Bộ lọc thư rác học từ hàng triệu thư để tự nhận ra thư rác.' },
    { q: 'Từ “deepfake” dùng để chỉ điều gì?', o: ['Mạng xã hội mới', 'Ảnh, video, giọng nói giả do AI tạo ra', 'Phần mềm diệt virus', 'Một loại mật khẩu'], a: 1, e: 'Deepfake là nội dung giả mạo hình ảnh, giọng nói người thật do AI tạo.' },
    { q: 'Prompt là gì?', o: ['Tên một ứng dụng AI', 'Câu lệnh, yêu cầu em gửi cho AI', 'Mật khẩu tài khoản', 'Virus máy tính'], a: 1, e: 'Prompt là câu lệnh. Prompt rõ vai trò, nhiệm vụ, bối cảnh, định dạng thì kết quả tốt hơn.' },
    { q: 'AI “học” chủ yếu từ đâu?', o: ['Từ dữ liệu', 'Từ điện năng', 'Từ màn hình', 'Từ bàn phím'], a: 0, e: 'Dữ liệu là “sách giáo khoa” của AI. Dữ liệu lệch thì AI lệch.' },
    { q: 'Nhận được tin “trúng thưởng, bấm link nhận quà”, em làm gì đầu tiên?', o: ['Bấm ngay kẻo hết hạn', 'Dừng lại, không bấm, kiểm tra nguồn', 'Chuyển tiếp cho bạn bè', 'Trả lời xin thêm quà'], a: 1, e: 'Bước 1 luôn là DỪNG. Kẻ lừa đảo dùng sự gấp gáp để em không kịp suy nghĩ.' },
    { q: 'Số điện thoại 113 dùng để làm gì?', o: ['Gọi cấp cứu y tế', 'Gọi Công an khi gặp nguy hiểm', 'Báo cháy', 'Hỏi giờ'], a: 1, e: '113 là Công an; 111 là tổng đài bảo vệ trẻ em; 114 là cứu hoả; 115 là cấp cứu.' },
    { q: 'Khi dùng AI hỗ trợ bài tập, việc nào thể hiện sự trung thực?', o: ['Chép nguyên văn và ghi tên mình', 'Ghi rõ phần có AI hỗ trợ', 'Giấu thầy cô', 'Nhờ bạn chép lại cho khác chữ'], a: 1, e: 'Trung thực học tập: tự làm, kiểm chứng, ghi rõ phần AI hỗ trợ theo hướng dẫn của thầy cô.' },
    { q: 'Một mật khẩu mạnh nên như thế nào?', o: ['Ngày sinh của em', '123456', 'Cụm từ dài, khó đoán, không dùng lại ở nơi khác', 'Tên trường'], a: 2, e: 'Cụm mật khẩu dài, riêng cho từng tài khoản, kèm xác thực 2 lớp.' }
  ],
  m: [
    { q: 'AI nhận diện giọng nói hiểu kém giọng một vùng miền. Nguyên nhân có khả năng nhất?', o: ['Người vùng đó nói sai', 'Dữ liệu huấn luyện thiếu giọng vùng đó', 'Micro bị hỏng', 'AI ghét vùng đó'], a: 1, e: 'Dữ liệu thiếu đa dạng khiến AI làm kém với nhóm bị thiếu (12.B1.MR1).' },
    { q: 'Dấu hiệu nào giúp nghi ngờ một video là deepfake?', o: ['Video có nhạc nền', 'Khẩu hình lệch tiếng, ánh sáng da bất thường, chớp mắt lạ', 'Video quay ngang', 'Video dài hơn 1 phút'], a: 1, e: 'Soi khẩu hình, ánh sáng, viền tóc, tay; và quan trọng nhất là kiểm chứng nguồn.' },
    { q: 'AI gợi ý một học sinh “nguy cơ sa sút”. Ai nên quyết định cách hỗ trợ?', o: ['Hệ thống AI tự gửi thông báo', 'Giáo viên chủ nhiệm xem xét rồi quyết định', 'Bạn cùng bàn', 'Công ty làm phần mềm'], a: 1, e: 'AI gợi ý, con người quyết định và chịu trách nhiệm (12.A1.2).' },
    { q: 'Nguyên tắc “minh bạch” khi thiết kế AI nghĩa là gì?', o: ['Màn hình trong suốt', 'Công khai cách AI hoạt động, không che giấu thông tin', 'Miễn phí cho mọi người', 'Chạy thật nhanh'], a: 1, e: 'Minh bạch: người dùng biết đang dùng AI, AI dựa vào đâu (12.A2.1).' },
    { q: 'Ứng dụng video cứ đề xuất nội dung giật gân. Lý do sâu xa nhất?', o: ['Em thích nội dung đó', 'Thuật toán được thiết kế để tối ưu thời gian xem', 'Điện thoại bị lỗi', 'Do mạng chậm'], a: 1, e: 'Mục tiêu thiết kế lệch (chỉ tối ưu thời gian xem) dẫn tới đẩy nội dung gây nghiện.' },
    { q: 'Bạn nhờ em dùng AI ghép mặt bạn khác vào ảnh chế. Hành vi này ở mức nào?', o: ['Rủi ro thấp', 'Chỉ là đùa vui', 'Có thể vi phạm pháp luật', 'Được phép nếu không đăng'], a: 2, e: 'Giả mạo hình ảnh người khác trái pháp luật bị nghiêm cấm; tạo ra đã là rủi ro lớn (12.B2.1).' },
    { q: 'Cách kiểm chứng tốt nhất một số liệu AI đưa ra?', o: ['Hỏi lại chính AI đó', 'Tìm nguồn gốc: báo cáo, trang chính thức', 'Xem có nhiều lượt thích không', 'Tin vì AI nói chắc chắn'], a: 1, e: 'Kiểm chứng bằng nguồn gốc độc lập, đáng tin cậy.' },
    { q: 'Em nên làm gì khi thấy một clip deepfake bôi nhọ bạn cùng lớp?', o: ['Chia sẻ để mọi người biết', 'Không chia sẻ, lưu bằng chứng, báo thầy cô và nền tảng', 'Bình luận chê bai', 'Im lặng mãi mãi'], a: 1, e: 'Không lan truyền, lưu bằng chứng, báo người có trách nhiệm.' },
    { q: 'Một prompt tốt cho việc học nên có những gì?', o: ['Chỉ một từ khoá', 'Vai trò, nhiệm vụ, bối cảnh, định dạng', 'Càng nhiều biểu tượng cảm xúc càng tốt', 'Viết hoa toàn bộ'], a: 1, e: 'Prompt 4 phần giúp AI trả lời đúng ý và phù hợp trình độ.' },
    { q: 'Dữ liệu nào là dữ liệu cá nhân nhạy cảm?', o: ['Môn học yêu thích', 'Thông tin sức khoẻ', 'Tên bài hát', 'Màu áo đồng phục'], a: 1, e: 'Sức khoẻ, sinh trắc học (khuôn mặt, vân tay)… là dữ liệu nhạy cảm, cần bảo vệ đặc biệt.' }
  ],
  h: [
    { q: 'Theo Luật Trí tuệ nhân tạo, hệ thống AI được phân loại theo mấy mức rủi ro?', o: ['2 mức', '3 mức: cao, trung bình, thấp', '5 mức', 'Không phân loại'], a: 1, e: 'Luật Trí tuệ nhân tạo phân loại theo 3 mức rủi ro: cao, trung bình, thấp.' },
    { q: 'Luật Trí tuệ nhân tạo (Luật số 134/2025/QH15) có hiệu lực từ ngày nào?', o: ['01/01/2026', '01/3/2026', '01/7/2026', '01/9/2026'], a: 1, e: 'Luật Trí tuệ nhân tạo có hiệu lực từ 01/3/2026.' },
    { q: 'Câu nào thể hiện đúng “trách nhiệm giải trình” khi AI quyết định sai?', o: ['“Do máy quyết định”', 'Nói rõ ai duyệt, căn cứ nào, tiếp nhận khiếu nại và sửa sai', 'Xoá dữ liệu để không ai biết', 'Đổ lỗi cho người dùng'], a: 1, e: 'Giải trình là trả lời được ai quyết định, vì sao, và sửa sai thế nào (12.A1.3).' },
    { q: 'Ứng dụng tuyển dụng học từ hồ sơ trúng tuyển 10 năm trước (phần lớn là nam) nên đánh giá thấp hồ sơ nữ. Nguyên tắc nào bị vi phạm?', o: ['Minh bạch', 'Công bằng', 'An toàn', 'Lợi ích xã hội'], a: 1, e: 'Dữ liệu quá khứ mang định kiến → kết quả phân biệt đối xử: vi phạm công bằng.' },
    { q: 'Mô hình đạt độ chính xác trung bình 95%. Vì sao vẫn cần kiểm thử theo từng nhóm người dùng?', o: ['Để mô hình chạy nhanh hơn', 'Vì con số trung bình có thể che giấu sai lệch với một nhóm', 'Vì luật cấm con số 95%', 'Không cần'], a: 1, e: 'AI có thể đúng 99% với nhóm đông nhưng sai nhiều với nhóm ít dữ liệu.' },
    { q: 'Cam kết đạo đức nào cụ thể, kiểm tra được nhất?', o: ['“Ứng dụng sẽ an toàn”', '“Chúng tôi tôn trọng quyền riêng tư”', '“Không lưu ảnh khuôn mặt, chỉ lưu mã đặc trưng, xoá sau 30 ngày”', '“Mọi người cùng chịu trách nhiệm”'], a: 2, e: 'Nguyên tắc tốt phải cụ thể, đo được để đối chiếu thiết kế (12.A2.MR1).' },
    { q: 'Học sinh có thể góp ý xây dựng chính sách về AI bằng cách nào?', o: ['Không có cách nào', 'Góp ý quy định của trường, góp ý dự thảo văn bản được công bố lấy ý kiến', 'Chỉ khi đủ 30 tuổi', 'Bình luận chửi bới trên mạng'], a: 1, e: 'Vai trò cá nhân trong góp ý, đề xuất chính sách và quy định về AI (12.B3.1).' },
    { q: 'AI “ảo giác” (hallucination) là hiện tượng gì?', o: ['AI bị nhiễm virus', 'AI bịa ra thông tin nghe hợp lý nhưng sai', 'AI chạy chậm', 'Màn hình bị nhoè'], a: 1, e: 'AI có thể bịa tên sách, số liệu, trích dẫn một cách rất tự tin.' },
    { q: 'Trong vòng đời AI, bước nào con người cần có quyền tạm dừng, thu hồi hệ thống?', o: ['Chỉ bước thu thập dữ liệu', 'Triển khai và giám sát, khi phát hiện sai sót gây hại', 'Không bước nào', 'Chỉ khi hết bảo hành'], a: 1, e: 'Con người phải duy trì kiểm soát và khả năng can thiệp (12.A1.1).' },
    { q: 'Nội dung AI mô phỏng người thật, sự kiện thật cần được xử lý thế nào theo quy định mới?', o: ['Không cần làm gì', 'Gắn nhãn để người xem nhận biết', 'Chỉ đăng vào ban đêm', 'Đổi tên tệp'], a: 1, e: 'Luật Trí tuệ nhân tạo yêu cầu gắn nhãn nhận biết nội dung do AI tạo, đặc biệt khi mô phỏng người thật, sự kiện thật.' }
  ]
},

/* ---------- ĐIỆN THOẠI BÁO ĐỘNG (tình huống mô phỏng) ---------- */
phone: [
  { app: 'Cuộc gọi video', from: 'Mẹ', av: 'M', c: '#db2777', call: true,
    msgs: ['(Hình hơi mờ, giọng giống hệt mẹ) Con ơi, mẹ đang ở bệnh viện, điện thoại sắp hết pin.', 'Con chuyển gấp 5 triệu vào số tài khoản cô y tá đọc nhé, đừng gọi lại, mẹ không nghe được đâu!'],
    o: [
      { t: 'Chuyển ngay vì đúng là mặt và giọng mẹ', s: 0, e: 'Giọng và mặt có thể bị AI giả. “Gấp + chuyển tiền + đừng gọi lại” là kịch bản lừa đảo kinh điển.' },
      { t: 'Cúp máy, gọi lại số quen của mẹ, bố hoặc người thân để xác minh', s: 2, e: 'Chuẩn! Xác minh qua kênh khác, số quen. Có thể đặt trước “câu hỏi bí mật” trong gia đình.' },
      { t: 'Hỏi lại trong chính cuộc gọi: “Mẹ thật không đấy?”', s: 1, e: 'Có nghi ngờ là tốt, nhưng kẻ gian sẽ trả lời “thật”. Phải xác minh qua kênh khác.' }
    ] },
  { app: 'Nhóm lớp', from: 'Tuấn (bạn cùng lớp)', av: 'T', c: '#2563eb',
    msgs: ['Ê tụi bây 😂 tao vừa dùng AI ghép mặt cô chủ nhiệm vào clip nhảy, hài xỉu', 'Tao gửi vô nhóm lớp nha, ai share nhiều nhất tao bao trà sữa'],
    o: [
      { t: 'Thả “haha” rồi chia sẻ cho vui', s: 0, e: 'Chia sẻ deepfake người thật khi chưa được đồng ý là xúc phạm danh dự, có thể vi phạm pháp luật.' },
      { t: 'Khuyên Tuấn xoá ngay, không chia sẻ; nếu đã lan thì báo thầy cô', s: 2, e: 'Đúng! Không lan truyền và giúp bạn dừng lại trước khi gây hại.' },
      { t: 'Im lặng, không xem, không nói gì', s: 1, e: 'Không chia sẻ là tốt, nhưng em có thể làm nhiều hơn: nhắc bạn và báo người có trách nhiệm.' }
    ] },
  { app: 'Tin nhắn SMS', from: 'HOCBONG-AI', av: '!', c: '#ea580c',
    msgs: ['CHÚC MỪNG! Em được chọn nhận học bổng AI 20.000.000đ.', 'Xác minh trong 30 phút tại hocbong-ai.vn-xacminh.top: tải ảnh căn cước 2 mặt + quay video khuôn mặt.'],
    o: [
      { t: 'Làm theo ngay kẻo hết 30 phút', s: 0, e: 'Ảnh căn cước + video khuôn mặt có thể bị dùng mở tài khoản, vay tiền, làm deepfake.' },
      { t: 'Bấm link xem thử, chưa nhập gì', s: 0, e: 'Chỉ bấm link lạ cũng có thể bị dẫn tới trang độc hại. Không bấm!' },
      { t: 'Không bấm; xem tên miền thật là “vn-xacminh.top”; chặn, báo cáo và hỏi thầy cô', s: 2, e: 'Chuẩn! Tên miền thật nằm cuối cùng: “.top”, không phải trang chính thức.' }
    ] },
  { app: 'Nhóm bài tập', from: 'Linh (nhóm trưởng)', av: 'L', c: '#7c3aed',
    msgs: ['Mai nộp thuyết trình rồi 😩', 'Cho AI làm hết 20 slide luôn đi, cô không biết đâu, mỗi đứa đứng đọc là xong'],
    o: [
      { t: 'Đồng ý, đỡ mệt', s: 0, e: 'Nộp sản phẩm AI làm hộ như bài của mình là gian lận học tập.' },
      { t: 'Dùng AI gợi ý dàn ý, cả nhóm tự làm, kiểm chứng số liệu, ghi rõ phần AI hỗ trợ', s: 2, e: 'Đúng cách dùng AI: AI là trợ lý, em là tác giả chịu trách nhiệm.' },
      { t: 'Từ chối, tự làm riêng phần của mình, kệ cả nhóm', s: 1, e: 'Giữ trung thực là tốt, nhưng hãy thuyết phục nhóm cùng làm đúng cách.' }
    ] },
  { app: 'Ứng dụng AI vẽ ảnh', from: 'AnimeMe AI', av: 'A', c: '#0891b2',
    msgs: ['Tạo ảnh anime cực xinh trong 3 giây! ✨', 'Yêu cầu: tải 10 ảnh selfie, cho phép truy cập DANH BẠ và TOÀN BỘ THƯ VIỆN ẢNH.'],
    o: [
      { t: 'Cho phép tất cả cho nhanh', s: 0, e: 'Ứng dụng vẽ ảnh không cần danh bạ. Cấp quyền thừa là trao dữ liệu của cả em và người khác.' },
      { t: 'Dùng ảnh của bạn thân thay vì ảnh của mình', s: 0, e: 'Đưa ảnh người khác vào AI khi chưa được đồng ý là xâm phạm quyền riêng tư của bạn.' },
      { t: 'Từ chối quyền danh bạ, thư viện; đọc chính sách dữ liệu; nếu cần chỉ chọn 1 ảnh không lộ thông tin', s: 2, e: 'Chuẩn! Chỉ cấp quyền tối thiểu, đọc kỹ ứng dụng lưu ảnh ở đâu, bao lâu.' }
    ] },
  { app: 'Chatbot', from: 'Trợ lý AI', av: 'AI', c: '#0d9488',
    msgs: ['Theo nghiên cứu năm 2025 của Đại học Harvard, học sinh ngủ 4 tiếng mỗi đêm học tốt hơn 30%.', 'Bạn có thể dùng số liệu này trong bài thuyết trình nhé! 😊'],
    o: [
      { t: 'Đưa vào bài luôn, có tên Harvard rồi', s: 0, e: 'AI có thể “ảo giác”, bịa nghiên cứu nghe rất thật. Số liệu này còn trái với khuyến nghị về giấc ngủ.' },
      { t: 'Hỏi lại chatbot: “Bạn chắc không?”', s: 1, e: 'Tốt hơn, nhưng AI có thể tiếp tục khẳng định sai. Cần nguồn độc lập.' },
      { t: 'Tìm nghiên cứu gốc; không tìm thấy thì không dùng', s: 2, e: 'Chuẩn! Không có nguồn gốc kiểm chứng được thì không đưa vào bài.' }
    ] },
  { app: 'Mạng xã hội', from: 'Người lạ “Studio Ảnh”', av: 'S', c: '#be123c',
    msgs: ['Chào em, anh tuyển mẫu ảnh tuổi học sinh 📸', 'Em gửi vài ảnh chân dung + số điện thoại, anh dùng AI làm bộ ảnh miễn phí, đừng kể với bố mẹ nhé, bất ngờ mà.'],
    o: [
      { t: 'Gửi ảnh vì được miễn phí', s: 0, e: 'Ảnh có thể bị dùng làm deepfake, tống tiền. Lời dặn “đừng kể với bố mẹ” là dấu hiệu nguy hiểm.' },
      { t: 'Hỏi thêm tên công ty rồi mới gửi', s: 0, e: 'Kẻ xấu sẵn sàng bịa tên công ty. Không gửi ảnh, thông tin cho người lạ.' },
      { t: 'Không trả lời, chặn, báo cáo tài khoản và kể ngay với người lớn tin cậy', s: 2, e: 'Đúng! Có thể gọi 111 (tổng đài bảo vệ trẻ em) nếu thấy bị đe doạ.' }
    ] },
  { app: 'Nhóm lớp', from: 'Hà (lớp phó)', av: 'H', c: '#16a34a',
    msgs: ['[Video] Bộ trưởng tuyên bố cho học sinh cả nước nghỉ học 1 tháng!!! 🎉', 'Video chưa có nhãn AI, không ghi nguồn. Cả nhóm đang bàn tán rôm rả.'],
    o: [
      { t: 'Chia sẻ ngay cho các nhóm khác', s: 0, e: 'Phát tán tin sai sự thật có thể bị xử phạt. Đừng là mắt xích lan truyền.' },
      { t: 'Chờ xem có ai xác nhận không', s: 1, e: 'Không chia sẻ là tốt, nhưng hãy chủ động kiểm chứng.' },
      { t: 'Kiểm tra trên trang chính thức của Bộ, của trường; nhắc nhóm không chia sẻ', s: 2, e: 'Chuẩn! Thông báo chính thức luôn có trên kênh chính thức.' }
    ] },
  { app: 'Ứng dụng học tập', from: 'Hệ thống chấm bài AI', av: '✓', c: '#2563eb',
    msgs: ['Bài luận của em: 3,5/10 điểm.', 'Lý do: “Nội dung không phù hợp.” (Em đã viết đúng đề và rất kỹ.)'],
    o: [
      { t: 'Chấp nhận, máy chấm chắc đúng', s: 0, e: 'AI có thể sai. Em có quyền được biết lý do và đề nghị xem xét lại.' },
      { t: 'Đăng lên mạng chê bai nhà trường', s: 0, e: 'Phản ứng như vậy không giải quyết vấn đề và có thể ảnh hưởng tới người khác.' },
      { t: 'Lịch sự đề nghị thầy cô xem lại bài, hỏi tiêu chí chấm', s: 2, e: 'Chuẩn! Con người phải kiểm soát và giải trình quyết định của AI (12.A1.3).' }
    ] },
  { app: 'Thông báo nhà trường', from: 'Đoàn trường', av: 'Đ', c: '#f59e0b',
    msgs: ['Đoàn trường lấy ý kiến học sinh về dự thảo “Quy định sử dụng AI trong học tập”.', 'Hạn góp ý: thứ Sáu tuần này.'],
    o: [
      { t: 'Bỏ qua, việc của người lớn', s: 0, e: 'Quy định ảnh hưởng trực tiếp tới em, ý kiến của em có giá trị.' },
      { t: 'Gửi góp ý cụ thể: nêu vấn đề, ví dụ và đề xuất cách làm', s: 2, e: 'Chuẩn! Đây là vai trò cá nhân trong góp ý chính sách về AI (12.B3.1).' },
      { t: 'Than phiền trong nhóm chat riêng', s: 1, e: 'Có ý kiến là tốt, nhưng hãy gửi đúng kênh để được lắng nghe.' }
    ] }
],

/* Câu Thật hay Giả bổ sung theo tình huống */
tfMore: [
  { q: 'Video có giọng nói giống hệt người thân thì chắc chắn là thật.', a: false, e: 'AI có thể nhân bản giọng nói chỉ từ vài giây ghi âm.' },
  { q: 'Nên thống nhất một “câu hỏi bí mật” trong gia đình để xác minh cuộc gọi lạ.', a: true, e: 'Một cách đơn giản, hiệu quả chống lừa đảo giả giọng.' },
  { q: 'Ứng dụng vẽ ảnh bằng AI cần quyền truy cập danh bạ mới hoạt động được.', a: false, e: 'Chỉ cấp quyền tối thiểu cần thiết.' },
  { q: 'Nếu AI ghi rõ tên trường đại học nổi tiếng thì số liệu đó chắc chắn có thật.', a: false, e: 'AI có thể bịa nguồn trích dẫn. Hãy tìm tài liệu gốc.' },
  { q: 'Không chia sẻ tin chưa kiểm chứng cũng là một cách bảo vệ cộng đồng.', a: true, e: 'Mỗi người dừng lại là chuỗi lan truyền bị cắt.' },
  { q: 'Đưa ảnh bạn thân vào ứng dụng AI không cần hỏi ý bạn vì là bạn thân.', a: false, e: 'Tôn trọng quyền riêng tư và dữ liệu của người khác, kể cả bạn thân.' },
  { q: 'Tên miền “truong-thpt.edu.vn.xacminh.top” thuộc về trang chính thức của trường.', a: false, e: 'Tên miền thật là phần cuối cùng: “xacminh.top”.' },
  { q: 'Em có quyền đề nghị xem xét lại khi một hệ thống AI đánh giá sai về mình.', a: true, e: 'Người bị ảnh hưởng có quyền được biết và khiếu nại.' }
],

/* Rung chuông vàng: lời dẫn cho người điều khiển */
bell: {
  title: 'Rung chuông vàng AI',
  lead: 'Chế độ trình chiếu cho cả hội trường. Học sinh ghi đáp án lên bảng con, giơ lên khi hết giờ. Ai sai rời sàn thi đấu.',
  time: 15
}
};
