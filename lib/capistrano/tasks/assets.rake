namespace :assets do
  desc 'Compile Sass and JS with Gulp'
  task :compile do
    run_locally do
      execute 'npm run build'
    end
  end

  desc 'Upload Static Assets'
  task :upload do
    on roles(:web) do
      ['assets/css', 'assets/js'].each do |asset|
        upload! asset, "#{release_path}/#{asset}", recursive: true
      end
    end
  end
end