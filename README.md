# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups_users
- has_many :comments

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|
|user_name|text|null: false|
### Association
- has_many  :users,  through:  :group_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group_user
