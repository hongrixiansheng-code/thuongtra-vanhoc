// 🤖 CLAUDE CODE
// Script: rebuild-en-ket-dialogue.js
// Mục đích: Xóa toàn bộ DIALOGUE cũ của en-ket (59 đoạn, không đồng nhất)
// và seed lại 72 đoạn mới (36 bài x 2 đoạn/bài x 6 câu/đoạn), dùng vocab + grammar của từng bài.
// Chạy: node apps/frontend/scripts/rebuild-en-ket-dialogue.js
// Không thay đổi gì khác.

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  // ===== PLACEHOLDER_INSERT_HERE =====
  // ===== BÀI 1 (lesson 0) =====
  {lesson:0,content:{title:"New neighbours",desc:"Sarah kể cho Mark về cặp đôi hàng xóm mới.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"We have new neighbours, don't we?",vi:"Chúng ta có hàng xóm mới, đúng không?"},
    {speaker:"Mark",en:"Yes, a young couple moved in last week.",vi:"Đúng vậy, một cặp đôi trẻ đã chuyển vào tuần trước."},
    {speaker:"Sarah",en:"Are they relatives of the old owner?",vi:"Họ có phải là người thân của chủ nhà cũ không?"},
    {speaker:"Mark",en:"No, they're just a normal couple, not relatives.",vi:"Không, họ chỉ là một cặp đôi bình thường, không phải người thân."},
    {speaker:"Sarah",en:"We should invite them as guests for dinner.",vi:"Chúng ta nên mời họ làm khách đến dự bữa tối."},
    {speaker:"Mark",en:"Good idea! They seem like polite adults.",vi:"Ý kiến hay! Họ có vẻ là những người trưởng thành lễ phép."}
  ]}},
  {lesson:0,content:{title:"Whose photo is this?",desc:"Tom hỏi Emma về một bức ảnh gia đình trên bàn làm việc.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"Whose photo is this on your desk?",vi:"Bức ảnh này trên bàn của bạn là của ai?"},
    {speaker:"Emma",en:"That's my cousin and her boyfriend.",vi:"Đó là em họ tôi và bạn trai của cô ấy."},
    {speaker:"Tom",en:"You've got a big family, haven't you?",vi:"Bạn có một gia đình lớn, đúng không?"},
    {speaker:"Emma",en:"Yes, I have a lot of relatives in this city.",vi:"Đúng vậy, tôi có rất nhiều người thân trong thành phố này."},
    {speaker:"Tom",en:"Is your colleague coming to the party too?",vi:"Đồng nghiệp của bạn cũng sẽ đến tiệc chứ?"},
    {speaker:"Emma",en:"Yes, she's bringing her partner as a guest.",vi:"Đúng vậy, cô ấy sẽ đưa người bạn đời đi cùng làm khách."}
  ]}},

  // ===== BÀI 2 (lesson 1) =====
  {lesson:1,content:{title:"Before the exam",desc:"Tom thấy Emma có vẻ lo lắng trước kỳ thi.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"You look so pale that I'm worried about you.",vi:"Bạn trông nhợt nhạt đến mức tôi lo cho bạn."},
    {speaker:"Emma",en:"I'm really nervous about the exam.",vi:"Tôi thực sự lo lắng về kỳ thi."},
    {speaker:"Tom",en:"Don't be scared, you've studied a lot.",vi:"Đừng sợ, bạn đã học rất nhiều rồi."},
    {speaker:"Emma",en:"I'm also a bit shy to speak in front of the teacher.",vi:"Tôi cũng có một chút nhút nhát khi nói trước giáo viên."},
    {speaker:"Tom",en:"The teacher is quite polite, don't worry.",vi:"Giáo viên khá lễ phép, đừng lo lắng."},
    {speaker:"Emma",en:"Thanks, Tom. I'm glad you're here.",vi:"Cảm ơn Tom. Tôi rất vui vì có bạn ở đây."}
  ]}},
  {lesson:1,content:{title:"An awful day",desc:"Sarah kể về một ngày tồi tệ của mình cho Mark.",characters:["Sarah","Mark"],lines:[
    {speaker:"Mark",en:"You seem mad. What happened?",vi:"Bạn có vẻ giận dữ. Chuyện gì đã xảy ra vậy?"},
    {speaker:"Sarah",en:"I had such an awful day that I want to go home.",vi:"Tôi đã có một ngày tồi tệ đến mức tôi muốn về nhà."},
    {speaker:"Mark",en:"Why are you so angry?",vi:"Sao bạn lại giận dữ như vậy?"},
    {speaker:"Sarah",en:"My boss was very serious about my mistake.",vi:"Sếp của tôi rất nghiêm khắc về lỗi của tôi."},
    {speaker:"Mark",en:"I'm glad it's over now.",vi:"Tôi mừng là chuyện đó đã qua rồi."},
    {speaker:"Sarah",en:"Me too. I just want to relax tonight.",vi:"Tôi cũng vậy. Tôi chỉ muốn thư giãn tối nay."}
  ]}},

  // ===== BÀI 3 (lesson 2) =====
  {lesson:2,content:{title:"Choosing jewellery",desc:"Khách mua sắm tại quầy trang sức hỏi về một chiếc dây chuyền.",characters:["Shop Assistant","Customer"],lines:[
    {speaker:"Customer",en:"Is this chain made of gold?",vi:"Cái dây chuyền này được làm từ vàng phải không?"},
    {speaker:"Shop Assistant",en:"No, it's made of silver, but we have golden earrings too.",vi:"Không, nó được làm từ bạc, nhưng chúng tôi cũng có khuyên tai vàng."},
    {speaker:"Customer",en:"I prefer something bright, not too pale.",vi:"Tôi thích thứ gì nổi bật, không quá nhạt nhòa."},
    {speaker:"Shop Assistant",en:"This jewellery looks like real gold, very fashionable.",vi:"Bộ trang sức này trông như vàng thật, rất thời trang."},
    {speaker:"Customer",en:"Are you wearing the same chain now?",vi:"Bạn cũng đang đeo cùng loại dây chuyền này phải không?"},
    {speaker:"Shop Assistant",en:"Yes, I've got it on every day this week.",vi:"Đúng vậy, tôi đã đeo nó mỗi ngày trong tuần này."}
  ]}},
  {lesson:2,content:{title:"What to wear tonight",desc:"Hai bạn chuẩn bị trang phục cho buổi tối.",characters:["Emma","Lily"],lines:[
    {speaker:"Emma",en:"What are you wearing to the party tonight?",vi:"Tối nay bạn sẽ mặc gì đến buổi tiệc?"},
    {speaker:"Lily",en:"A cream dress with some make-up.",vi:"Một chiếc váy màu kem với một chút trang điểm."},
    {speaker:"Emma",en:"That sounds very fashionable.",vi:"Nghe có vẻ rất thời trang."},
    {speaker:"Lily",en:"Thanks! Is your jacket made of leather?",vi:"Cảm ơn! Cái áo khoác của bạn được làm từ da phải không?"},
    {speaker:"Emma",en:"Yes, it is. I bought it last month.",vi:"Đúng vậy. Tôi đã mua nó vào tháng trước."},
    {speaker:"Lily",en:"It looks like a really expensive jacket.",vi:"Nó trông như một chiếc áo khoác rất đắt tiền."}
  ]}},

  // ===== BÀI 4 (lesson 3) =====
  {lesson:3,content:{title:"A new flat tour",desc:"Mark giới thiệu căn hộ mới cho Sarah.",characters:["Mark","Sarah"],lines:[
    {speaker:"Mark",en:"This furniture was bought last week.",vi:"Bộ nội thất này được mua vào tuần trước."},
    {speaker:"Sarah",en:"I love this armchair next to the curtain.",vi:"Tôi rất thích cái ghế bành cạnh tấm rèm này."},
    {speaker:"Mark",en:"The carpet is cleaned every weekend.",vi:"Tấm thảm được làm sạch mỗi cuối tuần."},
    {speaker:"Sarah",en:"Is the heating turned on at night?",vi:"Hệ thống sưởi có được mở vào ban đêm không?"},
    {speaker:"Mark",en:"Yes, and look, I've got a new pillow for the sofa.",vi:"Có, và nhìn này, tôi có một cái gối mới cho ghế sô pha."},
    {speaker:"Sarah",en:"It's a really cosy living room.",vi:"Đây là một phòng khách rất ấm cúng."}
  ]}},
  {lesson:3,content:{title:"Things to fix",desc:"Hai vợ chồng bàn về những thứ cần sửa trong nhà.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"The cupboard door needs fixing.",vi:"Cửa tủ cần được sửa."},
    {speaker:"Emma",en:"And the sink needs cleaning too.",vi:"Và bồn rửa cũng cần được làm sạch nữa."},
    {speaker:"Tom",en:"That drawer in the kitchen is broken.",vi:"Cái ngăn kéo trong bếp đó bị hỏng rồi."},
    {speaker:"Emma",en:"The ceiling was painted white last year.",vi:"Trần nhà đã được sơn màu trắng năm ngoái."},
    {speaker:"Tom",en:"We've got a new curtain for the bedroom now.",vi:"Giờ chúng ta có một tấm rèm mới cho phòng ngủ."},
    {speaker:"Emma",en:"Great, this house needs a lot of work though.",vi:"Tuyệt, dù vậy ngôi nhà này còn cần nhiều việc phải làm."}
  ]}},

  // ===== BÀI 5 (lesson 4) =====
  {lesson:4,content:{title:"Calling about a flat",desc:"Khách hàng gọi điện hỏi thuê căn hộ.",characters:["Caller","Agent"],lines:[
    {speaker:"Caller",en:"I'm calling about the flat on the third floor.",vi:"Tôi gọi điện để hỏi về căn hộ ở tầng ba."},
    {speaker:"Agent",en:"Yes, it's a lovely apartment with a closet.",vi:"Vâng, đó là một căn hộ đáng yêu có tủ quần áo."},
    {speaker:"Caller",en:"Is there a bathtub in the bathroom?",vi:"Có bồn tắm trong phòng tắm không?"},
    {speaker:"Agent",en:"Yes, and the rent was reduced last month.",vi:"Có, và tiền thuê đã được giảm vào tháng trước."},
    {speaker:"Caller",en:"How many floors does the block have?",vi:"Tòa nhà này có bao nhiêu tầng?"},
    {speaker:"Agent",en:"It has ten floors and a big living room on each one.",vi:"Nó có mười tầng và một phòng khách lớn ở mỗi tầng."}
  ]}},
  {lesson:4,content:{title:"At a guest-house",desc:"Khách du lịch hỏi về chỗ ở tại một guest-house.",characters:["Tourist","Owner"],lines:[
    {speaker:"Tourist",en:"Is there any accommodation available tonight?",vi:"Tối nay có chỗ ở nào trống không?"},
    {speaker:"Owner",en:"Yes, this guest-house was built two years ago.",vi:"Có, nhà nghỉ này được xây hai năm trước."},
    {speaker:"Tourist",en:"Is there a closet in the room?",vi:"Trong phòng có tủ quần áo không?"},
    {speaker:"Owner",en:"Yes, and a small bathtub too.",vi:"Có, và cũng có một bồn tắm nhỏ."},
    {speaker:"Tourist",en:"Which floor is my room on?",vi:"Phòng của tôi ở tầng mấy?"},
    {speaker:"Owner",en:"It's on the second floor, near the living room.",vi:"Nó ở tầng hai, gần phòng khách."}
  ]}},

  // ===== BÀI 6 (lesson 5) =====
  {lesson:5,content:{title:"Something is broken",desc:"Hai người bạn cùng phòng nói về thiết bị bị hỏng.",characters:["Mark","Sarah"],lines:[
    {speaker:"Mark",en:"The fridge needs repairing again.",vi:"Cái tủ lạnh lại cần được sửa nữa rồi."},
    {speaker:"Sarah",en:"I think the cable is broken, not the fridge.",vi:"Tôi nghĩ là dây cáp bị hỏng, không phải tủ lạnh."},
    {speaker:"Mark",en:"The printer has broken down too.",vi:"Máy in cũng đã bị hỏng nữa."},
    {speaker:"Sarah",en:"We need to buy a new battery for the alarm clock.",vi:"Chúng ta cần mua một viên pin mới cho đồng hồ báo thức."},
    {speaker:"Mark",en:"Don't forget to turn off the cooker, please.",vi:"Đừng quên tắt bếp giúp tôi nhé."},
    {speaker:"Sarah",en:"Okay, and let's take out the rubbish too.",vi:"Được, và cùng đem rác ra ngoài luôn nhé."}
  ]}},
  {lesson:5,content:{title:"At the repair shop",desc:"Khách mang thiết bị điện đến cửa hàng sửa chữa.",characters:["Customer","Technician"],lines:[
    {speaker:"Customer",en:"I had this printer repaired last month, but it's broken again.",vi:"Tôi đã nhờ sửa cái máy in này tháng trước, nhưng nó lại hỏng nữa."},
    {speaker:"Technician",en:"I think the cable needs replacing.",vi:"Tôi nghĩ dây cáp cần được thay."},
    {speaker:"Customer",en:"How much electricity does it use?",vi:"Nó tiêu thụ bao nhiêu điện?"},
    {speaker:"Technician",en:"Not much. The battery is the real problem.",vi:"Không nhiều. Vấn đề thực sự là viên pin."},
    {speaker:"Customer",en:"Can you fix it today?",vi:"Bạn có thể sửa nó hôm nay không?"},
    {speaker:"Technician",en:"Yes, I'll have it fixed by 5 o'clock.",vi:"Được, tôi sẽ cho sửa xong trước 5 giờ."}
  ]}},
  // ===== BÀI 7 (lesson 6) =====
  {lesson:6,content:{title:"Asking for a discount",desc:"Khách hỏi giá và xin phép thử đồ tại cửa hàng.",characters:["Customer","Shop Assistant"],lines:[
    {speaker:"Customer",en:"How much does this jacket cost?",vi:"Cái áo khoác này giá bao nhiêu?"},
    {speaker:"Shop Assistant",en:"It's thirty pounds, but there's a discount today.",vi:"Nó giá ba mươi bảng, nhưng hôm nay có giảm giá."},
    {speaker:"Customer",en:"Could I try it on, please?",vi:"Tôi có thể thử nó được không?"},
    {speaker:"Shop Assistant",en:"Of course. The fitting room is over there.",vi:"Tất nhiên rồi. Phòng thử đồ ở đằng kia."},
    {speaker:"Customer",en:"Can I pay by credit card?",vi:"Tôi có thể trả bằng thẻ tín dụng không?"},
    {speaker:"Shop Assistant",en:"Yes, and here is your receipt.",vi:"Được, và đây là biên lai của bạn."}
  ]}},
  {lesson:6,content:{title:"Half-price sale",desc:"Hai người bạn nói về một đợt giảm giá lớn.",characters:["Lily","Tom"],lines:[
    {speaker:"Lily",en:"Everything in this shop is half-price today!",vi:"Mọi thứ trong cửa hàng này đang giảm nửa giá hôm nay!"},
    {speaker:"Tom",en:"What's the price of that bag?",vi:"Cái túi đó giá bao nhiêu?"},
    {speaker:"Lily",en:"Only ten dollars. Could I get a bigger discount?",vi:"Chỉ mười đô la. Tôi có thể được giảm giá nhiều hơn không?"},
    {speaker:"Tom",en:"Maybe if you pay in cash.",vi:"Có thể nếu bạn trả bằng tiền mặt."},
    {speaker:"Lily",en:"Good idea. Let's check the bill first.",vi:"Ý kiến hay. Hãy kiểm tra hóa đơn trước nhé."},
    {speaker:"Tom",en:"The total cost is only twenty dollars.",vi:"Tổng chi phí chỉ là hai mươi đô la."}
  ]}},

  // ===== BÀI 8 (lesson 7) =====
  {lesson:7,content:{title:"Finding a pharmacy",desc:"Khách du lịch hỏi đường đến hiệu thuốc.",characters:["Tourist","Local"],lines:[
    {speaker:"Tourist",en:"Where can I find a pharmacy near here?",vi:"Tôi có thể tìm thấy một hiệu thuốc gần đây ở đâu?"},
    {speaker:"Local",en:"Is there a department store near you? It's next to that.",vi:"Có một trung tâm thương mại gần bạn không? Nó nằm cạnh đó."},
    {speaker:"Tourist",en:"Is there a bookshop near here too?",vi:"Có cửa hàng sách nào gần đây không?"},
    {speaker:"Local",en:"Yes, between the bakery and the market.",vi:"Có, nằm giữa tiệm bánh và chợ."},
    {speaker:"Tourist",en:"Thank you. Is the grocery store far from here?",vi:"Cảm ơn bạn. Cửa hàng tạp hóa có xa đây không?"},
    {speaker:"Local",en:"No, it's just a five-minute walk.",vi:"Không, chỉ mất khoảng năm phút đi bộ."}
  ]}},
  {lesson:7,content:{title:"For sale or on sale?",desc:"Hai người bạn đi dạo qua các cửa hàng dịch vụ trong khu phố.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"That old butcher's shop is for sale now.",vi:"Cửa hàng thịt cũ đó đang được rao bán."},
    {speaker:"Mark",en:"Really? I thought it was a dry cleaner now.",vi:"Thật vậy sao? Tôi nghĩ giờ nó là một tiệm giặt khô."},
    {speaker:"Sarah",en:"No, the dry cleaner is next to the post office.",vi:"Không, tiệm giặt khô nằm cạnh bưu điện."},
    {speaker:"Mark",en:"Are these shoes on sale at the market?",vi:"Đôi giày này đang được giảm giá ở chợ phải không?"},
    {speaker:"Sarah",en:"Yes, and the bakery has a sale too.",vi:"Đúng vậy, và tiệm bánh cũng đang giảm giá nữa."},
    {speaker:"Mark",en:"Let's go and check the customer reviews first.",vi:"Cùng đi xem các đánh giá của khách hàng trước đã."}
  ]}},

  // ===== BÀI 9 (lesson 8) =====
  {lesson:8,content:{title:"At the post office",desc:"Khách hàng gửi một bưu phẩm tại bưu điện.",characters:["Customer","Clerk"],lines:[
    {speaker:"Customer",en:"I'd like to send this envelope, please.",vi:"Tôi muốn gửi cái phong bì này."},
    {speaker:"Clerk",en:"Sure. Could you fill in this form first?",vi:"Được. Bạn có thể điền vào tờ đơn này trước được không?"},
    {speaker:"Customer",en:"Do I need a stamp for this too?",vi:"Tôi cũng cần một con tem cho cái này không?"},
    {speaker:"Clerk",en:"Yes, and would you like to pay in cash or by cheque?",vi:"Có, và bạn muốn trả bằng tiền mặt hay bằng séc?"},
    {speaker:"Customer",en:"Cash, please. Here's the change.",vi:"Tiền mặt nhé. Đây là tiền lẻ."},
    {speaker:"Clerk",en:"Thank you. We'll deliver it tomorrow.",vi:"Cảm ơn bạn. Chúng tôi sẽ giao nó vào ngày mai."}
  ]}},
  {lesson:8,content:{title:"Opening a bank account",desc:"Khách hàng mở một tài khoản ngân hàng mới.",characters:["Customer","Bank Clerk"],lines:[
    {speaker:"Customer",en:"I'd like to open a new account, please.",vi:"Tôi muốn mở một tài khoản mới."},
    {speaker:"Bank Clerk",en:"Of course. Please fill out this application.",vi:"Được. Vui lòng điền vào đơn đăng ký này."},
    {speaker:"Customer",en:"Do I need a coin or a note to start?",vi:"Tôi cần một đồng xu hay một tờ tiền để bắt đầu không?"},
    {speaker:"Bank Clerk",en:"No, you just need to sign here.",vi:"Không, bạn chỉ cần ký vào đây."},
    {speaker:"Customer",en:"He said I needed my passport too.",vi:"Anh ấy nói rằng tôi cũng cần hộ chiếu nữa."},
    {speaker:"Bank Clerk",en:"That's right, please show it to me.",vi:"Đúng vậy, vui lòng đưa nó cho tôi."}
  ]}},

  // ===== BÀI 10 (lesson 9) =====
  {lesson:9,content:{title:"Choosing from the menu",desc:"Hai người bạn chọn món tại nhà hàng.",characters:["Emma","Tom"],lines:[
    {speaker:"Emma",en:"What's on the menu today?",vi:"Hôm nay thực đơn có gì?"},
    {speaker:"Tom",en:"There's a curry with garlic and onion.",vi:"Có một món cà ri với tỏi và hành."},
    {speaker:"Emma",en:"I'd rather have an omelette as my main course.",vi:"Tôi muốn ăn món trứng tráng làm món chính hơn."},
    {speaker:"Tom",en:"I prefer curry to omelette.",vi:"Tôi thích cà ri hơn trứng tráng."},
    {speaker:"Emma",en:"How many ingredients are in this dish?",vi:"Món này có bao nhiêu nguyên liệu?"},
    {speaker:"Tom",en:"Let's also choose a dessert at the end.",vi:"Cuối cùng cùng chọn một món tráng miệng nhé."}
  ]}},
  {lesson:9,content:{title:"Planning a recipe",desc:"Hai chị em chuẩn bị nguyên liệu cho một bữa ăn.",characters:["Lily","Anna"],lines:[
    {speaker:"Lily",en:"How much garlic do we need for this recipe?",vi:"Chúng ta cần bao nhiêu tỏi cho công thức này?"},
    {speaker:"Anna",en:"Just a little, and a few onions too.",vi:"Chỉ một ít, và vài củ hành nữa."},
    {speaker:"Lily",en:"I'd rather cook a curry than an omelette.",vi:"Tôi muốn nấu cà ri hơn là trứng tráng."},
    {speaker:"Anna",en:"I prefer a simple dish for dessert.",vi:"Tôi thích một món đơn giản cho món tráng miệng hơn."},
    {speaker:"Lily",en:"How many dishes should we cook tonight?",vi:"Tối nay chúng ta nên nấu bao nhiêu món?"},
    {speaker:"Anna",en:"Just the main course and one dessert.",vi:"Chỉ món chính và một món tráng miệng thôi."}
  ]}},

  // ===== BÀI 11 (lesson 10) =====
  {lesson:10,content:{title:"How is it cooked?",desc:"Hai người bạn hỏi nhau về cách nấu món ăn.",characters:["Mark","Sarah"],lines:[
    {speaker:"Mark",en:"Is the chicken grilled or fried?",vi:"Thịt gà được nướng hay chiên?"},
    {speaker:"Sarah",en:"It's grilled for 20 minutes with fresh vegetables.",vi:"Nó được nướng trong 20 phút với rau củ tươi."},
    {speaker:"Mark",en:"You should slice the onion thinly first.",vi:"Bạn nên cắt hành mỏng trước."},
    {speaker:"Sarah",en:"And you must boil the rice before serving.",vi:"Và bạn phải luộc gạo trước khi dọn ra."},
    {speaker:"Mark",en:"Add a kilo of vegetables to the soup.",vi:"Thêm một ký rau vào món súp."},
    {speaker:"Sarah",en:"This dish shouldn't be eaten raw.",vi:"Món này không nên ăn khi còn sống."}
  ]}},
  {lesson:10,content:{title:"A baking lesson",desc:"Một đầu bếp hướng dẫn học viên cách nướng bánh.",characters:["Chef","Student"],lines:[
    {speaker:"Student",en:"Should I bake this for 20 minutes?",vi:"Tôi có nên nướng cái này trong 20 phút không?"},
    {speaker:"Chef",en:"Yes, and the bread is baked at a high temperature.",vi:"Đúng vậy, và bánh mì được nướng ở nhiệt độ cao."},
    {speaker:"Student",en:"How much flour do we need?",vi:"Chúng ta cần bao nhiêu bột mì?"},
    {speaker:"Chef",en:"200 grams of flour and a litre of milk.",vi:"200 gram bột mì và một lít sữa."},
    {speaker:"Student",en:"Must I mix it before baking?",vi:"Tôi phải trộn nó trước khi nướng phải không?"},
    {speaker:"Chef",en:"Yes, you must mix it well first.",vi:"Đúng vậy, bạn phải trộn nó kỹ trước."}
  ]}},

  // ===== BÀI 12 (lesson 11) =====
  {lesson:11,content:{title:"Making an appointment",desc:"Bệnh nhân gọi điện đặt lịch hẹn khám bệnh.",characters:["Patient","Receptionist"],lines:[
    {speaker:"Patient",en:"I'd like to make an appointment with the doctor.",vi:"Tôi muốn đặt lịch hẹn với bác sĩ."},
    {speaker:"Receptionist",en:"Of course. What's the problem?",vi:"Được. Vấn đề của bạn là gì?"},
    {speaker:"Patient",en:"I've got a pain in my chest and my blood pressure is high.",vi:"Tôi bị đau ở ngực và huyết áp của tôi cao."},
    {speaker:"Receptionist",en:"Have you ever had an X-ray before?",vi:"Bạn đã từng chụp X-quang trước đây chưa?"},
    {speaker:"Patient",en:"No, I haven't. Should I take some medicine first?",vi:"Chưa. Tôi có nên uống thuốc trước không?"},
    {speaker:"Receptionist",en:"You should see the doctor first. The appointment is at 3 o'clock.",vi:"Bạn nên gặp bác sĩ trước. Lịch hẹn là vào lúc 3 giờ."}
  ]}},
  {lesson:11,content:{title:"Talking about health",desc:"Hai người bạn nói về cách sống khỏe mạnh.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"Have you ever been to hospital for an operation?",vi:"Bạn đã từng đến bệnh viện để phẫu thuật chưa?"},
    {speaker:"Emma",en:"No, but I check my blood pressure every month.",vi:"Chưa, nhưng tôi kiểm tra huyết áp mỗi tháng."},
    {speaker:"Tom",en:"You should eat more healthy food.",vi:"Bạn nên ăn nhiều thức ăn lành mạnh hơn."},
    {speaker:"Emma",en:"I know. I shouldn't eat too much fast food.",vi:"Tôi biết. Tôi không nên ăn quá nhiều đồ ăn nhanh."},
    {speaker:"Tom",en:"My degree of pain has gone now, thanks to the medicine.",vi:"Mức độ đau của tôi đã hết rồi, nhờ thuốc."},
    {speaker:"Emma",en:"That's great! You should make an appointment for a check-up too.",vi:"Tuyệt vời! Bạn cũng nên đặt lịch hẹn để kiểm tra sức khỏe nữa."}
  ]}},
  // ===== BÀI 13 (lesson 12) =====
  {lesson:12,content:{title:"Joining the gym",desc:"Hai người bạn nói về việc tập luyện để giữ dáng.",characters:["Mark","Sarah"],lines:[
    {speaker:"Mark",en:"I go climbing every weekend to keep fit.",vi:"Tôi đi leo núi mỗi cuối tuần để giữ dáng."},
    {speaker:"Sarah",en:"I'm able to swim 100 metres now.",vi:"Giờ tôi có thể bơi 100 mét."},
    {speaker:"Mark",en:"Do you go sailing or diving too?",vi:"Bạn có đi chèo thuyền hay lặn biển không?"},
    {speaker:"Sarah",en:"I prefer going to the gym to get fit.",vi:"Tôi thích đến phòng tập để giữ dáng hơn."},
    {speaker:"Mark",en:"She's the fastest runner on the athletics court.",vi:"Cô ấy là người chạy nhanh nhất trên sân điền kinh."},
    {speaker:"Sarah",en:"I hope I'll be able to join the team next year.",vi:"Tôi hy vọng năm sau tôi có thể tham gia đội."}
  ]}},
  {lesson:12,content:{title:"At the sports club",desc:"Nhân viên tư vấn các môn thể thao cho khách mới.",characters:["Staff","New Member"],lines:[
    {speaker:"New Member",en:"I want to exercise and get fit this year.",vi:"Tôi muốn tập thể dục và giữ dáng trong năm nay."},
    {speaker:"Staff",en:"You could go diving or take an athletics class.",vi:"Bạn có thể đi lặn biển hoặc tham gia lớp điền kinh."},
    {speaker:"New Member",en:"Is sailing also possible here?",vi:"Chèo thuyền cũng có thể tập ở đây không?"},
    {speaker:"Staff",en:"Yes, and you'll be able to use the gym too.",vi:"Có, và bạn cũng sẽ có thể sử dụng phòng tập."},
    {speaker:"New Member",en:"Who is the strongest player on the court?",vi:"Ai là người chơi mạnh nhất trên sân?"},
    {speaker:"Staff",en:"That's our climbing coach, he's amazing.",vi:"Đó là huấn luyện viên leo núi của chúng tôi, anh ấy rất tuyệt."}
  ]}},

  // ===== BÀI 14 (lesson 13) =====
  {lesson:13,content:{title:"At the airport",desc:"Hành khách làm thủ tục tại sân bay.",characters:["Passenger","Staff"],lines:[
    {speaker:"Passenger",en:"Excuse me, where is the departure gate?",vi:"Xin lỗi, cổng khởi hành ở đâu?"},
    {speaker:"Staff",en:"Can I see your passport and boarding pass, please?",vi:"Tôi có thể xem hộ chiếu và thẻ lên máy bay của bạn không?"},
    {speaker:"Passenger",en:"Here you are. How long does it take to get through customs?",vi:"Của bạn đây. Mất bao lâu để qua hải quan?"},
    {speaker:"Staff",en:"About ten minutes. Is this your only luggage?",vi:"Khoảng mười phút. Đây có phải là hành lý duy nhất của bạn không?"},
    {speaker:"Passenger",en:"Yes. Is the flight going to be delayed?",vi:"Vâng. Chuyến bay có bị trễ không?"},
    {speaker:"Staff",en:"No, the arrival time is still the same.",vi:"Không, giờ đến vẫn giữ nguyên."}
  ]}},
  {lesson:13,content:{title:"Travel plans",desc:"Hai người bạn lên kế hoạch cho chuyến đi sắp tới.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"We're going to fly to Paris next month.",vi:"Chúng ta sẽ bay đến Paris vào tháng tới."},
    {speaker:"Emma",en:"I think the flight will take about two hours.",vi:"Tôi nghĩ chuyến bay sẽ kéo dài khoảng hai giờ."},
    {speaker:"Tom",en:"By the time we arrive, the helicopter tour will have started.",vi:"Đến khi chúng ta đến, tour trực thăng sẽ đã bắt đầu rồi."},
    {speaker:"Emma",en:"How long does it take to check our luggage?",vi:"Mất bao lâu để gửi hành lý của chúng ta?"},
    {speaker:"Tom",en:"Not long. Did you bring your passport?",vi:"Không lâu. Bạn có mang hộ chiếu chưa?"},
    {speaker:"Emma",en:"Yes, and my boarding pass too.",vi:"Có, và cả thẻ lên máy bay của tôi nữa."}
  ]}},

  // ===== BÀI 15 (lesson 14) =====
  {lesson:14,content:{title:"Asking for directions",desc:"Khách hỏi đường đến bến cảng.",characters:["Tourist","Local"],lines:[
    {speaker:"Tourist",en:"Excuse me, how do I get to the harbour?",vi:"Xin lỗi, tôi đi đến bến cảng như thế nào?"},
    {speaker:"Local",en:"Go past the petrol station, then turn left at the roundabout.",vi:"Đi qua trạm xăng, rồi rẽ trái ở bùng binh."},
    {speaker:"Tourist",en:"Should I get on a tram or a coach?",vi:"Tôi nên lên xe điện hay xe khách?"},
    {speaker:"Local",en:"A tram is faster, get on it near the crossing.",vi:"Xe điện nhanh hơn, hãy lên gần chỗ băng qua đường."},
    {speaker:"Tourist",en:"By the time I had a driving licence, the port had closed!",vi:"Khi tôi có bằng lái, bến cảng đã đóng cửa rồi!"},
    {speaker:"Local",en:"Don't worry, it's still open until 8 p.m.",vi:"Đừng lo, nó vẫn mở đến 8 giờ tối."}
  ]}},
  {lesson:14,content:{title:"Stuck in traffic",desc:"Hai người bạn nói về việc kẹt xe trên đường.",characters:["Mark","Sarah"],lines:[
    {speaker:"Mark",en:"When I left, the lorry had already blocked the motorway.",vi:"Khi tôi đi, xe tải đã chặn đường cao tốc rồi."},
    {speaker:"Sarah",en:"Did you get off the coach near the harbour?",vi:"Bạn có xuống xe khách gần bến cảng không?"},
    {speaker:"Mark",en:"Yes, then I got into a taxi at the crossing.",vi:"Có, rồi tôi lên một chiếc taxi ở chỗ băng qua đường."},
    {speaker:"Sarah",en:"You should turn left at the petrol station next time.",vi:"Lần sau bạn nên rẽ trái ở trạm xăng."},
    {speaker:"Mark",en:"I had already passed it by the time you told me.",vi:"Tôi đã đi qua nó trước khi bạn báo cho tôi."},
    {speaker:"Sarah",en:"Don't worry, the port isn't far from here.",vi:"Đừng lo, bến cảng không xa đây."}
  ]}},

  // ===== BÀI 16 (lesson 15) =====
  {lesson:15,content:{title:"Checking into a hotel",desc:"Khách làm thủ tục check-in tại khách sạn.",characters:["Receptionist","Guest"],lines:[
    {speaker:"Guest",en:"I'd like to check in, please. I made a reservation.",vi:"Tôi muốn check-in. Tôi đã đặt phòng trước."},
    {speaker:"Receptionist",en:"Yes, your double room had already been booked.",vi:"Vâng, phòng đôi của bạn đã được đặt trước rồi."},
    {speaker:"Guest",en:"Does the hotel have a tour for sightseeing?",vi:"Khách sạn có tour tham quan không?"},
    {speaker:"Receptionist",en:"Yes, and there's a guidebook at the reception too.",vi:"Có, và cũng có một sách hướng dẫn ở quầy lễ tân nữa."},
    {speaker:"Guest",en:"What time should I check out tomorrow?",vi:"Tôi nên check-out vào lúc nào ngày mai?"},
    {speaker:"Receptionist",en:"Before 11 o'clock, please.",vi:"Trước 11 giờ nhé."}
  ]}},
  {lesson:15,content:{title:"A single room, please",desc:"Khách hỏi về phòng đơn tại khách sạn.",characters:["Guest","Receptionist"],lines:[
    {speaker:"Guest",en:"Is there a single room available tonight?",vi:"Tối nay có phòng đơn nào trống không?"},
    {speaker:"Receptionist",en:"By the time you arrived, it had been booked, I'm sorry.",vi:"Đến khi bạn tới, nó đã được đặt rồi, tôi xin lỗi."},
    {speaker:"Guest",en:"Could I make a reservation for tomorrow then?",vi:"Vậy tôi có thể đặt phòng cho ngày mai không?"},
    {speaker:"Receptionist",en:"Of course. Does the hotel offer sightseeing tours too?",vi:"Tất nhiên rồi. Khách sạn cũng có tour tham quan nữa không?"},
    {speaker:"Guest",en:"That sounds good. Is there a guidebook I can borrow?",vi:"Nghe được đó. Có sách hướng dẫn nào tôi có thể mượn không?"},
    {speaker:"Receptionist",en:"Yes, just ask at the reception.",vi:"Có, chỉ cần hỏi ở quầy lễ tân."}
  ]}},

  // ===== BÀI 17 (lesson 16) =====
  {lesson:16,content:{title:"What do you do?",desc:"Hai đồng nghiệp nói về nghề nghiệp của nhau.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"What's your career? Do you work as a scientist?",vi:"Nghề nghiệp của bạn là gì? Bạn làm nhà khoa học phải không?"},
    {speaker:"Emma",en:"No, I work as a secretary for a big company.",vi:"Không, tôi làm thư ký cho một công ty lớn."},
    {speaker:"Tom",en:"Is your boss responsible for managing the office?",vi:"Sếp của bạn có chịu trách nhiệm quản lý văn phòng không?"},
    {speaker:"Emma",en:"Yes, and my assistant is responsible for the schedule.",vi:"Đúng vậy, và trợ lý của tôi chịu trách nhiệm về lịch trình."},
    {speaker:"Tom",en:"A chef is a person who cooks for a living, isn't it?",vi:"Đầu bếp là người nấu ăn để kiếm sống, đúng không?"},
    {speaker:"Emma",en:"Exactly. My colleague works as a chef now.",vi:"Chính xác. Đồng nghiệp của tôi giờ làm đầu bếp."}
  ]}},
  {lesson:16,content:{title:"A job for everyone",desc:"Hai bạn nói về các nghề nghiệp khác nhau trong gia đình.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"My cousin works as a receptionist at a hotel.",vi:"Em họ tôi làm lễ tân tại một khách sạn."},
    {speaker:"Mark",en:"A receptionist is a person who welcomes guests, right?",vi:"Lễ tân là người chào đón khách, đúng không?"},
    {speaker:"Sarah",en:"Yes, and she's responsible for taking bookings too.",vi:"Đúng vậy, và cô ấy cũng chịu trách nhiệm nhận đặt phòng nữa."},
    {speaker:"Mark",en:"My colleague is a cleaner who works at night.",vi:"Đồng nghiệp của tôi là người dọn dẹp làm việc vào ban đêm."},
    {speaker:"Sarah",en:"That sounds tiring. What's your career plan?",vi:"Nghe có vẻ mệt nhỉ. Kế hoạch nghề nghiệp của bạn là gì?"},
    {speaker:"Mark",en:"I hope to work as an assistant manager soon.",vi:"Tôi hy vọng sẽ làm trợ lý quản lý sớm."}
  ]}},

  // ===== BÀI 18 (lesson 17) =====
  {lesson:17,content:{title:"Job interview",desc:"Ứng viên tham gia buổi phỏng vấn xin việc.",characters:["Interviewer","Applicant"],lines:[
    {speaker:"Interviewer",en:"She asked me where I worked before.",vi:"Cô ấy hỏi tôi đã làm việc ở đâu trước đây."},
    {speaker:"Applicant",en:"I have a lot of experience and a good qualification.",vi:"Tôi có nhiều kinh nghiệm và một bằng cấp tốt."},
    {speaker:"Interviewer",en:"Do you have to apply with an application form?",vi:"Bạn có cần phải nộp đơn ứng tuyển không?"},
    {speaker:"Applicant",en:"Yes, I filled in the application yesterday.",vi:"Có, tôi đã điền đơn ứng tuyển hôm qua."},
    {speaker:"Interviewer",en:"How much salary do you expect to earn?",vi:"Bạn mong muốn kiếm được mức lương bao nhiêu?"},
    {speaker:"Applicant",en:"I don't have to earn a lot, just a fair salary.",vi:"Tôi không cần kiếm nhiều, chỉ cần một mức lương công bằng."}
  ]}},
  {lesson:17,content:{title:"At the office meeting",desc:"Hai đồng nghiệp nói về một cuộc họp công ty.",characters:["Mark","Sarah"],lines:[
    {speaker:"Mark",en:"He asked if the meeting was at the office today.",vi:"Anh ấy hỏi liệu cuộc họp có ở văn phòng hôm nay không."},
    {speaker:"Sarah",en:"Yes, and we have to discuss our salary too.",vi:"Đúng vậy, và chúng ta cũng phải thảo luận về lương nữa."},
    {speaker:"Mark",en:"Don't forget to bring your qualification certificate.",vi:"Đừng quên mang giấy chứng nhận trình độ của bạn."},
    {speaker:"Sarah",en:"I don't have to bring it for this meeting.",vi:"Tôi không cần mang nó cho cuộc họp này."},
    {speaker:"Mark",en:"What career experience will they ask about?",vi:"Họ sẽ hỏi về kinh nghiệm nghề nghiệp nào?"},
    {speaker:"Sarah",en:"Probably about our last company and our application.",vi:"Có thể là về công ty trước của chúng ta và đơn ứng tuyển."}
  ]}},
  // ===== BÀI 19 (lesson 18) =====
  {lesson:18,content:{title:"Social media habits",desc:"Hai bạn nói về thói quen dùng mạng xã hội.",characters:["Emma","Lily"],lines:[
    {speaker:"Emma",en:"I've been using this app for two years.",vi:"Tôi đã dùng ứng dụng này trong hai năm rồi."},
    {speaker:"Lily",en:"Do you post a selfie every day?",vi:"Bạn có đăng ảnh tự chụp mỗi ngày không?"},
    {speaker:"Emma",en:"Not every day, but I share my blog posts often.",vi:"Không hẳn mỗi ngày, nhưng tôi thường chia sẻ bài blog của mình."},
    {speaker:"Lily",en:"Can I follow you on social media?",vi:"Tôi có thể theo dõi bạn trên mạng xã hội không?"},
    {speaker:"Emma",en:"Sure, just type my name and click the link.",vi:"Được, chỉ cần gõ tên tôi và bấm vào liên kết."},
    {speaker:"Lily",en:"I forgot my password again!",vi:"Tôi lại quên mật khẩu nữa rồi!"}
  ]}},
  {lesson:18,content:{title:"In the chatroom",desc:"Hai người bạn trò chuyện trong một phòng chat trực tuyến.",characters:["Tom","Mark"],lines:[
    {speaker:"Tom",en:"I've been chatting in this chatroom all morning.",vi:"Tôi đã nhắn chuyện trong phòng chat này suốt cả buổi sáng."},
    {speaker:"Mark",en:"May I download that file you shared?",vi:"Tôi có thể tải file mà bạn đã chia sẻ không?"},
    {speaker:"Tom",en:"Yes, but you'll need to upload your password first.",vi:"Được, nhưng bạn cần nhập mật khẩu trước."},
    {speaker:"Mark",en:"Could I use your keyboard for a minute?",vi:"Tôi có thể dùng bàn phím của bạn một chút không?"},
    {speaker:"Tom",en:"Of course. Can I follow your blog too?",vi:"Tất nhiên rồi. Tôi cũng có thể theo dõi blog của bạn không?"},
    {speaker:"Mark",en:"Sure, I'll send you the link.",vi:"Được, tôi sẽ gửi cho bạn liên kết."}
  ]}},

  // ===== BÀI 20 (lesson 19) =====
  {lesson:19,content:{title:"How does it work?",desc:"Hai người bạn nói về thiết bị công nghệ mới.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"How does this new printer work?",vi:"Cái máy in mới này hoạt động như thế nào?"},
    {speaker:"Mark",en:"Photos are stored on the cloud automatically.",vi:"Hình ảnh được lưu trữ trên đám mây một cách tự động."},
    {speaker:"Sarah",en:"Can you turn up the volume on the CD player?",vi:"Bạn có thể tăng âm lượng cho đầu CD không?"},
    {speaker:"Mark",en:"Sure. Is the microphone connected to the PC?",vi:"Được. Cái micro đã được kết nối với máy vi tính chưa?"},
    {speaker:"Sarah",en:"Yes, and the screen is digital now.",vi:"Có, và màn hình giờ là kỹ thuật số rồi."},
    {speaker:"Mark",en:"Please turn off the DVD player when you finish.",vi:"Vui lòng tắt đầu DVD khi bạn xong nhé."}
  ]}},
  {lesson:19,content:{title:"A new battery",desc:"Khách hỏi mua linh kiện thay thế cho thiết bị.",characters:["Customer","Shop Assistant"],lines:[
    {speaker:"Customer",en:"My printer's cable is broken. Can you fix it?",vi:"Dây cáp máy in của tôi bị hỏng. Bạn có thể sửa nó không?"},
    {speaker:"Shop Assistant",en:"Yes, and the battery needs replacing too.",vi:"Được, và viên pin cũng cần được thay nữa."},
    {speaker:"Customer",en:"How does this new screen work?",vi:"Màn hình mới này hoạt động như thế nào?"},
    {speaker:"Shop Assistant",en:"Just turn it on, it's very simple.",vi:"Chỉ cần mở nó lên, rất đơn giản."},
    {speaker:"Customer",en:"Is the memory in this PC very large?",vi:"Bộ nhớ trong máy vi tính này có lớn không?"},
    {speaker:"Shop Assistant",en:"Yes, all your files are stored safely.",vi:"Có, tất cả file của bạn được lưu trữ an toàn."}
  ]}},

  // ===== BÀI 21 (lesson 20) =====
  {lesson:20,content:{title:"At the art gallery",desc:"Hai bạn nói về một buổi triển lãm tranh.",characters:["Emma","Tom"],lines:[
    {speaker:"Emma",en:"Have you ever been to this gallery before?",vi:"Bạn đã từng đến phòng trưng bày này chưa?"},
    {speaker:"Tom",en:"Yes, I enjoy visiting exhibitions like this.",vi:"Có, tôi thích đi xem các triển lãm như vậy."},
    {speaker:"Emma",en:"What kind of music do you like at the opera?",vi:"Bạn thích loại nhạc nào ở nhà hát opera?"},
    {speaker:"Tom",en:"I prefer classical music to jazz.",vi:"Tôi thích nhạc cổ điển hơn nhạc jazz."},
    {speaker:"Emma",en:"She suggested listening to that new album.",vi:"Cô ấy gợi ý nên nghe album mới đó."},
    {speaker:"Tom",en:"I'd like to see that musical too.",vi:"Tôi cũng muốn xem buổi nhạc kịch đó."}
  ]}},
  {lesson:20,content:{title:"Choosing a band",desc:"Hai người bạn nói về thể loại âm nhạc yêu thích.",characters:["Lily","Mark"],lines:[
    {speaker:"Lily",en:"What kind of band do you like best?",vi:"Bạn thích ban nhạc kiểu nào nhất?"},
    {speaker:"Mark",en:"I like hip hop and rap.",vi:"Tôi thích nhạc hip hop và rap."},
    {speaker:"Lily",en:"Have you ever been to a jazz concert?",vi:"Bạn đã từng đi xem buổi hòa nhạc jazz chưa?"},
    {speaker:"Mark",en:"No, but I'd love to finish listening to this album first.",vi:"Chưa, nhưng tôi muốn nghe hết album này trước."},
    {speaker:"Lily",en:"I suggest visiting the gallery's new exhibition.",vi:"Tôi gợi ý nên đến xem triển lãm mới của phòng trưng bày."},
    {speaker:"Mark",en:"Good idea, let's go this weekend.",vi:"Ý kiến hay, cùng đi vào cuối tuần này nhé."}
  ]}},

  // ===== BÀI 22 (lesson 21) =====
  {lesson:21,content:{title:"What's on TV?",desc:"Hai bạn nói về một bộ phim đang chiếu.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"What's on TV tonight?",vi:"Tối nay có gì trên TV?"},
    {speaker:"Mark",en:"A new comedy programme is on this channel.",vi:"Một chương trình hài mới đang phát trên kênh này."},
    {speaker:"Sarah",en:"I think the main character is very funny.",vi:"Tôi nghĩ nhân vật chính rất buồn cười."},
    {speaker:"Mark",en:"I recommend watching the action film instead.",vi:"Tôi gợi ý nên xem bộ phim hành động hơn."},
    {speaker:"Sarah",en:"Is that horror film on at the cinema too?",vi:"Bộ phim kinh dị đó cũng đang chiếu ở rạp phải không?"},
    {speaker:"Mark",en:"Yes, but I read an awful review about it.",vi:"Có, nhưng tôi đã đọc một bài đánh giá rất tệ về nó."}
  ]}},
  {lesson:21,content:{title:"A film review",desc:"Hai người bạn thảo luận về một bài báo đánh giá phim.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"I think this article gave a fair review.",vi:"Tôi nghĩ bài báo này đưa ra một đánh giá công bằng."},
    {speaker:"Emma",en:"Which event is the performance on?",vi:"Buổi trình diễn nằm trong sự kiện nào?"},
    {speaker:"Tom",en:"The comedy show is on this Saturday.",vi:"Buổi diễn hài kịch sẽ vào thứ Bảy này."},
    {speaker:"Emma",en:"I suggest reading the review before we go.",vi:"Tôi gợi ý nên đọc bài đánh giá trước khi chúng ta đi."},
    {speaker:"Tom",en:"This character is the best part of the programme.",vi:"Nhân vật này là phần hay nhất của chương trình."},
    {speaker:"Emma",en:"I think we should change the channel now.",vi:"Tôi nghĩ chúng ta nên đổi kênh ngay bây giờ."}
  ]}},

  // ===== BÀI 23 (lesson 22) =====
  {lesson:22,content:{title:"Protecting the rainforest",desc:"Hai bạn nói về bảo vệ môi trường.",characters:["Lily","Tom"],lines:[
    {speaker:"Lily",en:"We should protect the rainforest and its wildlife.",vi:"Chúng ta nên bảo vệ rừng nhiệt đới và động vật hoang dã của nó."},
    {speaker:"Tom",en:"If we don't recycle, pollution will increase.",vi:"Nếu chúng ta không tái chế, ô nhiễm sẽ gia tăng."},
    {speaker:"Lily",en:"This bag is made from recycled plastic.",vi:"Cái túi này được làm từ nhựa tái chế."},
    {speaker:"Tom",en:"The climate will change if we don't act now.",vi:"Khí hậu sẽ thay đổi nếu chúng ta không hành động ngay."},
    {speaker:"Lily",en:"People should clean up the coast more often.",vi:"Mọi người nên dọn dẹp bờ biển thường xuyên hơn."},
    {speaker:"Tom",en:"That's such a good idea that everyone should join.",vi:"Đó là một ý tưởng tốt đến mức mọi người nên tham gia."}
  ]}},
  {lesson:22,content:{title:"Talking about nature",desc:"Hai bạn nói về thiên nhiên và khí hậu.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"Is this table made of wood or made from plastic?",vi:"Cái bàn này được làm từ gỗ hay từ nhựa?"},
    {speaker:"Mark",en:"It's made of wood from a natural forest.",vi:"Nó được làm từ gỗ trong một khu rừng tự nhiên."},
    {speaker:"Sarah",en:"If we recycle more, the environment will be safer.",vi:"Nếu chúng ta tái chế nhiều hơn, môi trường sẽ an toàn hơn."},
    {speaker:"Mark",en:"We should also reduce pollution along the harbour.",vi:"Chúng ta cũng nên giảm ô nhiễm dọc bến cảng."},
    {speaker:"Sarah",en:"The wildlife near the coast needs our help.",vi:"Động vật hoang dã gần bờ biển cần sự giúp đỡ của chúng ta."},
    {speaker:"Mark",en:"I agree. The climate is changing fast.",vi:"Tôi đồng ý. Khí hậu đang thay đổi nhanh chóng."}
  ]}},

  // ===== BÀI 24 (lesson 23) =====
  {lesson:23,content:{title:"An old castle",desc:"Hai bạn tham quan một tòa lâu đài cổ.",characters:["Tourist","Guide"],lines:[
    {speaker:"Tourist",en:"This castle used to be a famous landmark, didn't it?",vi:"Tòa lâu đài này trước đây là một địa danh nổi tiếng, đúng không?"},
    {speaker:"Guide",en:"Yes, and the cathedral was built in the 12th century.",vi:"Đúng vậy, và nhà thờ lớn được xây vào thế kỷ 12."},
    {speaker:"Tourist",en:"How far is it from the harbour to the castle?",vi:"Khoảng cách từ bến cảng đến lâu đài là bao xa?"},
    {speaker:"Guide",en:"About five kilometres, near the old factory.",vi:"Khoảng năm ki-lô-mét, gần nhà máy cũ."},
    {speaker:"Tourist",en:"Was this stadium built recently?",vi:"Sân vận động này có được xây gần đây không?"},
    {speaker:"Guide",en:"No, it used to be a campsite a long time ago.",vi:"Không, nó trước đây từng là một khu cắm trại từ lâu rồi."}
  ]}},
  {lesson:23,content:{title:"Visiting the farm",desc:"Hai bạn nói về chuyến đi tham quan một trang trại.",characters:["Emma","Lily"],lines:[
    {speaker:"Emma",en:"This farm used to be much smaller.",vi:"Trang trại này trước đây nhỏ hơn nhiều."},
    {speaker:"Lily",en:"How far is it from the coast to the farm?",vi:"Khoảng cách từ bờ biển đến trang trại là bao xa?"},
    {speaker:"Emma",en:"Not far, the port is just behind that gallery.",vi:"Không xa, bến cảng nằm ngay sau phòng trưng bày đó."},
    {speaker:"Lily",en:"The stadium was built five years ago, wasn't it?",vi:"Sân vận động được xây năm năm trước, đúng không?"},
    {speaker:"Emma",en:"Yes, near the old factory by the harbour.",vi:"Đúng vậy, gần nhà máy cũ bên bến cảng."},
    {speaker:"Lily",en:"Let's visit the campsite there next time.",vi:"Lần sau cùng đến khu cắm trại đó nhé."}
  ]}},
  // ===== BÀI 25 (lesson 24) =====
  {lesson:24,content:{title:"A busy week",desc:"Hai bạn nói về một tuần bận rộn dù gặp khó khăn.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"Although I was tired, I finished the project.",vi:"Mặc dù tôi mệt, tôi đã hoàn thành dự án."},
    {speaker:"Mark",en:"You must be certainly proud of yourself.",vi:"Bạn chắc chắn nên tự hào về bản thân."},
    {speaker:"Sarah",en:"Despite the delay, we delivered it on time.",vi:"Mặc dù bị trễ, chúng ta vẫn giao nó đúng giờ."},
    {speaker:"Mark",en:"I'm nearly finished with my report too.",vi:"Tôi cũng gần hoàn thành báo cáo của mình rồi."},
    {speaker:"Sarah",en:"You should probably take a break now.",vi:"Bạn nên nghỉ ngơi một chút ngay bây giờ."},
    {speaker:"Mark",en:"Yes, I'll finish it immediately after lunch.",vi:"Vâng, tôi sẽ hoàn thành nó ngay sau bữa trưa."}
  ]}},
  {lesson:24,content:{title:"Despite the rain",desc:"Hai bạn quyết định đi chơi dù thời tiết không tốt.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"Despite the rain, we should still go out.",vi:"Mặc dù trời mưa, chúng ta vẫn nên đi ra ngoài."},
    {speaker:"Emma",en:"However, I think it might get worse.",vi:"Tuy nhiên, tôi nghĩ nó có thể trở nên tệ hơn."},
    {speaker:"Tom",en:"Although it's still raining, we can wear coats.",vi:"Mặc dù trời vẫn còn mưa, chúng ta có thể mặc áo khoác."},
    {speaker:"Emma",en:"We can probably wait until it nearly stops.",vi:"Chúng ta có thể chờ đến khi nó gần tạnh."},
    {speaker:"Tom",en:"We might also stay home if it doesn't stop.",vi:"Chúng ta cũng có thể ở nhà nếu nó không tạnh."},
    {speaker:"Emma",en:"Yes, that would certainly be safer.",vi:"Vâng, điều đó chắc chắn sẽ an toàn hơn."}
  ]}},

  // ===== BÀI 26 (lesson 25) =====
  {lesson:25,content:{title:"What did she say?",desc:"Hai bạn tường thuật lại lời người khác đã nói.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"She said she would explain the problem later.",vi:"Cô ấy nói rằng cô ấy sẽ giải thích vấn đề sau."},
    {speaker:"Mark",en:"He asked if I could discuss it with him.",vi:"Anh ấy hỏi liệu tôi có thể thảo luận với anh ấy không."},
    {speaker:"Sarah",en:"The teacher told us to remind everyone about the test.",vi:"Giáo viên bảo chúng tôi nhắc mọi người về bài kiểm tra."},
    {speaker:"Mark",en:"She promised she would describe it clearly.",vi:"Cô ấy hứa rằng cô ấy sẽ miêu tả nó rõ ràng."},
    {speaker:"Sarah",en:"He warned me not to be late again.",vi:"Anh ấy cảnh báo tôi đừng trễ nữa."},
    {speaker:"Mark",en:"They announced that the meeting was cancelled.",vi:"Họ thông báo rằng cuộc họp đã bị hủy."}
  ]}},
  {lesson:25,content:{title:"He told me to wait",desc:"Hai bạn tường thuật lại một cuộc gặp ở văn phòng.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"He told me to wait outside the office.",vi:"Anh ấy bảo tôi chờ bên ngoài văn phòng."},
    {speaker:"Emma",en:"She asked me not to be late for the meeting.",vi:"Cô ấy nhờ tôi đừng trễ cuộc họp."},
    {speaker:"Tom",en:"The manager suggested discussing the plan first.",vi:"Người quản lý gợi ý nên thảo luận kế hoạch trước."},
    {speaker:"Emma",en:"He admitted that he had made a mistake.",vi:"Anh ấy thừa nhận rằng anh ấy đã mắc một lỗi."},
    {speaker:"Tom",en:"She said she was sorry about the delay.",vi:"Cô ấy nói rằng cô ấy xin lỗi về sự chậm trễ."},
    {speaker:"Emma",en:"They reminded us to explain the results clearly.",vi:"Họ nhắc chúng tôi giải thích kết quả một cách rõ ràng."}
  ]}},

  // ===== BÀI 27 (lesson 26) =====
  {lesson:26,content:{title:"If I had more time",desc:"Hai bạn nói về những điều giả định trong cuộc sống.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"If I had more money, I would travel the world.",vi:"Nếu tôi có nhiều tiền hơn, tôi sẽ đi du lịch khắp thế giới."},
    {speaker:"Mark",en:"I imagine I would succeed if I had that chance.",vi:"Tôi tưởng tượng tôi sẽ thành công nếu tôi có cơ hội đó."},
    {speaker:"Sarah",en:"Unless we try harder, we won't avoid failing.",vi:"Trừ khi chúng ta cố gắng hơn, chúng ta sẽ không tránh được thất bại."},
    {speaker:"Mark",en:"Suppose you had the opportunity, what would you do?",vi:"Giả sử bạn có cơ hội đó, bạn sẽ làm gì?"},
    {speaker:"Sarah",en:"I would manage my own business in case it failed once.",vi:"Tôi sẽ quản lý doanh nghiệp của riêng mình trong trường hợp nó thất bại một lần."},
    {speaker:"Mark",en:"That's a great plan if it really happens.",vi:"Đó là một kế hoạch tuyệt vời nếu nó thực sự xảy ra."}
  ]}},
  {lesson:26,content:{title:"Unless it rains",desc:"Hai bạn lập kế hoạch dã ngoại với điều kiện thời tiết.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"I'll go to the park unless it rains.",vi:"Tôi sẽ đi công viên trừ khi trời mưa."},
    {speaker:"Emma",en:"If I were free, I would join you.",vi:"Nếu tôi rảnh, tôi sẽ tham gia cùng bạn."},
    {speaker:"Tom",en:"In case it rains, we should bring an umbrella.",vi:"Trong trường hợp trời mưa, chúng ta nên mang ô."},
    {speaker:"Emma",en:"Imagine if we had a chance to avoid this weather!",vi:"Tưởng tượng nếu chúng ta có cơ hội tránh được thời tiết này!"},
    {speaker:"Tom",en:"Suppose it succeeds, we'll have a great day.",vi:"Giả sử mọi việc thành công, chúng ta sẽ có một ngày tuyệt vời."},
    {speaker:"Emma",en:"Unless something fails, I'm sure it will.",vi:"Trừ khi có gì đó thất bại, tôi tin chắc nó sẽ thành công."}
  ]}},

  // ===== BÀI 28 (lesson 27) =====
  {lesson:27,content:{title:"Who invented this?",desc:"Hai bạn nói về các sáng chế và sự kiện lịch sử.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"This machine was invented by a famous scientist.",vi:"Cái máy này được phát minh bởi một nhà khoa học nổi tiếng."},
    {speaker:"Mark",en:"These cars are manufactured in this factory.",vi:"Những chiếc xe này được sản xuất tại nhà máy này."},
    {speaker:"Sarah",en:"The festival is organised by the city every year.",vi:"Lễ hội này được tổ chức bởi thành phố mỗi năm."},
    {speaker:"Mark",en:"This song was performed by a famous band.",vi:"Bài hát này được trình diễn bởi một ban nhạc nổi tiếng."},
    {speaker:"Sarah",en:"I'm having my photo taken for the magazine.",vi:"Tôi đang nhờ chụp ảnh cho tạp chí."},
    {speaker:"Mark",en:"The book was published by a small company.",vi:"Cuốn sách này được xuất bản bởi một công ty nhỏ."}
  ]}},
  {lesson:27,content:{title:"A celebration",desc:"Hai bạn nói về một sự kiện kỷ niệm thành phố.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"This event is celebrated by the whole town.",vi:"Sự kiện này được kỷ niệm bởi cả thị trấn."},
    {speaker:"Emma",en:"Who discovered this old castle?",vi:"Ai đã phát hiện ra tòa lâu đài cổ này?"},
    {speaker:"Tom",en:"It was discovered by a group of explorers.",vi:"Nó được phát hiện bởi một nhóm các nhà thám hiểm."},
    {speaker:"Emma",en:"These products are produced by local farmers.",vi:"Những sản phẩm này được sản xuất bởi nông dân địa phương."},
    {speaker:"Tom",en:"I'm having my car repaired before the trip.",vi:"Tôi đang nhờ sửa xe trước chuyến đi."},
    {speaker:"Emma",en:"The parcel was delivered yesterday by the post office.",vi:"Bưu phẩm đã được giao hôm qua bởi bưu điện."}
  ]}},

  // ===== BÀI 29 (lesson 28) =====
  {lesson:28,content:{title:"Looking forward to the holiday",desc:"Hai bạn nói về kế hoạch nghỉ lễ và thói quen.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"I look forward to seeing my family this holiday.",vi:"Tôi mong được gặp gia đình mình trong kỳ nghỉ này."},
    {speaker:"Mark",en:"I gave up watching TV every night.",vi:"Tôi đã bỏ thói quen xem TV mỗi tối."},
    {speaker:"Sarah",en:"I took up painting during my free time.",vi:"Tôi bắt đầu học vẽ trong thời gian rảnh."},
    {speaker:"Mark",en:"Can you look after my dog while I'm away?",vi:"Bạn có thể chăm sóc con chó của tôi khi tôi đi xa không?"},
    {speaker:"Sarah",en:"Of course, I'll find out the feeding times.",vi:"Tất nhiên rồi, tôi sẽ tìm hiểu giờ cho ăn."},
    {speaker:"Mark",en:"We'll set off early and get back by Sunday.",vi:"Chúng ta sẽ xuất phát sớm và trở về vào Chủ nhật."}
  ]}},
  {lesson:28,content:{title:"My car broke down",desc:"Hai bạn nói về một chuyến đi gặp trục trặc.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"My car broke down on the way home.",vi:"Xe của tôi bị hỏng trên đường về nhà."},
    {speaker:"Emma",en:"Did you find out what the problem was?",vi:"Bạn có tìm ra vấn đề là gì không?"},
    {speaker:"Tom",en:"Yes, and I picked up a friend to help me.",vi:"Có, và tôi đã nhờ một người bạn đến giúp tôi."},
    {speaker:"Emma",en:"I took up running last month to stay healthy.",vi:"Tháng trước tôi bắt đầu chạy bộ để giữ sức khỏe."},
    {speaker:"Tom",en:"I gave up coffee too, it wasn't easy.",vi:"Tôi cũng đã bỏ cà phê, điều đó không dễ dàng."},
    {speaker:"Emma",en:"I look forward to hearing your good news.",vi:"Tôi mong được nghe tin tốt từ bạn."}
  ]}},
  // ===== BÀI 30 (lesson 29) =====
  {lesson:29,content:{title:"Making a decision",desc:"Hai bạn nói về việc quyết định một kế hoạch mới.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"I decided to start a new hobby this year.",vi:"Tôi đã quyết định bắt đầu một sở thích mới trong năm nay."},
    {speaker:"Mark",en:"I enjoy painting in my free time.",vi:"Tôi thích vẽ tranh trong thời gian rảnh."},
    {speaker:"Sarah",en:"She refused to give up even when it was hard.",vi:"Cô ấy đã từ chối bỏ cuộc dù điều đó khó khăn."},
    {speaker:"Mark",en:"I managed to afford a new bike last month.",vi:"Tháng trước tôi đã xoay sở để mua được một chiếc xe đạp mới."},
    {speaker:"Sarah",en:"Remember to bring your bag tomorrow.",vi:"Nhớ mang theo cặp của bạn vào ngày mai."},
    {speaker:"Mark",en:"I remember buying this bag last year.",vi:"Tôi nhớ là đã mua cái cặp này năm ngoái."}
  ]}},
  {lesson:29,content:{title:"What do you hope to do?",desc:"Hai bạn chia sẻ về hy vọng và kế hoạch tương lai.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"I hope to travel abroad next year.",vi:"Tôi hy vọng sẽ đi du lịch nước ngoài vào năm sau."},
    {speaker:"Emma",en:"She offered to help me with my homework.",vi:"Cô ấy đã đề nghị giúp tôi làm bài tập về nhà."},
    {speaker:"Tom",en:"I expect to finish my project by Friday.",vi:"Tôi mong sẽ hoàn thành dự án của mình trước thứ Sáu."},
    {speaker:"Emma",en:"We should avoid making the same mistake again.",vi:"Chúng ta nên tránh mắc lại sai lầm tương tự."},
    {speaker:"Tom",en:"He agreed to join our team this time.",vi:"Anh ấy đã đồng ý tham gia đội của chúng ta lần này."},
    {speaker:"Emma",en:"I'm glad we both decided to keep trying.",vi:"Tôi mừng là cả hai chúng ta đã quyết định tiếp tục cố gắng."}
  ]}},

  // ===== BÀI 31 (lesson 30) =====
  {lesson:30,content:{title:"It's a nice day, isn't it?",desc:"Hai bạn trò chuyện nhẹ nhàng dùng câu hỏi đuôi và từ nối.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"It's a nice day, isn't it?",vi:"Hôm nay là một ngày đẹp trời, đúng không?"},
    {speaker:"Mark",en:"Yes, it is. However, it might rain later.",vi:"Vâng, đúng vậy. Tuy nhiên, có thể sẽ mưa sau đó."},
    {speaker:"Sarah",en:"You finished your homework, didn't you?",vi:"Bạn đã làm xong bài tập về nhà rồi, đúng không?"},
    {speaker:"Mark",en:"I was busy, so I finished it quickly.",vi:"Tôi đã bận, vì vậy tôi đã hoàn thành nó nhanh chóng."},
    {speaker:"Sarah",en:"Although it was hard, you did it well.",vi:"Mặc dù nó khó, bạn đã làm rất tốt."},
    {speaker:"Mark",en:"Thanks. Besides, I had your help too.",vi:"Cảm ơn. Hơn nữa, tôi cũng có sự giúp đỡ của bạn."}
  ]}},
  {lesson:30,content:{title:"You'd like some tea, wouldn't you?",desc:"Hai bạn nói chuyện thân mật với câu hỏi đuôi và từ nối văn viết.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"You'd like some tea, wouldn't you?",vi:"Bạn muốn uống chút trà, đúng không?"},
    {speaker:"Emma",en:"Yes, please. Actually, I'm quite tired today.",vi:"Vâng, cảm ơn bạn. Thực ra, hôm nay tôi khá mệt."},
    {speaker:"Tom",en:"You worked hard, didn't you?",vi:"Bạn đã làm việc chăm chỉ, đúng không?"},
    {speaker:"Emma",en:"I did. Therefore, I need to rest tonight.",vi:"Đúng vậy. Vì vậy, tối nay tôi cần nghỉ ngơi."},
    {speaker:"Tom",en:"It was raining, so we stayed inside.",vi:"Trời đang mưa, vì vậy chúng tôi đã ở trong nhà."},
    {speaker:"Emma",en:"Otherwise, we would have gone out for a walk.",vi:"Nếu không, chúng tôi đã đi dạo ra ngoài rồi."}
  ]}},

  // ===== BÀI 32 (lesson 31) =====
  {lesson:31,content:{title:"Reading the signs",desc:"Hai bạn đọc các biển thông báo trong một khu công cộng.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"Look at that notice. \"No parking.\"",vi:"Nhìn cái thông báo đó. \"Không đỗ xe.\""},
    {speaker:"Mark",en:"And this sign says, \"Please switch off your phone.\"",vi:"Và biển này nói, \"Vui lòng tắt điện thoại của bạn.\""},
    {speaker:"Sarah",en:"Photos are not allowed in this area.",vi:"Không được phép chụp ảnh ở khu vực này."},
    {speaker:"Mark",en:"Visitors must follow the directions on this advertisement.",vi:"Khách phải tuân theo hướng dẫn trên bảng quảng cáo này."},
    {speaker:"Sarah",en:"There's a warning that dogs must be kept on leads.",vi:"Có một cảnh báo rằng chó phải được giữ bằng dây xích."},
    {speaker:"Mark",en:"Good advice. Let's follow the instruction carefully.",vi:"Lời khuyên hay. Hãy tuân theo hướng dẫn một cách cẩn thận."}
  ]}},
  {lesson:31,content:{title:"Information at the museum",desc:"Hai bạn đọc thông tin và quy định tại viện bảo tàng.",characters:["Tourist","Local"],lines:[
    {speaker:"Tourist",en:"What does this announcement say?",vi:"Thông báo này nói gì vậy?"},
    {speaker:"Local",en:"It says visitors may not eat inside the museum.",vi:"Nó nói rằng khách tham quan không được ăn bên trong viện bảo tàng."},
    {speaker:"Tourist",en:"Is there an offer for students today?",vi:"Hôm nay có ưu đãi cho sinh viên không?"},
    {speaker:"Local",en:"Yes, there's information about it at the entrance.",vi:"Có, có thông tin về điều đó ở lối vào."},
    {speaker:"Tourist",en:"Do not enter without a ticket, the sign says.",vi:"Không được vào nếu không có vé, biển báo viết vậy."},
    {speaker:"Local",en:"That's good advice. Let's buy our tickets now.",vi:"Đó là lời khuyên hay. Cùng mua vé ngay bây giờ nhé."}
  ]}},

  // ===== BÀI 33 (lesson 32) =====
  {lesson:32,content:{title:"Writing an email",desc:"Hai bạn nói về việc viết một email mời tiệc.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"I'm writing an email starting with \"Dear Emma\".",vi:"Tôi đang viết một email bắt đầu bằng \"Emma thân mến\"."},
    {speaker:"Mark",en:"Would you like to invite her to the party too?",vi:"Bạn cũng muốn mời cô ấy đến buổi tiệc chứ?"},
    {speaker:"Sarah",en:"Yes, I'll write the subject line now.",vi:"Vâng, tôi sẽ viết dòng chủ đề ngay bây giờ."},
    {speaker:"Mark",en:"Why don't we attach a photo too?",vi:"Sao chúng ta không gắn kèm một bức ảnh nữa?"},
    {speaker:"Sarah",en:"Good idea. I'll forward it to the other guests.",vi:"Ý kiến hay. Tôi sẽ chuyển tiếp nó cho những khách khác."},
    {speaker:"Mark",en:"Don't forget to add your signature at the end.",vi:"Đừng quên thêm chữ ký của bạn ở cuối nhé."}
  ]}},
  {lesson:32,content:{title:"Replying politely",desc:"Hai bạn nói về cách viết một email phản hồi.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"I'm afraid I can't reply to this email today.",vi:"Tôi e là hôm nay tôi không thể phản hồi email này."},
    {speaker:"Emma",en:"How about sending a short reply tomorrow?",vi:"Gửi một câu trả lời ngắn vào ngày mai thì sao?"},
    {speaker:"Tom",en:"Thanks for your suggestion. Who is the sender of this one?",vi:"Cảm ơn gợi ý của bạn. Ai là người gửi cái email này?"},
    {speaker:"Emma",en:"It's from our manager. The recipient list is long.",vi:"Nó từ quản lý của chúng ta. Danh sách người nhận rất dài."},
    {speaker:"Tom",en:"Why don't we end the email with \"Best regards\"?",vi:"Sao chúng ta không kết thúc email bằng \"Trân trọng\"?"},
    {speaker:"Emma",en:"Good idea, and add your signature too.",vi:"Ý kiến hay, và thêm chữ ký của bạn nữa."}
  ]}},

  // ===== BÀI 34 (lesson 33) =====
  {lesson:33,content:{title:"On the phone",desc:"Hai bạn nói chuyện qua điện thoại để đặt bàn nhà hàng.",characters:["Caller","Staff"],lines:[
    {speaker:"Caller",en:"Hello, this is Tom speaking. I'd like to reserve a table.",vi:"Xin chào, đây là Tom đang nói. Tôi muốn đặt một cái bàn."},
    {speaker:"Staff",en:"Sure, can I take your number to confirm?",vi:"Được, tôi có thể lấy số của bạn để xác nhận không?"},
    {speaker:"Caller",en:"I'm afraid I need to cancel my last order too.",vi:"Tôi e là tôi cũng cần hủy đơn đặt hàng trước của mình."},
    {speaker:"Staff",en:"No problem, I'm sorry about the delay last time.",vi:"Không vấn đề, tôi xin lỗi vì sự chậm trễ lần trước."},
    {speaker:"Caller",en:"That's a nice restaurant, isn't it?",vi:"Đó là một nhà hàng tốt, đúng không?"},
    {speaker:"Staff",en:"Yes, it is. I'll call back to confirm everything.",vi:"Vâng, đúng vậy. Tôi sẽ gọi lại để xác nhận mọi thứ."}
  ]}},
  {lesson:33,content:{title:"A complaint call",desc:"Khách hàng gọi điện phàn nàn về một đơn hàng.",characters:["Customer","Staff"],lines:[
    {speaker:"Customer",en:"I'm sorry, but I want to complain about my order.",vi:"Tôi xin lỗi, nhưng tôi muốn phàn nàn về đơn hàng của tôi."},
    {speaker:"Staff",en:"I apologise for that. Can I take a message for the manager?",vi:"Tôi xin lỗi về điều đó. Tôi có thể nhận lời nhắn cho quản lý không?"},
    {speaker:"Customer",en:"Yes, please. The delivery was delayed, wasn't it?",vi:"Vâng, làm ơn. Việc giao hàng đã bị trễ, đúng không?"},
    {speaker:"Staff",en:"Yes, and we'd like to confirm a new delivery time.",vi:"Vâng, và chúng tôi muốn xác nhận thời gian giao hàng mới."},
    {speaker:"Customer",en:"Could you contact me again this afternoon?",vi:"Bạn có thể liên hệ lại với tôi vào chiều nay được không?"},
    {speaker:"Staff",en:"Of course. I'll call back at 3 o'clock.",vi:"Tất nhiên rồi. Tôi sẽ gọi lại vào lúc 3 giờ."}
  ]}},

  // ===== BÀI 35 (lesson 34) =====
  {lesson:34,content:{title:"Talking about experience",desc:"Hai bạn ôn lại các kỹ năng và kinh nghiệm đã học.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"I have already finished my English course.",vi:"Tôi đã hoàn thành xong khóa học tiếng Anh của mình rồi."},
    {speaker:"Mark",en:"What skill did you learn the most?",vi:"Bạn đã học được kỹ năng gì nhiều nhất?"},
    {speaker:"Sarah",en:"I think reported speech was the hardest part.",vi:"Tôi nghĩ câu tường thuật là phần khó nhất."},
    {speaker:"Mark",en:"In my opinion, the passive voice was difficult too.",vi:"Theo ý kiến của tôi, câu bị động cũng khó."},
    {speaker:"Sarah",en:"If I had more time, I would practise conditionals more.",vi:"Nếu tôi có nhiều thời gian hơn, tôi sẽ luyện câu điều kiện nhiều hơn."},
    {speaker:"Mark",en:"That's a good decision. Let's review together.",vi:"Đó là một quyết định tốt. Cùng ôn tập với nhau nhé."}
  ]}},
  {lesson:34,content:{title:"Reviewing the course",desc:"Hai bạn cùng ôn tập tổng kết trước kỳ thi KET.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"What's your suggestion for the final review?",vi:"Gợi ý của bạn cho buổi ôn tập cuối cùng là gì?"},
    {speaker:"Emma",en:"We should practise all the tenses again.",vi:"Chúng ta nên luyện tập lại tất cả các thì."},
    {speaker:"Tom",en:"I have a solution: let's review the passive voice first.",vi:"Tôi có một giải pháp: hãy ôn câu bị động trước."},
    {speaker:"Emma",en:"Good. What's the result of your last practice test?",vi:"Tốt. Kết quả bài luyện tập gần nhất của bạn thế nào?"},
    {speaker:"Tom",en:"It was good, but I need more knowledge of conditionals.",vi:"Khá tốt, nhưng tôi cần thêm kiến thức về câu điều kiện."},
    {speaker:"Emma",en:"There's a possibility we'll both pass easily.",vi:"Có khả năng cả hai chúng ta sẽ đỗ dễ dàng."}
  ]}},

  // ===== BÀI 36 (lesson 35) =====
  {lesson:35,content:{title:"Practising Reading Part 1",desc:"Hai bạn luyện tập đọc hiểu biển hiệu cho bài thi KET.",characters:["Sarah","Mark"],lines:[
    {speaker:"Sarah",en:"This sign says \"Staff only\". What does it mean?",vi:"Biển này viết \"Chỉ nhân viên\". Nó có nghĩa là gì?"},
    {speaker:"Mark",en:"It means visitors must not enter that room.",vi:"Nó có nghĩa là khách không được vào phòng đó."},
    {speaker:"Sarah",en:"And this one says, \"Open until 9 p.m.\"",vi:"Và cái này viết, \"Mở đến 9 giờ tối\"."},
    {speaker:"Mark",en:"That means it closes at 9, doesn't it?",vi:"Điều đó nghĩa là nó đóng cửa lúc 9 giờ, đúng không?"},
    {speaker:"Sarah",en:"Yes. Let's practise more reading parts together.",vi:"Đúng vậy. Cùng luyện tập thêm các phần đọc hiểu nhé."},
    {speaker:"Mark",en:"Good idea, it will help us in the real exam.",vi:"Ý kiến hay, nó sẽ giúp chúng ta trong bài thi thật."}
  ]}},
  {lesson:35,content:{title:"Practising the speaking test",desc:"Hai bạn luyện tập mô tả ảnh cho phần thi nói KET.",characters:["Tom","Emma"],lines:[
    {speaker:"Tom",en:"In the picture, I can see a family in a park.",vi:"Trong bức ảnh, tôi thấy một gia đình ở trong công viên."},
    {speaker:"Emma",en:"What are they doing in the photo?",vi:"Họ đang làm gì trong bức ảnh?"},
    {speaker:"Tom",en:"They are having a picnic together.",vi:"Họ đang cùng nhau đi picnic."},
    {speaker:"Emma",en:"Good answer. Now let's practise writing an email too.",vi:"Câu trả lời tốt. Giờ cùng luyện viết một email nữa nhé."},
    {speaker:"Tom",en:"Sure, I'll write about 40 words for Part 7.",vi:"Được, tôi sẽ viết khoảng 40 từ cho Phần 7."},
    {speaker:"Emma",en:"That's a great plan before the real test.",vi:"Đó là một kế hoạch tuyệt vời trước bài thi thật."}
  ]}},
];

async function main() {
  console.log('🚀 Bắt đầu xây lại DIALOGUE cho en-ket...\n');

  const program = await prisma.program.findUnique({
    where: { code: 'en-ket' },
    include: { lessons: { orderBy: { orderIndex: 'asc' } } },
  });
  if (!program) throw new Error('❌ Không tìm thấy Program en-ket');
  console.log(`✅ Program: ${program.name} (id: ${program.id})`);

  const lessonMap = {};
  program.lessons.forEach((l) => { lessonMap[l.orderIndex] = l.id; });

  const lessonIds = Object.values(lessonMap);
  const deleted = await prisma.lessonContent.deleteMany({
    where: { lessonId: { in: lessonIds }, contentType: 'DIALOGUE' },
  });
  console.log(`🗑️  Đã xóa ${deleted.count} DIALOGUE cũ\n`);
  console.log(`📝 Đang seed ${DIALOGUE_DATA.length} dialogues...\n`);

  let ok = 0, fail = 0;
  for (const d of DIALOGUE_DATA) {
    const lessonId = lessonMap[d.lesson];
    if (!lessonId) { console.error(`❌ Không tìm thấy lesson orderIndex=${d.lesson}`); fail++; continue; }
    try {
      await prisma.lessonContent.create({
        data: { lessonId, contentType: 'DIALOGUE', content: JSON.stringify(d.content) },
      });
      ok++;
    } catch (e) {
      console.error(`❌ Bài ${d.lesson} — "${d.content.title}": ${e.message}`);
      fail++;
    }
  }

  console.log('\n========== KẾT QUẢ ==========');
  console.log(`✅ Thành công : ${ok} dialogues`);
  console.log(`❌ Thất bại  : ${fail} dialogues`);
  console.log(ok === 72 ? '\n🎉 Hoàn thành! 72 dialogues đã được seed.' : '\n⚠️  Kiểm tra lỗi phía trên.');
}

main()
  .catch((e) => { console.error('\n❌ Lỗi:', e.message); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
