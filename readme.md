Aby uruchomić apkę w trybie developerskim:

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

5. Na końcu odpalamy najpierw komendę 'node index.js' w folderze 'backend', a potem komendę 'npm run serve' w folderze 'front'

6. Aplikacja powinna być dostępna po wpisaniu w przeglądarkę 'localhost:8080'