class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
			t.string :first_name
      t.string :last_name
      t.integer :age
      t.date :birth_date
      t.string :gender
      t.integer :price
      t.integer :team

      t.timestamps
    end
  end
end
