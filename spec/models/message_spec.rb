require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it "is valid without a content" do
        message = build(:message, content: )
      end
    end

    context 'can not save' do
    end
    
  end
end