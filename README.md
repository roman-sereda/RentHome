Start server
-------------------------

1. `bundle install` to install all necessary games
2. Set your pg config in `database.yml` file.
3. `rake db:create` & `rake db:migrate` to create and migrate database.

    > If u want to fill your db with some test data, u can call `rake db:seed`
4. `rails s` to start server. It will be avaliable on 3000 port

