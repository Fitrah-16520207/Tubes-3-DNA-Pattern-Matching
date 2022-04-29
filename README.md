# Tubes-3-DNA-Pattern-Matching
## Cara Menjalankan Backend
1. Pastikan sudah memiliki/menginstall node dan npm
2. Untuk pertama kali menjalankan, buat database baru pada server MySQL, misal nama databasenya dna_test_tubes3stima. Kemudian, load data dump dna_test_dump dengan command pada direktori backend:
    ```sql
    mysql -u <username> -p <nama database> < dna_test_dump.sql
    ```
    Setelah load data dump berhasil, atur konfigurasi pada src/backend/config.js sesuai database yang telah dibuat sebelumnya. Jika server database lokal, yang perlu diganti hanyalah username, password, dan nama databasenya. Kalau server database di remote/online, baru perlu mengubah host nya.<br>
3. Dari folder backend, jalankan:
    ```shell
    npm run dev-server // untuk memulai development server
    npm run start-server // untuk memulai server biasa
    ```
4. Lakukan request, bisa melalui aplikasi client atau melalui Postman

## Cara Menjalankan Frontend
1. Pastikan sudah memiliki/menginstall node dan npm
2. Pertama masuk ke direktori frontend yang terdapat pada folder src
3. Dari folder frontend, jalankan:
    ```shell
    npm start 
    ```
4. Jika tidak otomatis membuka browser dapat membuka localhost:3000 pada browser

## Dibuat Oleh
**Kelompok 36 - AstraJenaka**

13520030 Fitrah Ramadhani Nugroho		  <br/>
13520116 Mahesa Lizardy		              <br/>
13520146 Bryan Amirul Husna		          <br/>
