# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

# Installation

1. Setup PostgreSQL

  https://www.digitalocean.com/community/tutorials/postgresql-ubuntu-16-04-ru

2. Install gem pg:

  ```sh
  # Install gem pg
  $ sudo apt-get install libpq-dev
  $ gem install pg  --   --with-pg-lib=/usr/lib
  ```
3. Install yarn

  https://yarnpkg.com/lang/en/docs/install/#debian-stable

  ```sh
  $ yarn install --check-files
  ```

4. Then, in your project directory:

  ```sh
  $ bundle install
  $ rake db:create
  $ rake db:migrate
  ```

5. Run application: 

  ```sh
  $ foreman start -f Procfile.dev -p 3000
  ```
# Compatibility

* Ruby 2.6.3
* Rails 5.2.3
* PostgreSQL 11.4

5. Run application: 

  ```sh
  $ foreman start -f Procfile.dev -p 3000
  ```
# Compatibility

* Ruby 2.6.3
* Rails 5.2.3
* PostgreSQL 11.4