## Database Setup

In Database, you need to setup

```sql
CREATE SEQUENCE patient_no_seq START 1000;
CREATE SEQUENCE doctor_no_seq START 1000;
CREATE SEQUENCE receipt_no_seq START 100000;
CREATE SEQUENCE appointment_no_seq START 100000;
```

## For VPS `GCLOUD`

```sh
sudo apt update && sudo apt upgrade -y

# Install PostgreSQL 18
sudo mkdir -p /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc

echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list

sudo apt update
sudo apt install postgresql-18 -y

sudo systemctl start postgresql

sudo systemctl status postgresql # To check status

# Install NodeJS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt install -y nodejs

# Install Apache
sudo apt install apache2 -y

sudo systemctl enable apache2
sudo systemctl start apache2

sudo systemctl status apache2 # To check status
```
