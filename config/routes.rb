Rails.application.routes.draw do
  devise_for :users

  get '/api/posts', to: proc { [200, {"Content-Type" => "application/json"}, ['{"resources": [{"title": "Title1"}, {"title": "Title2"}]}']] }
  match '/(*path)', via: :all, to: frontend_page('index.htm')
end
