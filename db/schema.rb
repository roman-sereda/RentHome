# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170515081037) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "guests", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "surname"
    t.string   "country"
    t.string   "city"
    t.index ["city"], name: "index_guests_on_city", using: :btree
    t.index ["confirmation_token"], name: "index_guests_on_confirmation_token", unique: true, using: :btree
    t.index ["country"], name: "index_guests_on_country", using: :btree
    t.index ["email"], name: "index_guests_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_guests_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_guests_on_uid_and_provider", unique: true, using: :btree
  end

  create_table "hosts", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "surname"
    t.string   "country"
    t.string   "city"
    t.index ["city"], name: "index_hosts_on_city", using: :btree
    t.index ["confirmation_token"], name: "index_hosts_on_confirmation_token", unique: true, using: :btree
    t.index ["country"], name: "index_hosts_on_country", using: :btree
    t.index ["email"], name: "index_hosts_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_hosts_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_hosts_on_uid_and_provider", unique: true, using: :btree
  end

  create_table "houses", force: :cascade do |t|
    t.integer  "floor"
    t.boolean  "parking"
    t.boolean  "kitchen"
    t.boolean  "heating"
    t.boolean  "conditioner"
    t.boolean  "animals_allowed"
    t.boolean  "wi_fi"
    t.date     "rent_start"
    t.date     "rent_end"
    t.integer  "rooms"
    t.string   "city"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.decimal  "price_per_day"
    t.decimal  "price_per_month"
    t.integer  "host_id"
    t.text     "description"
    t.index ["host_id"], name: "index_houses_on_host_id", using: :btree
  end

  create_table "impressions", force: :cascade do |t|
    t.string   "impressionable_type"
    t.integer  "impressionable_id"
    t.integer  "user_id"
    t.string   "controller_name"
    t.string   "action_name"
    t.string   "view_name"
    t.string   "request_hash"
    t.string   "ip_address"
    t.string   "session_hash"
    t.text     "message"
    t.text     "referrer"
    t.text     "params"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["controller_name", "action_name", "ip_address"], name: "controlleraction_ip_index", using: :btree
    t.index ["controller_name", "action_name", "request_hash"], name: "controlleraction_request_index", using: :btree
    t.index ["controller_name", "action_name", "session_hash"], name: "controlleraction_session_index", using: :btree
    t.index ["impressionable_type", "impressionable_id", "ip_address"], name: "poly_ip_index", using: :btree
    t.index ["impressionable_type", "impressionable_id", "params"], name: "poly_params_request_index", using: :btree
    t.index ["impressionable_type", "impressionable_id", "request_hash"], name: "poly_request_index", using: :btree
    t.index ["impressionable_type", "impressionable_id", "session_hash"], name: "poly_session_index", using: :btree
    t.index ["impressionable_type", "message", "impressionable_id"], name: "impressionable_type_message_index", using: :btree
    t.index ["user_id"], name: "index_impressions_on_user_id", using: :btree
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "guest_id"
    t.integer  "house_id"
    t.date     "start_time"
    t.date     "end_time"
    t.boolean  "paid"
    t.decimal  "total_price"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["guest_id"], name: "index_orders_on_guest_id", using: :btree
    t.index ["house_id"], name: "index_orders_on_house_id", using: :btree
  end

  create_table "subscriptions", force: :cascade do |t|
    t.date     "end_time"
    t.integer  "host_id"
    t.string   "email"
    t.string   "card_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["host_id"], name: "index_subscriptions_on_host_id", using: :btree
  end

  add_foreign_key "houses", "hosts"
  add_foreign_key "orders", "guests"
  add_foreign_key "orders", "houses"
  add_foreign_key "subscriptions", "hosts"
end
