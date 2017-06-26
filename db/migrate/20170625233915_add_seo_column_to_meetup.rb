class AddSeoColumnToMeetup < ActiveRecord::Migration[5.1]
  def change
    add_column :meetups, :seo, :string
  end
end
