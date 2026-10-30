/* ==========================================================
   Bibelquiz – spørgsmålsbank
   ----------------------------------------------------------
   Hvert spørgsmål tilføjes med:
   add(bog, niveau, "kapitel[:vers]", dansk, engelsk)
     bog     = 1-66 (1 = 1 Mosebog ... 66 = Johannes' Åbenbaring)
     niveau  = 1-20 (1 = meget let, 20 = meget svær)
     dansk / engelsk = [spørgsmål, KORREKT svar, [3 forkerte svar]]
   Rækkefølgen af svarmuligheder blandes automatisk i quizzen.
   Bibelsteder angives kun som henvisning (ingen citater fra
   Bibelen 1992 eller NIV, som er ophavsretsbeskyttede).
   ========================================================== */

window.BOOKS = [
  ["1 Mosebog","Genesis"],["2 Mosebog","Exodus"],["3 Mosebog","Leviticus"],["4 Mosebog","Numbers"],["5 Mosebog","Deuteronomy"],
  ["Josua","Joshua"],["Dommerbogen","Judges"],["Ruths Bog","Ruth"],["1 Samuelsbog","1 Samuel"],["2 Samuelsbog","2 Samuel"],
  ["1 Kongebog","1 Kings"],["2 Kongebog","2 Kings"],["1 Krønikebog","1 Chronicles"],["2 Krønikebog","2 Chronicles"],
  ["Ezra","Ezra"],["Nehemias","Nehemiah"],["Ester","Esther"],["Job","Job"],["Salmernes Bog","Psalms"],["Ordsprogenes Bog","Proverbs"],
  ["Prædikeren","Ecclesiastes"],["Højsangen","Song of Songs"],["Esajas","Isaiah"],["Jeremias","Jeremiah"],["Klagesangene","Lamentations"],
  ["Ezekiel","Ezekiel"],["Daniel","Daniel"],["Hosea","Hosea"],["Joel","Joel"],["Amos","Amos"],["Obadja","Obadiah"],["Jonas","Jonah"],
  ["Mika","Micah"],["Nahum","Nahum"],["Habakkuk","Habakkuk"],["Zefanias","Zephaniah"],["Haggaj","Haggai"],["Zakarias","Zechariah"],["Malakias","Malachi"],
  ["Mattæus","Matthew"],["Markus","Mark"],["Lukas","Luke"],["Johannes","John"],["Apostlenes Gerninger","Acts"],
  ["Romerbrevet","Romans"],["1 Korintherbrev","1 Corinthians"],["2 Korintherbrev","2 Corinthians"],["Galaterbrevet","Galatians"],
  ["Efeserbrevet","Ephesians"],["Filipperbrevet","Philippians"],["Kolossenserbrevet","Colossians"],
  ["1 Thessalonikerbrev","1 Thessalonians"],["2 Thessalonikerbrev","2 Thessalonians"],["1 Timotheusbrev","1 Timothy"],["2 Timotheusbrev","2 Timothy"],
  ["Titusbrevet","Titus"],["Filemonbrevet","Philemon"],["Hebræerbrevet","Hebrews"],["Jakobsbrevet","James"],
  ["1 Petersbrev","1 Peter"],["2 Petersbrev","2 Peter"],["1 Johannesbrev","1 John"],["2 Johannesbrev","2 John"],["3 Johannesbrev","3 John"],
  ["Judasbrevet","Jude"],["Johannes' Åbenbaring","Revelation"]
];

window.QUESTIONS = [];
function add(b, l, ref, da, en) {
  window.QUESTIONS.push({
    b: b, l: l, ref: ref,
    da: { q: da[0], a: da[1], w: da[2] },
    en: { q: en[0], a: en[1], w: en[2] }
  });
}

/* ---------------- 1 MOSEBOG ---------------- */
add(1,1,"1",["Hvor mange dage arbejdede Gud med skabelsen, før han hvilede?","Seks",["Fem","Syv","Ti"]],["How many days did God spend creating before he rested?","Six",["Five","Seven","Ten"]]);
add(1,1,"6-9",["Hvem byggede arken?","Noa",["Moses","Abraham","Jonas"]],["Who built the ark?","Noah",["Moses","Abraham","Jonah"]]);
add(1,2,"3",["Hvem fristede Eva i Edens Have?","Slangen",["Kain","Ravnen","Satan i en løves skikkelse"]],["Who tempted Eve in the Garden of Eden?","The serpent",["Cain","The raven","A lion"]]);
add(1,3,"4",["Hvad hed Adam og Evas to første sønner?","Kain og Abel",["Set og Enok","Esau og Jakob","Isak og Ismael"]],["What were the names of Adam and Eve's first two sons?","Cain and Abel",["Seth and Enoch","Esau and Jacob","Isaac and Ishmael"]]);
add(1,3,"37",["Hvilket land blev Josef solgt til som slave?","Egypten",["Babylon","Assyrien","Kana'an"]],["To which country was Joseph sold as a slave?","Egypt",["Babylon","Assyria","Canaan"]]);
add(1,4,"22",["Hvem blev bedt om at ofre sin søn Isak, men blev stoppet af Gud i sidste øjeblik?","Abraham",["Jakob","Noa","Lot"]],["Who was asked to sacrifice his son Isaac but was stopped by God at the last moment?","Abraham",["Jacob","Noah","Lot"]]);
add(1,5,"11",["Hvad hed byen, hvor menneskene byggede et tårn, og sprogene blev forvirret?","Babel",["Sodoma","Ninive","Jeriko"]],["What was the name of the city where people built a tower and languages were confused?","Babel",["Sodom","Nineveh","Jericho"]]);
add(1,5,"25",["Hvad solgte Esau til Jakob for en portion linsesuppe?","Sin førstefødselsret",["Sin kappe","Sit telt","Sin hjord af får"]],["What did Esau sell to Jacob for a bowl of stew?","His birthright",["His cloak","His tent","His flock of sheep"]]);
add(1,6,"32",["Hvilket nyt navn fik Jakob efter kampen ved Jabbok?","Israel",["Juda","Efraim","Benjamin"]],["What new name did Jacob receive after wrestling at the Jabbok?","Israel",["Judah","Ephraim","Benjamin"]]);
add(1,10,"14",["Hvem var præst for Gud den Højeste og velsignede Abram?","Melkisedek",["Aron","Elias","Eli"]],["Who was priest of God Most High and blessed Abram?","Melchizedek",["Aaron","Elijah","Eli"]]);
add(1,12,"15:6",["Hvad blev regnet Abram til retfærdighed?","At han troede Herren",["At han ofrede sin søn","At han blev omskåret","At han byggede et alter"]],["What was credited to Abram as righteousness?","That he believed the LORD",["That he offered his son","That he was circumcised","That he built an altar"]]);
add(1,14,"49",["Hvilken af Jakobs sønner får løftet om, at herskerstaven ikke skal vige fra hans stamme?","Juda",["Josef","Levi","Benjamin"]],["Which of Jacob's sons receives the promise that the scepter will not depart from his tribe?","Judah",["Joseph","Levi","Benjamin"]]);
add(1,16,"38",["Hvilken kvinde, svigerdatter til Juda, er nævnt i Jesu slægtsregister hos Mattæus?","Tamar",["Rakel","Lea","Dina"]],["Which woman, daughter-in-law of Judah, appears in Jesus' genealogy in Matthew?","Tamar",["Rachel","Leah","Dinah"]]);

/* ---------------- 2 MOSEBOG ---------------- */
add(2,3,"2",["Hvem fandt Moses i sivkurven ved Nilen?","Faraos datter",["Moses' mor","Aron","Miriam alene"]],["Who found baby Moses in the basket by the Nile?","Pharaoh's daughter",["Moses' mother","Aaron","Miriam alone"]]);
add(2,3,"3",["Hvad stod i flammer uden at brænde op, da Gud talte til Moses?","En tornebusk",["Et egetræ","Et alter","En klippe"]],["What was burning without being consumed when God spoke to Moses?","A bush",["An oak tree","An altar","A rock"]]);
add(2,2,"14",["Hvad delte Gud, så Israels folk kunne gå igennem?","Det Røde Hav",["Jordanfloden","Nilen","Genesaret Sø"]],["What did God part so the Israelites could pass through?","The Red Sea",["The Jordan River","The Nile","The Sea of Galilee"]]);
add(2,4,"20",["Hvor mange bud fik Moses på stentavlerne?","Ti",["Syv","Tolv","Fem"]],["How many commandments did Moses receive on the stone tablets?","Ten",["Seven","Twelve","Five"]]);
add(2,8,"12",["Hvilken højtid blev indstiftet, da dødsenglen gik forbi israelitternes huse?","Påske",["Pinse","Løvhyttefesten","Forsoningsdagen"]],["Which feast was instituted when the angel of death passed over the Israelites' houses?","Passover",["Pentecost","Feast of Tabernacles","Day of Atonement"]]);
add(2,10,"32",["Hvem lavede guldkalven, mens Moses var på Sinaj bjerg?","Aron",["Josua","Hur","Kaleb"]],["Who made the golden calf while Moses was on Mount Sinai?","Aaron",["Joshua","Hur","Caleb"]]);
add(2,16,"31:1-6",["Hvem blev udvalgt og fyldt med Guds ånd til at udføre kunsthåndværket til Åbenbaringsteltet?","Betsalel",["Josua","Kaleb","Aron"]],["Who was chosen and filled with the Spirit of God to craft the work for the tabernacle?","Bezalel",["Joshua","Caleb","Aaron"]]);

/* ---------------- 3 MOSEBOG ---------------- */
add(3,10,"16",["Hvad hed den årlige store forsoningsdag?","Yom Kippur",["Purim","Ugefesten","Løvhyttefesten"]],["What was the annual great day of atonement called?","Yom Kippur",["Purim","Feast of Weeks","Feast of Tabernacles"]]);
add(3,9,"19:18",["Hvilket bud, som Jesus senere fremhæver som et af de største, står i 3 Mosebog 19?","Du skal elske din næste som dig selv",["Du skal ikke slå ihjel","Ær din far og din mor","Du skal holde sabbatten"]],["Which commandment, later highlighted by Jesus as one of the greatest, is found in Leviticus 19?","Love your neighbor as yourself",["You shall not murder","Honor your father and mother","Keep the Sabbath"]]);
add(3,15,"25",["Hvad kaldes det 50. år, hvor slaver sættes fri, og jord går tilbage til den oprindelige familie?","Jubelåret",["Sabbatsåret","Forsoningsåret","Påskeåret"]],["What is the 50th year called, when slaves are freed and land returns to the original family?","The Year of Jubilee",["The Sabbath year","The Year of Atonement","The Year of Passover"]]);

/* ---------------- 4 MOSEBOG ---------------- */
add(4,7,"13",["Hvor mange spejdere sendte Moses ind i Kana'an?","Tolv",["Syv","Ti","Fyrre"]],["How many spies did Moses send into Canaan?","Twelve",["Seven","Ten","Forty"]]);
add(4,10,"13-14",["Hvilke to af spejderne troede, at Israel kunne indtage landet?","Josua og Kaleb",["Aron og Hur","Moses og Aron","Josua og Eleazar"]],["Which two spies believed Israel could take the land?","Joshua and Caleb",["Aaron and Hur","Moses and Aaron","Joshua and Eleazar"]]);
add(4,7,"22",["Hvilket dyr talte til Bileam?","Hans æsel",["Hans kamel","En slange","En ravn"]],["Which animal spoke to Balaam?","His donkey",["His camel","A snake","A raven"]]);
add(4,10,"21",["Hvad lod Moses lave, så de slangebidte kunne leve ved at se på det?","En kobberslange",["En guldkalv","En stav af mandeltræ","Et alter af sten"]],["What did Moses make so that those bitten by snakes could live by looking at it?","A bronze snake",["A golden calf","A staff of almond wood","A stone altar"]]);

/* ---------------- 5 MOSEBOG ---------------- */
add(5,11,"6:4-5",["Hvad kaldes den centrale jødiske bekendelse, der begynder med 'Hør, Israel'?","Shema",["Hallel","Kaddish","Amidah"]],["What is the central Jewish confession that begins 'Hear, O Israel' called?","The Shema",["The Hallel","The Kaddish","The Amidah"]]);
add(5,9,"34",["Hvor døde Moses?","På Nebo bjerg i Moab",["På Sinaj bjerg","På Karmel","På Zion"]],["Where did Moses die?","On Mount Nebo in Moab",["On Mount Sinai","On Mount Carmel","On Mount Zion"]]);
add(5,12,"8:3",["Hvilket Moses-ord bruger Jesus, da han fristes til at gøre sten til brød?","Mennesket lever ikke af brød alene",["Du skal ikke fristes","Hold sabbatten hellig","Herren er min hyrde"]],["Which word of Moses does Jesus use when tempted to turn stones into bread?","Man does not live on bread alone",["Do not put the Lord to the test","Keep the Sabbath holy","The LORD is my shepherd"]]);

/* ---------------- JOSUA ---------------- */
add(6,4,"6",["Hvilken by faldt, efter at israelitterne gik rundt om den i syv dage?","Jeriko",["Ai","Betel","Gat"]],["Which city fell after the Israelites marched around it for seven days?","Jericho",["Ai","Bethel","Gath"]]);
add(6,6,"2",["Hvad hed kvinden i Jeriko, som skjulte de to spejdere?","Rahab",["Debora","Rut","Tamar"]],["What was the name of the woman in Jericho who hid the two spies?","Rahab",["Deborah","Ruth","Tamar"]]);
add(6,10,"10",["Hvad stod stille, da Josua bad om mere tid til kampen?","Solen og månen",["Floden Jordan","Skyerne","Stjernerne"]],["What stood still when Joshua prayed for more time in battle?","The sun and moon",["The Jordan River","The clouds","The stars"]]);
add(6,12,"4",["Hvor mange sten blev rejst som mindesmærke, efter at Israel var gået over Jordan?","Tolv",["Syv","Ti","Fyrre"]],["How many stones were set up as a memorial after Israel crossed the Jordan?","Twelve",["Seven","Ten","Forty"]]);

/* ---------------- DOMMERBOGEN ---------------- */
add(7,2,"16",["Hvori lå ifølge fortællingen Samsons styrke?","I hans uklippede hår",["I hans sværd","I hans ben","I hans sko"]],["According to the story, where did Samson's strength lie?","In his uncut hair",["In his sword","In his legs","In his sandals"]]);
add(7,7,"6-7",["Hvor mange mænd endte Gideon med at have i sin hær?","300",["3.000","30.000","30"]],["How many men did Gideon end up with in his army?","300",["3,000","30,000","30"]]);
add(7,8,"4",["Hvilken kvinde var dommer og profet og førte Israel til sejr sammen med Barak?","Debora",["Rahab","Rut","Jael"]],["Which woman was judge and prophet and led Israel to victory together with Barak?","Deborah",["Rahab","Ruth","Jael"]]);
add(7,15,"11",["Hvem lovede Gud at ofre det første, der kom ud af hans hus, hvis han fik sejr?","Jefta",["Gideon","Samson","Ehud"]],["Who vowed to sacrifice the first thing coming out of his house if God gave him victory?","Jephthah",["Gideon","Samson","Ehud"]]);

/* ---------------- RUTH ---------------- */
add(8,4,"1",["Hvad hed Ruts svigermor?","Noomi",["Orpa","Hanna","Elisabeth"]],["What was the name of Ruth's mother-in-law?","Naomi",["Orpah","Hannah","Elizabeth"]]);
add(8,8,"2-4",["Hvem blev Ruts slægtsindløser og mand?","Boaz",["Elimelek","Obed","Isaj"]],["Who became Ruth's kinsman-redeemer and husband?","Boaz",["Elimelech","Obed","Jesse"]]);
add(8,10,"4",["Hvilken kendt konge nedstammede fra Rut?","David",["Saul","Salomon","Josias"]],["Which famous king was a descendant of Ruth?","David",["Saul","Solomon","Josiah"]]);

/* ---------------- 1 SAMUELSBOG ---------------- */
add(9,1,"17",["Hvem besejrede David med en slynge og en sten?","Goliat",["Saul","Abner","Joab"]],["Who did David defeat with a sling and a stone?","Goliath",["Saul","Abner","Joab"]]);
add(9,4,"3",["Hvem hørte Guds stemme som dreng, mens han tjente præsten Eli?","Samuel",["David","Samson","Jeremias"]],["Which boy heard God's voice while serving the priest Eli?","Samuel",["David","Samson","Jeremiah"]]);
add(9,5,"8-10",["Hvem blev Israels første konge?","Saul",["David","Salomon","Samuel"]],["Who became Israel's first king?","Saul",["David","Solomon","Samuel"]]);
add(9,8,"16",["Hvad hed Davids far?","Isaj",["Jakob","Elkana","Boaz"]],["What was the name of David's father?","Jesse",["Jacob","Elkanah","Boaz"]]);
add(9,13,"28",["Hvem opsøgte Saul i Endor, så han kunne få forbindelse med Samuel?","En kvinde, der kunne mane de døde frem",["En profet fra Betel","Præsten Abjatar","En fremmed konge"]],["Whom did Saul visit at Endor to get in contact with Samuel?","A woman who could call up the dead",["A prophet from Bethel","The priest Abiathar","A foreign king"]]);

/* ---------------- 2 SAMUELSBOG ---------------- */
add(10,8,"12",["Hvilken profet konfronterede David med hans synd?","Natan",["Elias","Samuel","Gad"]],["Which prophet confronted David about his sin?","Nathan",["Elijah","Samuel","Gad"]]);
add(10,9,"11",["Hvem var Batsebas mand?","Uria",["Joab","Abner","Absalom"]],["Who was Bathsheba's husband?","Uriah",["Joab","Abner","Absalom"]]);
add(10,10,"7",["Hvad ville David bygge til Gud, men fik ikke lov til?","Et tempel",["En mur om Jerusalem","En ny kongepalads","Et alter på Karmel"]],["What did David want to build for God but was not allowed to?","A temple",["A wall around Jerusalem","A new palace","An altar on Carmel"]]);
add(10,12,"18",["Hvad skete der med Absalom i skoven under kampen mod Davids hær?","Hans hoved blev fanget i et stort træ",["Han faldt i en grøft","Han blev ramt af en pil fra muren","Han druknede i Jordan"]],["What happened to Absalom in the forest during the battle against David's army?","His head got caught in a large tree",["He fell into a pit","He was hit by an arrow from the wall","He drowned in the Jordan"]]);

/* ---------------- 1 KONGEBOG ---------------- */
add(11,5,"3",["Hvad bad Salomon Gud om?","Et forstående hjerte og visdom",["Rigdom","Et langt liv","Sejr over sine fjender"]],["What did Solomon ask God for?","A discerning heart and wisdom",["Riches","A long life","Victory over his enemies"]]);
add(11,5,"6",["Hvem byggede det første tempel i Jerusalem?","Salomon",["David","Nehemias","Zerubbabel"]],["Who built the first temple in Jerusalem?","Solomon",["David","Nehemiah","Zerubbabel"]]);
add(11,9,"18",["På hvilket bjerg udfordrede Elias Ba'als profeter?","Karmel",["Sinaj","Nebo","Tabor"]],["On which mountain did Elijah challenge the prophets of Baal?","Carmel",["Sinai","Nebo","Tabor"]]);
add(11,13,"19",["Hvordan talte Gud til Elias på Horeb?","I en stille, sagte susen",["I et jordskælv","I en voldsom storm","I en ild"]],["How did God speak to Elijah on Horeb?","In a gentle whisper",["In an earthquake","In a powerful wind","In a fire"]]);
add(11,15,"12",["Hvilken konge delte riget i to ved at afvise folkets bøn om lettere byrder?","Rehabeam",["Jeroboam","Asa","Ahab"]],["Which king split the kingdom by rejecting the people's plea for lighter burdens?","Rehoboam",["Jeroboam","Asa","Ahab"]]);

/* ---------------- 2 KONGEBOG ---------------- */
add(12,6,"2",["Hvordan forlod Elias jorden?","Han blev taget op i en hvirvelvind med ildvogn og ildheste",["Han døde under en enebærbusk","Han blev ført bort af Babylons hær","Han forsvandt på Karmel"]],["How did Elijah leave the earth?","He was taken up in a whirlwind with a chariot and horses of fire",["He died under a broom bush","He was carried off by Babylon's army","He vanished on Carmel"]]);
add(12,10,"5",["Hvilken hærfører blev helbredt for spedalskhed ved at bade syv gange i Jordan?","Naaman",["Hasael","Jehu","Sisera"]],["Which commander was healed of leprosy by washing seven times in the Jordan?","Naaman",["Hazael","Jehu","Sisera"]]);
add(12,13,"22",["Hvilken konge fandt lovbogen i templet og indførte store reformer?","Josias",["Hizkia","Manasse","Joasj"]],["Which king found the Book of the Law in the temple and led major reforms?","Josiah",["Hezekiah","Manasseh","Joash"]]);
add(12,12,"25",["Hvilket rige ødelagde Jerusalem og templet i 586 f.Kr.?","Babylon",["Assyrien","Persien","Egypten"]],["Which empire destroyed Jerusalem and the temple in 586 BC?","Babylon",["Assyria","Persia","Egypt"]]);

/* ---------------- 1 + 2 KRØNIKEBOG ---------------- */
add(13,12,"1-9",["Hvad består de første kapitler af 1 Krønikebog hovedsageligt af?","Slægtsregistre",["Lovtekster","Profetier","Salmer"]],["What do the first chapters of 1 Chronicles mainly consist of?","Genealogies",["Laws","Prophecies","Psalms"]]);
add(13,13,"28-29",["Hvem blev udpeget til at bygge templet i stedet for David?","Salomon",["Absalom","Adonija","Natan"]],["Who was appointed to build the temple instead of David?","Solomon",["Absalom","Adonijah","Nathan"]]);
add(14,16,"20",["Hvilken konge lod sangere gå foran hæren i kamp?","Josafat",["Hizkia","Asa","Uzzija"]],["Which king sent singers ahead of the army into battle?","Jehoshaphat",["Hezekiah","Asa","Uzziah"]]);
add(14,13,"7:14",["Hvad lover Gud at gøre, hvis hans folk ydmyger sig, beder og vender om fra deres onde veje?","Høre fra himlen, tilgive deres synd og læge deres land",["Sende en ny konge","Bygge en ny mur","Give dem sejr over alle folk"]],["What does God promise to do if his people humble themselves, pray and turn from their wicked ways?","Hear from heaven, forgive their sin and heal their land",["Send a new king","Build a new wall","Give them victory over all nations"]]);

/* ---------------- EZRA, NEHEMIAS, ESTER ---------------- */
add(15,14,"1",["Hvilken persisk konge gav jøderne lov til at vende hjem og bygge templet?","Kyros",["Dareios","Xerxes","Artaxerxes"]],["Which Persian king allowed the Jews to return and rebuild the temple?","Cyrus",["Darius","Xerxes","Artaxerxes"]]);
add(15,12,"3-6",["Hvad blev genopbygget i Jerusalem under ledelse af Zerubbabel og Josua?","Templet",["Kongepaladset","Byens mur","Lovbogen"]],["What was rebuilt in Jerusalem under Zerubbabel and Joshua?","The temple",["The royal palace","The city wall","The Book of the Law"]]);
add(16,9,"2-6",["Hvad genopbyggede Nehemias i Jerusalem?","Byens mur",["Templet","Kongens palads","Davids by"]],["What did Nehemiah rebuild in Jerusalem?","The city wall",["The temple","The king's palace","The city of David"]]);
add(16,15,"6:15",["Hvor lang tid tog det at færdiggøre Jerusalems mur?","52 dage",["7 dage","40 dage","3 år"]],["How long did it take to complete Jerusalem's wall?","52 days",["7 days","40 days","3 years"]]);
add(17,5,"2",["Hvem blev dronning og reddede sit folk fra udryddelse?","Ester",["Rut","Debora","Vasjti"]],["Who became queen and saved her people from destruction?","Esther",["Ruth","Deborah","Vashti"]]);
add(17,9,"3",["Hvem planlagde at udrydde alle jøder i det persiske rige?","Haman",["Mordokaj","Xerxes","Nebukadnezar"]],["Who plotted to destroy all the Jews in the Persian empire?","Haman",["Mordecai","Xerxes","Nebuchadnezzar"]]);
add(17,12,"9",["Hvilken jødisk højtid mindes Esters bog?","Purim",["Hanukka","Påske","Løvhyttefesten"]],["Which Jewish festival is commemorated in the book of Esther?","Purim",["Hanukkah","Passover","Feast of Tabernacles"]]);

/* ---------------- JOB ---------------- */
add(18,9,"1-2",["Hvem fik lov til at prøve Job?","Satan",["Elifaz","En engel ved navn Gabriel","Bildad"]],["Who was allowed to test Job?","Satan",["Eliphaz","An angel named Gabriel","Bildad"]]);
add(18,10,"2",["Hvor mange venner kom i første omgang for at trøste Job?","Tre",["To","Fire","Syv"]],["How many friends first came to comfort Job?","Three",["Two","Four","Seven"]]);
add(18,12,"38",["Hvem talte til Job ud af stormen?","Herren",["Elihu","Elifaz","En engel"]],["Who spoke to Job out of the storm?","The LORD",["Elihu","Eliphaz","An angel"]]);
add(18,14,"42",["Hvad skete der til sidst i Jobs bog?","Herren gav Job dobbelt så meget, som han havde mistet",["Job døde i sit ellende","Job blev konge","Job forlod landet"]],["What happened at the end of the book of Job?","The LORD gave Job twice as much as he had before",["Job died in misery","Job became king","Job left the land"]]);

/* ---------------- SALMERNES BOG ---------------- */
add(19,2,"23",["Hvad kalder David Herren i Salme 23?","Sin hyrde",["Sin klippe","Sin konge","Sin dommer"]],["What does David call the LORD in Psalm 23?","His shepherd",["His rock","His king","His judge"]]);
add(19,5,"",["Hvem er traditionelt forfatter til mange af salmerne?","David",["Moses","Salomon","Esajas"]],["Who is traditionally the author of many of the psalms?","David",["Moses","Solomon","Isaiah"]]);
add(19,11,"119",["Hvilken salme er den længste i Salmernes Bog?","Salme 119",["Salme 23","Salme 51","Salme 150"]],["Which psalm is the longest?","Psalm 119",["Psalm 23","Psalm 51","Psalm 150"]]);
add(19,13,"22",["Hvilken salme begynder med ord, som Jesus råbte på korset?","Salme 22",["Salme 1","Salme 23","Salme 91"]],["Which psalm begins with words Jesus cried out on the cross?","Psalm 22",["Psalm 1","Psalm 23","Psalm 91"]]);
add(19,16,"120-134",["Hvad kaldes Salme 120-134?","Pilgrimssange (vandringssange)",["Boddsalmer","Kongesalmer","Hallel-salmer"]],["What are Psalms 120-134 called?","Songs of Ascents",["Penitential psalms","Royal psalms","Hallel psalms"]]);

/* ---------------- ORDSPROGENE, PRÆDIKEREN, HØJSANGEN ---------------- */
add(20,4,"1",["Hvem tilskrives traditionelt en stor del af Ordsprogenes Bog?","Salomon",["David","Moses","Esra"]],["Who is traditionally credited with much of the book of Proverbs?","Solomon",["David","Moses","Ezra"]]);
add(20,8,"9:10",["Hvad er ifølge Ordsprogene begyndelsen til visdom?","Frygt for Herren",["Mange års erfaring","At lytte til de ældste","At kende loven"]],["According to Proverbs, what is the beginning of wisdom?","The fear of the LORD",["Many years of experience","Listening to the elders","Knowing the law"]]);
add(20,12,"31",["Hvilket emne afslutter Ordsprogenes Bog med at beskrive?","Den dygtige hustru",["Den vise konge","Den retfærdige dommer","Den trofaste tjener"]],["What does the book of Proverbs end by describing?","The wife of noble character",["The wise king","The righteous judge","The faithful servant"]]);
add(21,9,"3",["I hvilken bog står den kendte tekst om, at alt har sin tid?","Prædikeren",["Ordsprogene","Salmerne","Job"]],["In which book is the well-known passage about a time for everything?","Ecclesiastes",["Proverbs","Psalms","Job"]]);
add(21,13,"1",["Hvilket ord bruger Prædikeren igen og igen om livet?","Tomhed (forgængelighed)",["Glæde","Frihed","Retfærdighed"]],["Which word does the Teacher repeat again and again about life?","Meaningless",["Joy","Freedom","Justice"]]);
add(22,10,"",["Hvilken bog skildrer kærligheden mellem brudgom og brud?","Højsangen",["Ruths Bog","Prædikeren","Hoseas Bog"]],["Which book portrays love between bridegroom and bride?","Song of Songs",["Ruth","Ecclesiastes","Hosea"]]);

/* ---------------- PROFETERNE ---------------- */
add(23,8,"7:14",["Hvilken profet forudsagde, at en jomfru skulle undfange og føde en søn?","Esajas",["Jeremias","Daniel","Mika"]],["Which prophet foretold that a virgin would conceive and bear a son?","Isaiah",["Jeremiah","Daniel","Micah"]]);
add(23,10,"6",["Hvilke væsener med seks vinger så Esajas i sit kaldelsessyn i templet?","Serafer",["Keruber","Ofanimer","Engle med sværd"]],["Which six-winged beings did Isaiah see in his vision in the temple?","Seraphim",["Cherubim","Ophanim","Angels with swords"]]);
add(23,12,"53",["Hvilket kapitel i Esajas beskriver den lidende tjener, som kristne læser om Jesus?","Kapitel 53",["Kapitel 1","Kapitel 6","Kapitel 40"]],["Which chapter of Isaiah describes the suffering servant, which Christians read about Jesus?","Chapter 53",["Chapter 1","Chapter 6","Chapter 40"]]);
add(23,13,"40:3",["Hvem anvender evangelierne Esajas' ord om en røst i ørkenen på?","Johannes Døberen",["Elias","Peter","Moses"]],["Whom do the Gospels apply Isaiah's words about a voice in the wilderness to?","John the Baptist",["Elijah","Peter","Moses"]]);
add(24,8,"",["Hvilken profet kaldes ofte 'den grædende profet'?","Jeremias",["Esajas","Ezekiel","Amos"]],["Which prophet is often called 'the weeping prophet'?","Jeremiah",["Isaiah","Ezekiel","Amos"]]);
add(24,13,"29",["Hvem skrev et brev til de bortførte i Babylon med løftet om fremtid og håb?","Jeremias",["Daniel","Ezekiel","Esajas"]],["Who wrote a letter to the exiles in Babylon with a promise of a future and hope?","Jeremiah",["Daniel","Ezekiel","Isaiah"]]);
add(24,14,"31:31",["Hvad lover Gud ifølge Jeremias at indgå med sit folk?","En ny pagt",["En ny lov med nye bud","En evig sabbat","Et nyt tempel"]],["According to Jeremiah, what does God promise to make with his people?","A new covenant",["A new law with new commandments","An eternal Sabbath","A new temple"]]);
add(25,11,"",["Over hvilken by sørger Klagesangene?","Jerusalem",["Babylon","Ninive","Samaria"]],["Which city does Lamentations mourn?","Jerusalem",["Babylon","Nineveh","Samaria"]]);
add(26,10,"37",["Hvad så Ezekiel i dalen i et syn?","Tørre ben, der blev levende",["En brændende busk","Syv magre køer","Et hjul i et hjul"]],["What did Ezekiel see in the valley in a vision?","Dry bones that came to life",["A burning bush","Seven thin cows","A wheel within a wheel"]]);
add(26,12,"1",["I hvilket land boede Ezekiel blandt de bortførte, da han fik sit første syn?","Babylon",["Egypten","Assyrien","Persien"]],["In which land did Ezekiel live among the exiles when he received his first vision?","Babylon",["Egypt","Assyria","Persia"]]);
add(27,2,"6",["Hvor blev Daniel kastet hen, fordi han bad til Gud?","I løvekulen",["I en ildovn","I en brønd","I fængsel"]],["Where was Daniel thrown for praying to God?","Into the lions' den",["Into a furnace","Into a well","Into prison"]]);
add(27,3,"3",["Hvor mange mænd blev kastet i den brændende ildovn?","Tre",["To","Fire","Syv"]],["How many men were thrown into the blazing furnace?","Three",["Two","Four","Seven"]]);
add(27,8,"5",["Hvad skete der under kong Belsazars gæstebud?","En hånd skrev på væggen",["Templet faldt sammen","Der kom en stor oversvømmelse","Kongen blev slået med blindhed"]],["What happened during King Belshazzar's feast?","A hand wrote on the wall",["The temple collapsed","A great flood came","The king was struck blind"]]);
add(27,10,"2",["Hvad drømte Nebukadnezar om i Daniel 2?","En stor statue af forskellige materialer",["Syv magre køer","En stige til himlen","Et træ, der voksede til himlen"]],["What did Nebuchadnezzar dream about in Daniel 2?","A great statue made of different materials",["Seven thin cows","A ladder to heaven","A tree that grew to the sky"]]);
add(27,14,"7",["Hvilken titel bruges om skikkelsen, der kommer med himlens skyer i Daniels syn?","Menneskesøn",["Guds tjener","Salvede konge","Den Gamle af dage"]],["What title is used for the figure who comes with the clouds of heaven in Daniel's vision?","Son of Man",["Servant of God","Anointed king","Ancient of Days"]]);
add(28,14,"1-3",["Hvad var Hoseas ægteskab et billede på?","Guds trofasthed mod et utro Israel",["Kongens magt","Templets herlighed","Lovens strenghed"]],["What was Hosea's marriage a picture of?","God's faithfulness to an unfaithful Israel",["The king's power","The temple's glory","The law's severity"]]);
add(28,16,"1",["Hvad hed Hoseas hustru?","Gomer",["Rut","Jezebel","Abigajil"]],["What was the name of Hosea's wife?","Gomer",["Ruth","Jezebel","Abigail"]]);
add(29,9,"2",["Hvilken profet citerer Peter på pinsedag om udgydelsen af Guds Ånd?","Joel",["Esajas","Amos","Zakarias"]],["Which prophet does Peter quote at Pentecost about the outpouring of God's Spirit?","Joel",["Isaiah","Amos","Zechariah"]]);
add(30,12,"1",["Hvad arbejdede Amos med, før han blev profet?","Han var fårehyrde",["Han var præst","Han var soldat","Han var skriver"]],["What was Amos' occupation before he became a prophet?","He was a shepherd",["He was a priest","He was a soldier","He was a scribe"]]);
add(30,13,"5:24",["Hvad skal ifølge Amos strømme som en flod?","Retfærdighed",["Mælk og honning","Guds herlighed","Lovsang"]],["According to Amos, what should roll on like a river?","Justice",["Milk and honey","God's glory","Praise"]]);
add(31,15,"",["Hvilket folk rettes Obadjas profeti mod?","Edom",["Moab","Ammon","Filisterne"]],["Which nation is Obadiah's prophecy directed against?","Edom",["Moab","Ammon","The Philistines"]]);
add(31,16,"",["Hvilken bog er den korteste i Det Gamle Testamente?","Obadja",["Joel","Haggaj","Nahum"]],["Which book is the shortest in the Old Testament?","Obadiah",["Joel","Haggai","Nahum"]]);
add(32,1,"1",["Hvad slugte Jonas?","En stor fisk",["En hval med to hoveder","En krokodille","En slange"]],["What swallowed Jonah?","A great fish",["A two-headed whale","A crocodile","A snake"]]);
add(32,4,"1",["Til hvilken by blev Jonas sendt for at prædike?","Ninive",["Babylon","Jerusalem","Tarsis"]],["To which city was Jonah sent to preach?","Nineveh",["Babylon","Jerusalem","Tarshish"]]);
add(32,9,"4",["Hvordan reagerede Jonas på, at Gud skånede Ninive?","Han blev vred",["Han blev glad","Han blev bange","Han rejste hjem uden at sige noget"]],["How did Jonah react when God spared Nineveh?","He became angry",["He was delighted","He was afraid","He went home without a word"]]);
add(33,7,"5:2",["Hvilken by udpeger Mika som fødested for den kommende hersker?","Betlehem",["Nazaret","Jerusalem","Hebron"]],["Which town does Micah name as the birthplace of the coming ruler?","Bethlehem",["Nazareth","Jerusalem","Hebron"]]);
add(33,13,"6:8",["Hvad kræver Herren ifølge Mika 6?","At gøre ret, elske godhed og vandre ydmygt med Gud",["At ofre hver dag","At holde alle fester","At bygge et nyt tempel"]],["According to Micah 6, what does the LORD require?","To act justly, love mercy and walk humbly with God",["To sacrifice daily","To keep all the feasts","To build a new temple"]]);
add(34,14,"",["Hvilken by dømmes i Nahums bog?","Ninive",["Babylon","Tyrus","Damaskus"]],["Which city is judged in the book of Nahum?","Nineveh",["Babylon","Tyre","Damascus"]]);
add(35,13,"2:4",["Hvad skal ifølge Habakkuk den retfærdige leve af?","Sin tro",["Sine gerninger","Loven","Templets ofre"]],["According to Habakkuk, what shall the righteous live by?","His faith",["His works","The law","Temple sacrifices"]]);
add(36,15,"",["Hvilket tema går igen i Zefanias' bog?","Herrens dag",["Genopbygning af templet","Tilbedelse med instrumenter","Nytårsfesten"]],["Which theme recurs in the book of Zephaniah?","The day of the LORD",["Rebuilding the temple","Worship with instruments","The New Year festival"]]);
add(37,13,"1",["Hvilken opgave opfordrer Haggaj folket til at tage fat på?","At genopbygge templet",["At bygge en ny mur","At forlade landet","At vælge en konge"]],["What task does Haggai urge the people to take up?","Rebuilding the temple",["Building a new wall","Leaving the land","Choosing a king"]]);
add(38,10,"9:9",["På hvilket dyr forudsiger Zakarias, at Kongen kommer ridende?","Et æsel",["En hest","En kamel","En muldyr"]],["On which animal does Zechariah foretell that the King will come riding?","A donkey",["A horse","A camel","A mule"]]);
add(38,14,"11:12-13",["Hvor mange sølvstykker nævnes som lønnen i Zakarias 11, som Matthæus senere knytter til Judas?","30",["12","40","100"]],["How many pieces of silver are mentioned as the wages in Zechariah 11, which Matthew later connects to Judas?","30",["12","40","100"]]);
add(39,8,"",["Hvilken bog er den sidste i Det Gamle Testamente?","Malakias",["Zakarias","Haggaj","Daniel"]],["Which book is the last in the Old Testament?","Malachi",["Zechariah","Haggai","Daniel"]]);
add(39,11,"3:10",["Hvad opfordres folk til at bringe til forrådshuset ifølge Malakias?","Hele tienden",["Førstegrøden alene","Lam uden fejl","Røgelse"]],["According to Malachi, what are the people urged to bring to the storehouse?","The whole tithe",["Only firstfruits","Unblemished lambs","Incense"]]);

/* ---------------- MATTÆUS ---------------- */
add(40,1,"1",["Hvem var Jesu mor?","Maria",["Marta","Elisabeth","Maria Magdalene"]],["Who was Jesus' mother?","Mary",["Martha","Elizabeth","Mary Magdalene"]]);
add(40,1,"2",["Hvilken by blev Jesus født i?","Betlehem",["Nazaret","Jerusalem","Kapernaum"]],["In which town was Jesus born?","Bethlehem",["Nazareth","Jerusalem","Capernaum"]]);
add(40,2,"2",["Hvem besøgte Jesus efter hans fødsel med guld, røgelse og myrra?","Nogle vise mænd fra Østen",["Tre konger fra Egypten","Hyrderne fra marken","De tolv disciple"]],["Who visited Jesus after his birth with gold, frankincense and myrrh?","Magi from the East",["Three kings from Egypt","The shepherds from the fields","The twelve disciples"]]);
add(40,2,"10",["Hvor mange disciple udvalgte Jesus som sine nærmeste?","Tolv",["Syv","Ti","Halvfjerds"]],["How many disciples did Jesus choose as his closest followers?","Twelve",["Seven","Ten","Seventy"]]);
add(40,2,"26",["Hvem forrådte Jesus for tredive sølvstykker?","Judas Iskariot",["Peter","Thomas","Johannes"]],["Who betrayed Jesus for thirty pieces of silver?","Judas Iscariot",["Peter","Thomas","John"]]);
add(40,3,"14",["Hvem gik et stykke på vandet for at komme hen til Jesus?","Peter",["Johannes","Jakob","Andreas"]],["Who walked on water to go toward Jesus?","Peter",["John","James","Andrew"]]);
add(40,4,"4",["Hvor mange dage fastede Jesus i ørkenen?","Fyrre",["Syv","Tolv","Halvtreds"]],["How many days did Jesus fast in the wilderness?","Forty",["Seven","Twelve","Fifty"]]);
add(40,4,"5-7",["Hvad kaldes Jesu store tale på bjerget?","Bjergprædikenen",["Afskedstalen","Missionstalen","Lignelsestalen"]],["What is Jesus' great teaching on the mountain called?","The Sermon on the Mount",["The Farewell Discourse","The Great Commission","The Parable Discourse"]]);
add(40,4,"14",["Hvor mange mennesker blev mættet med fem brød og to fisk (mænd, ikke regnet kvinder og børn)?","Cirka 5.000",["Cirka 500","Cirka 12.000","Cirka 100"]],["How many men were fed with five loaves and two fish (not counting women and children)?","About 5,000",["About 500","About 12,000","About 100"]]);
add(40,4,"26",["Hvor mange gange fornægtede Peter Jesus den nat, han blev forrådt?","Tre gange",["To gange","Syv gange","Én gang"]],["How many times did Peter deny Jesus on the night he was betrayed?","Three times",["Twice","Seven times","Once"]]);
add(40,5,"9",["Hvilken tolder blev kaldt af Jesus til at følge ham?","Mattæus",["Zakæus","Simon","Filip"]],["Which tax collector was called by Jesus to follow him?","Matthew",["Zacchaeus","Simon","Philip"]]);
add(40,3,"6",["Hvad kaldes den bøn, Jesus lærte disciplene?","Fadervor",["Trosbekendelsen","Velsignelsen","Hallelujasalmen"]],["What is the prayer Jesus taught his disciples called?","The Lord's Prayer",["The Creed","The Benediction","The Hallelujah Psalm"]]);
add(40,8,"13",["Hvilket frø sammenligner Jesus Himmeriget med som det mindste af alle frø?","Sennepsfrøet",["Hvedekornet","Fikenkernen","Byggen"]],["Which seed does Jesus compare the kingdom of heaven to as the smallest of all seeds?","The mustard seed",["The wheat grain","The fig seed","Barley"]]);
add(40,10,"25",["Hvor mange jomfruer var der i lignelsen om brudens brudepiger?","Ti",["Fem","Syv","Tolv"]],["How many virgins were in the parable of the bridesmaids?","Ten",["Five","Seven","Twelve"]]);
add(40,9,"28:19",["Hvad kaldes Jesu sidste befaling til disciplene hos Mattæus?","Missionsbefalingen",["Fadervor","Bjergprædikenen","Forklaringen"]],["What is Jesus' final command to the disciples in Matthew called?","The Great Commission",["The Lord's Prayer","The Sermon on the Mount","The Transfiguration"]]);
add(40,12,"16:18",["Hvad siger Jesus, at han vil bygge på 'klippen' i Mattæus 16?","Sin menighed",["Et tempel i Jerusalem","En ny konge","Et nyt Israel af sten"]],["What does Jesus say he will build on 'this rock' in Matthew 16?","His church",["A temple in Jerusalem","A new kingdom","A new Israel of stone"]]);

/* ---------------- MARKUS ---------------- */
add(41,2,"11",["Hvilket dyr red Jesus på ind i Jerusalem?","Et æsel (ung æselføl)",["En hest","En kamel","En okse"]],["Which animal did Jesus ride into Jerusalem?","A donkey (colt)",["A horse","A camel","An ox"]]);
add(41,3,"1",["Hvem døbte Jesus i Jordan?","Johannes Døberen",["Peter","Elias","Andreas"]],["Who baptized Jesus in the Jordan?","John the Baptist",["Peter","Elijah","Andrew"]]);
add(41,5,"4",["Hvad gjorde Jesus, da stormen kom på Genesaret Sø?","Han stillede stormen",["Han bad disciplene ro hurtigere","Han sov til stormen lagde sig","Han vendte tilbage til land"]],["What did Jesus do when the storm came on the Sea of Galilee?","He calmed the storm",["He told the disciples to row faster","He slept until it passed","He returned to shore"]]);
add(41,8,"10:46",["Hvad hed den blinde tigger, Jesus helbredte ved Jeriko?","Bartimæus",["Lazarus","Jairus","Simon"]],["What was the name of the blind beggar Jesus healed near Jericho?","Bartimaeus",["Lazarus","Jairus","Simon"]]);
add(41,10,"5",["Hvilket navn gav den besatte mand fra Gerasa sig selv?","Legion",["Belsebub","Abaddon","Mammon"]],["What name did the possessed man from the region of the Gerasenes give himself?","Legion",["Beelzebul","Abaddon","Mammon"]]);
add(41,14,"",["Hvilket ord bruger Markus' evangelium meget ofte til at skabe tempo?","Straks",["Sandelig","Herefter","Amen"]],["Which word does Mark's Gospel use very often to create pace?","Immediately",["Truly","Afterward","Amen"]]);

/* ---------------- LUKAS ---------------- */
add(42,2,"2",["Hvem fortalte hyrderne i marken om Jesu fødsel?","En engel",["Maria","Simeon","Zakarias"]],["Who told the shepherds in the fields about Jesus' birth?","An angel",["Mary","Simeon","Zechariah"]]);
add(42,4,"10",["Hvem hjalp ifølge lignelsen manden, der blev overfaldet på vejen til Jeriko?","Samaritaneren",["Præsten","Levitten","En romersk soldat"]],["According to the parable, who helped the man attacked on the road to Jericho?","The Samaritan",["The priest","The Levite","A Roman soldier"]]);
add(42,5,"19",["Hvem klatrede op i et morbærfigentræ for at se Jesus?","Zakæus",["Nikodemus","Bartimæus","Levi"]],["Who climbed a sycamore-fig tree to see Jesus?","Zacchaeus",["Nicodemus","Bartimaeus","Levi"]]);
add(42,6,"15",["Hvad bad den yngre søn sin far om i lignelsen om den fortabte søn?","Sin del af arven",["En rejse til Rom","Et nyt hus","En tjener"]],["What did the younger son ask his father for in the parable of the prodigal son?","His share of the inheritance",["A trip to Rome","A new house","A servant"]]);
add(42,6,"1",["Hvad hed englen, der kom til Maria med budskabet om Jesus?","Gabriel",["Mikael","Rafael","Uriel"]],["What was the name of the angel who came to Mary with the news about Jesus?","Gabriel",["Michael","Raphael","Uriel"]]);
add(42,7,"10",["Hvilke to søstre fik Jesus på besøg?","Marta og Maria",["Rakel og Lea","Rut og Orpa","Ester og Debora"]],["Which two sisters welcomed Jesus into their home?","Martha and Mary",["Rachel and Leah","Ruth and Orpah","Esther and Deborah"]]);
add(42,13,"1",["Til hvem skrev Lukas sit evangelium?","Teofilus",["Titus","Timotheus","Filemon"]],["To whom did Luke write his Gospel?","Theophilus",["Titus","Timothy","Philemon"]]);

/* ---------------- JOHANNES ---------------- */
add(43,2,"2",["Hvad forvandlede Jesus vand til ved brylluppet i Kana?","Vin",["Mælk","Olie","Honning"]],["What did Jesus turn water into at the wedding in Cana?","Wine",["Milk","Oil","Honey"]]);
add(43,4,"11",["Hvem opvakte Jesus fra de døde i Betania?","Lazarus",["Jairus' datter","Dorkas","Eutykus"]],["Who did Jesus raise from the dead in Bethany?","Lazarus",["Jairus' daughter","Dorcas","Eutychus"]]);
add(43,6,"3",["Hvem kom til Jesus om natten for at tale med ham?","Nikodemus",["Josef fra Arimatæa","Zakæus","Pilatus"]],["Who came to Jesus at night to talk with him?","Nicodemus",["Joseph of Arimathea","Zacchaeus","Pilate"]]);
add(43,8,"20",["Hvilken discipel sagde 'Min Herre og min Gud' til den opstandne Jesus?","Thomas",["Peter","Filip","Judas"]],["Which disciple said 'My Lord and my God' to the risen Jesus?","Thomas",["Peter","Philip","Judas"]]);
add(43,9,"21",["Hvor mange gange spurgte den opstandne Jesus Peter, om han elskede ham?","Tre",["To","Syv","Én"]],["How many times did the risen Jesus ask Peter if he loved him?","Three",["Twice","Seven","Once"]]);
add(43,9,"1",["Hvad kaldes Jesus i begyndelsen af Johannes' evangelium?","Ordet",["Lyset alene","Hyrden","Vinstokken"]],["What is Jesus called at the beginning of John's Gospel?","The Word",["The Light alone","The Shepherd","The Vine"]]);
add(43,14,"",["Hvilket af disse er IKKE et af Jesu 'Jeg er'-udsagn i Johannes' evangelium?","Jeg er klippen",["Jeg er livets brød","Jeg er den gode hyrde","Jeg er det sande vintræ"]],["Which of these is NOT one of Jesus' 'I am' statements in John's Gospel?","I am the rock",["I am the bread of life","I am the good shepherd","I am the true vine"]]);

/* ---------------- APOSTLENES GERNINGER ---------------- */
add(44,5,"2",["Hvad skete der på pinsedagen?","Helligånden blev udgydt over disciplene",["Jesus steg op til himlen","Peter blev kastet i fængsel","Templet blev ødelagt"]],["What happened on the day of Pentecost?","The Holy Spirit was poured out on the disciples",["Jesus ascended to heaven","Peter was thrown into prison","The temple was destroyed"]]);
add(44,5,"9",["På vejen til hvilken by mødte Saulus den opstandne Jesus?","Damaskus",["Jerusalem","Antiokia","Rom"]],["On the road to which city did Saul meet the risen Jesus?","Damascus",["Jerusalem","Antioch","Rome"]]);
add(44,6,"",["Hvad hed Paulus, før han blev kaldt Paulus?","Saulus",["Silas","Barnabas","Stefanus"]],["What was Paul called before he was named Paul?","Saul",["Silas","Barnabas","Stephen"]]);
add(44,7,"1",["Hvem blev ifølge Apostlenes Gerninger valgt til at erstatte Judas Iskariot blandt de tolv?","Mattias",["Barnabas","Silas","Stefanus"]],["Who was chosen to replace Judas Iscariot among the twelve?","Matthias",["Barnabas","Silas","Stephen"]]);
add(44,7,"",["Hvem skrev Apostlenes Gerninger?","Lukas",["Paulus","Peter","Johannes"]],["Who wrote the book of Acts?","Luke",["Paul","Peter","John"]]);
add(44,8,"7",["Hvem var den første kristne martyr?","Stefanus",["Jakob","Peter","Filip"]],["Who was the first Christian martyr?","Stephen",["James","Peter","Philip"]]);
add(44,10,"10",["Hvilken romersk officer fik besøg af Peter og blev den første ikke-jøde, der kom til tro?","Kornelius",["Julius","Lysias","Felix"]],["Which Roman officer was visited by Peter and became the first Gentile believer?","Cornelius",["Julius","Lysias","Felix"]]);
add(44,10,"21-22",["Hvilken by var Paulus' fødeby?","Tarsus",["Damaskus","Antiokia","Efesus"]],["Which city was Paul's hometown?","Tarsus",["Damascus","Antioch","Ephesus"]]);
add(44,12,"11",["I hvilken by blev disciplene først kaldt kristne?","Antiokia",["Jerusalem","Rom","Korinth"]],["In which city were the disciples first called Christians?","Antioch",["Jerusalem","Rome","Corinth"]]);
add(44,12,"16",["I hvilken by blev Paulus og Silas fængslet, og et jordskælv rystede fængslet om natten?","Filippi",["Korinth","Efesus","Thessalonika"]],["In which city were Paul and Silas imprisoned when an earthquake shook the jail at night?","Philippi",["Corinth","Ephesus","Thessalonica"]]);
add(44,15,"15",["Hvad drøftede apostelmødet i Jerusalem?","Om ikke-jøder skulle omskæres for at blive frelst",["Hvem der skulle være Jesu efterfølger","Hvornår Jesus ville komme igen","Hvordan templet skulle genopbygges"]],["What did the Council of Jerusalem discuss?","Whether Gentiles had to be circumcised to be saved",["Who would succeed Jesus","When Jesus would return","How to rebuild the temple"]]);

/* ---------------- BREVENE ---------------- */
add(45,4,"1",["Hvem er forfatter til Romerbrevet?","Paulus",["Peter","Johannes","Jakob"]],["Who wrote the letter to the Romans?","Paul",["Peter","John","James"]]);
add(45,10,"8",["Hvad kan ifølge Romerbrevet 8 intet skille os fra?","Guds kærlighed i Kristus Jesus",["Kirkens fællesskab","Vores egne gerninger","Dødens magt alene"]],["According to Romans 8, what can nothing separate us from?","The love of God in Christ Jesus",["The church's fellowship","Our own works","The power of death alone"]]);
add(45,10,"5:1",["Hvad har vi ifølge Romerbrevet 5, når vi er retfærdiggjort ved tro?","Fred med Gud",["Rigdom","Magt over onde ånder","Frihed fra al lidelse"]],["According to Romans 5, what do we have when justified by faith?","Peace with God",["Wealth","Power over evil spirits","Freedom from all suffering"]]);
add(45,11,"12",["I hvilke tre bibelsteder findes de største lister over nådegaver?","Rom 12, 1 Kor 12 og Ef 4",["Gal 5, Fil 2 og Kol 3","Matt 5, Luk 6 og Joh 15","Apg 2, Jak 1 og 1 Joh 4"]],["In which three Bible passages are the main lists of spiritual gifts found?","Rom 12, 1 Cor 12 and Eph 4",["Gal 5, Phil 2 and Col 3","Matt 5, Luke 6 and John 15","Acts 2, James 1 and 1 John 4"]]);
add(45,16,"9-11",["Hvilket billede bruger Paulus om ikke-jøders plads i Guds folk i Romerbrevet 11?","Et oliventræ",["Et vintræ","En bygning","Et legeme"]],["What image does Paul use for Gentiles' place among God's people in Romans 11?","An olive tree",["A vine","A building","A body"]]);
add(46,7,"13",["Hvilket kapitel i 1 Korintherbrev kaldes ofte kærlighedens højsang?","Kapitel 13",["Kapitel 1","Kapitel 12","Kapitel 15"]],["Which chapter of 1 Corinthians is often called the love chapter?","Chapter 13",["Chapter 1","Chapter 12","Chapter 15"]]);
add(46,8,"12",["Hvilket billede bruger Paulus om menigheden i 1 Korintherbrev 12?","Et legeme med mange lemmer",["En bygning af sten","En flok får","En vingård"]],["What image does Paul use for the church in 1 Corinthians 12?","A body with many parts",["A building of stones","A flock of sheep","A vineyard"]]);
add(46,11,"15",["Hvad handler 1 Korintherbrev 15 især om?","Opstandelsen",["Nadveren","Tungetale","Ægteskabet"]],["What is 1 Corinthians 15 mainly about?","The resurrection",["The Lord's Supper","Speaking in tongues","Marriage"]]);
add(46,14,"14",["Hvad foretrækker Paulus frem for tungetale i menighedens samling?","Profeti, så alle forstår",["Højlydt bøn","Stilhed","Sang uden ord"]],["What does Paul prefer over tongues in the church gathering?","Prophecy, so everyone understands",["Loud prayer","Silence","Singing without words"]]);
add(46,15,"12:8-10",["Hvilken af disse nævnes blandt nådegaverne i 1 Korintherbrev 12,8-10?","Skelnen mellem ånder",["Evangelistgaven","Barmhjertighed","At give"]],["Which of these is listed among the spiritual gifts in 1 Corinthians 12:8-10?","Distinguishing between spirits",["The gift of evangelist","Showing mercy","Giving"]]);
add(47,10,"5:17",["Hvad er den, der er i Kristus, ifølge 2 Korintherbrev 5?","En ny skabning",["En tjener","En fremmed","En discipel"]],["According to 2 Corinthians 5, what is anyone who is in Christ?","A new creation",["A servant","A stranger","A disciple"]]);
add(47,10,"9:7",["Hvem elsker Gud, ifølge 2 Korintherbrev 9?","En glad giver",["En stor giver","En stille giver","En hemmelig giver"]],["Whom does God love, according to 2 Corinthians 9?","A cheerful giver",["A large giver","A quiet giver","A secret giver"]]);
add(47,12,"12",["Hvad kalder Paulus sin svaghed i 2 Korintherbrev 12?","En torn i kødet",["En byrde på ryggen","En sten i skoen","En skygge på vejen"]],["What does Paul call his weakness in 2 Corinthians 12?","A thorn in the flesh",["A burden on the back","A stone in the shoe","A shadow on the road"]]);
add(48,7,"5:22",["Hvilken af disse er en del af Åndens frugt i Galaterbrevet 5?","Selvbeherskelse",["Visdom","Tungetale","Helbredelse"]],["Which of these is part of the fruit of the Spirit in Galatians 5?","Self-control",["Wisdom","Tongues","Healing"]]);
add(48,11,"2:16",["Hvad bliver et menneske ifølge Galaterbrevet retfærdiggjort ved?","Tro på Jesus Kristus",["Lovens gerninger","Omskærelse","Faste og bøn"]],["According to Galatians, by what is a person justified?","Faith in Jesus Christ",["Works of the law","Circumcision","Fasting and prayer"]]);
add(49,8,"2:8-9",["Hvordan er vi ifølge Efeserbrevet 2 frelst?","Af nåde ved tro",["Ved vores gerninger","Ved dåben alene","Ved vores bøn"]],["According to Ephesians 2, how are we saved?","By grace through faith",["By our works","By baptism alone","By our prayers"]]);
add(49,9,"6:17",["Hvad er 'Åndens sværd' ifølge Efeserbrevet 6?","Guds ord",["Bønnen","Troen","Frelsen"]],["According to Ephesians 6, what is 'the sword of the Spirit'?","The word of God",["Prayer","Faith","Salvation"]]);
add(49,14,"4:11",["Hvilken af disse tjenester nævnes i Efeserbrevet 4,11?","Evangelister",["Diakoner","Ældste","Tungetalere"]],["Which of these ministries is listed in Ephesians 4:11?","Evangelists",["Deacons","Elders","Tongue-speakers"]]);
add(50,9,"1",["Hvor befandt Paulus sig, da han skrev Filipperbrevet?","I fængsel",["På en missionsrejse","I Jerusalem","I Efesus' teater"]],["Where was Paul when he wrote Philippians?","In prison",["On a missionary journey","In Jerusalem","In the theater of Ephesus"]]);
add(50,9,"4:4",["Hvilken opfordring gentager Paulus i Filipperbrevet 4?","Glæd jer altid i Herren",["Frygt Herren","Vågn op og vær ædru","Fast og bed"]],["Which encouragement does Paul repeat in Philippians 4?","Rejoice in the Lord always",["Fear the Lord","Wake up and be sober","Fast and pray"]]);
add(51,13,"1:15",["Hvad kaldes Kristus i Kolossenserbrevet 1?","Den usynlige Guds billede",["Den første engel","Templets hjørnesten","Moses' efterfølger"]],["What is Christ called in Colossians 1?","The image of the invisible God",["The first angel","The cornerstone of the temple","Moses' successor"]]);
add(52,11,"4",["Hvad beskriver Paulus i 1 Thessalonikerbrev 4, at Herren vil gøre ved sit genkomst?","Stige ned fra himlen, og de døde i Kristus opstår først",["Gøre en ny jord uden himmel","Genopbygge templet","Samle alle folk i Jerusalem"]],["What does Paul describe in 1 Thessalonians 4 about the Lord's return?","The Lord comes down from heaven and the dead in Christ rise first",["He makes a new earth without heaven","He rebuilds the temple","He gathers all nations in Jerusalem"]]);
add(53,13,"3:10",["Hvilket princip om arbejde nævner Paulus i 2 Thessalonikerbrev 3?","Den, der ikke vil arbejde, skal heller ikke spise",["Hvil hver syvende dag","Arbejd kun for Gud","Giv alt til de fattige"]],["Which principle about work does Paul mention in 2 Thessalonians 3?","Anyone unwilling to work should not eat",["Rest every seventh day","Work only for God","Give everything to the poor"]]);
add(54,9,"1",["Hvem var Timotheus for Paulus?","En åndelig søn og medarbejder",["En romersk embedsmand","En jødisk præst","Hans bror"]],["Who was Timothy to Paul?","A spiritual son and co-worker",["A Roman official","A Jewish priest","His brother"]]);
add(54,13,"3",["Hvilke to menighedstjenester beskriver 1 Timotheusbrev 3 krav til?","Tilsynsmænd og diakoner",["Apostle og profeter","Lærere og evangelister","Præster og levitter"]],["Which two church roles does 1 Timothy 3 describe qualifications for?","Overseers and deacons",["Apostles and prophets","Teachers and evangelists","Priests and Levites"]]);
add(55,10,"3:16",["Hvad siger 2 Timotheusbrev 3 om hele Skriften?","Den er indblæst af Gud",["Den er kun gyldig for jøder","Den er skrevet af Paulus","Den er kun til lærere"]],["What does 2 Timothy 3 say about all Scripture?","It is God-breathed",["It is only for Jews","It was written by Paul","It is only for teachers"]]);
add(55,10,"4:7",["Hvad siger Paulus, at han har gjort, kort før sin død?","Kæmpet den gode kamp",["Bygget mange menigheder","Fuldendt alle sine rejser","Skrevet alle sine breve"]],["What does Paul say he has done shortly before his death?","Fought the good fight",["Built many churches","Completed all his journeys","Written all his letters"]]);
add(56,15,"1:5",["På hvilken ø efterlod Paulus Titus?","Kreta",["Cypern","Patmos","Malta"]],["On which island did Paul leave Titus?","Crete",["Cyprus","Patmos","Malta"]]);
add(57,14,"",["Hvilken slave skriver Paulus om i brevet til Filemon?","Onesimus",["Tykikus","Epafras","Aristarkus"]],["Which slave does Paul write about in the letter to Philemon?","Onesimus",["Tychicus","Epaphras","Aristarchus"]]);
add(58,9,"11",["Hvad handler Hebræerbrevet 11 om?","Troens helte",["Lovens bud","Profetier om Messias","De syv menigheder"]],["What is Hebrews 11 about?","Heroes of faith",["Laws","Prophecies about the Messiah","The seven churches"]]);
add(58,10,"11:1",["Hvad er tro ifølge Hebræerbrevet 11,1?","Fast tillid til det, man håber på, og overbevisning om det, man ikke ser",["At holde loven","At være en del af kirken","At tro på mirakler"]],["According to Hebrews 11:1, what is faith?","Confidence in what we hope for and assurance about what we do not see",["Keeping the law","Being part of the church","Believing in miracles"]]);
add(58,12,"4:14",["Hvad kaldes Jesus i Hebræerbrevet?","Ypperstepræst",["Dommer","Profet som Moses","Hyrde for hedninger"]],["What is Jesus called in Hebrews?","High priest",["Judge","Prophet like Moses","Shepherd of the Gentiles"]]);
add(58,16,"7",["Hvem sammenlignes Jesus med som præst i Hebræerbrevet 7?","Melkisedek",["Aron","Elias","Eli"]],["Whom is Jesus compared to as a priest in Hebrews 7?","Melchizedek",["Aaron","Elijah","Eli"]]);
add(59,7,"3",["Hvilket legemsdel kan ingen tæmme ifølge Jakobs brev?","Tungen",["Hånden","Øjet","Hjertet"]],["Which part of the body can no one tame, according to James?","The tongue",["The hand","The eye","The heart"]]);
add(59,8,"2",["Hvad siger Jakob om tro uden gerninger?","Den er død",["Den er nok til frelse","Den er ufuldkommen men god","Den er kun for de svage"]],["What does James say about faith without deeds?","It is dead",["It is enough for salvation","It is imperfect but good","It is only for the weak"]]);
add(59,12,"5",["Hvad skal en syg gøre ifølge Jakobs brev 5?","Kalde menighedens ældste, som beder og salver med olie",["Faste i syv dage","Ofre i templet","Rejse til Jerusalem"]],["According to James 5, what should a sick person do?","Call the elders of the church to pray and anoint with oil",["Fast for seven days","Offer in the temple","Travel to Jerusalem"]]);
add(60,10,"2:9",["Hvad kaldes de troende i 1 Petersbrev 2?","Et udvalgt slægt, et kongeligt præsteskab",["Guds trælle","Verdens lys alene","Templets stene alene"]],["What are believers called in 1 Peter 2?","A chosen people, a royal priesthood",["God's slaves","The light of the world alone","Temple stones alone"]]);
add(60,11,"4:10",["Hvad skal vi ifølge 1 Petersbrev 4 bruge vores nådegaver til?","At tjene hinanden",["At vise vores åndelige styrke","At blive berømte","At bevise vores tro"]],["According to 1 Peter 4, what should we use our spiritual gifts for?","To serve one another",["To show our spiritual strength","To become famous","To prove our faith"]]);
add(61,13,"2",["Hvad advarer 2 Petersbrev især imod?","Falske lærere",["Forfølgelse","Rigdom","Fristelse til stolthed"]],["What does 2 Peter especially warn against?","False teachers",["Persecution","Wealth","Temptation to pride"]]);
add(61,14,"3:8",["Hvad siger 2 Petersbrev 3 om en dag for Herren?","Den er som tusind år",["Den er kort som et øjeblik","Den er som et år","Den er evig"]],["What does 2 Peter 3 say about one day with the Lord?","It is like a thousand years",["It is as short as a moment","It is like a year","It is eternal"]]);
add(62,5,"4:8",["Hvad siger 1 Johannesbrev, at Gud er?","Kærlighed",["Dommer","Konge","Skaber alene"]],["What does 1 John say God is?","Love",["Judge","King","Creator only"]]);
add(62,10,"1:9",["Hvad sker der ifølge 1 Johannes 1, hvis vi bekender vores synder?","Gud tilgiver og renser os",["Vi skal gøre bod i et år","Vi må vente på dommen","Vi skal tilbyde ofre"]],["According to 1 John 1, what happens if we confess our sins?","God forgives and purifies us",["We must do penance for a year","We must wait for judgment","We must offer sacrifices"]]);
add(63,16,"",["Til hvem er 2 Johannesbrev stilet?","Den udvalgte frue og hendes børn",["Menigheden i Efesus","Titus","Timotheus"]],["To whom is 2 John addressed?","The chosen lady and her children",["The church in Ephesus","Titus","Timothy"]]);
add(64,16,"",["Hvem roses for sin gæstfrihed i 3 Johannesbrev?","Gajus",["Diotrefes","Demetrius","Timotheus"]],["Who is praised for hospitality in 3 John?","Gaius",["Diotrephes","Demetrius","Timothy"]]);
add(65,15,"",["Hvem er Judas' bror ifølge Judas' brev?","Jakob",["Johannes","Peter","Paulus"]],["Who is Jude's brother according to the letter of Jude?","James",["John","Peter","Paul"]]);

/* ---------------- ÅBENBARINGEN ---------------- */
add(66,5,"1",["Hvem fik åbenbaringen på øen Patmos?","Johannes",["Paulus","Peter","Lukas"]],["Who received the revelation on the island of Patmos?","John",["Paul","Peter","Luke"]]);
add(66,8,"2-3",["Hvor mange menigheder skriver Johannes til i Åbenbaringen?","Syv",["Tolv","Fem","Ti"]],["How many churches does John write to in Revelation?","Seven",["Twelve","Five","Ten"]]);
add(66,11,"3",["Hvilken af de syv menigheder bliver kaldt 'lunken'?","Laodikea",["Smyrna","Efesus","Filadelfia"]],["Which of the seven churches is called 'lukewarm'?","Laodicea",["Smyrna","Ephesus","Philadelphia"]]);
add(66,10,"21",["Hvad ser Johannes komme ned fra himlen i Åbenbaringen 21?","Det nye Jerusalem",["Det gamle tempel","En ny konge på hest","Et gyldent alter"]],["What does John see coming down from heaven in Revelation 21?","The new Jerusalem",["The old temple","A new king on a horse","A golden altar"]]);
add(66,13,"13:18",["Hvilket tal nævnes som dyrets tal i Åbenbaringen 13?","666",["777","144.000","12"]],["Which number is given as the number of the beast in Revelation 13?","666",["777","144,000","12"]]);
add(66,15,"7:4",["Hvor mange fra Israels stammer blev beseglet i Åbenbaringen 7?","144.000",["12.000","666","7.000"]],["How many from the tribes of Israel were sealed in Revelation 7?","144,000",["12,000","666","7,000"]]);

/* ---------------- ekstra: sværere spørgsmål (niveau 16-20) ---------------- */
add(1,17,"14:14",["Hvor mange oplærte mænd tog Abram med for at redde Lot?","318",["72","144","400"]],["How many trained men did Abram take to rescue Lot?","318",["72","144","400"]]);
add(7,17,"3:15",["Fra hvilken stamme kom dommeren Ehud?","Benjamin",["Juda","Efraim","Dan"]],["Which tribe was the judge Ehud from?","Benjamin",["Judah","Ephraim","Dan"]]);
add(11,17,"6:38",["Hvor lang tid tog det Salomon at bygge templet?","Syv år",["Tre år","Tretten år","Fyrre år"]],["How long did it take Solomon to build the temple?","Seven years",["Three years","Thirteen years","Forty years"]]);
add(19,17,"90",["Hvilken salme er overskrevet som 'en bøn af Moses'?","Salme 90",["Salme 23","Salme 51","Salme 119"]],["Which psalm is titled 'A prayer of Moses'?","Psalm 90",["Psalm 23","Psalm 51","Psalm 119"]]);
add(23,17,"6:1",["I hvilket år så Esajas Herren i templet ifølge Esajas 6?","Det år kong Uzzija døde",["Det år kong Hizkia faldt syg","Det år Jerusalem faldt","Det år kong Josias blev født"]],["In which year did Isaiah see the Lord in the temple according to Isaiah 6?","The year King Uzziah died",["The year King Hezekiah fell ill","The year Jerusalem fell","The year King Josiah was born"]]);
add(23,17,"1:1",["Hvad hed Esajas' far?","Amoz",["Beeri","Hilkia","Petuel"]],["What was the name of Isaiah's father?","Amoz",["Beeri","Hilkiah","Pethuel"]]);
add(25,17,"1-4",["Hvilket litterært træk har Klagesangene 1–4 i den hebraiske grundtekst?","Akrostikon: versene følger det hebraiske alfabet",["Hvert kapitel slutter med en lovprisning","Alle kapitler er skrevet som dialog","Hver vers rimer på det forrige"]],["Which literary feature do Lamentations 1–4 have in the original Hebrew?","Acrostic: the verses follow the Hebrew alphabet",["Each chapter ends with praise","All chapters are written as dialogue","Each verse rhymes with the previous one"]]);
add(3,17,"10",["Hvilke to af Arons sønner døde, da de bragte fremmed ild for Herren?","Nadab og Abihu",["Eleazar og Itamar","Gerson og Merari","Hofni og Pinehas"]],["Which two of Aaron's sons died when they offered unauthorized fire before the LORD?","Nadab and Abihu",["Eleazar and Ithamar","Gershon and Merari","Hophni and Phinehas"]]);
add(40,17,"1:17",["Hvor mange slægtled regner Mattæus fra Abraham til David?","Fjorten",["Tolv","Syv","Tyve"]],["How many generations does Matthew count from Abraham to David?","Fourteen",["Twelve","Seven","Twenty"]]);
add(42,17,"3:1",["Hvilken romersk kejser regerede, da Johannes Døberen begyndte sin gerning ifølge Lukas 3?","Tiberius",["Augustus","Nero","Claudius"]],["Which Roman emperor was reigning when John the Baptist began his ministry according to Luke 3?","Tiberius",["Augustus","Nero","Claudius"]]);
add(60,17,"3:20",["Hvor mange mennesker blev reddet i arken ifølge 1 Petersbrev 3?","Otte",["Fire","Seks","Tolv"]],["How many people were saved in the ark according to 1 Peter 3?","Eight",["Four","Six","Twelve"]]);
add(26,18,"1:1",["Ved hvilken flod/kanal befandt Ezekiel sig, da han fik sit første syn?","Kebar",["Eufrat","Tigris","Jordan"]],["By which river or canal was Ezekiel when he received his first vision?","The Kebar",["The Euphrates","The Tigris","The Jordan"]]);
add(27,18,"9",["Hvor mange 'uger' taler Gabriel om i Daniel 9?","Halvfjerds",["Syv","Tolv","Fyrre"]],["How many 'sevens' does Gabriel speak of in Daniel 9?","Seventy",["Seven","Twelve","Forty"]]);
add(30,18,"1:1",["Hvad skete to år efter Amos' profeti, ifølge Amos' indledning?","Jordskælvet",["Oversvømmelsen","Solformørkelsen","Belejringen af Samaria"]],["According to the introduction of Amos, what happened two years after his prophecy?","The earthquake",["The flood","The solar eclipse","The siege of Samaria"]]);
add(41,18,"15:21",["Hvilke to sønner nævnes ifølge Markus som sønner af Simon fra Kyrene, der bar Jesu kors?","Alexander og Rufus",["Jakob og Johannes","Timotheus og Titus","Jason og Sosipater"]],["Which two sons are named in Mark as the sons of Simon of Cyrene, who carried Jesus' cross?","Alexander and Rufus",["James and John","Timothy and Titus","Jason and Sosipater"]]);
add(43,18,"21:11",["Hvor mange store fisk var der i nettet i Johannes 21?","153",["120","144","200"]],["How many large fish were in the net in John 21?","153",["120","144","200"]]);
add(47,18,"11:25",["Hvor mange gange var Paulus ifølge 2 Korintherbrev 11 med skibbrud (før rejsen til Rom)?","Tre gange",["Én gang","Fem gange","Syv gange"]],["How many times had Paul been shipwrecked according to 2 Corinthians 11 (before the voyage to Rome)?","Three times",["Once","Five times","Seven times"]]);
add(13,18,"4:9-10",["Hvem bad, at Gud ville velsigne ham og udvide hans område, ifølge 1 Krønikebog 4?","Jabes",["Jabin","Jonadab","Obed"]],["Who prayed that God would bless him and enlarge his territory according to 1 Chronicles 4?","Jabez",["Jabin","Jonadab","Obed"]]);
add(10,18,"9",["Hvad hed Jonatans lamme søn, som David viste godhed?","Mefibosjet",["Absalom","Amnon","Abner"]],["What was the name of Jonathan's crippled son to whom David showed kindness?","Mephibosheth",["Absalom","Amnon","Abner"]]);
add(36,18,"1:1",["Under hvilken konge profeterede Zefanias?","Josias",["Hizkia","Manasse","Joasj"]],["Under which king did Zephaniah prophesy?","Josiah",["Hezekiah","Manasseh","Joash"]]);
add(45,19,"16:22",["Hvem skrev Romerbrevet ned efter Paulus' diktat og hilser selv i kapitel 16?","Tertius",["Tykikus","Silas","Timotheus"]],["Who wrote down the letter to the Romans at Paul's dictation and greets in chapter 16 himself?","Tertius",["Tychicus","Silas","Timothy"]]);
add(65,19,"9",["Hvilken ærkeengel nævnes i Judas' brev som stridende med Djævelen om Moses' legeme?","Mikael",["Gabriel","Rafael","Uriel"]],["Which archangel is mentioned in Jude as disputing with the devil over the body of Moses?","Michael",["Gabriel","Raphael","Uriel"]]);
add(20,19,"31",["Hvilken konges mor lærte ham ordene i Ordsprogenes Bog 31?","Lemuel",["Salomon","Hizkia","David"]],["Which king's mother taught him the words in Proverbs 31?","Lemuel",["Solomon","Hezekiah","David"]]);
add(16,19,"8:1",["Ved hvilken plads/port samlede folket sig, da Ezra læste loven op i Nehemias 8?","Vandporten",["Fåreporten","Fiskeporten","Hesteporten"]],["At which square or gate did the people gather when Ezra read the Law in Nehemiah 8?","The Water Gate",["The Sheep Gate","The Fish Gate","The Horse Gate"]]);
add(7,19,"9",["Hvem dræbte halvfjerds af sine brødre for at blive konge i Sikem?","Abimelek",["Gideon","Jefta","Samson"]],["Who killed seventy of his brothers to become king in Shechem?","Abimelech",["Gideon","Jephthah","Samson"]]);
add(66,19,"2:13",["Hvilken af de syv menigheder bor, hvor 'Satans trone er'?","Pergamon",["Sardes","Thyatira","Smyrna"]],["Which of the seven churches lives where 'Satan has his throne'?","Pergamum",["Sardis","Thyatira","Smyrna"]]);
add(24,19,"1:1",["Hvad hed Jeremias' far?","Hilkia",["Amoz","Beeri","Petuel"]],["What was the name of Jeremiah's father?","Hilkiah",["Amoz","Beeri","Pethuel"]]);
add(18,20,"42:14",["Hvad hed Jobs tre døtre efter hans genoprettelse?","Jemima, Ketsia og Keren-Happuk",["Tamar, Dina og Lea","Rut, Orpa og Noomi","Hanna, Peninna og Mikal"]],["What were the names of Job's three daughters after his restoration?","Jemimah, Keziah and Keren-Happuch",["Tamar, Dinah and Leah","Ruth, Orpah and Naomi","Hannah, Peninnah and Michal"]]);
add(29,20,"1:1",["Hvad hed profeten Joels far?","Petuel",["Amoz","Beeri","Hilkia"]],["What was the name of the prophet Joel's father?","Pethuel",["Amoz","Beeri","Hilkiah"]]);
add(20,20,"30:1",["Hvem er ifølge overskriften forfatter til ordene i Ordsprogenes Bog 30?","Agur",["Lemuel","Salomon","Hizkia"]],["Who is named in the heading as the author of the words in Proverbs 30?","Agur",["Lemuel","Solomon","Hezekiah"]]);
add(45,20,"16:23",["Hvilken mand, byens kasserer, sender hilsen i slutningen af Romerbrevet?","Erastus",["Gajus","Kvartus","Aristobulos"]],["Which man, the city's director of public works, sends greetings at the end of Romans?","Erastus",["Gaius","Quartus","Aristobulus"]]);
add(57,20,"2",["Hvilken kvinde nævnes i indledningen til brevet til Filemon?","Apfia",["Lydia","Priskilla","Febe"]],["Which woman is mentioned in the opening of the letter to Philemon?","Apphia",["Lydia","Priscilla","Phoebe"]]);
add(12,16,"4",["Fra hvilken by kom den kvinde, hvis søn Elisa opvakte fra de døde?","Sjunem",["Betel","Jeriko","Endor"]],["Which town was the woman from whose son Elisha raised from the dead?","Shunem",["Bethel","Jericho","Endor"]]);
add(37,16,"1:1",["Hvem var guvernør i Juda i Haggajs tid?","Zerubbabel",["Nehemias","Ezra","Josua"]],["Who was governor of Judah in Haggai's time?","Zerubbabel",["Nehemiah","Ezra","Joshua"]]);
