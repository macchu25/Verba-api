import express from 'express';
import Level from '../models/Level.js';
import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';

const router = express.Router();

const levelsData = [
  {
    code: 'L1',
    name: 'Rookie',
    description: '• Độ dài: 5 - 8 từ\n• Ngữ pháp: Hiện tại đơn\n• Từ vựng: Mức 200 - 500 từ đơn giản\n• Chủ đề: Gia đình, trường học, động vật, màu sắc',
    order: 1,
  },
  {
    code: 'L2',
    name: 'Explorer',
    description: '• Độ dài: 10 - 15 từ\n• Ngữ pháp: Quá khứ đơn\n• Từ vựng: Mức 500 - 1000 từ\n• Chủ đề: Du lịch, mua sắm, nhà hàng, công việc',
    order: 2,
  },
  {
    code: 'L3',
    name: 'Traveler',
    description: '• Độ dài: 20 - 30 từ\n• Ngữ pháp: Hiện tại hoàn thành\n• Từ vựng: Mức 1000 - 2000 từ\n• Chủ đề: Công nghệ, game, internet, trí tuệ nhân tạo (AI)',
    order: 3,
  },
  {
    code: 'L4',
    name: 'Story Reader',
    description: '• Độ dài: 50 - 80 từ\n• Ngữ pháp: Câu điều kiện (If-clause)\n• Từ vựng: Mức 2000 - 4000 từ\n• Chủ đề: Kinh doanh, startup, tài chính',
    order: 4,
  },
  {
    code: 'L5',
    name: 'Analyst',
    description: '• Độ dài: 100 - 150 từ\n• Ngữ pháp: Mệnh đề quan hệ (Relative clauses)\n• Từ vựng: Mức 4000 - 6000 từ\n• Chủ đề: Tâm lý, khoa học, chính trị',
    order: 5,
  },
  {
    code: 'L6',
    name: 'Scholar',
    description: '• Độ dài: 300 - 500 từ\n• Ngữ pháp: Đảo ngữ (Inversions)\n• Từ vựng: Mức 6000+ từ nâng cao\n• Chủ đề: Văn học, triết học, báo chí',
    order: 6,
  },
  {
    code: 'L7',
    name: 'Native',
    description: '• Đặc trưng: Thành ngữ (Idioms), Từ lóng (Slang), Văn học nghệ thuật\n• Chủ đề: Đa dạng, hội nhập văn hóa bản địa thực tế',
    order: 7,
  },
];

const lessonsData = [
  // ================= L1 LESSONS (Rookie) =================
  {
    title: 'Thói quen hằng ngày của Anna (Anna\'s Daily Routine)',
    levelCode: 'L1',
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
    levelCode: 'L1',
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
    levelCode: 'L1',
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
  {
    title: 'Kỳ nghỉ hè tại Đà Lạt (My Summer Vacation in Da Lat)',
    levelCode: 'L1',
    englishText: 'Last summer, my family and I went to Da Lat for a short vacation. The city is famous for its cool weather, beautiful flowers, and quiet pine forests. We stayed in a lovely hotel near Xuan Huong Lake. Every morning, we woke up early to walk around the lake and breathe the fresh air. In the afternoon, we visited a local strawberry garden and picked fresh strawberries. We also tasted delicious grilled sweet potatoes and hot soy milk at the night market. I bought some beautiful flowers and small souvenirs for my classmates. The local people were very friendly and helpful. I felt extremely happy and relaxed during the trip. I hope to visit Da Lat again next summer with my friends.',
    vietnameseText: 'Mùa hè năm ngoái, gia đình tôi và tôi đã đi Đà Lạt cho một kỳ nghỉ ngắn. Thành phố này nổi tiếng với thời tiết mát mẻ, những loài hoa đẹp và những rừng thông yên bình. Chúng tôi đã ở trong một khách sạn dễ thương gần Hồ Xuân Hương. Mỗi buổi sáng, chúng tôi thức dậy sớm để đi dạo quanh hồ và hít thở không khí trong lành. Vào buổi chiều, chúng tôi đã ghé thăm một vườn dâu tây địa phương và tự tay hái những quả dâu tây tươi. Chúng tôi cũng đã nếm thử món khoai lang nướng thơm ngon và sữa đậu nành nóng ở chợ đêm. Tôi đã mua một số bông hoa đẹp và những món quà lưu niệm nhỏ cho các bạn cùng lớp của mình. Người dân địa phương rất thân thiện và nhiệt tình giúp đỡ. Tôi cảm thấy vô cùng hạnh phúc và thư giãn trong suốt chuyến đi. Tôi hy vọng sẽ được ghé thăm Đà Lạt một lần nữa vào mùa hè tới cùng với những người bạn của mình.',
    keywordsEn: ['summer', 'family', 'Da Lat', 'vacation', 'famous', 'weather', 'flowers', 'pine forests', 'hotel', 'lake', 'early', 'strawberry', 'grilled', 'sweet potatoes', 'soy milk', 'market', 'souvenirs', 'friendly', 'relaxed', 'trip'],
    keywordsVi: ['mùa hè', 'gia đình', 'Đà Lạt', 'kỳ nghỉ', 'nổi tiếng', 'thời tiết', 'hoa', 'rừng thông', 'khách sạn', 'hồ', 'sớm', 'dâu tây', 'nướng', 'khoai lang', 'sữa đậu nành', 'chợ', 'quà lưu niệm', 'thân thiện', 'thư giãn', 'chuyến đi'],
    vocabulary: [
      { word: 'famous', ipa: '/ˈfeɪ.məs/', meaning: 'nổi tiếng', example: 'Da Lat is famous for flowers.' },
      { word: 'souvenir', ipa: '/ˌsuː.vəˈnɪr/', meaning: 'quà lưu niệm', example: 'I bought this souvenir at the night market.' },
      { word: 'relaxed', ipa: '/rɪˈlækst/', meaning: 'thư giãn, thoải mái', example: 'I felt relaxed during the trip.' }
    ],
    grammar: [
      { structure: 'go to + Place + for + Noun', explanation: 'Đi tới nơi nào đó để làm gì.', example: 'We went to Da Lat for a short vacation.' },
      { structure: 'be famous for + N/V-ing', explanation: 'Nổi tiếng về cái gì.', example: 'The city is famous for its cool weather.' }
    ]
  },
  {
    title: 'Chú mèo con của tôi (My Little Cat) [NEW]',
    levelCode: 'L1',
    englishText: 'My cute cat sleeps on the red chair.',
    vietnameseText: 'Con mèo dễ thương của tôi ngủ trên chiếc ghế màu đỏ.',
    keywordsEn: ['cute', 'cat', 'sleeps', 'red chair'],
    keywordsVi: ['dễ thương', 'mèo', 'ngủ', 'ghế màu đỏ'],
    vocabulary: [
      { word: 'cute', ipa: '/kjuːt/', meaning: 'dễ thương', example: 'She has a cute puppy.' },
      { word: 'chair', ipa: '/tʃer/', meaning: 'cái ghế', example: 'Sit on this chair.' }
    ],
    grammar: [
      { structure: 'Simple Present (S + V_s/es)', explanation: 'Chủ ngữ ngôi thứ ba số ít thêm s/es vào động từ ở thì hiện tại đơn.', example: 'My cat sleeps on the chair.' }
    ]
  },
  {
    title: 'Gia đình tôi (My Happy Family) [NEW]',
    levelCode: 'L1',
    englishText: 'I love my small and happy family.',
    vietnameseText: 'Tôi yêu gia đình nhỏ bé và hạnh phúc của tôi.',
    keywordsEn: ['love', 'small', 'happy family'],
    keywordsVi: ['yêu', 'nhỏ bé', 'gia đình hạnh phúc'],
    vocabulary: [
      { word: 'happy', ipa: '/ˈhæp.i/', meaning: 'hạnh phúc', example: 'They are a happy couple.' }
    ],
    grammar: [
      { structure: 'Subject + Verb + Object', explanation: 'Cấu trúc câu khẳng định cơ bản trong tiếng Anh.', example: 'I love my family.' }
    ]
  },
  {
    title: 'Trường học mới (My New School) [NEW]',
    levelCode: 'L1',
    englishText: 'We walk to school every morning.',
    vietnameseText: 'Chúng tôi đi bộ đến trường học mỗi buổi sáng.',
    keywordsEn: ['walk', 'school', 'every morning'],
    keywordsVi: ['đi bộ', 'trường học', 'mỗi buổi sáng'],
    vocabulary: [
      { word: 'walk', ipa: '/wɑːk/', meaning: 'đi bộ', example: 'We walk in the park.' }
    ],
    grammar: [
      { structure: 'walk to + Place', explanation: 'Đi bộ đến một địa điểm nào đó.', example: 'We walk to school.' }
    ]
  },

  // ================= L2 LESSONS (Explorer) =================
  {
    title: 'Một cuối tuần ở bãi biển (A Weekend at the Beach)',
    levelCode: 'L2',
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
    levelCode: 'L2',
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
    levelCode: 'L2',
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
  {
    title: 'Lợi ích của việc Đi xe đạp (The Benefits of Riding a Bicycle)',
    levelCode: 'L2',
    englishText: 'Riding a bicycle has become a popular hobby for people of all ages in recent years. It is not only a simple way to travel around the city but also a great form of daily exercise. First, cycling regularly helps strengthen your heart and build strong leg muscles. It is a low-impact exercise, which means it is gentle on your joints compared to running. Second, using a bicycle is highly beneficial for our environment because it emits no greenhouse gases. By choosing to ride a bike instead of driving a car, you can actively reduce air pollution in your community. Finally, cycling allows you to spend more time outdoors and enjoy nature, which is a wonderful way to relieve stress after a busy workday. In conclusion, picking up a bicycle is a smart choice for your physical health, your mental well-being, and the protection of our planet.',
    vietnameseText: 'Đi xe đạp đã trở thành một sở thích phổ biến cho mọi lứa tuổi trong những năm gần đây. Nó không chỉ là một cách đơn giản để di chuyển xung quanh thành phố mà còn là một hình thức tập thể dục tuyệt vời hàng ngày. Trước tiên, việc đạp xe thường xuyên giúp tăng cường sức khỏe tim mạch và phát triển cơ chân săn chắc. Đây là một bài tập ít tác động, có nghĩa là nó nhẹ nhàng đối với các khớp của bạn so với chạy bộ. Thứ hai, sử dụng xe đạp rất có lợi cho môi trường của chúng ta vì nó không phát thải khí nhà kính. Bằng cách chọn đi xe đạp thay vì lái ô tô, bạn có thể tích cực giảm thiểu ô nhiễm không khí trong cộng đồng của mình. Cuối cùng, đạp xe cho phép bạn dành nhiều thời gian hơn ở ngoài trời và tận hưởng thiên nhiên, đây là một cách tuyệt vời để giải tỏa căng thẳng sau một ngày làm việc bận rộn. Tóm lại, chọn đi xe đạp là một quyết định thông minh cho sức khỏe thể chất, tinh thần của bạn và cho việc bảo vệ hành tinh của chúng ta.',
    keywordsEn: ['bicycle', 'popular hobby', 'all ages', 'simple way', 'daily exercise', 'cycling', 'regularly', 'strengthen', 'leg muscles', 'low-impact', 'joints', 'running', 'beneficial', 'environment', 'emits', 'greenhouse gases', 'reduce', 'air pollution', 'outdoors', 'nature', 'relieve stress', 'smart choice', 'well-being'],
    keywordsVi: ['xe đạp', 'sở thích phổ biến', 'mọi lứa tuổi', 'cách đơn giản', 'tập thể dục hàng ngày', 'đạp xe', 'thường xuyên', 'tăng cường', 'cơ chân', 'ít tác động', 'khớp', 'chạy bộ', 'có lợi', 'môi trường', 'phát thải', 'khí nhà kính', 'giảm', 'ô nhiễm không khí', 'ngoài trời', 'thiên nhiên', 'giải tỏa căng thẳng', 'quyết định thông minh', 'tinh thần'],
    vocabulary: [
      { word: 'strengthen', ipa: '/ˈstreŋ.θən/', meaning: 'làm mạnh thêm, tăng cường', example: 'Exercise helps strengthen muscles.' },
      { word: 'beneficial', ipa: '/ˌben.əˈfɪʃ.əl/', meaning: 'có lợi, hữu ích', example: 'Cycling is highly beneficial for health.' },
      { word: 'relieve', ipa: '/rɪˈliːv/', meaning: 'làm dịu đi, giải tỏa (stress)', example: 'Nature helps relieve stress.' }
    ],
    grammar: [
      { structure: 'not only A but also B', explanation: 'Không những A mà còn cả B.', example: 'It is not only a simple way but also a great exercise.' },
      { structure: 'compared to + Noun', explanation: 'So với... (dùng để so sánh tương phản hoặc đối chiếu).', example: 'It is gentle on joints compared to running.' }
    ]
  },
  {
    title: 'Một bữa tối ngon miệng (A Good Dinner) [NEW]',
    levelCode: 'L2',
    englishText: 'Yesterday, we ate delicious seafood at a small local restaurant.',
    vietnameseText: 'Hôm qua, chúng tôi đã ăn hải sản thơm ngon tại một nhà hàng địa phương nhỏ.',
    keywordsEn: ['delicious', 'seafood', 'small local restaurant'],
    keywordsVi: ['thơm ngon', 'hải sản', 'nhà hàng địa phương nhỏ'],
    vocabulary: [
      { word: 'seafood', ipa: '/ˈsiː.fuːd/', meaning: 'hải sản', example: 'I love fresh seafood.' }
    ],
    grammar: [
      { structure: 'Simple Past of irregular verbs', explanation: 'Sử dụng dạng quá khứ của động từ bất quy tắc (eat -> ate).', example: 'We ate delicious seafood yesterday.' }
    ]
  },
  {
    title: 'Chuyến đi Đà Lạt (Trip to Da Lat) [NEW]',
    levelCode: 'L2',
    englishText: 'My sister bought many beautiful souvenirs during our summer holiday.',
    vietnameseText: 'Chị gái tôi đã mua nhiều món quà lưu niệm đẹp đẽ trong suốt kỳ nghỉ hè của chúng tôi.',
    keywordsEn: ['bought', 'beautiful souvenirs', 'summer holiday'],
    keywordsVi: ['đã mua', 'quà lưu niệm đẹp đẽ', 'kỳ nghỉ hè'],
    vocabulary: [
      { word: 'souvenir', ipa: '/ˌsuː.vəˈnɪr/', meaning: 'quà lưu niệm', example: 'I bought many souvenirs.' }
    ],
    grammar: [
      { structure: 'Simple Past of buy', explanation: 'Quá khứ đơn của động từ buy là bought.', example: 'My sister bought souvenirs.' }
    ]
  },
  {
    title: 'Ngày đầu tiên đi làm (First Day of Work) [NEW]',
    levelCode: 'L2',
    englishText: 'He joined a dynamic technology startup last Monday as a designer.',
    vietnameseText: 'Anh ấy đã gia nhập một công ty khởi nghiệp công nghệ năng động vào thứ Hai tuần trước với tư cách là một nhà thiết kế.',
    keywordsEn: ['joined', 'dynamic technology startup', 'designer'],
    keywordsVi: ['đã gia nhập', 'khởi nghiệp công nghệ năng động', 'nhà thiết kế'],
    vocabulary: [
      { word: 'joined', ipa: '/dʒɔɪnd/', meaning: 'đã gia nhập', example: 'He joined the company.' },
      { word: 'startup', ipa: '/ˈstɑːrt.ʌp/', meaning: 'công ty khởi nghiệp', example: 'They launched a new startup.' }
    ],
    grammar: [
      { structure: 'Simple Past of regular verbs', explanation: 'Động từ thường thêm đuôi -ed trong câu khẳng định ở quá khứ đơn.', example: 'He joined the startup.' }
    ]
  },

  // ================= L3 LESSONS (Traveler) =================
  {
    title: 'Kỷ nguyên Trí tuệ Nhân tạo (The Era of AI) [NEW]',
    levelCode: 'L3',
    englishText: 'Scientists have developed highly advanced artificial intelligence systems that have successfully assisted humans in solving complex mathematical problems.',
    vietnameseText: 'Các nhà khoa học đã phát triển các hệ thống trí tuệ nhân tạo cực kỳ tiên tiến, đã hỗ trợ thành công con người trong việc giải quyết các bài toán phức tạp.',
    keywordsEn: ['developed', 'advanced artificial intelligence', 'assisted', 'solving complex'],
    keywordsVi: ['đã phát triển', 'trí tuệ nhân tạo cực kỳ tiên tiến', 'đã hỗ trợ', 'giải quyết phức tạp'],
    vocabulary: [
      { word: 'artificial intelligence', ipa: '/ˌɑːr.t̬ɪ.fɪʃ.əl ɪnˈtel.ə.dʒəns/', meaning: 'trí tuệ nhân tạo', example: 'AI is changing the world.' },
      { word: 'assisted', ipa: '/əˈsɪs.tɪd/', meaning: 'được hỗ trợ, trợ giúp', example: 'The software assisted the users.' }
    ],
    grammar: [
      { structure: 'Present Perfect (Thì hiện tại hoàn thành)', explanation: 'Diễn tả hành động đã hoàn thành tính đến thời điểm hiện tại mà không đề cập thời gian cụ thể.', example: 'Scientists have developed AI systems.' }
    ]
  },
  {
    title: 'Sự phổ biến của Video Games (The Popularity of Video Games) [NEW]',
    levelCode: 'L3',
    englishText: 'Over the past decade, video games have evolved from simple entertainment into a massive global industry with millions of active players.',
    vietnameseText: 'Trong thập kỷ qua, trò chơi điện tử đã phát triển từ hình thức giải trí đơn giản thành một ngành công nghiệp toàn cầu khổng lồ với hàng triệu người chơi tích cực.',
    keywordsEn: ['decade', 'games have evolved', 'entertainment', 'massive global industry'],
    keywordsVi: ['thập kỷ', 'trò chơi đã phát triển', 'giải trí', 'ngành công nghiệp toàn cầu khổng lồ'],
    vocabulary: [
      { word: 'evolved', ipa: '/ɪˈvɑːlvd/', meaning: 'phát triển, tiến hóa', example: 'The technology has evolved rapidly.' },
      { word: 'entertainment', ipa: '/ˌen.t̬ɚˈteɪn.mənt/', meaning: 'sự giải trí', example: 'Cinema is a popular form of entertainment.' }
    ],
    grammar: [
      { structure: 'Present Perfect with "Over the past..."', explanation: 'Dùng thì hiện tại hoàn thành với cụm chỉ khoảng thời gian kéo dài tới hiện tại.', example: 'Over the past decade, video games have evolved.' }
    ]
  },
  {
    title: 'Internet thay đổi cuộc sống (How Internet Changed Us) [NEW]',
    levelCode: 'L3',
    englishText: 'The Internet has completely transformed the way people communicate, share knowledge, and run businesses around the globe since its inception.',
    vietnameseText: 'Internet đã hoàn toàn thay đổi cách mọi người giao tiếp, chia sẻ kiến thức và vận hành doanh nghiệp trên toàn cầu kể từ khi ra đời.',
    keywordsEn: ['transformed', 'communicate', 'share knowledge', 'run businesses', 'inception'],
    keywordsVi: ['thay đổi hoàn toàn', 'giao tiếp', 'chia sẻ kiến thức', 'vận hành doanh nghiệp', 'ra đời'],
    vocabulary: [
      { word: 'transform', ipa: '/trænsˈfɔːrm/', meaning: 'biến đổi sâu sắc, thay đổi hoàn toàn', example: 'Technology has transformed our lives.' },
      { word: 'inception', ipa: '/ɪnˈsep.ʃən/', meaning: 'sự khởi đầu, bắt đầu', example: 'Since its inception, the project has grown.' }
    ],
    grammar: [
      { structure: 'Present Perfect with "since"', explanation: 'Dùng thì hiện tại hoàn thành để diễn tả hành động bắt đầu từ một mốc thời gian trong quá khứ.', example: 'The Internet has transformed lives since its inception.' }
    ]
  },

  // ================= L4 LESSONS (Story Reader) =================
  {
    title: 'Đầu tư Khởi nghiệp (Investing in a Startup) [NEW]',
    levelCode: 'L4',
    englishText: 'If a new startup wants to secure funding from venture capitalists, the founders must pitch a highly scalable business model. If they fail to demonstrate a clear path to profitability within three years, investors will likely reject their proposal. However, if they build a dedicated team and protect their unique intellectual property, their chances of commercial success will increase significantly.',
    vietnameseText: 'Nếu một công ty khởi nghiệp mới muốn đảm bảo nguồn tài chính từ các nhà đầu tư mạo hiểm, những người sáng lập phải trình bày một mô hình kinh doanh có khả năng mở rộng cao. Nếu họ không chứng minh được con đường rõ ràng dẫn đến lợi nhuận trong vòng ba năm, các nhà đầu tư rất có thể sẽ từ chối đề xuất của họ. Tuy nhiên, nếu họ xây dựng một đội ngũ tận tụy và bảo vệ tài sản trí tuệ độc đáo của mình, cơ hội thành công thương mại của họ sẽ tăng lên đáng kể.',
    keywordsEn: ['secure funding', 'venture capitalists', 'scalable', 'profitability', 'intellectual property', 'commercial success'],
    keywordsVi: ['đảm bảo nguồn tài chính', 'nhà đầu tư mạo hiểm', 'khả năng mở rộng', 'lợi nhuận', 'tài sản trí tuệ', 'thành công thương mại'],
    vocabulary: [
      { word: 'venture capitalist', ipa: '/ˈven.tʃɚ ˈkæp.ɪ.t̬əl.ɪst/', meaning: 'nhà đầu tư mạo hiểm', example: 'Venture capitalists fund high-risk startups.' },
      { word: 'scalable', ipa: '/ˈskeɪ.lə.bəl/', meaning: 'có thể mở rộng quy mô', example: 'Software businesses are highly scalable.' },
      { word: 'intellectual property', ipa: '/ˌɪn.t̬əlˈek.tʃu.əl ˈprɑː.pɚ.t̬i/', meaning: 'tài sản trí tuệ', example: 'Patents protect your intellectual property.' }
    ],
    grammar: [
      { structure: 'Conditional Type 1 (Câu điều kiện loại 1)', explanation: 'Diễn tả giả định có thật hoặc có thể xảy ra ở hiện tại hoặc tương lai (If + S + V_pres, S + will/must + V_bare).', example: 'If they fail to demonstrate, investors will reject their proposal.' }
    ]
  },
  {
    title: 'Quản lý Tài chính Cá nhân (Personal Finance Management) [NEW]',
    levelCode: 'L4',
    englishText: 'If young professionals invested a portion of their income in index funds early, they would accumulate substantial wealth over time. If you do not track your daily expenses, you will struggle to build a stable emergency fund. If the government lowered interest rates, consumers would borrow more money to buy houses and cars. Therefore, sound financial planning is crucial for long-term security.',
    vietnameseText: 'Nếu các chuyên gia trẻ đầu tư một phần thu nhập của họ vào các quỹ chỉ số từ sớm, họ sẽ tích lũy được khối tài sản đáng kể theo thời gian. Nếu bạn không theo dõi các chi phí hàng ngày của mình, bạn sẽ chật vật để xây dựng một quỹ khẩn cấp ổn định. Nếu chính phủ giảm lãi suất, người tiêu dùng sẽ vay nhiều tiền hơn để mua nhà và xe hơi. Do đó, lập kế hoạch tài chính hợp lý là rất quan trọng cho sự an toàn lâu dài.',
    keywordsEn: ['young professionals', 'invested', 'index funds', 'accumulate', 'substantial wealth', 'track expenses', 'emergency fund', 'interest rates'],
    keywordsVi: ['chuyên gia trẻ', 'đầu tư', 'quỹ chỉ số', 'tích lũy', 'tài sản đáng kể', 'theo dõi chi phí', 'quỹ khẩn cấp', 'lãi suất'],
    vocabulary: [
      { word: 'accumulate', ipa: '/əˈkjuː.mjə.leɪt/', meaning: 'tích lũy, gom lại', example: 'You will accumulate wealth by saving.' },
      { word: 'index fund', ipa: '/ˈɪn.deks ˌfʌnd/', meaning: 'quỹ chỉ số', example: 'Index funds track the stock market.' }
    ],
    grammar: [
      { structure: 'Conditional Type 2 (Câu điều kiện loại 2)', explanation: 'Diễn tả giả định không có thật hoặc trái ngược với thực tế ở hiện tại (If + S + V_past, S + would/could + V_bare).', example: 'If young professionals invested early, they would accumulate wealth.' }
    ]
  },

  // ================= L5 LESSONS (Analyst) =================
  {
    title: 'Hiệu ứng Kính giả thuyết (The Placebo Effect in Psychology) [NEW]',
    levelCode: 'L5',
    englishText: 'The placebo effect, which has puzzled cognitive scientists for decades, is a fascinating psychological phenomenon where patients experience genuine health improvements after taking inactive substances. Patients who believe they are receiving a real medical treatment often trigger self-healing mechanisms in their brains, which significantly reduces pain and anxiety. This powerful connection between the mind and body, which shows how expectation shapes physical reality, challenges traditional pharmaceutical research. Researchers who study this effect argue that psychological support is just as important as chemical intervention. Consequently, doctors who understand this dynamic can enhance patient care by combining empathy with standard medical treatments.',
    vietnameseText: 'Hiệu ứng giả dược, điều đã làm đau đầu các nhà khoa học nhận thức trong nhiều thập kỷ, là một hiện tượng tâm lý thú vị nơi bệnh nhân trải qua những cải thiện sức khỏe thực sự sau khi sử dụng các chất không hoạt động. Những bệnh nhân tin rằng họ đang nhận được một phương pháp điều trị y tế thực sự thường kích hoạt các cơ chế tự chữa lành trong não của họ, điều này giúp giảm đau và lo lắng một cách đáng kể. Mối liên kết mạnh mẽ này giữa tâm trí và cơ thể, điều cho thấy sự kỳ vọng định hình thực tế vật lý như thế nào, thách thức nghiên cứu dược phẩm truyền thống. Các nhà nghiên cứu nghiên cứu hiệu ứng này cho rằng hỗ trợ tâm lý cũng quan trọng như sự can thiệp của hóa chất. Do đó, các bác sĩ hiểu được động lực này có thể nâng cao hiệu quả chăm sóc bệnh nhân bằng cách kết hợp sự đồng cảm với các phương pháp điều trị y tế tiêu chuẩn.',
    keywordsEn: ['placebo effect', 'cognitive scientists', 'genuine', 'inactive substances', 'self-healing', 'expectation', 'pharmaceutical', 'intervention', 'empathy'],
    keywordsVi: ['hiệu ứng giả dược', 'khoa học nhận thức', 'thực sự', 'chất không hoạt động', 'tự chữa lành', 'sự kỳ vọng', 'dược phẩm', 'can thiệp', 'sự đồng cảm'],
    vocabulary: [
      { word: 'placebo', ipa: '/pləˈsiː.boʊ/', meaning: 'giả dược (thuốc thử vô hại)', example: 'Half of the patients received a placebo.' },
      { word: 'cognitive', ipa: '/ˈkɑːɡ.nə.t̬ɪv/', meaning: 'thuộc về nhận thức', example: 'Cognitive therapy helps change thought patterns.' },
      { word: 'genuine', ipa: '/ˈdʒen.ju.ɪn/', meaning: 'thật, thành thật, đích thực', example: 'There has been a genuine improvement in his work.' }
    ],
    grammar: [
      { structure: 'Defining & Non-defining Relative Clauses', explanation: 'Sử dụng mệnh đề quan hệ xác định (who, that) và không xác định (dùng dấu phẩy và đại từ quan hệ như which, who) để bổ sung thông tin cho danh từ.', example: 'The placebo effect, which has puzzled scientists, is... Patients who believe...' }
    ]
  },
  {
    title: 'Cơ chế của Thuyết Tương đối (The Mechanics of General Relativity) [NEW]',
    levelCode: 'L5',
    englishText: 'Albert Einstein, who revolutionized modern physics in 1915, introduced the theory of general relativity, which explains gravity as the warping of spacetime. According to this theory, massive cosmic objects like stars and planets, which possess immense mass, bend the fabric of space around them. This curvature dictates the paths that nearby objects must follow, which explains why the Earth orbits the Sun. The theory also predicted the existence of gravitational waves, which are ripples in spacetime caused by violent cosmic collisions. Scientists who worked at the LIGO observatory finally detected these elusive ripples in 2015, which confirmed Einstein\'s predictions and opened a new window into astrophysics.',
    vietnameseText: 'Albert Einstein, người đã cách mạng hóa vật lý hiện đại vào năm 1915, đã giới thiệu thuyết tương đối tổng quát, thuyết giải thích lực hấp dẫn là sự uốn cong của không-thời gian. Theo lý thuyết này, các vật thể vũ trụ khổng lồ như các ngôi sao và hành tinh, những vật thể có khối lượng khổng lồ, làm cong cấu trúc không gian xung quanh chúng. Độ cong này quyết định các quỹ đạo mà các vật thể gần đó phải tuân theo, điều giải thích tại sao Trái Đất quay quanh Mặt Trời. Lý thuyết này cũng dự đoán sự tồn tại của sóng hấp dẫn, vốn là những gợn sóng trong không-thời gian gây ra bởi các vụ va chạm vũ trụ dữ dội. Các nhà khoa học làm việc tại đài quan sát LIGO cuối cùng đã phát hiện ra những gợn sóng khó nắm bắt này vào năm 2015, điều này đã xác nhận những dự đoán của Einstein và mở ra một cánh cửa mới vào vật lý thiên văn.',
    keywordsEn: ['Einstein', 'revolutionized', 'general relativity', 'warping of spacetime', 'massive cosmic', 'fabric of space', 'curvature', 'gravitational waves', 'ripples', 'elusive', 'astrophysics'],
    keywordsVi: ['Einstein', 'cách mạng hóa', 'tương đối tổng quát', 'uốn cong không-thời gian', 'vũ trụ khổng lồ', 'cấu trúc không gian', 'độ cong', 'sóng hấp dẫn', 'gợn sóng', 'khó nắm bắt', 'vật lý thiên văn'],
    vocabulary: [
      { word: 'warping', ipa: '/ˈwɔːr.pɪŋ/', meaning: 'sự uốn cong, biến dạng', example: 'Gravity is the warping of spacetime.' },
      { word: 'curvature', ipa: '/ˈkɝː.və.tʃɚ/', meaning: 'độ cong', example: 'The curvature of the Earth.' },
      { word: 'elusive', ipa: '/iˈluː.sɪv/', meaning: 'khó tìm thấy, khó nắm bắt', example: 'The answer remains elusive.' }
    ],
    grammar: [
      { structure: 'Relative Clauses with "which" referring to a whole clause', explanation: 'Sử dụng "which" sau dấu phẩy để thay thế và bổ nghĩa cho toàn bộ nội dung của mệnh đề đứng trước.', example: '...detected these elusive ripples in 2015, which confirmed Einstein\'s predictions...' }
    ]
  },

  // ================= L6 LESSONS (Scholar) =================
  {
    title: 'Triết lý về Bản ngã của Socrates (The Socratic Philosophy of Self) [NEW]',
    levelCode: 'L6',
    englishText: 'Rarely has any philosopher influenced Western thought as profoundly as Socrates, whose persistent questioning of social norms laid the foundation for modern ethics. Not only did he challenge the prevailing political dogmas of ancient Athens, but he also insisted that an unexamined life is not worth living. Central to his philosophical method was the pursuit of virtue through self-knowledge, a journey that required individuals to recognize their own ignorance.\n\nScarcely had Socrates begun his dialogue with the Sophists when it became clear that public definitions of justice were superficial and contradictory. Only by questioning their core assumptions could citizens achieve true wisdom. Under no circumstances did Socrates compromise his intellectual integrity, even when facing a death sentence from the Athenian court for allegedly corrupting the youth. Had he chosen to flee into exile, he would have undermined the very laws he swore to protect.\n\nLittle did his accusers realize that executing him would immortalize his teachings. No sooner had his disciple Plato written the dialogues than Socrates became the ultimate symbol of philosophical martyrdom. In his works, Plato preserved the Socratic method, showing that truth is not something to be taught, but rather something to be uncovered through dialogue.\n\nOnly when a society encourages open dissent and critical inquiry can it avoid the trap of collective complacency. Never before have these questions been more relevant than in today\'s fast-paced digital age, where social media algorithms often discourage critical thinking. Modern scholars continue to analyze his ideas, recognizing that self-reflection remains essential. Only through rigorous self-examination can a society prevent moral decay and build a just community.',
    vietnameseText: 'Hiếm có triết gia nào ảnh hưởng sâu sắc đến tư tưởng phương Tây như Socrates, người mà việc liên tục đặt câu hỏi về các chuẩn mực xã hội đã đặt nền móng cho đạo đức học hiện đại. Không những ông thách thức các giáo điều chính trị phổ biến của Athens cổ đại, mà ông còn khẳng định rằng một cuộc đời không được phản tỉnh thì không đáng sống. Trọng tâm trong phương pháp triết học của ông là việc theo đuổi đức hạnh thông qua sự tự hiểu biết, một cuộc hành trình đòi hỏi các cá nhân phải nhận ra sự thiếu hiểu biết của chính mình.\n\nNgay khi Socrates bắt đầu cuộc đối thoại với các ngụy biện gia, người ta đã thấy rõ rằng các định nghĩa công khai về công lý là nông cạn và mâu thuẫn. Chỉ bằng cách đặt câu hỏi về các giả định cốt lõi của họ, các công dân mới có thể đạt được trí tuệ thực sự. Trong bất kỳ trường hợp nào, Socrates cũng không thỏa hiệp với sự liêm chính trí tuệ của mình, ngay cả khi đối mặt với án tử hình từ tòa án Athens vì bị cáo buộc làm hư hỏng giới trẻ. Nếu ông chọn chạy trốn lưu vong, ông đã hủy hoại chính những đạo luật mà ông đã thề sẽ bảo vệ.\n\nNhững kẻ buộc tội ông ít nhận ra rằng việc hành quyết ông sẽ bất tử hóa những lời dạy của ông. Ngay sau khi môn đồ của ông là Plato viết các cuộc đối thoại, Socrates đã trở thành biểu tượng tối cao của sự tuẫn đạo triết học. Trong các tác phẩm của mình, Plato đã bảo tồn phương pháp Socratic, chỉ ra rằng sự thật không phải là thứ để dạy, mà đúng hơn là thứ được khám phá thông qua đối thoại.\n\nChỉ khi một xã hội khuyến khích sự bất đồng quan điểm cởi mở và sự phản biện nghiêm túc, nó mới có thể tránh được cái bẫy của sự tự mãn tập thể. Chưa bao giờ những câu hỏi này lại phù hợp hơn trong thời đại kỹ thuật số nhịp độ nhanh ngày nay, nơi các thuật toán truyền thông xã hội thường làm nản lòng tư duy phản biện. Các học giả hiện đại tiếp tục phân tích các ý tưởng của ông, nhận ra rằng sự tự phản tỉnh vẫn là điều thiết yếu. Chỉ thông qua việc tự kiểm tra nghiêm ngặt, một xã hội mới có thể ngăn chặn sự suy đồi đạo đức và xây dựng một cộng đồng công bằng.',
    keywordsEn: ['Socrates', 'philosophical dogmas', 'virtue', 'ignorance', 'Sophists', 'superficial', 'intellectual integrity', 'corrupting', 'exile', 'martyrdom', 'complacency', 'self-reflection', 'dissent'],
    keywordsVi: ['Socrates', 'giáo điều triết học', 'đức hạnh', 'thiếu hiểu biết', 'ngụy biện gia', 'nông cạn', 'liêm chính trí tuệ', 'làm hư hỏng', 'lưu vong', 'tuẫn đạo', 'sự tự mãn', 'phản tỉnh', 'bất đồng quan điểm'],
    vocabulary: [
      { word: 'virtue', ipa: '/ˈvɝː.tʃuː/', meaning: 'đức hạnh, đức tính tốt', example: 'Patience is a great virtue.' },
      { word: 'ignorance', ipa: '/ˈɪɡ.nɚ.əns/', meaning: 'sự vô tri, thiếu hiểu biết', example: 'We must fight ignorance with education.' },
      { word: 'dissent', ipa: '/dɪˈsent/', meaning: 'sự bất đồng quan điểm, phản đối', example: 'In a democracy, dissent is allowed.' }
    ],
    grammar: [
      { structure: 'Grammatical Inversion (Đảo ngữ ngữ pháp)', explanation: 'Đưa trợ động từ lên trước chủ ngữ khi có từ phủ định hoặc cụm giới từ giới hạn đứng đầu câu nhằm mục đích nhấn mạnh.', example: 'Rarely has any philosopher influenced... Under no circumstances did Socrates compromise...' }
    ]
  },
  {
    title: 'Báo chí trong Kỷ nguyên Số (Journalism in the Digital Age) [NEW]',
    levelCode: 'L6',
    englishText: 'Never before has the field of journalism experienced such a dramatic transformation as it has in the past decade. Not only has the rise of digital platforms completely decentralized the distribution of news, but it has also challenged the traditional business models of print newspapers. Today, citizens can access information instantly, bypassing traditional gatekeepers entirely.\n\nScarcely had the internet become ubiquitous when traditional media organizations began to struggle with declining advertisement revenues. Only by adapting to digital subscriptions and multimedia storytelling could these agencies survive in a highly competitive market. Under no circumstances should journalists sacrifice accuracy for speed, yet the pressure to generate clicks has frequently compromised professional ethics.\n\nLittle did early tech pioneers anticipate that social media platforms would become the primary source of news for billions of people. No sooner had these algorithms begun to prioritize high-engagement content than misinformation began to spread rapidly across the web. Consequently, the public\'s trust in mainstream journalism has declined to historic lows.\n\nOnly when media literacy is widely taught can society effectively combat the spread of fake news. Had publishers invested more resources in investigative journalism rather than clickbait headlines, they might have maintained their credibility. Today, the role of professional journalists remains vital to democracy. Only through independent and objective reporting can the press continue to hold powerful institutions accountable and protect the public interest.',
    vietnameseText: 'Chưa bao giờ lĩnh vực báo chí trải qua một sự thay đổi mạnh mẽ như trong thập kỷ qua. Sự trỗi dậy của các nền tảng kỹ thuật số không chỉ phi tập trung hóa hoàn toàn việc phân phối tin tức, mà nó còn thách thức các mô hình kinh doanh truyền thống của các tờ báo in. Ngày nay, người dân có thể tiếp cận thông tin ngay lập tức, bỏ qua hoàn toàn các cơ quan kiểm duyệt truyền thống.\n\nNgay khi internet trở nên phổ biến, các tổ chức truyền thông truyền thống đã bắt đầu phải chật vật với doanh thu quảng cáo giảm sút. Chỉ bằng cách thích ứng với đăng ký kỹ thuật số và kể chuyện bằng đa phương tiện, các cơ quan này mới có thể tồn tại trong một thị trường cạnh tranh khốc liệt. Trong bất kỳ hoàn cảnh nào, các nhà báo cũng không nên hy sinh sự chính xác để đổi lấy tốc độ, tuy nhiên áp lực tạo ra lượt nhấp chuột đã thường xuyên làm tổn hại đến đạo đức nghề nghiệp.\n\nCác nhà tiên phong công nghệ ban đầu ít ngờ rằng các nền tảng mạng xã hội sẽ trở thành nguồn tin tức chính cho hàng tỷ người. Ngay khi các thuật toán này bắt đầu ưu tiên nội dung có tính tương tác cao, thông tin sai lệch bắt đầu lan truyền nhanh chóng trên mạng. Do đó, niềm tin của công chúng vào báo chí chính thống đã giảm xuống mức thấp lịch sử.\n\nChỉ khi kỹ năng hiểu biết về truyền thông được giảng dạy rộng rãi, xã hội mới có thể chống lại sự lan truyền của tin gia một cách hiệu quả. Nếu các nhà xuất bản đầu tư nhiều tài nguyên hơn vào báo chí điều tra thay vì các tiêu đề giật gân, họ có thể đã duy trì được uy tín của mình. Ngày nay, vai trò của các nhà báo chuyên nghiệp vẫn rất quan trọng đối với nền dân chủ. Chỉ thông qua báo cáo độc lập và khách quan, báo chí mới có thể tiếp tục quy trách nhiệm cho các tổ chức quyền lực và bảo vệ lợi ích công cộng.',
    keywordsEn: ['journalism', 'decentralized', 'gatekeepers', 'ubiquitous', 'subscriptions', 'multimedia', 'generate clicks', 'compromised', 'algorithms', 'misinformation', 'credibility', 'clickbait'],
    keywordsVi: ['báo chí', 'phi tập trung', 'cơ quan kiểm duyệt', 'phổ biến', 'đăng ký', 'đa phương tiện', 'tạo lượt click', 'tổn hại', 'thuật toán', 'tin sai lệch', 'uy tín', 'giật gân'],
    vocabulary: [
      { word: 'decentralized', ipa: '/diːˈsen.trə.laɪzd/', meaning: 'phi tập trung hóa', example: 'Crypto uses a decentralized network.' },
      { word: 'ubiquitous', ipa: '/juːˈbɪk.wə.t̬əs/', meaning: 'nhan nhản, có mặt ở khắp mọi nơi', example: 'Mobile phones are ubiquitous now.' },
      { word: 'credibility', ipa: '/ˌkred.əˈbɪl.ə.t̬i/', meaning: 'sự tín nhiệm, độ uy tín', example: 'The scandal damaged the newspaper\'s credibility.' }
    ],
    grammar: [
      { structure: 'Inversion with negative adverbs (Đảo ngữ trạng từ phủ định)', explanation: 'Khi đặt các trạng từ phủ định như Never before, Scarcely, Little, No sooner, Only by lên đầu câu, mệnh đề chính phải đảo trợ động từ lên trước chủ ngữ.', example: 'Never before has the field experienced... Little did early tech pioneers anticipate...' }
    ]
  },

  // ================= L7 LESSONS (Native) =================
  {
    title: 'Thành ngữ trong Giao tiếp (Common English Idioms) [NEW]',
    levelCode: 'L7',
    englishText: 'Don\'t beat around the bush; just bite the bullet and tell the truth.',
    vietnameseText: 'Đừng nói vòng vo tam quốc nữa; hãy cắn răng chịu đựng khó khăn và nói ra sự thật đi.',
    keywordsEn: ['beat around the bush', 'bite the bullet'],
    keywordsVi: ['nói vòng vo', 'cắn răng chịu đựng'],
    vocabulary: [
      { word: 'beat around the bush', ipa: '/biːt əˈraʊnd ðə bʊʃ/', meaning: 'nói vòng vo, né tránh chủ đề chính', example: 'Stop beating around the bush!' },
      { word: 'bite the bullet', ipa: '/baɪt ðə ˈbʊl.ɪt/', meaning: 'chấp nhận đối mặt với một tình huống khó chịu', example: 'I had to bite the bullet and accept the truth.' }
    ],
    grammar: [
      { structure: 'Imperative sentence with idioms', explanation: 'Câu mệnh lệnh kết hợp sử dụng các thành ngữ ẩn dụ phổ biến của người bản xứ.', example: 'Don\'t beat around the bush.' }
    ]
  },
  {
    title: 'Tiếng lóng thế hệ trẻ (Modern Slang in Action) [NEW]',
    levelCode: 'L7',
    englishText: 'That new tech startup is fire, but their marketing strategy is kind of mid.',
    vietnameseText: 'Công ty khởi nghiệp công nghệ mới đó cực kỳ chất, nhưng chiến lược tiếp thị của họ thì hơi bình thường.',
    keywordsEn: ['fire', 'mid'],
    keywordsVi: ['cực kỳ chất', 'hơi bình thường'],
    vocabulary: [
      { word: 'fire', ipa: '/faɪr/', meaning: 'cực kỳ tuyệt vời, xuất sắc (slang)', example: 'Her new album is fire.' },
      { word: 'mid', ipa: '/mɪd/', meaning: 'trung bình, không có gì nổi bật (slang)', example: 'The movie was kind of mid.' }
    ],
    grammar: [
      { structure: 'Slang-infused informal structure', explanation: 'Cấu trúc câu giao tiếp thân mật sử dụng tính từ lóng thay cho các tính từ thông thường.', example: 'That startup is fire... strategy is mid.' }
    ]
  },
  {
    title: 'Trích đoạn Văn học: Gatsby Vĩ đại (The Great Gatsby Extract) [NEW]',
    levelCode: 'L7',
    englishText: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
    vietnameseText: 'Thế là chúng ta vẫn cứ tiến tới, những con thuyền ngược dòng nước, không ngừng bị đẩy lùi về quá khứ.',
    keywordsEn: ['beat on', 'current', 'borne back', 'ceaselessly'],
    keywordsVi: ['tiến tới', 'dòng nước', 'bị đẩy lùi', 'không ngừng'],
    vocabulary: [
      { word: 'borne', ipa: '/bɔːrn/', meaning: 'được mang đi, cuốn đi (quá khứ phân từ của bear)', example: 'The boat was borne away by the waves.' },
      { word: 'ceaselessly', ipa: '/ˈsiːs.ləs.li/', meaning: 'không ngừng nghỉ, liên tục', example: 'She worked ceaselessly.' }
    ],
    grammar: [
      { structure: 'Metaphorical literary sentence', explanation: 'Cấu trúc câu văn học giàu tính ẩn dụ, nhịp điệu và ngôn từ cô đọng.', example: 'boats against the current, borne back ceaselessly...' }
    ]
  },
  {
    title: 'Dưới hiên nhà (Under the Weather) [NEW]',
    levelCode: 'L7',
    englishText: 'I was feeling under the weather, so I decided to call it a day.',
    vietnameseText: 'Tôi cảm thấy không được khỏe, vì vậy tôi đã quyết định dừng công việc lại.',
    keywordsEn: ['under the weather', 'call it a day'],
    keywordsVi: ['không được khỏe', 'dừng công việc lại'],
    vocabulary: [
      { word: 'under the weather', ipa: '/ˈʌn.dɚ ðə ˈweð.ɚ/', meaning: 'ốm, mệt mỏi, không khỏe', example: 'I\'m under the weather today.' },
      { word: 'call it a day', ipa: '/kɑːl ɪt eɪ deɪ/', meaning: 'dừng làm việc gì đó (sau một ngày mệt mỏi)', example: 'Let\'s call it a day.' }
    ],
    grammar: [
      { structure: 'So coordinate clause', explanation: 'Mệnh đề quan hệ nguyên nhân kết quả liên kết bằng liên từ "so".', example: 'I was feeling under the weather, so I decided to...' }
    ]
  },
  {
    title: 'Thành ngữ mưa gió (Raining Cats and Dogs) [NEW]',
    levelCode: 'L7',
    englishText: 'It was raining cats and dogs, but we still hit the road.',
    vietnameseText: 'Trời mưa như trút nước, nhưng chúng tôi vẫn khởi hành lên đường.',
    keywordsEn: ['raining cats and dogs', 'hit the road'],
    keywordsVi: ['mưa như trút nước', 'khởi hành lên đường'],
    vocabulary: [
      { word: 'raining cats and dogs', ipa: '/reɪnɪŋ kæts ænd dɑːɡz/', meaning: 'mưa rất to, mưa như trút nước', example: 'It was raining cats and dogs outside.' },
      { word: 'hit the road', ipa: '/hɪt ðə roʊd/', meaning: 'bắt đầu lên đường, khởi hành', example: 'We should hit the road before sunset.' }
    ],
    grammar: [
      { structure: 'But adversative clause', explanation: 'Liên từ kết hợp "but" dùng kết nối hai mệnh đề thể hiện sự nhượng bộ/đối lập.', example: 'It was raining... but we still hit the road.' }
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
      message: 'Database seeded successfully with the game-like 7-level system!',
      levelsSeededCount: levelsData.length,
      lessonsSeededCount: lessonsData.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
