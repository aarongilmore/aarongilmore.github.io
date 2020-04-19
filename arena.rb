# require 'rubygems'
# require 'httparty'

# class Arena
#     include HTTParty
#     base_uri "http://api.are.na/"

#     def channels
#         self.class.get('/v2/users/aaron-gilmore/channels/')
#     end
# end
  
# arena_resty = Arena.new
# puts arena_resty.channels


Arena.configure do |config|
    config.access_token = '421724d4115b5529b5488d8dae04659b305f460e4e98f0d6392dccb77ece8f58'
end

@channel = Arena.channel(params[:id])