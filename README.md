# QuizSite
# Quiztopia – Felhasználói Dokumentáció

## 1. Bevezetés
**Quiztopia** egy interaktív tanuló- és kvízplatform, ahol a felhasználók:  
- Saját **táblákat** hozhatnak létre (pl. Matek, Földrajz, Sport).  
- Kártyákat adhatnak hozzá minden táblához (kérdés + helyes válasz + hamis válaszok).  
- Játszhatnak **Flashcards** módban a tanuláshoz.  
- Tesztelhetik tudásukat a **Quiz Game** módban.

A platform reszponzív, böngészőből működik (mobil és desktop).

---

## 2. Főoldal és kategóriák

### 2.1 Kategóriák (Táblák) listázása
- A főoldalon minden tábla **kártyaként** jelenik meg a címmel, háttérszínnel vagy képpel.
- A táblák között vízszintesen görgethetsz a **nyíl gombokkal**.
- A **kategória kiválasztásához** kattints a kívánt tábla kártyájára.

### 2.2 Új tábla létrehozása
1. Kattints a **„Kategória hozzáadása”** gombra a főoldalon.
2. Töltsd ki a mezőket:  
   - **Tábla címe** (kötelező)  
   - **Kép URL** (opcionális)  
   - **Szín** (ha nem választasz, véletlenszerűt kap a tábla)
3. Kattints a **„Tábla létrehozása”** gombra.  
4. A tábla megjelenik a főoldalon.

---

## 3. Kártyák kezelése

### 3.1 Új kártya létrehozása
1. Nyisd meg a táblát, ahová kártyát szeretnél adni.
2. Kattints a **„Add Card”** menüpontra.
3. Töltsd ki az összes mezőt:
   - **Kérdés**  
   - **Helyes válasz**  
   - **Hamis válasz 1**  
   - **Hamis válasz 2**  
   - **Hamis válasz 3**
4. Kattints a **„Kártya létrehozása”** gombra.
5. Sikeres mentés esetén megjelenik a **„Kártya sikeresen hozzáadva!”** üzenet.
6. A **Vissza** gomb segítségével térhetsz vissza a tábla oldalára.

---

## 4. Flashcards mód
A Flashcards mód a tanulást gyorsítja, a kérdések és válaszok kártyák formájában jelennek meg.

### 4.1 Használat
1. Nyisd meg a kívánt táblát.
2. Kattints a **„Flashcards”** gombra.
3. A kártyák sorrendben vagy véletlenszerűen jelennek meg.
4. Kattints a **„Mutasd a választ”** gombra a kérdés megfordításához.
5. Kattints a **„Következő”** gombra a következő kártyához.
6. Miután az összes kártyát megtekintetted, a rendszer jelzi: **„Minden kártyát megtekintettél!”**.

### 4.2 Navigáció
- **Vissza gomb** – visszalépés a tábla oldalára.

---

## 5. Quiz Game mód
A Quiz Game egy interaktív kvíz, ahol a felhasználó pontokat szerez a helyes válaszokért.

### 5.1 Játék indítása
1. Nyisd meg a kívánt táblát.
2. Kattints a **„Quiz Game”** gombra.
3. Add meg a **kérdések számát** (alapértelmezett: 20).
4. Kattints a **Start** gombra.

### 5.2 Játék menete
- A kérdés megjelenik, alatta a négy lehetséges válasszal.
- Kattints a válaszra.
- A helyes válasz **zölddel**, a hibás válasz **pirossal** lesz kiemelve.
- A következő kérdés automatikusan 1 másodperc múlva jelenik meg.
- A folyamat végén a végső pontszám látható: **Pontszám: X / Y**.

### 5.3 Navigáció
- **Vissza** gomb – visszalépés a tábla oldalára.

---

## 6. Navigációs menü
A tábla oldalán elérhető gombok:

| Gomb | Funkció |
|------|---------|
| Flashcards | Tanulási mód |
| Quiz Game | Kvíz játék |
| Add Card | Új kártya hozzáadása |
| Vissza | Visszalépés a főoldalra vagy előző oldalra |

---

## 7. Hibakezelés
- **Üres mező esetén**: alert üzenet jelzi, hogy minden mezőt ki kell tölteni.
- **Helytelen kép URL**: a tábla nem jeleníti meg a képet, de a szín marad.
- **API hiba**: ha a kártyák betöltése nem sikerül, a konzolban hibát jelez.

---

## 8. Rendszerkövetelmények
- Modern böngésző: Chrome, Firefox, Edge, Safari.
- Internetkapcsolat.
- Mobil és asztali böngésző kompatibilis.
- Nincs szükség külön applikációra.

---

## 9. Tippek
- Ajánlott minden táblához legalább 5–10 kártyát létrehozni, hogy a Quiz Game élvezetes legyen.  
- A színek és képek személyre szabhatók, így könnyen megkülönböztethetők a táblák.  
- Flashcards módban a **Mutasd a választ** gomb segítségével gyorsan tanulhatsz.

---

## 10. Gyors kezdés
1. Főoldal → Kategória kiválasztása  
2. Flashcards vagy Quiz Game mód indítása  
3. Kártyák hozzáadása az Add Card gomb segítségével  
4. Tanulás, kvíz játék, pontok gyűjtése  

