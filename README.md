# Bibelquiz

Tosproget (dansk/engelsk) Bibelquiz til bibelskole og menighed. Ren statisk webside – kan lægges på GitHub Pages.

## Indhold

| Fil | Hvad |
|---|---|
| `index.html` | Øvemodus: niveau 1–20, målgruppe (børn / konfirmander / bibelstuderende) og selvstudie (vælg de bibelbøger, du har læst) |
| `host.html` | Live-quiz: quizmaster / storskærm |
| `play.html` | Live-quiz: deltagerne på mobil (kode, sprog, brugernavn, 4 svarknapper) |
| `questions.js` | Spørgsmålsbank (dansk + engelsk, alle 66 bøger, niveau 1–20) |
| `firebase-config.js` | Dine Firebase-oplysninger (kun nødvendig til live-quizzen) |
| `database_rules.json` | Sikkerhedsregler til Firebase |

Øvemodus virker med det samme uden opsætning. Live-quizzen kræver et gratis Firebase-projekt (trin 2).

## 1. Læg siden på GitHub Pages

1. Opret et nyt repository på GitHub, fx `bibelquiz`.
2. Upload alle filerne i denne mappe (Add file → Upload files).
3. Gå til Settings → Pages → Source: *Deploy from a branch* → branch `main`, mappe `/ (root)` → Save.
4. Efter et minut ligger siden på `https://DITBRUGERNAVN.github.io/bibelquiz/`.

## 2. Opsæt live-quizzen (Firebase)

1. Gå til <https://console.firebase.google.com> og opret et projekt (Google Analytics kan slås fra).
2. **Authentication → Get started → Sign-in method → Anonymous → Enable.**
   Under *Settings → Authorized domains* skal `DITBRUGERNAVN.github.io` stå (tilføj det, hvis det mangler).
3. **Build → Realtime Database → Create database.** Vælg region (fx `europe-west1`) og start i *locked mode*.
4. Fanen **Rules:** indsæt indholdet af `database_rules.json` og tryk *Publish*.
5. **Project settings (tandhjulet) → Your apps → Web (`</>`)**, registrér en app og kopiér `firebaseConfig`.
   Indsæt værdierne i `firebase-config.js` (apiKey, authDomain, databaseURL, projectId, appId), og upload filen igen.
   Disse værdier er ikke hemmelige – det er reglerne i trin 4, der beskytter data.

## 3. Sådan kører du en live-quiz

1. Åbn `host.html` på computeren, der er koblet til storskærmen. Vælg sprog for skærmen, antal spørgsmål, svartid (10–30 sek.) og niveauinterval → *Opret quiz*.
2. Storskærmen viser en 5-cifret kode og en QR-kode. Deltagerne åbner `play.html` (eller scanner QR-koden), vælger sprog og et midlertidigt brugernavn.
3. Tryk *Start*. Spørgsmålet vises på storskærmen på quizmasterens sprog og på hver mobil på deltagerens eget sprog (svarrækkefølgen er den samme for alle, så farver/former passer til storskærmen).
4. Point: rigtigt svar giver 600 + op til 400 efter hurtighed, og den hurtigste med rigtigt svar får 200 ekstra. Skærmen går videre til facit, når tiden er gået eller alle har svaret.
5. Efter sidste spørgsmål vises top 3 på podiet.

Hvis storskærmens fane lukkes ved et uheld, kan quizzen genoptages fra opsætningsskærmen på samme computer.

## Vigtigt: grænse på 100 samtidige deltagere

Firebases gratisplan (Spark) tillader **100 samtidige forbindelser**, og quizmasterens skærm tæller som én. Til events med op til ca. 95 deltagere er gratisplanen fin. Hvis I forventer flere, skal projektet opgraderes til Blaze (betal efter forbrug – en enkelt quizaften koster typisk ganske få kroner; sæt gerne et budget-alarm i Google Cloud). Se <https://firebase.google.com/docs/database/usage/limits>.

## Tilføj spørgsmål

I `questions.js`, én linje pr. spørgsmål:

```js
add(40, 3, "2:1", ["Hvor blev Jesus født?", "Betlehem", ["Nazaret","Jerusalem","Kapernaum"]],
                  ["Where was Jesus born?", "Bethlehem", ["Nazareth","Jerusalem","Capernaum"]]);
```

Bog (1–66), niveau (1–20), kapitel:vers, dansk, engelsk. Svarrækkefølgen blandes automatisk.
Spørgsmålene henviser kun til bibelsteder (Bibelen 1992 / NIV) uden at citere teksten, da oversættelserne er ophavsretsbeskyttede.
