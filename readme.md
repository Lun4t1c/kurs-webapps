Aby uruchomić aplikację lokalnie w trybie developerskim:

1. Zaciągamy do siebie repozytorium git (np. poprzez komendę 'git clone https://github.com/Lun4t1c/kurs-webapps.git')

2. Po pobraniu repo uruchamiamy dwa razy komendę 'npm install' - raz w folderze /backend i raz w folderze /front

3. Po pobraniu pakietów trzeba utworzyć dwa pliki .env - 'backend/.env' i 'front/.env'

4. Następnie w pliku 'front/.env' dodajemy następującą zawartość:

VUE_APP_SERVER_URL="http://localhost:3000"

a w pliku 'backend/.env':

DIALER_LOGIN="<login_dialera>"

DIALER_PASSWORD="<haslo_dialera>"

DIALER_PHONE_NUMBER="<numer_konsultanta>"

MONGO_CONNECTION_STRING="<connection_string_do_bazy>"

MONGOD_DB_NAME="<nazwa_bazy>"

MONGO_HISTORY_COLLECTION_NAME="<nazwa_kolekcji_w_bazie>"

5. Na końcu odpalamy najpierw w folderze 'backend' komendę 'node index.js', a potem w folderze 'front' komendę 'npm run serve'

6. Aplikacja powinna być dostępna po wpisaniu w przeglądarkę 'localhost:8080'

Dodatkowe zależności ponad te przedstawione na kursie:
- tailwind css
- mongodb
- vue 3 toastify
- uuid
- dotenv
- vue-18n

Dodatkowe funkcjonalności:
- Licznik czasu rozmowy w trakcie
- Historia wykonanych połączeń, przechowywana w bazie danych
- Podstawowy error handling
- Tłumaczenia pl/en
- Walidacja wprowadzonego numeru (wymagany jest string z 9 cyframi)
