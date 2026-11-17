# Docentacademie — AI in je onderwijs

Een e-learning voor hbo-docenten met negen uitgewerkte lessen van ongeveer één uur. De opbouw is geïnspireerd op [Fabians e-learning](https://fabianb88.github.io/minor-ce-elearnings/index.html); de AI-cursusinhoud is nieuw geschreven.

## Leerroute

0. Ontdek jouw startpunt: ervaring, leerwens en instaptoets.
1. Leer AI begrijpen: mogelijkheden, beperkingen en een eigen toepassing.
2. Doelgericht prompten: instructies, vergelijking en verbetering.
3. Controleren en verantwoord werken: claims, bronnen en gegevenskeuzes.
4. AI in je lesplan: leerdoel, activiteiten en begripscontrole.
5. Bouw een interactieve leeractiviteit: een oefenwebsite of kleine tool.
6. Studenten begeleiden bij AI: denkwerk, ondersteuning en reflectie.
7. Vaststellen wat studenten leren: bewijsvormen, afspraken en rubric.
8. Verbeteren en afronden: feedback, eindreflectie en een samenhangend portfolio.

## Inhoud

- Startreflectie over AI-ervaring, vertrouwen en leerwensen.
- Instaptoets met acht kennisvragen en drie praktijkcasussen.
- Een voorlopig routeadvies; de toets verleent geen automatische vrijstelling.
- Theorie, begrippen, uitgewerkte voorbeelden en oefeningen met feedback.
- Een praktijkopdracht en portfolio rond het eigen onderwijs.
- Voortgang bewaren, portfolio downloaden en een voortgangsback-up maken en herstellen.
- Een aanpasbare oefenwebsite proberen en als zelfstandig HTML-bestand downloaden; deze bewaart of verstuurt geen studentantwoorden.
- Leesteksten voor de kennisclips en een downloadbare leidraad voor menselijke beoordeling.

## Openen

De cursus wordt via GitHub Pages gepubliceerd vanaf de hoofdmap van de `main`-branch. De gepubliceerde link staat bij **Settings → Pages** en bij **Deployments** in deze repository.

Je kunt de bestanden ook downloaden en `index.html` in een browser openen. Er is geen installatie of bouwstap nodig. Voor de externe lettertypen is internet nodig; zonder internet gebruikt de cursus Arial.

## Opslag en status

De cursusinhoud is openbaar. Antwoorden en voortgang worden alleen bewaard in de browser van de deelnemer. Ze worden niet naar GitHub gestuurd en zijn niet zichtbaar voor andere deelnemers of beoordelaars. Voor een ander apparaat kun je een voortgangsbestand downloaden en daar herstellen. Bewaar belangrijke antwoorden ook via de portfolio-download.

Er zijn nog geen docentaccounts, centrale gegevensopslag of beoordeling van praktijkwerk. De status **doorlopen** is geen certificering of voldoende eindbeoordeling. Voer geen echte studentgegevens of vertrouwelijke informatie in.

Alle lessen zijn beschikbaar. De video-inhoud is als leestekst aanwezig; video-opnames zijn nog niet geproduceerd. De vragen, tijdsinschattingen en routecriteria moeten nog in een pilot worden getoetst. Een getrainde docent beoordeelt het praktijkwerk buiten deze omgeving.

Bestaande antwoorden uit de eerdere versie met twee lessen worden behouden. Oude voortgangsbestanden worden aangevuld met lege stappen voor de nieuwe lessen.

## Aanpassen

- `content.js`: cursusinhoud en vragen.
- `lessons.js`: inhoud, opdrachten, kennisvragen en clipscripts van les 2–8.
- `course-engine.js`: weergave, interacties en portfolio voor de nieuwe lessen.
- `state.js`: voortgang en ondersteuning voor oudere voortgangsbestanden.
- `toolkit.js`: zelfstandig, aanpasbaar oefenwebsite-sjabloon zonder gegevensopslag.
- `app.js`: navigatie, voortgang, oefeningen en portfolio.
- `styles.css`: vormgeving en mobiele weergave.
- `index.html`: startpagina.

Wijzigingen op `main` worden opnieuw gepubliceerd door GitHub Pages. Bronnen en ontwerpbeperkingen zijn in de e-learning terug te vinden onder **Bronnen & uitleg**.

## Controle

`node check-course.cjs` controleert het behoud van oude voortgang, normalisering van ongeldige invoer en de syntaxis en veilige tekstinvoer van het downloadbare prototype. De leerroute, formulieren, feedback en het voorbeeld worden daarnaast in de browser gecontroleerd.
