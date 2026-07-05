import express from 'express';
import Level from '../models/Level.js';
import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';

const router = express.Router();

const levelsData = [
  {
    code: 'A1',
    name: 'Starter (Cơ bản)',
    description: 'Dành cho người mới bắt đầu. Tập trung vào các chủ đề quen thuộc, cấu trúc câu cực kỳ đơn giản và từ vựng thông dụng hàng ngày.',
    order: 1,
  },
  {
    code: 'A2',
    name: 'Elementary (Sơ cấp)',
    description: 'Học cách dịch các đoạn mô tả ngắn, hoạt động thường nhật và du lịch. Bắt đầu tiếp cận các thì quá khứ và tương lai đơn giản.',
    order: 2,
  },
  {
    code: 'B1',
    name: 'Intermediate (Trung cấp)',
    description: 'Chủ đề liên quan đến công việc, học tập, và sở thích. Làm quen với các câu ghép phức tạp hơn và cách diễn đạt ý kiến cá nhân.',
    order: 3,
  },
  {
    code: 'B2',
    name: 'Upper-Intermediate (Trung thượng cấp)',
    description: 'Các chủ đề mang tính học thuật và xã hội phổ thông (khoa học, môi trường, công nghệ). Tập trung vào từ vựng chuyên ngành cơ bản.',
    order: 4,
  },
  {
    code: 'C1',
    name: 'Advanced (Cao cấp)',
    description: 'Các văn bản học thuật sâu sắc, kinh tế, tâm lý học và triết học. Cấu trúc câu phức tạp, giàu tính biểu cảm và học thuật.',
    order: 5,
  },
];

const lessonsData = [
  // ================= A1 LESSONS =================
  {
    title: 'Thói quen hằng ngày của Anna (Anna\'s Daily Routine)',
    levelCode: 'A1',
    englishText: 'My name is Anna. I am from Spain. I live in a small apartment with my cat, Luna. Every morning, I drink coffee and eat toast. I work in a library near my home. I like my job because I love books.',
    vietnameseText: 'Tên tôi là Anna. Tôi đến từ Tây Ban Nha. Tôi sống trong một căn hộ nhỏ với con mèo của tôi, Luna. Mỗi sáng, tôi uống cà phê và ăn bánh mì nướng. Tôi làm việc ở một thư viện gần nhà. Tôi thích công việc của mình vì tôi yêu sách.',
    keywordsEn: ['Anna', 'Spain', 'apartment', 'cat', 'Luna', 'coffee', 'toast', 'library', 'books'],
    keywordsVi: ['Anna', 'Tây Ban Nha', 'căn hộ', 'mèo', 'Luna', 'cà phê', 'bánh mì nướng', 'thư viện', 'yêu sách'],
    vocabulary: [
      { word: 'apartment', ipa: '/əˈpɑːrt.mənt/', meaning: 'căn hộ', example: 'I live in a small apartment.' },
      { word: 'toast', ipa: '/toʊst/', meaning: 'bánh mì nướng', example: 'I eat toast for breakfast.' },
      { word: 'library', ipa: '/ˈlaɪ.brer.i/', meaning: 'thư viện', example: 'She works in a public library.' }
    ],
    grammar: [
      { structure: 'Simple Present (Thì hiện tại đơn)', explanation: 'Dùng để tả thói quen hoặc sự thật hiển nhiên ở hiện tại.', example: 'I live in Spain. I love books.' }
    ]
  },
  {
    title: 'Gia đình nhỏ của tôi (My Small Family)',
    levelCode: 'A1',
    englishText: 'I have a small family. There are four people: my father, my mother, my brother, and me. My father is a doctor. My mother is a teacher. We live in a beautiful house in Hanoi. On weekends, we cook dinner together.',
    vietnameseText: 'Tôi có một gia đình nhỏ. Có bốn người: bố tôi, mẹ tôi, anh trai tôi và tôi. Bố tôi là bác sĩ. Mẹ tôi là giáo viên. Chúng tôi sống trong một ngôi nhà đẹp ở Hà Nội. Vào cuối tuần, chúng tôi nấu bữa tối cùng nhau.',
    keywordsEn: ['family', 'four people', 'father', 'mother', 'brother', 'doctor', 'teacher', 'Hanoi', 'cook dinner'],
    keywordsVi: ['gia đình', 'bốn người', 'bố', 'mẹ', 'anh trai', 'bác sĩ', 'giáo viên', 'Hà Nội', 'nấu bữa tối'],
    vocabulary: [
      { word: 'weekend', ipa: '/ˈwiːk.end/', meaning: 'cuối tuần', example: 'On weekends, I relax.' },
      { word: 'together', ipa: '/təˈɡeð.ɚ/', meaning: 'cùng nhau', example: 'We cook dinner together.' }
    ],
    grammar: [
      { structure: 'There are + N (số nhiều)', explanation: 'Dùng để giới thiệu có những vật/người nào.', example: 'There are four people in my family.' }
    ]
  },
  {
    title: 'Một con vật cưng mới (A New Pet)',
    levelCode: 'A1',
    englishText: 'I have a new puppy. His name is Max. Max is small and white. He has brown ears. Max sleeps under my bed. He likes to play with a red ball in the garden. I feed him twice a day.',
    vietnameseText: 'Tôi có một chú chó con mới. Tên của chú là Max. Max nhỏ và có màu trắng. Chú có đôi tai màu nâu. Max ngủ dưới giường của tôi. Chú thích chơi với một quả bóng màu đỏ trong vườn. Tôi cho chú ăn hai lần một ngày.',
    keywordsEn: ['puppy', 'Max', 'small', 'white', 'brown ears', 'under my bed', 'red ball', 'garden', 'feed'],
    keywordsVi: ['chó con', 'Max', 'nhỏ', 'trắng', 'tai màu nâu', 'dưới giường', 'bóng màu đỏ', 'vườn', 'cho ăn'],
    vocabulary: [
      { word: 'puppy', ipa: '/ˈpʌp.i/', meaning: 'chó con', example: 'I have a new puppy.' },
      { word: 'garden', ipa: '/ˈɡɑːr.dən/', meaning: 'khu vườn', example: 'He plays in the garden.' }
    ],
    grammar: [
      { structure: 'Subject + have/has + N', explanation: 'Diễn tả quyền sở hữu đồ vật, động vật hoặc mối quan hệ.', example: 'I have a new puppy. He has brown ears.' }
    ]
  },

  // ================= A2 LESSONS =================
  {
    title: 'Một cuối tuần ở bãi biển (A Weekend at the Beach)',
    levelCode: 'A2',
    englishText: 'Last weekend, my friends and I decided to go to the beach. The weather was sunny and warm, so we packed our bags with towels, snacks, and sunscreen. We spent the whole afternoon swimming and playing volleyball. In the evening, we had dinner at a small restaurant near the ocean. It was a perfect day.',
    vietnameseText: 'Cuối tuần trước, tôi và bạn bè quyết định đi biển. Thời tiết nắng và ấm áp, vì vậy chúng tôi chuẩn bị túi với khăn tắm, đồ ăn nhẹ và kem chống nắng. Chúng tôi đã dành cả buổi chiều để bơi lội và chơi bóng chuyền. Vào buổi tối, chúng tôi ăn tối tại một nhà hàng nhỏ gần đại dương. Đó là một ngày hoàn hảo.',
    keywordsEn: ['beach', 'sunny', 'towels', 'snacks', 'sunscreen', 'swimming', 'volleyball', 'restaurant', 'ocean'],
    keywordsVi: ['biển', 'nắng', 'khăn tắm', 'đồ ăn nhẹ', 'kem chống nắng', 'bơi lội', 'bóng chuyền', 'nhà hàng', 'đại dương'],
    vocabulary: [
      { word: 'decide', ipa: '/dɪˈsaɪd/', meaning: 'quyết định', example: 'They decided to go to the beach.' },
      { word: 'sunscreen', ipa: '/ˈsʌn.skriːn/', meaning: 'kem chống nắng', example: 'Put on some sunscreen before going out.' },
      { word: 'ocean', ipa: '/ˈoʊ.ʃən/', meaning: 'đại dương, biển', example: 'The restaurant is near the ocean.' }
    ],
    grammar: [
      { structure: 'Simple Past (Thì quá khứ đơn)', explanation: 'Kể lại sự việc đã kết thúc trong quá khứ.', example: 'We decided, was, packed, spent, had, was.' },
      { structure: 'decide + to-Verb', explanation: 'Quyết định làm việc gì đó.', example: 'We decided to go to the beach.' }
    ]
  },
  {
    title: 'Học một ngôn ngữ mới (Learning a New Language)',
    levelCode: 'A2',
    englishText: 'Learning a language is not easy, but it can be very exciting. First, you should practice every day. Listening to English songs and watching movies with subtitles are great ways to learn new words. You also need to practice speaking, even if you make mistakes. Keep going, and you will improve.',
    vietnameseText: 'Học một ngôn ngữ không dễ dàng, nhưng nó có thể rất thú vị. Trước tiên, bạn nên luyện tập mỗi ngày. Nghe các bài hát tiếng Anh và xem phim có phụ đề là những cách tuyệt vời để học từ mới. Bạn cũng cần luyện nói, ngay cả khi bạn mắc lỗi. Hãy tiếp tục, và bạn sẽ tiến bộ.',
    keywordsEn: ['learning', 'easy', 'exciting', 'practice', 'songs', 'movies', 'subtitles', 'speaking', 'mistakes', 'improve'],
    keywordsVi: ['học', 'dễ dàng', 'thú vị', 'luyện tập', 'bài hát', 'phim', 'phụ đề', 'nói', 'mắc lỗi', 'tiến bộ'],
    vocabulary: [
      { word: 'subtitle', ipa: '/ˈsʌb.taɪ.t̬əl/', meaning: 'phụ đề', example: 'I watch films with English subtitles.' },
      { word: 'mistake', ipa: '/mɪˈsteɪk/', meaning: 'sai lầm, lỗi', example: 'It is okay to make mistakes.' },
      { word: 'improve', ipa: '/ɪmˈpruːv/', meaning: 'cải thiện, tiến bộ', example: 'Practice speaking to improve your English.' }
    ],
    grammar: [
      { structure: 'Gerund as Subject (Danh động từ làm chủ ngữ)', explanation: 'Động từ thêm -ing đóng vai trò là một danh từ làm chủ ngữ chính.', example: 'Learning a language is not easy.' },
      { structure: 'should + Verb-bare', explanation: 'Lời khuyên nên làm gì.', example: 'You should practice every day.' }
    ]
  },
  {
    title: 'Mua sắm tại chợ nông sản (Shopping at the Farmers Market)',
    levelCode: 'A2',
    englishText: 'Every Sunday morning, my sister and I visit the local farmers market. We love buying fresh vegetables, red strawberries, and sweet honey directly from the farmers. The prices are reasonable, and everything is organic. We also buy fresh flowers for our living room.',
    vietnameseText: 'Mỗi sáng Chủ nhật, chị gái tôi và tôi ghé thăm chợ nông sản địa phương. Chúng tôi thích mua rau củ tươi, dâu tây đỏ và mật ong ngọt ngào trực tiếp từ những người nông dân. Giá cả hợp lý và mọi thứ đều là hữu cơ. Chúng tôi cũng mua hoa tươi cho phòng khách của mình.',
    keywordsEn: ['farmers market', 'vegetables', 'strawberries', 'honey', 'farmers', 'prices', 'reasonable', 'organic', 'flowers'],
    keywordsVi: ['chợ nông sản', 'rau củ', 'dâu tây', 'mật ong', 'nông dân', 'giá cả', 'hợp lý', 'hữu cơ', 'hoa'],
    vocabulary: [
      { word: 'farmers market', ipa: '/ˈfɑːr.mɚz ˈmɑːr.kɪt/', meaning: 'chợ nông sản', example: 'We visit the local farmers market.' },
      { word: 'reasonable', ipa: '/ˈriː.zən.ə.bəl/', meaning: 'hợp lý, phải chăng', example: 'The prices are very reasonable.' },
      { word: 'organic', ipa: '/ɔːrˈɡæn.ɪk/', meaning: 'hữu cơ', example: 'We love buying organic vegetables.' }
    ],
    grammar: [
      { structure: 'love + Verb-ing', explanation: 'Diễn tả sở thích lâu dài hoặc thói quen yêu thích.', example: 'We love buying fresh vegetables.' }
    ]
  },

  // ================= B1 LESSONS =================
  {
    title: 'Sự trỗi dậy của làm việc từ xa (The Rise of Remote Work)',
    levelCode: 'B1',
    englishText: 'Remote work has become increasingly popular over the past few years. While many employees enjoy the flexibility of working from home, some find it challenging to maintain a healthy work-life balance. Without a clear separation between office and home, it is easy to work longer hours, which can eventually lead to burnout.',
    vietnameseText: 'Làm việc từ xa đã trở nên ngày càng phổ biến trong vài năm qua. Trong khi nhiều nhân viên thích sự linh hoạt của việc làm việc tại nhà, một số người thấy việc duy trì cân bằng công việc và cuộc sống lành mạnh là một thách thức. Nếu không có sự phân biệt rõ ràng giữa văn phòng và nhà, rất dễ dẫn đến việc làm việc quá giờ, điều mà cuối cùng có thể dẫn đến kiệt sức.',
    keywordsEn: ['remote work', 'popular', 'employees', 'flexibility', 'work-life balance', 'separation', 'office', 'burnout'],
    keywordsVi: ['làm việc từ xa', 'phổ biến', 'nhân viên', 'linh hoạt', 'cân bằng', 'phân biệt', 'văn phòng', 'kiệt sức'],
    vocabulary: [
      { word: 'flexibility', ipa: '/ˌflek.səˈbɪl.ə.t̬i/', meaning: 'sự linh hoạt', example: 'Remote work offers a lot of flexibility.' },
      { word: 'challenging', ipa: '/ˈtʃæl.ɪn.dʒɪŋ/', meaning: 'mang tính thách thức', example: 'It is challenging to study alone.' },
      { word: 'burnout', ipa: '/ˈbɝːn.aʊt/', meaning: 'kiệt sức (do quá tải công việc)', example: 'Working 12 hours a day leads to burnout.' }
    ],
    grammar: [
      { structure: 'Present Perfect (Thì hiện tại hoàn thành)', explanation: 'Diễn tả hành động bắt đầu trong quá khứ và kéo dài/ảnh hưởng tới hiện tại.', example: 'Remote work has become popular.' },
      { structure: 'While + Clause', explanation: 'Trong khi... (chỉ sự đối lập giữa hai mệnh đề).', example: 'While many enjoy flexibility, some find it challenging.' }
    ]
  },
  {
    title: 'Khám phá vũ trụ (Exploring the Universe)',
    levelCode: 'B1',
    englishText: 'Space exploration has always fascinated humanity. For decades, scientists have sent satellites and rovers to other planets to search for signs of life. In recent years, private companies have also entered the space industry, aiming to make space travel accessible to ordinary people. The future of space exploration looks promising.',
    vietnameseText: 'Khám phá không gian luôn cuốn hút nhân loại. Trong nhiều thập kỷ, các nhà khoa học đã gửi các vệ tinh và xe tự hành đến các hành tinh khác để tìm kiếm dấu hiệu của sự sống. Trong những năm gần đây, các công ty tư nhân cũng đã tham gia vào ngành công nghiệp vũ trụ, nhằm mục đích làm cho chuyến du hành vũ trụ có thể tiếp cận được với những người bình thường. Tương lai của việc khám phá không gian trông đầy hứa hẹn.',
    keywordsEn: ['space exploration', 'fascinated', 'scientists', 'satellites', 'rovers', 'planets', 'signs of life', 'private companies', 'ordinary people', 'promising'],
    keywordsVi: ['khám phá không gian', 'cuốn hút', 'nhà khoa học', 'vệ tinh', 'xe tự hành', 'hành tinh', 'sự sống', 'công ty tư nhân', 'bình thường', 'hứa hẹn'],
    vocabulary: [
      { word: 'fascinate', ipa: '/ˈfæs.ən.eɪt/', meaning: 'cuốn hút, làm mê hoặc', example: 'Science has always fascinated me.' },
      { word: 'rover', ipa: '/ˈroʊ.vɚ/', meaning: 'xe tự hành (khám phá hành tinh)', example: 'The Mars rover is collecting rock samples.' },
      { word: 'accessible', ipa: '/əkˈses.ə.bəl/', meaning: 'có thể tiếp cận được', example: 'Computers are accessible to most students now.' }
    ],
    grammar: [
      { structure: 'aim to + Verb', explanation: 'Đặt mục tiêu làm gì đó.', example: 'They are aiming to make space travel accessible.' }
    ]
  },
  {
    title: 'Tầm quan trọng của Đọc sách (The Importance of Reading Books)',
    levelCode: 'B1',
    englishText: 'Reading books regularly is highly beneficial for our mental development. Not only does it expand our vocabulary, but it also stimulates our imagination and reduces stress after a long day. In addition, reading introduces us to different cultures and perspectives, helping us become more empathetic.',
    vietnameseText: 'Đọc sách thường xuyên mang lại lợi ích cao cho sự phát triển tinh thần của chúng ta. Nó không chỉ mở rộng vốn từ vựng mà còn kích thích trí tưởng tượng và giảm căng thẳng sau một ngày dài. Ngoài ra, việc đọc sách còn giới thiệu cho chúng ta những nền văn hóa và góc nhìn khác nhau, giúp chúng ta trở nên đồng cảm hơn.',
    keywordsEn: ['reading books', 'beneficial', 'mental development', 'vocabulary', 'imagination', 'reduces stress', 'different cultures', 'perspectives', 'empathetic'],
    keywordsVi: ['đọc sách', 'lợi ích', 'phát triển tinh thần', 'từ vựng', 'trí tưởng tượng', 'giảm căng thẳng', 'văn hóa khác nhau', 'góc nhìn', 'đồng cảm'],
    vocabulary: [
      { word: 'beneficial', ipa: '/ˌben.əˈfɪʃ.əl/', meaning: 'có lợi, có ích', example: 'Reading is highly beneficial.' },
      { word: 'stimulate', ipa: '/ˈstɪm.jə.leɪt/', meaning: 'kích thích, khuyến khích', example: 'It stimulates our imagination.' },
      { word: 'empathetic', ipa: '/ˌem.pəˈθet̬.ɪk/', meaning: 'đồng cảm, thấu cảm', example: 'Reading helps us become more empathetic.' }
    ],
    grammar: [
      { structure: 'Not only... but also...', explanation: 'Không những... mà còn... (dùng để bổ sung thêm ý nghĩa mang tính tương đương).', example: 'Not only does it expand vocabulary, but it also stimulates imagination.' }
    ]
  },
  {
    title: 'Du lịch bền vững (Sustainable Tourism)',
    levelCode: 'B1',
    englishText: 'Sustainable tourism aims to minimize the negative impacts of travel on local environments and communities. Travelers are encouraged to respect local customs, purchase locally made products, and choose eco-friendly accommodations. By traveling responsibly, we can preserve beautiful destinations for future generations.',
    vietnameseText: 'Du lịch bền vững nhằm mục đích giảm thiểu các tác động tiêu cực của việc đi lại đối với môi trường và cộng đồng địa phương. Du khách được khuyến khích tôn trọng phong tục địa phương, mua các sản phẩm sản xuất tại địa phương và chọn các chỗ ở thân thiện với môi trường. Bằng cách du lịch có trách nhiệm, chúng ta có thể bảo tồn các điểm đến đẹp cho các thế hệ tương lai.',
    keywordsEn: ['sustainable tourism', 'minimize', 'negative impacts', 'environments', 'communities', 'respect customs', 'locally made', 'eco-friendly', 'preserve'],
    keywordsVi: ['du lịch bền vững', 'giảm thiểu', 'tác động tiêu cực', 'môi trường', 'cộng đồng', 'tôn trọng phong tục', 'sản xuất tại địa phương', 'thân thiện với môi trường', 'bảo tồn'],
    vocabulary: [
      { word: 'minimize', ipa: '/ˈmɪn.ə.maɪz/', meaning: 'giảm thiểu tối đa', example: 'We should minimize waste.' },
      { word: 'eco-friendly', ipa: '/ˈiː.koʊˌfrend.li/', meaning: 'thân thiện với môi trường', example: 'They choose eco-friendly hotels.' },
      { word: 'preserve', ipa: '/prɪˈzɝːv/', meaning: 'bảo tồn, bảo giữ', example: 'We must preserve historic sites.' }
    ],
    grammar: [
      { structure: 'Passive Voice (Bị động)', explanation: 'Diễn tả chủ thể chịu tác động của hành động khác.', example: 'Travelers are encouraged to respect local customs.' }
    ]
  },
  {
    title: 'Thư điện tử phản hồi VSTEP (VSTEP B1 Reply Email)',
    levelCode: 'B1',
    englishText: 'Dear Mr. John Smith,\n\nThank you very much for your invitation to the annual digital education conference next month. I am extremely honored to receive this invitation and would love to attend.\n\nRegarding your request, I would be delighted to share my experience in online teaching and digital course design. Over the past three years, I have successfully developed several virtual learning programs that helped over five thousand students. I believe these practical insights will be highly beneficial to the conference attendees.\n\nCould you please send me the detailed schedule and information about the presentation duration? I need to prepare my slides and materials accordingly.\n\nI look forward to hearing from you soon.\n\nSincerely yours,\nMary Davis',
    vietnameseText: 'Kính gửi ông John Smith,\n\nCảm ơn ông rất nhiều vì lời mời tham dự hội nghị giáo dục kỹ thuật số thường niên vào tháng tới. Tôi vô cùng vinh dự khi nhận được lời mời này và rất muốn tham dự.\n\nVề yêu cầu của ông, tôi rất vui lòng chia sẻ kinh nghiệm của mình trong việc giảng dạy trực tuyến và thiết kế khóa học kỹ thuật số. Trong ba năm qua, tôi đã phát triển thành công một số chương trình học tập ảo giúp ích cho hơn năm nghìn học sinh. Tôi tin rằng những góc nhìn thực tế này sẽ rất có lợi cho những người tham dự hội nghị.\n\nÔng có thể vui lòng gửi cho tôi lịch trình chi tiết và thông tin về thời lượng thuyết trình được không? Tôi cần chuẩn bị các trang trình chiếu và tài liệu của mình cho phù hợp.\n\nTôi rất mong sớm nhận được phản hồi từ ông.\n\nTrân trọng,\nMary Davis',
    keywordsEn: ['John Smith', 'invitation', 'annual', 'digital education', 'conference', 'honored', 'attend', 'share', 'experience', 'online teaching', 'virtual learning', 'five thousand students', 'practical insights', 'beneficial', 'schedule', 'presentation duration', 'prepare slides', 'look forward', 'Mary Davis'],
    keywordsVi: ['John Smith', 'lời mời', 'thường niên', 'giáo dục kỹ thuật số', 'hội nghị', 'vinh dự', 'tham dự', 'chia sẻ', 'kinh nghiệm', 'giảng dạy trực tuyến', 'học tập ảo', 'năm nghìn học sinh', 'góc nhìn thực tế', 'có lợi', 'lịch trình', 'thời lượng thuyết trình', 'chuẩn bị trang trình chiếu', 'mong đợi', 'Mary Davis'],
    vocabulary: [
      { word: 'honored', ipa: '/ˈɒn.əd/', meaning: 'vinh dự, tự hào', example: 'I am honored to speak here today.' },
      { word: 'delighted', ipa: '/dɪˈlaɪ.tɪd/', meaning: 'vui mừng, hân hạnh', example: 'I would be delighted to attend the event.' },
      { word: 'insight', ipa: '/ˈɪn.saɪt/', meaning: 'góc nhìn thực tế, sự thấu hiểu', example: 'His book gives deep insights into the subject.' }
    ],
    grammar: [
      { structure: 'look forward to + V-ing/Noun', explanation: 'Rất mong đợi điều gì đó xảy ra.', example: 'I look forward to hearing from you soon.' },
      { structure: 'help + someone + (to) Verb', explanation: 'Giúp đỡ ai làm việc gì.', example: 'Programs that helped over five thousand students.' }
    ]
  },

  // ================= B2 LESSONS =================
  {
    title: 'Đạo đức của Trí tuệ Nhân tạo (The Ethics of Artificial Intelligence)',
    levelCode: 'B2',
    englishText: 'The rapid advancement of artificial intelligence has sparked intense debate among experts regarding its ethical implications. Proponents argue that AI can significantly enhance productivity and solve complex global problems. Conversely, critics express concerns about job displacement and the potential for algorithms to perpetuate existing societal biases.',
    vietnameseText: 'Sự tiến bộ nhanh chóng của trí tuệ nhân tạo đã làm dấy lên cuộc tranh luận gay gắt giữa các chuyên gia về những hàm ý đạo đức của nó. Những người ủng hộ cho rằng AI có thể nâng cao năng suất đáng kể và giải quyết các vấn đề phức tạp trên toàn cầu. Ngược lại, các nhà phê bình bày tỏ mối quan ngại về việc mất việc làm và khả năng các thuật toán làm trầm trọng thêm những định kiến xã hội hiện có.',
    keywordsEn: ['rapid advancement', 'artificial intelligence', 'intense debate', 'ethical implications', 'proponents', 'productivity', 'critics', 'job displacement', 'algorithms', 'societal biases'],
    keywordsVi: ['tiến bộ nhanh chóng', 'trí tuệ nhân tạo', 'tranh luận gay gắt', 'hàm ý đạo đức', 'người ủng hộ', 'năng suất', 'nhà phê bình', 'mất việc làm', 'thuật toán', 'định kiến xã hội'],
    vocabulary: [
      { word: 'implication', ipa: '/ˌɪm.pləˈkeɪ.ʃən/', meaning: 'hàm ý, tác động', example: 'What are the ethical implications of this technology?' },
      { word: 'proponent', ipa: '/prəˈpoʊ.nənt/', meaning: 'người ủng hộ', example: 'He is a leading proponent of clean energy.' },
      { word: 'displacement', ipa: '/dɪˈspleɪs.mənt/', meaning: 'sự dịch chuyển, mất việc', example: 'Automation causes job displacement.' },
      { word: 'bias', ipa: '/ˈbaɪ.əs/', meaning: 'định kiến, thiên vị', example: 'We must prevent algorithmic bias.' }
    ],
    grammar: [
      { structure: 'Regarding + Noun', explanation: 'Về mặt, liên quan tới khía cạnh nào đó.', example: 'Debates regarding its ethical implications.' },
      { structure: 'Conversely / On the contrary', explanation: 'Trái lại (dùng ở đầu câu để thể hiện sự đối lập mạnh mẽ).', example: 'Conversely, critics express concerns.' }
    ]
  },
  {
    title: 'Biến đổi khí hậu và Năng lượng tái tạo (Climate Change and Renewable Energy)',
    levelCode: 'B2',
    englishText: 'Climate change is one of the most pressing issues facing our planet today. The burning of fossil fuels has led to an increase in greenhouse gas emissions, causing global temperatures to rise. To combat this crisis, countries must transition to renewable energy sources like wind and solar power, which emit no carbon dioxide.',
    vietnameseText: 'Biến đổi khí hậu là một trong những vấn đề cấp bách nhất mà hành tinh của chúng ta đang phải đối mặt hiện nay. Việc đốt nhiên liệu hóa thạch đã dẫn đến sự gia tăng phát thải khí nhà kính, khiến nhiệt độ toàn cầu tăng lên. Để chống lại cuộc khủng hoảng này, các quốc gia phải chuyển đổi sang các nguồn năng lượng tái tạo như năng lượng gió và mặt trời, những nguồn không phát thải khí carbon dioxide.',
    keywordsEn: ['climate change', 'pressing issues', 'fossil fuels', 'greenhouse gas', 'emissions', 'global temperatures', 'combat', 'transition', 'renewable energy', 'solar power', 'carbon dioxide'],
    keywordsVi: ['biến đổi khí hậu', 'vấn đề cấp bách', 'nhiên liệu hóa thạch', 'khí nhà kính', 'phát thải', 'nhiệt độ toàn cầu', 'chống lại', 'chuyển đổi', 'năng lượng tái tạo', 'năng lượng mặt trời', 'carbon dioxide'],
    vocabulary: [
      { word: 'pressing', ipa: '/ˈpres.ɪŋ/', meaning: 'cấp bách, khẩn thiết', example: 'There is a pressing need for action.' },
      { word: 'emissions', ipa: '/iˈmɪʃ.ənz/', meaning: 'lượng khí phát thải', example: 'We must reduce carbon emissions.' },
      { word: 'transition', ipa: '/trænˈzɪʃ.ən/', meaning: 'sự chuyển đổi', example: 'The transition to clean energy takes time.' }
    ],
    grammar: [
      { structure: 'To + Verb (đầu câu)', explanation: 'Để đạt được mục đích gì (chỉ mục đích).', example: 'To combat this crisis, countries must act.' }
    ]
  },
  {
    title: 'Tầm quan trọng của Đa dạng sinh học (The Value of Biodiversity)',
    levelCode: 'B2',
    englishText: 'Biodiversity is critical for maintaining healthy ecosystems, which supply us with clean oxygen, food, and medicine. Unfortunately, human activities such as deforestation and pollution are accelerating species extinction at an alarming rate. Protecting habitats is essential to safeguard this natural wealth and preserve ecological balance.',
    vietnameseText: 'Đa dạng sinh học là cực kỳ quan trọng để duy trì các hệ sinh thái lành mạnh, nơi cung cấp cho chúng ta oxy sạch, thực phẩm và thuốc men. Thật không may, các hoạt động của con người như phá rừng và ô nhiễm đang đẩy nhanh sự tuyệt chủng của các loài với tốc độ đáng báo động. Bảo vệ môi trường sống là điều cần thiết để bảo vệ nguồn tài sản tự nhiên này và giữ gìn sự cân bằng sinh thái.',
    title: 'Tiến trình Năng lượng Tái tạo (VSTEP B2 Renewable Energy Evolution)',
    levelCode: 'B2',
    englishText: 'The global transition toward renewable energy sources has emerged as one of the defining challenges of the twenty-first century. For decades, industrial economies have relied heavily on fossil fuels, such as coal, oil, and natural gas, to drive growth. However, the accumulation of carbon dioxide and other greenhouse gases in the atmosphere has led to severe climate crises, forcing nations to reconsider their energy policies.\n\nIn recent years, wind and solar power technologies have advanced significantly, leading to a substantial drop in production costs. Many countries have successfully integrated large-scale solar farms and wind turbines into their national grids. These clean energy alternatives offer a promising solution to mitigate global warming while reducing reliance on imported fossil fuels.\n\nDespite these advancements, the transition is not without obstacles. One of the primary limitations of renewable energy is its intermittency, as solar panel generation depends on sunlight and wind turbines require consistent wind. Consequently, energy storage technologies, such as advanced battery systems, must be developed to store excess electricity for periods when production is low. \n\nFurthermore, upgrading traditional electricity grids to handle decentralized, fluctuating energy inputs requires massive financial investment and political will. Therefore, achieving a fully sustainable energy model requires not only technological innovation but also global cooperation and supportive regulatory frameworks.',
    vietnameseText: 'Sự chuyển đổi toàn cầu hướng tới các nguồn năng lượng tái tạo đã nổi lên như một trong những thách thức mang tính quyết định của thế kỷ hai mươi mốt. Trong nhiều thập kỷ, các nền kinh tế công nghiệp đã phụ thuộc nhiều vào nhiên liệu hóa thạch, chẳng hạn như than đá, dầu mỏ và khí đốt tự nhiên, để thúc đẩy tăng trưởng. Tuy nhiên, sự tích tụ của khí carbon dioxide và các khí nhà kính khác trong bầu khí quyển đã dẫn đến các cuộc khủng hoảng khí hậu nghiêm trọng, buộc các quốc gia phải xem xét lại chính sách năng lượng của họ.\n\nTrong những năm gần đây, công nghệ năng lượng gió và mặt trời đã có những bước tiến đáng kể, dẫn đến sự sụt giảm đáng kể chi phí sản xuất. Nhiều quốc gia đã tích hợp thành công các trang trại năng lượng mặt trời quy mô lớn và tuabin gió vào lưới điện quốc gia của họ. Những giải pháp thay thế năng lượng sạch này mang lại một giải pháp hứa hẹn để giảm thiểu sự nóng lên toàn cầu đồng thời giảm bớt sự phụ thuộc vào nhiên liệu hóa thạch nhập khẩu.\n\nBất chấp những tiến bộ này, quá trình chuyển đổi không phải là không có những trở ngại. Một trong những hạn chế chính của năng lượng tái tạo là tính gián đoạn của nó, vì sản lượng pin mặt trời phụ thuộc vào ánh sáng mặt trời và tuabin gió đòi hỏi gió ổn định. Do đó, các công nghệ lưu trữ năng lượng, chẳng hạn như các hệ thống pin tiên tiến, phải được phát triển để lưu trữ lượng điện dư thừa cho những thời kỳ sản xuất thấp.\n\nHơn nữa, việc nâng cấp lưới điện truyền thống để xử lý các nguồn năng lượng phi tập trung, biến động đòi hỏi sự đầu tư tài chính lớn và ý chí chính trị. Do đó, để đạt được một mô hình năng lượng bền vững hoàn toàn không chỉ đòi hỏi sự đổi mới công nghệ mà còn cả sự hợp tác toàn cầu và các khung pháp lý mang tính hỗ trợ.',
    keywordsEn: ['transition', 'renewable energy', 'fossil fuels', 'accumulation', 'climate crises', 'advanced significantly', 'integrated', 'national grids', 'mitigate global warming', 'reliance', 'obstacles', 'intermittency', 'consistent', 'energy storage', 'decentralized', 'fluctuating', 'financial investment', 'sustainable energy model', 'cooperation', 'regulatory frameworks'],
    keywordsVi: ['chuyển đổi', 'năng lượng tái tạo', 'nhiên liệu hóa thạch', 'sự tích tụ', 'khủng hoảng khí hậu', 'tiến bộ đáng kể', 'tích hợp', 'lưới điện quốc gia', 'giảm thiểu nóng lên toàn cầu', 'sự phụ thuộc', 'trở ngại', 'tính gián đoạn', 'ổn định', 'lưu trữ năng lượng', 'phi tập trung', 'biến động', 'đầu tư tài chính', 'mô hình năng lượng bền vững', 'hợp tác', 'khung pháp lý'],
    vocabulary: [
      { word: 'conserve', ipa: '/kənˈsɝːv/', meaning: 'bảo tồn, bảo giữ', example: 'We must conserve our forests.' },
      { word: 'intermittency', ipa: '/ˌɪn.təˈmɪt.ən.si/', meaning: 'tính gián đoạn, không liên tục', example: 'The main drawback of wind power is its intermittency.' },
      { word: 'fluctuating', ipa: '/ˈflʌk.tʃu.eɪ.tɪŋ/', meaning: 'dao động, biến động liên tục', example: 'The prices are fluctuating wildly.' }
    ],
    grammar: [
      { structure: 'require not only A but also B', explanation: 'Yêu cầu không chỉ A mà còn cả B (nhấn mạnh cả hai điều kiện bắt buộc).', example: 'It requires not only technological innovation but also global cooperation.' },
      { structure: 'be not without + Noun', explanation: 'Không phải là không có... (cách diễn đạt song phủ để khẳng định gián tiếp).', example: 'The transition is not without obstacles.' }
    ]
  },
  {
    title: 'Phân tích Làm việc Từ xa (VSTEP B2 Essay on Remote Work)',
    levelCode: 'B2',
    englishText: 'The rapid expansion of remote work has fundamentally transformed the modern professional landscape. On the one hand, employees enjoy significant benefits, including the elimination of daily commutes, flexible working hours, and a better ability to manage personal responsibilities. These factors often lead to higher job satisfaction and improved morale.\n\nOn the other hand, remote work introduces substantial challenges that organizations must address. The lack of face-to-face interaction can lead to feelings of isolation and hinder team collaboration. Furthermore, when the boundaries between professional and personal life blur, employees often struggle to disconnect, leading to overtime work and eventual burnout.\n\nTherefore, achieving a successful remote work model requires a balanced approach. Employers must establish clear communication guidelines and respect employees\' personal time to maintain long-term productivity.',
    vietnameseText: 'Sự mở rộng nhanh chóng của làm việc từ xa đã thay đổi căn bản bối cảnh chuyên nghiệp hiện đại. Một mặt, nhân viên được hưởng những lợi ích đáng kể, bao gồm việc loại bỏ việc đi lại hàng ngày, giờ làm việc linh hoạt và khả năng quản lý các trách nhiệm cá nhân tốt hơn. Những yếu tố này thường dẫn đến sự hài lòng trong công việc cao hơn và tinh thần được cải thiện.\n\nMặt khác, làm việc từ xa đặt ra những thách thức lớn mà các tổ chức phải giải quyết. Việc thiếu tương tác trực tiếp có thể dẫn đến cảm giác bị cô lập và cản trở sự hợp tác trong nhóm. Hơn nữa, khi ranh giới giữa cuộc sống chuyên nghiệp và cá nhân bị mờ nhạt, nhân viên thường đấu tranh để ngắt kết nối, dẫn đến làm việc quá giờ và cuối cùng là kiệt sức.\n\nDo đó, để đạt được một mô hình làm việc từ xa thành công đòi hỏi một cách tiếp cận cân bằng. Người sử dụng lao động phải thiết lập các nguyên tắc giao tiếp rõ ràng và tôn trọng thời gian cá nhân của nhân viên để duy trì năng suất lâu dài.',
    keywordsEn: ['rapid expansion', 'remote work', 'fundamentally transformed', 'modern professional landscape', 'employees', 'significant benefits', 'commutes', 'flexible hours', 'responsibilities', 'satisfaction', 'morale', 'substantial challenges', 'face-to-face interaction', 'isolation', 'collaboration', 'boundaries', 'blur', 'disconnect', 'overtime', 'burnout', 'balanced approach', 'communication guidelines', 'respect personal time', 'productivity'],
    keywordsVi: ['mở rộng nhanh chóng', 'làm việc từ xa', 'thay đổi căn bản', 'bối cảnh chuyên nghiệp hiện đại', 'nhân viên', 'lợi ích đáng kể', 'đi lại hàng ngày', 'giờ làm việc linh hoạt', 'trách nhiệm cá nhân', 'sự hài lòng', 'tinh thần', 'thách thức lớn', 'tương tác trực tiếp', 'cô lập', 'hợp tác', 'ranh giới', 'mờ nhạt', 'ngắt kết nối', 'làm việc quá giờ', 'kiệt sức', 'tiếp cận cân bằng', 'nguyên tắc giao tiếp', 'tôn trọng thời gian cá nhân', 'năng suất lâu dài'],
    vocabulary: [
      { word: 'fundamentally', ipa: '/ˌfʌn.dəˈmen.təl.i/', meaning: 'về cơ bản, cơ bản là', example: 'Society has fundamentally changed.' },
      { word: 'commute', ipa: '/kəˈmjuːt/', meaning: 'hành trình đi lại làm việc hàng ngày', example: 'My daily commute takes an hour.' },
      { word: 'isolation', ipa: '/ˌaɪ.səˈleɪ.ʃən/', meaning: 'sự cô lập, cách ly', example: 'Being isolated from team can cause stress.' }
    ],
    grammar: [
      { structure: 'On the one hand... On the other hand...', explanation: 'Một mặt... mặt khác... (dùng để phân tích hai khía cạnh đối lập của một vấn đề).', example: 'On the one hand, they enjoy benefits. On the other hand, it has challenges.' },
      { structure: 'struggle + to-Verb', explanation: 'Gặp khó khăn, chật vật làm việc gì.', example: 'Employees often struggle to disconnect.' }
    ]
  },

  // ================= C1 LESSONS =================
  {
    title: 'Thách thức của Di cư Đô thị (The Challenges of Urban Migration)',
    levelCode: 'C1',
    englishText: 'The phenomenon of urban migration presents a multifaceted challenge for policymakers. While cities act as magnets for economic opportunity and cultural exchange, they simultaneously grapple with the strain of overpopulation, infrastructural decay, and rising housing costs. Sustainable urban development requires a holistic approach that balances economic growth with social equity and environmental stewardship.',
    vietnameseText: 'Hiện tượng di cư đô thị đặt ra một thách thức đa diện cho các nhà hoạch định chính sách. Trong khi các thành phố đóng vai trò là thỏi nam châm cho cơ hội kinh tế và trao đổi văn hóa, chúng đồng thời phải vật lộn với áp lực quá tải dân số, sự xuống cấp của cơ sở hạ tầng và chi phí nhà ở tăng cao. Phát triển đô thị bền vững đòi hỏi một cách tiếp cận toàn diện nhằm cân bằng giữa tăng trưởng kinh tế với công bằng xã hội và quản lý môi trường.',
    keywordsEn: ['urban migration', 'multifaceted challenge', 'policymarks', 'magnets', 'cultural exchange', 'simultaneously', 'grapple', 'overpopulation', 'infrastructural decay', 'housing costs', 'sustainable', 'holistic approach', 'social equity', 'environmental stewardship'],
    keywordsVi: ['di cư đô thị', 'thách thức đa diện', 'nhà hoạch định chính sách', 'thỏi nam châm', 'trao đổi văn hóa', 'đồng thời', 'vật lộn', 'quá tải dân số', 'cơ sở hạ tầng', 'chi phí nhà ở', 'bền vững', 'tiếp cận toàn diện', 'công bằng xã hội', 'quản lý môi trường'],
    vocabulary: [
      { word: 'multifaceted', ipa: '/ˌmʌl.tiˈfæs.ɪ.t̬ɪd/', meaning: 'nhiều khía cạnh, đa diện', example: 'The problem is multifaceted and hard to solve.' },
      { word: 'grapple', ipa: '/ˈɡræp.əl/', meaning: 'vật lộn, đấu tranh giải quyết', example: 'The government is grappling with inflation.' },
      { word: 'stewardship', ipa: '/ˈstuː.ɚd.ʃɪp/', meaning: 'quản lý, coi sóc (bảo vệ môi trường)', example: 'Environmental stewardship is crucial for our future.' }
    ],
    grammar: [
      { structure: 'Active participle / Relative clause reduction', explanation: 'Rút gọn mệnh đề quan hệ dạng chủ động (N + Ving).', example: 'Issues facing our planet (issues which face our planet).' },
      { structure: 'Holistic approach', explanation: 'Cách tiếp cận toàn diện (từ vựng học thuật cao cấp C1).', example: 'Sustainable development requires a holistic approach.' }
    ]
  },
  {
    title: 'Tâm lý học Nhận thức và Trí nhớ (Cognitive Psychology and Memory)',
    levelCode: 'C1',
    englishText: 'Memory consolidation is a highly intricate neurobiological process through which fragile, newly acquired details are transformed into stable, long-term representations. This phenomenon depends heavily on the interaction between the hippocampus and the neocortex. Disruptions in this synaptic consolidation pathway can lead to various cognitive impairments, including anterograde amnesia.',
    vietnameseText: 'Củng cố trí nhớ là một quá trình sinh học thần kinh cực kỳ phức tạp, qua đó những chi tiết mới thu nhận được còn mong manh sẽ được chuyển đổi thành các biểu hiện ổn định lâu dài. Hiện tượng này phụ thuộc nhiều vào sự tương tác giữa hồi hải mã và vỏ não mới. Sự gián đoạn trong con đường củng cố synap này có thể dẫn đến các suy giảm nhận thức khác nhau, bao gồm cả chứng mất trí nhớ về sau.',
    keywordsEn: ['memory consolidation', 'intricate', 'neurobiological process', 'fragile', 'newly acquired', 'stable', 'long-term representations', 'interaction', 'hippocampus', 'neocortex', 'disruptions', 'synaptic consolidation', 'cognitive impairments', 'anterograde amnesia'],
    keywordsVi: ['củng cố trí nhớ', 'phức tạp', 'sinh học thần kinh', 'mong manh', 'mới thu nhận', 'ổn định', 'lâu dài', 'tương tác', 'hồi hải mã', 'vỏ não mới', 'gián đoạn', 'củng cố synap', 'suy giảm nhận thức', 'mất trí nhớ về sau'],
    vocabulary: [
      { word: 'consolidation', ipa: '/kənˌsɑː.lɪˈdeɪ.ʃən/', meaning: 'sự củng cố, làm vững chắc', example: 'Memory consolidation takes place during sleep.' },
      { word: 'intricate', ipa: '/ˈɪn.trə.kət/', meaning: 'phức tạp, tinh vi', example: 'The watch mechanism is extremely intricate.' },
      { word: 'impairment', ipa: '/ɪmˈper.mənt/', meaning: 'sự suy giảm, khiếm khuyết', example: 'Cognitive impairment is common in old age.' }
    ],
    grammar: [
      { structure: 'Through which / By which', explanation: 'Mà qua đó... (cấu trúc mệnh đề quan hệ nâng cao với giới từ).', example: 'A process through which fragile details are transformed.' }
    ]
  },
  {
    title: 'Thuyết quyết định ngôn ngữ (Linguistic Determinism)',
    levelCode: 'C1',
    englishText: 'Linguistic determinism posits that the structure of a language conditions the cognitive processes of its speakers. According to this hypothesis, language does not merely serve as a medium for conveying pre-existing thoughts, but rather shapes the very conceptual framework within which thoughts are formulated. Critics, however, contend that cognitive categories exist independently of grammatical structures.',
    vietnameseText: 'Thuyết quyết định ngôn ngữ cho rằng cấu trúc của một ngôn ngữ quy định các quá trình nhận thức của người nói ngôn ngữ đó. Theo giả thuyết này, ngôn ngữ không chỉ đóng vai trò là phương tiện truyền tải những suy nghĩ đã có sẵn, mà đúng hơn là định hình nên chính khuôn khổ khái niệm mà trong đó các suy nghĩ được hình thành. Tuy nhiên, các nhà phê bình cho rằng các danh mục nhận thức tồn tại độc lập với các cấu trúc ngữ pháp.',
    keywordsEn: ['linguistic determinism', 'posits', 'cognitive processes', 'hypothesis', 'medium', 'conveying', 'conceptual framework', 'formulated', 'critics', 'grammatical structures'],
    keywordsVi: ['thuyết quyết định ngôn ngữ', 'cho rằng', 'quá trình nhận thức', 'giả thuyết', 'phương tiện', 'truyền tải', 'khuôn khổ khái niệm', 'hình thành', 'nhà phê bình', 'cấu trúc ngữ pháp'],
    vocabulary: [
      { word: 'posit', ipa: '/ˈpɑː.zɪt/', meaning: 'thừa nhận, cho rằng (để lập luận)', example: 'Linguistic determinism posits that language shapes thought.' },
      { word: 'convey', ipa: '/kənˈveɪ/', meaning: 'truyền tải, biểu đạt', example: 'Words are used to convey meaning.' },
      { word: 'formulate', ipa: '/ˈfɔːr.mjə.leɪt/', meaning: 'hình thành, xây dựng công thức', example: 'It shapes the framework in which thoughts are formulated.' }
    ],
    grammar: [
      { structure: 'not merely... but rather...', explanation: 'Không thuần túy chỉ là... mà đúng hơn là... (dùng để phủ nhận ý đơn giản và chuyển hướng sang ý quan trọng hơn).', example: 'Language does not merely serve as a medium, but rather shapes the conceptual framework.' }
    ]
  },
  {
    title: 'Chinh phục Sao Hỏa (VSTEP C1 Mars Exploration & Colonization)',
    levelCode: 'C1',
    englishText: 'Since the dawn of civilization, humanity has looked up at the stars with a sense of wonder and curiosity. The launch of Sputnik 1 by the Soviet Union in 1957 marked the official beginning of the Space Age. This historic event catalyzed a fierce geopolitical competition between the world\'s superpowers. Shortly after, Yuri Gagarin became the first human to orbit the Earth in 1961. His courage inspired millions of people and proved that humans could survive in space. The ultimate achievement of this era was the Apollo 11 mission in 1969. Neil Armstrong and Buzz Aldrin successfully walked on the Moon, fulfilling a seemingly impossible dream. Their success demonstrated the power of human ingenuity and collective political will.\n\nFollowing the lunar missions, the focus of space agencies shifted toward long-term habitation in low Earth orbit. The construction of the International Space Station represented a milestone in global scientific cooperation. For over two decades, astronauts from various countries have conducted complex research on the station. They have studied microgravity, human biology, and material sciences under extreme conditions. These experiments have yielded invaluable data that cannot be replicated on Earth. Furthermore, the station has served as a testing ground for technologies required for deep space missions. Managing a complex laboratory in space requires constant maintenance and international support. It stands as a testament to what humanity can achieve when working toward shared goals.\n\nToday, the primary objective of space agencies and private aerospace companies is the exploration of Mars. Mars is considered the most habitable candidate in our solar system for future human colonization. However, establishing a permanent settlement on the Red Planet presents unprecedented environmental challenges. The Martian atmosphere is extremely thin, consisting mostly of carbon dioxide, which cannot support human respiration. Additionally, the lack of a strong global magnetic field exposes the surface to lethal solar radiation. Colonists would need to live in heavily shielded habitats and wear pressurized suits outdoors. Water must be extracted from ice sheet reserves hidden beneath the Martian soil. Growing crops would require sophisticated hydroponic systems protected from the harsh Martian climate.\n\nBeyond the technological requirements, colonizing Mars raises profound social and ethical dilemmas. Who will own the resources on Mars, and what laws will govern the new planetary citizens? Some critics argue that spending billions of dollars on space travel is unethical when many pressing problems remain unsolved on Earth. They believe we should prioritize poverty alleviation, environmental conservation, and healthcare before exploring other worlds. Conversely, proponents of space colonization assert that expanding our species to other planets is essential for long-term survival. They suggest that a catastrophic planetary event could wipe out humanity if we remain on a single planet. Therefore, space exploration is not a luxury, but rather an insurance policy for our future existence. It drives scientific innovation, inspires youth, and unites humanity under a shared vision.\n\nUltimately, the journey to Mars represents the next chapter in the great human adventure of exploration. The challenges ahead are immense, requiring technological innovations that do not yet exist. Yet, the spirit of curiosity that drove our ancestors to cross vast oceans will guide us to the stars. By striving to colonize Mars, we may learn how to better preserve our own home planet. The lessons learned in space will undoubtedly shape the future of human society on Earth. As we venture into the uncharted dark, we carry the hopes and dreams of all past generations.',
    vietnameseText: 'Từ bình minh của nền văn minh, nhân loại đã ngước nhìn lên các ngôi sao với một niềm kinh ngạc và tò mò. Việc phóng vệ tinh Sputnik 1 của Liên Xô vào năm 1957 đã đánh dấu sự khởi đầu chính thức của Kỷ nguyên Vũ trụ. Sự kiện lịch sử này đã thúc đẩy một cuộc cạnh tranh địa chính trị khốc liệt giữa các siêu cường thế giới. Ngay sau đó, Yuri Gagarin đã trở thành người đầu tiên bay quanh quỹ đạo Trái đất vào năm 1961. Lòng dũng cảm của ông đã truyền cảm hứng cho hàng triệu người và chứng minh rằng con người có thể sinh tồn trong không gian. Thành tựu đỉnh cao của kỷ nguyên này là sứ mệnh Apollo 11 vào năm 1969. Neil Armstrong và Buzz Aldrin đã đi bộ thành công trên Mặt trăng, hoàn thành một giấc mơ tưởng chừng như không thể. Thành công của họ đã chứng minh sức mạnh của sự khéo léo của con người và ý chí chính trị tập thể.\n\nSau các sứ mệnh lên Mặt trăng, trọng tâm của các cơ quan vũ trụ chuyển sang việc cư trú lâu dài trên quỹ đạo Trái đất tầm thấp. Việc xây dựng Trạm Vũ trụ Quốc tế đại diện cho một cột mốc quan trọng trong sự hợp tác khoa học toàn cầu. Trong hơn hai thập kỷ, các phi hành gia từ nhiều quốc gia khác nhau đã tiến hành các nghiên cứu phức tạp trên trạm. Họ đã nghiên cứu về môi trường vi trọng lực, sinh học con người và khoa học vật liệu dưới các điều kiện khắc nghiệt. Những thí nghiệm này đã mang lại những dữ liệu vô giá không thể sao chép trên Trái đất. Hơn nữa, trạm đã phục vụ như một môi trường thử nghiệm cho các công nghệ cần thiết cho các sứ mệnh không gian sâu. Việc quản lý một phòng thí nghiệm phức tạp trong không gian đòi hỏi sự bảo trì liên tục và hỗ trợ quốc tế. Nó là một minh chứng cho những gì nhân loại có thể đạt được khi cùng hướng tới các mục tiêu chung.\n\nNgày nay, mục tiêu hàng đầu của các cơ quan vũ trụ và các công ty hàng không vũ trụ tư nhân là khám phá Sao Hỏa. Sao Hỏa được coi là ứng cử viên có khả năng sinh sống tốt nhất trong hệ mặt trời của chúng ta cho việc thuộc địa hóa của con người trong tương lai. Tuy nhiên, việc thiết lập một khu định cư lâu dài trên Hành tinh Đỏ đặt ra những thách thức môi trường chưa từng có. Khí quyển Sao Hỏa cực kỳ mỏng, bao gồm chủ yếu là khí carbon dioxide, không thể hỗ trợ quá trình hô hấp của con người. Ngoài ra, việc thiếu từ trường toàn cầu mạnh khiến bề mặt phải tiếp xúc với bức xạ mặt trời gây chết người. Những người định cư sẽ cần sống trong các môi trường sống được che chắn kỹ lưỡng và mặc các bộ đồ áp suất khi ở ngoài trời. Nước phải được chiết xuất từ các trữ lượng băng ẩn bên dưới lòng đất Sao Hỏa. Trồng trọt sẽ đòi hỏi các hệ thống thủy canh tinh vi được bảo vệ khỏi khí hậu khắc nghiệt của Sao Hỏa.\n\nVượt ra ngoài các yêu cầu công nghệ, việc thuộc địa hóa Sao Hỏa đặt ra các tình thế tiến thoái lưỡng nan sâu sắc về mặt xã hội và đạo đức. Ai sẽ sở hữu tài nguyên trên Sao Hỏa, và luật pháp nào sẽ quản lý những công dân hành tinh mới này? Một số nhà phê bình cho rằng việc chi hàng tỷ đô la cho du lịch vũ trụ là vô đạo đức khi nhiều vấn đề cấp bách vẫn chưa được giải quyết trên Trái đất. Họ tin rằng chúng ta nên ưu tiên xóa đói giảm nghèo, bảo tồn môi trường và chăm sóc sức khỏe trước khi khám phá các thế giới khác. Ngược lại, những người ủng hộ thuộc địa hóa vũ trụ khẳng định rằng việc mở rộng loài của chúng ta sang các hành tinh khác là điều cần thiết cho sự sống sót lâu dài. Họ gợi ý rằng một sự kiện hành tinh thảm khốc có thể xóa sổ nhân loại nếu chúng ta chỉ ở trên một hành tinh duy nhất. Do đó, khám phá không gian không phải là một thứ xa xỉ, mà đúng hơn là một chính sách bảo hiểm cho sự tồn tại trong tương lai của chúng ta. Nó thúc đẩy sự đổi mới khoa học, truyền cảm hứng cho giới trẻ và đoàn kết nhân loại dưới một tầm nhìn chung.\n\nCuối cùng, hành trình đến Sao Hỏa đại diện cho chương tiếp theo trong cuộc phiêu lưu khám phá vĩ đại của con người. Các thách thức phía trước là vô cùng to lớn, đòi hỏi những đổi mới công nghệ chưa tồn tại. Dù vậy, tinh thần tò mò đã thúc đẩy tổ tiên chúng ta vượt qua những đại dương bao la sẽ dẫn đường cho chúng ta đến các ngôi sao. Bằng cách nỗ lực thuộc địa hóa Sao Hỏa, chúng ta có thể học cách bảo tồn hành tinh quê hương của chính mình tốt hơn. Các bài học rút ra trong không gian chắc chắn sẽ định hình tương lai của xã hội loài người trên Trái đất. Khi chúng ta dấn thân vào bóng tối chưa được khám phá, chúng ta mang theo hy vọng và giấc mơ của tất cả các thế hệ đi trước.',
    keywordsEn: ['civilization', 'Sputnik 1', 'Space Age', 'catalyzed', 'Yuri Gagarin', 'orbit', 'Apollo 11', 'ingenuity', 'habitation', 'International Space Station', 'cooperation', 'microgravity', 'replicated', 'deep space', 'testament', 'Mars', 'colonization', 'respiration', 'magnetic field', 'solar radiation', 'shielded', 'hydroponic', 'dilemmas', 'alleviation', 'catastrophic', 'insurance policy', 'uncemented', 'curiosity', 'resilience', 'uncharted'],
    keywordsVi: ['nền văn minh', 'Sputnik 1', 'Kỷ nguyên Vũ trụ', 'thúc đẩy', 'Yuri Gagarin', 'quỹ đạo', 'Apollo 11', 'sự khéo léo', 'cư trú', 'Trạm Vũ trụ Quốc tế', 'hợp tác', 'vi trọng lực', 'sao chép', 'không gian sâu', 'minh chứng', 'Sao Hỏa', 'thuộc địa hóa', 'hô hấp', 'từ trường', 'bức xạ mặt trời', 'che chắn', 'thủy canh', 'tiến thoái lưỡng nan', 'xóa đói giảm nghèo', 'thảm khốc', 'chính sách bảo hiểm', 'chưa được khám phá', 'tò mò', 'khả năng phục hồi', 'bóng tối'],
    vocabulary: [
      { word: 'ingenuity', ipa: '/ˌɪn.dʒəˈnjuː.ə.t̬i/', meaning: 'sự khéo léo, tài tình', example: 'It took great human ingenuity to build Apollo 11.' },
      { word: 'replicate', ipa: '/ˈrep.lɪ.keɪt/', meaning: 'sao chép, tái tạo lại', example: 'This experiment is hard to replicate.' },
      { word: 'testament', ipa: '/ˈtes.tə.mənt/', meaning: 'minh chứng, bằng chứng', example: 'The building is a testament to their wealth.' }
    ],
    grammar: [
      { structure: 'stands as a testament to + N/V-ing', explanation: 'Đứng sừng sững như một minh chứng rõ ràng cho điều gì.', example: 'It stands as a testament to what humanity can achieve.' },
      { structure: 'exposes + object + to + Noun', explanation: 'Khiến cho đối tượng chịu tác động/nguy hiểm bởi điều gì.', example: 'It exposes the surface to lethal solar radiation.' }
    ]
  }
];

router.get('/', async (req, res) => {
  try {
    // Seed levels
    await Level.deleteMany({});
    await Level.insertMany(levelsData);

    // Seed lessons
    await Lesson.deleteMany({});
    await Lesson.insertMany(lessonsData);

    // Clear progress
    await Progress.deleteMany({});

    res.json({
      success: true,
      message: 'Database seeded successfully from Express server!',
      levelsSeededCount: levelsData.length,
      lessonsSeededCount: lessonsData.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
