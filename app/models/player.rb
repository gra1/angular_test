class Player < ActiveRecord::Base
	enum team: [ :arsenal, :chelsea, :liverpool, :southampton ]
	validates :first_name, :last_name, :age, :birth_date, :gender, :price, :team ,  presence: true

  def as_json(options={})
    super()
  end
end
