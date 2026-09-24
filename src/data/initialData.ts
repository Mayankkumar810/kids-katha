import { Category, Story, SocialMediaConfig, HomepageConfig, AdsConfig } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Panchatantra Tales',
    slug: 'panchatantra-tales',
    theme: 'Moral',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    description: 'Timeless moral lessons from the ancient woods taught through smart talking animals.',
    storyCount: 3
  },
  {
    id: 'cat-2',
    name: 'Akbar Birbal Stories (अकबर बीरबल)',
    slug: 'akbar-birbal',
    theme: 'Royal',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    description: 'Witty court stories of Emperor Akbar and his clever minister Birbal.',
    storyCount: 2
  },
  {
    id: 'cat-3',
    name: 'Fairy Tales & Magic (जादुई परियां)',
    slug: 'fairy-tales-magic',
    theme: 'Kids',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    description: 'Playful adventures in cloud kingdoms, friendly dragons, and glowing wands.',
    storyCount: 2
  },
  {
    id: 'cat-4',
    name: 'Bedtime & Calm (सोने से पहले कहानियाँ)',
    slug: 'bedtime-stories',
    theme: 'Default',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    description: 'Gentle, soothing night stories to drift peacefully into sweet dreams.',
    storyCount: 2
  },
  {
    id: 'cat-5',
    name: 'Mystery & Legends (रोमांच और रहस्य)',
    slug: 'mystery-legends',
    theme: 'Horror',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    description: 'Spooky yet friendly castle mysteries, shadowy woods, and courageous explorers.',
    storyCount: 1
  }
];

export const initialStories: Story[] = [
  {
    id: 'story-1',
    title: 'चतुर खरगोश और अहंकारी शेर (The Clever Rabbit & The Lion)',
    slug: 'chatur-khargosh-aur-sher',
    categorySlug: 'panchatantra-tales',
    theme: 'Moral',
    language: 'Hindi',
    bannerUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80',
    content: `एक घने सुंदर जंगल में भासुरक नाम का एक बहुत ही खूंखार शेर रहता था। वह अपनी ताकत के घमंड में हर दिन बिना वजह कई बेकसूर जानवरों का शिकार कर देता था।

जंगल के सभी जानवर उसके इस अत्याचार से तंग आ गए थे। एक दिन सभी जानवरों ने मिलकर एक सभा बुलाई। उन्होंने शेर से जाकर निवेदन किया, "महाराज! आप जंगल के राजा हैं। अगर आप रोज़ाना इतने जानवरों को मारेंगे तो बहुत जल्द पूरा जंगल खाली हो जाएगा। हम वचन देते हैं कि आपके भोजन के लिए हर दिन एक जानवर खुद आपकी गुफा में हाजिर हो जाएगा।"

शेर ने सोचा कि बिना किसी मेहनत के रोज़ ताजा भोजन मिलेगा, तो उसने बात मान ली।

कुछ दिनों बाद एक छोटे और बुद्धिमान खरगोश की बारी आई। खरगोश बहुत चतुर था। उसने सोचा, "मरना तो निश्चित है ही, क्यों न अपनी बुद्धि का उपयोग करके पूरे जंगल को इस संकट से मुक्ति दिलाई जाए?"

वह जानबूझकर बहुत धीरे-धीरे चलकर दोपहर के समय शेर की गुफा तक पहुंचा। शेर भूख से तड़प रहा था और गुस्से से लाल-पीला हो रहा था।

शेर ने दहाड़ते हुए पूछा, "एक तो तू इतना छोटा है कि मेरी दाढ़ भी नहीं भरेगी, ऊपर से इतनी देर से क्यों आया?"

चतुर खरगोश ने दोनों हाथ जोड़कर विनम्रता से कहा, "महाराज! मेरी कोई गलती नहीं है। हम तो पांच खरगोश आपके लिए आ रहे थे। पर रास्ते में एक और बड़ा शेर मिल गया। उसने अपने आपको जंगल का असली राजा बताया और मेरे चार साथियों को खा गया। उसने कहा कि भासुरक को जाकर कह दे कि यह जंगल मेरा है!"

यह सुनकर भासुरक का गुस्सा सातवें आसमान पर पहुंच गया। उसने गरजकर कहा, "मुझे तुरंत उस ढोंगी के पास ले चलो! मैं अभी उसका काम तमाम करता हूँ!"

खरगोश शेर को जंगल के पुराने गहरे कुएं के पास ले गया। खरगोश ने कहा, "महाराज, वह दुष्ट इसी भूमिगत किले के अंदर छिपा बैठा है!"

शेर ने कुएं के मुंडेर पर चढ़कर अंदर झांका। शांत पानी में उसे अपनी ही परछाई दिखाई दी। शेर ने समझा कि वही दूसरा शेर है। उसने जोर से दहाड़ लगाई। कुएं से वही दहाड़ गूंजकर दोगुनी आवाज में वापस आई।

शेर गुस्से में अपना आपा खो बैठा और उस परछाई को मारने के लिए तुरंत गहरे कुएं में कूद पड़ा। वह पानी में डूब गया और कभी बाहर नहीं आ सका।

इस प्रकार नन्हे खरगोश ने अपनी सूझबूझ से न केवल अपनी जान बचाई बल्कि जंगल के सभी प्राणियों को अभयदान दिया।`,
    moral: 'बुद्धि बल से कहीं अधिक शक्तिशाली होती है। कठिन से कठिन परिस्थिति में भी घबराने की बजाय विवेक से काम लेना चाहिए।',
    metaTitle: 'चतुर खरगोश और अहंकारी शेर - पंचतंत्र की नैतिक कहानी',
    metaDescription: 'पंचतंत्र की प्रसिद्ध प्रेरक बाल कहानी: कैसे एक छोटे से खरगोश ने अपनी अक्ल से अहंकारी शेर का अंत किया। बच्चों के लिए हिंदी कहानी।',
    keywords: ['panchatantra', 'hindi story', 'clever rabbit', 'kids moral story', 'chatur khargosh', 'panchatantra in hindi'],
    readingTime: '3 min read',
    views: 1248,
    isFeatured: true,
    createdAt: '2026-09-15',
    author: 'KathaVichar Team'
  },
  {
    id: 'story-2',
    title: 'The Brave Little Squirrel and the Great Storm',
    slug: 'the-brave-little-squirrel',
    categorySlug: 'fairy-tales-magic',
    theme: 'Kids',
    language: 'English',
    bannerUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
    content: `High upon the highest branch of the Whispering Oak lived Pip, the smallest squirrel in the valley. While other squirrels could leap across four branches in a single swoop, Pip took careful, tiny steps with his fluffy chestnut tail twitching with curiosity.

One afternoon, the sky turned the color of ripe blackberries. The elder birds tweeted anxious warnings: a ferocious thunderstorm was sweeping across the Whispering Valley!

All the forest creatures rushed into their warm hollows. But as the first thunderclaps rattled the treetops, Pip heard a faint chirp from the meadow below. A family of bluebirds had their nest on a fragile low shrub, right where rainwater was rushing down the hill!

"I must help them!" squeaked Pip.

"Pip, it's too dangerous!" called his brother Sammy from inside their snug acorn nest. "You are too tiny!"

Pip did not listen to doubt. He tied his favorite red acorn cap tight under his chin and scurried down the slippery bark. Raindrops splashed like silver pebbles around him.

When he reached the rosebush, the mother bluebird was fluttering frantically. The muddy puddle was rising to the edge of the woven twigs.

Pip thought fast. He gathered four sturdy fallen oak leaves and anchored them with heavy pebbles to create a miniature waterproof roof. Then, balancing carefully, he picked up each tiny bluebird chick by their soft scruff and carried them up to the safe dry hollow inside Mrs. Badger's stone lodge.

By nightfall, the storm cleared, revealing a velvet sky powdered with shimmering stars. The grateful bluebird family sang the sweetest song the forest had ever heard.

The wise Owl landed beside Pip and gently touched his shoulder. "Courage is not about having big claws or loud roars, little Pip. True courage is choosing kindness when others are afraid."`,
    moral: 'No act of kindness, no matter how small, is ever wasted. True bravery comes from a caring heart.',
    metaTitle: 'The Brave Little Squirrel - Inspiring Bedtime Story for Kids',
    metaDescription: 'Read the heartwarming adventure of Pip, the tiny squirrel who braved a mighty storm to rescue his feathered friends. English moral stories for children.',
    keywords: ['kids story', 'brave squirrel', 'bedtime story', 'moral values', 'english children tales'],
    readingTime: '4 min read',
    views: 942,
    isFeatured: true,
    createdAt: '2026-09-18',
    author: 'Elena Bright'
  },
  {
    id: 'story-3',
    title: 'बीरबल की चतुराई और सोने की अंगूठी (Birbal and the Lost Gold Ring)',
    slug: 'birbal-ki-chaturai-aur-sone-ki-angoothi',
    categorySlug: 'akbar-birbal',
    theme: 'Royal',
    language: 'Hindi',
    bannerUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    content: `बादशाह अकबर अपनी बहुमूल्य रत्नजड़ित सोने की अंगूठी से बेहद प्रेम करते थे। वह अंगूठी उनके पूर्वजों की निशानी थी और उसमें दुर्लभ नीलम जड़ा हुआ था।

एक सुबह जब अकबर सोकर उठे, तो उनकी अंगूठी मेज से गायब थी। उन्होंने अपने शयनकक्ष में उपस्थित आठों खास सेवकों से पूछताछ की, पर सभी ने खुद को निर्दोष बताया।

निराश होकर बादशाह ने अपने सबसे चतुर वजीर बीरबल को तलब किया। अकबर बोले, "बीरबल! किसी बाहरी व्यक्ति का मेरे कक्ष में प्रवेश असंभव है। यह काम इन्हीं आठ सेवकों में से किसी एक का है। बिना किसी सबूत के मैं किसी को सज़ा नहीं दे सकता।"

बीरबल ने मुस्कुराते हुए कहा, "जहांपनाह! आप तनिक भी चिंता न करें। आपकी अंगूठी शाम तक आपके हाथ में होगी।"

बीरबल ने उन आठों सेवकों को दरबार में बुलाया। उन्होंने हर सेवक को एक समान लंबाई की बांस की जादुई छड़ी दी और कहा:
"यह कोई साधारण छड़ी नहीं है, बल्कि यह एक चमत्कारी छड़ी है। जिसने भी जहांपनाह की अंगूठी चुराई होगी, उसकी छड़ी आज रात तिलिस्म के प्रभाव से ठीक दो इंच बड़ी हो जाएगी। कल सुबह सब अपनी छड़ी लेकर हाजिर हों।"

सभी सेवक छड़ी लेकर अपने-अपने घर लौट गए। 

रात में असली चोर घबरा गया। उसने सोचा, "यदि सुबह मेरी छड़ी दो इंच बढ़ गई तो मेरी चोरी पकड़ी जाएगी। क्यों न मैं इसे अभी दो इंच काट लूँ? रात में दो इंच बढ़ने पर यह फिर से बाकी सबकी छड़ियों के बराबर हो जाएगी!"

उसने अपनी छड़ी को दो इंच काटकर फेंक दिया और चैन की नींद सो गया।

अगले दिन सुबह जब सभी सेवक दरबार में आए, तो बीरबल ने एक-एक करके सबकी छड़ियां नापीं। एक सेवक की छड़ी बाकी सबसे दो इंच छोटी निकली।

बीरबल ने तुरंत उस सेवक की ओर उंगली उठाई और कहा, "जहांपनाह! यही है वह चोर जिसने आपकी अंगूठी चुराई है।"

अकबर ने आश्चर्य से पूछा, "बीरबल! तुमने कैसे पहचाना?"

बीरबल ने कहा, "हुजूर! दुनिया में कोई लकड़ी अपने आप नहीं बढ़ती। चोर ने अपने मन के डर से छड़ी को दो इंच पहले ही काट दिया था।"

अकबर बीरबल की बुद्धिमानी पर अत्यंत प्रसन्न हुए और उन्हें भारी पुरस्कार दिया।`,
    moral: 'चोर की दाढ़ी में तिनका होता है। गलत काम करने वाला हमेशा अपने ही डर और अपराधबोध के कारण पकड़ा जाता है।',
    metaTitle: 'बीरबल की चतुराई और सोने की अंगूठी - अकबर बीरबल के किस्से',
    metaDescription: 'अकबर और बीरबल की लोकप्रिय बुद्धिमानी की कहानी: जादुई छड़ी से कैसे पकड़ा गया चोर। हिंदी हास्य एवं प्रेरक कथा।',
    keywords: ['akbar birbal', 'hindi kahaniya', 'birbal intelligence', 'chaturai', 'moral hindi story'],
    readingTime: '4 min read',
    views: 1870,
    isFeatured: true,
    createdAt: '2026-09-12',
    author: 'KathaVichar Editorial'
  },
  {
    id: 'story-4',
    title: 'The Mystery of the Whispering Clocktower',
    slug: 'mystery-of-the-whispering-clocktower',
    categorySlug: 'mystery-legends',
    theme: 'Horror',
    language: 'English',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    content: `At the northern ridge of Ravenbrook Village stood the ancient grandfather clocktower. For fifty years, its bronze bells had remained completely silent. Yet every full moon, whenever the midnight mist rolled over the cobbles, the townspeople heard a mysterious rhythmic chime: *Tick... Tock... Whoosh!*

Ten-year-old Maya and her fearless younger brother Leo loved mysteries. Armed with a brass flashlight and their golden retriever Barnaby, they decided to uncover the secret of the clock.

Creaking open the heavy wooden door, cobwebs danced in the moonbeam. The spiral stone staircase curved up into darkness. 

*Hoooo... Hoooo...* came an eerie moan!

Leo clutched Maya's sleeve. "Maybe it really is haunted by the phantom watchmaker!"

"Let's see with our own eyes," whispered Maya courageously. 

As they climbed into the clockwork chamber, huge brass gears and pendulum weights hung motionless in the shadows. But then, Barnaby sniffed excitedly towards the open window sill.

Maya shone the flashlight. Sitting right on the main bronze escapement lever was not a ghost at all, but a majestic snowy barn owl family! Whenever the wind blew through the open stone arches, the mother owl flapped her wings against the delicate bell hammer, releasing gentle magical chimes into the valley.

Tucked safely under her wings were three fuzzy baby owlets, sleeping soundly in a nest made of dry moss and soft dandelion fluff.

"They aren't scary spirits," smiled Leo, eyes wide with wonder. "They are the guardians of the tower!"

Maya and Leo decided to keep the owl family safe, leaving a bowl of fresh spring water every week. The spooky mystery had turned into the warmest friendship in town.`,
    moral: 'Fear often comes from things we do not yet understand. When you look closer with curiosity and courage, fear turns into wonder.',
    metaTitle: 'The Mystery of the Whispering Clocktower - Spooky Kids Story',
    metaDescription: 'An atmospheric, kid-friendly mystery story about two brave siblings who discover the heartwarming secret behind an ancient haunted clocktower.',
    keywords: ['mystery story', 'kids halloween', 'brave kids', 'clocktower', 'spooky stories for children'],
    readingTime: '5 min read',
    views: 780,
    isFeatured: false,
    createdAt: '2026-09-10',
    author: 'Arthur Pendelton'
  },
  {
    id: 'story-5',
    title: 'सच्चा मित्र और भालू (The True Friend & The Forest Bear)',
    slug: 'saccha-mitra-aur-bhaloo',
    categorySlug: 'panchatantra-tales',
    theme: 'Moral',
    language: 'Hindi',
    bannerUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    content: `रोहन और सोहन बचपन के पक्के मित्र थे। वे एक ही गांव में रहते थे और हर काम साथ-साथ करते थे। एक दिन दोनों ने शहर जाकर नया व्यापार करने का निर्णय लिया।

शहर जाने का रास्ता एक बहुत बड़े और सुनसान जंगल से होकर गुजरता था। जंगल में प्रवेश करने से पहले सोहन ने रोहन का हाथ पकड़कर कहा, "मित्र! चाहे कैसी भी विपत्ति आए, हम एक-दूसरे का साथ कभी नहीं छोड़ेंगे।"

रोहन ने भी मुस्कुराते हुए वचन दिया।

वे दोनों जंगल के बीच पहुंचे ही थे कि अचानक झाड़ियों से निकलकर एक विशाल काला भालू उनकी तरफ दौड़ता हुआ आया। भालू को देखकर दोनों के होश उड़ गए।

सोहन पेड़ पर चढ़ने में बहुत माहिर था। उसने अपने मित्र रोहन की तनिक भी परवाह नहीं की और तुरंत सामने वाले ऊंचे पेड़ पर चढ़कर पत्तों के बीच छिप गया।

रोहन को पेड़ पर चढ़ना नहीं आता था। वह अकेला जमीन पर खड़ा रह गया। उसने सुन रखा था कि भालू मरे हुए जीवों को नुकसान नहीं पहुंचाते। रोहन ने तुरंत जमीन पर लेटकर अपनी सांस रोक ली और बिल्कुल निश्चेष्ट पड़ गया।

भालू भारी कदमों से रोहन के पास आया। उसने रोहन के कान, नाक और चेहरे को सूंघा। रोहन ने अपनी धड़कन और सांस को साध रखा था। भालू ने समझा कि यह कोई मृत शरीर है, इसलिए वह शांति से वहां से चला गया।

जब भालू दूर चला गया, तो सोहन पेड़ से नीचे उतरा। उसने हंसते हुए रोहन से पूछा, "अरे मित्र! भालू तुम्हारे कान में कुछ फुसफुसा रहा था, उसने तुमसे क्या कहा?"

रोहन ने अपने कपड़े झाड़ते हुए उत्तर दिया, "भालू ने मुझसे कहा कि जो संकट के समय अपने मित्र को अकेला छोड़कर भाग जाए, ऐसे स्वार्थी इंसान को कभी अपना सच्चा मित्र मत समझना।"

यह सुनकर सोहन शर्म से पानी-पानी हो गया और उसने अपनी गलती के लिए रोहन से क्षमा मांगी।`,
    moral: 'सच्चा मित्र वही होता है जो विपत्ति और संकट की घड़ी में आपके साथ खड़ा रहे, न कि अपनी जान बचाकर भाग जाए।',
    metaTitle: 'सच्चा मित्र और भालू - पंचतंत्र की प्रेरक मित्रता कथा',
    metaDescription: 'सच्ची मित्रता की पहचान कराने वाली पंचतंत्र की अमर कहानी। जानिए मुसीबत में दोस्तों की परख कैसे होती है।',
    keywords: ['panchatantra', 'saccha mitra', 'friendship moral story', 'hindi kids stories', 'panchatantra bhaloo'],
    readingTime: '3 min read',
    views: 1410,
    isFeatured: false,
    createdAt: '2026-09-08',
    author: 'KathaVichar Team'
  },
  {
    id: 'story-6',
    title: 'The Cloud That Learned to Sing',
    slug: 'the-cloud-that-learned-to-sing',
    categorySlug: 'bedtime-stories',
    theme: 'Default',
    language: 'English',
    bannerUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80',
    content: `In the quiet pastel sky just before twilight, there floated a soft, cottony cloud named Nimbus. While other storm clouds loved rumbling with loud thunderclaps, Nimbus felt sad because loud noises frightened the baby rabbits and sleepy sparrows below.

Nimbus wanted his raindrops to sound like gentle lullabies.

One evening, he visited the Old Wind at the top of Mount Whispers. "Grandfather Wind," asked Nimbus, "how can I make my rain bring peaceful dreams instead of startle?"

The Old Wind blew through a hollow bamboo reed, creating a mellow flute melody. "To make music, young cloud, you must not strike in anger. You must let your drops fall softly on petals, pebbles, and pine needles."

Nimbus floated down to the sleepy valley. Slowly and tenderly, he let his rain shower begin.

*Pitter-patter-ping* on the green lily pads.
*Tinkle-tonkle-tap* on the smooth brook stones.
*Shhh-swish-hum* through the tall meadow grasses.

Together, the sounds wove a soothing symphony that washed across the quiet valley. The tired deer closed their soft brown eyes. The little owls nestled into their feathers. Even the restless forest brook whispered a warm goodnight.

From that evening on, whenever children saw Nimbus floating gently overhead, they knew it was time to tuck under their cozy blankets and listen to the song of the singing cloud.`,
    moral: 'Gentleness has a quiet power of its own. Soft words and peaceful actions can comfort the whole world.',
    metaTitle: 'The Cloud That Learned to Sing - Soothing Bedtime Story',
    metaDescription: 'A dreamy, calm bedtime story for toddlers and children about a gentle cloud that turns raindrops into a peaceful lullaby.',
    keywords: ['bedtime story', 'calm kids story', 'soothing sleep tale', 'gentle stories', 'lullaby story'],
    readingTime: '3 min read',
    views: 1120,
    isFeatured: true,
    createdAt: '2026-09-05',
    author: 'Clara Meadow'
  }
];

export const initialSocialMedia: SocialMediaConfig = {
  youtube: { url: 'https://youtube.com/@kathavichar-kids', enabled: true },
  instagram: { url: 'https://instagram.com/kathavichar.stories', enabled: true },
  telegram: { url: 'https://t.me/kathavicharkids', enabled: true },
  facebook: { url: 'https://facebook.com/kathavichar', enabled: true }
};

export const initialHomepageConfig: HomepageConfig = {
  heroImageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
  heroBadge: '✨ Magic of Stories in Hindi & English',
  heroTitle: 'Step Into Worlds of Wonder, Wisdom & Joy',
  heroSubtitle: 'Handpicked moral tales, Panchatantra wisdom, fairy fantasies, and bedtime adventures created lovingly for young dreamers and mindful parents.',
  heroButtonText: 'Explore All Stories',
  heroButtonLink: '/stories'
};

export const initialAdsConfig: AdsConfig = {
  headerAd: {
    enabled: true,
    code: '<!-- Google AdSense Header Responsive Banner Slot (728x90) -->\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>'
  },
  inContentAd: {
    enabled: true,
    code: '<!-- Google AdSense In-Article Native Slot -->\n<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="0987654321"></ins>'
  },
  sidebarAd: {
    enabled: true,
    code: '<!-- Google AdSense Sticky Sidebar Banner (300x250 / 300x600) -->\n<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="1122334455"></ins>'
  },
  footerAd: {
    enabled: true,
    code: '<!-- Google AdSense Footer Leaderboard Banner (728x90) -->\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="5566778899" data-ad-format="auto"></ins>'
  }
};

export const initialLegalConfig = {
  contactEmail: 'contact@kathavichar.com',
  publisherName: 'KathaVichar Editorial Team',
  siteName: 'KathaVichar (कथाविचार)',
  customPrivacyPolicy: 'KathaVichar is dedicated to upholding the highest safety standards for young readers, parents, and teachers.',
  customTerms: 'All stories, artwork, and educational material on KathaVichar are protected under copyright and fair use guidelines.',
  customDisclaimer: 'All stories published on KathaVichar are intended for educational and entertainment purposes. Moral lessons are inspired by ancient folktales, Panchatantra, and classic bedtime lore.',
  aboutText: 'KathaVichar (कथाविचार) is an inspiring digital sanctuary celebrating the magic of stories for kids in both Hindi and English. We believe that stories with morals shape compassionate, creative, and resilient minds.'
};

export const demoCategories = initialCategories;
export const demoStories = initialStories;

